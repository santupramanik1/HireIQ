import httpx
from fastapi import HTTPException
import uuid
import os
from langchain_community.document_loaders import PyMuPDFLoader
from schema.parsed_resume_schema import ParsedResume
from config.llm_config import get_llm
from langchain_core.prompts import ChatPromptTemplate


# Parse the resume
async def process_resume_url(url: str, job_id: str, user_id: str = None) -> dict:

    local_pdf_path = f"temp_{uuid.uuid4().hex}.pdf"
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=15.0)
            response.raise_for_status()

        with open(local_pdf_path, "wb") as f:
            f.write(response.content)

        loader = PyMuPDFLoader(local_pdf_path)
        documents = loader.load()
        resume_text = "\n".join([doc.page_content for doc in documents])
        # Configuration of llm
        llm = get_llm()

        # Force the model to reply ONLY in our JSON format
        structured_llm = llm.with_structured_output(ParsedResume)

        # Create the prompt instructions
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are an expert technical AI recruiter for HireIQ. Your job is to extract the requested information from the provided resume text accurately. If a field is missing from the resume, leave it blank or 0. DO NOT make up information.",
                ),
                ("human", "Here is the resume text:\n\n{resume_text}"),
            ]
        )

        # Connect the prompt to the AI
        extraction_chain = prompt | structured_llm

        # Run the AI!
        result = await extraction_chain.ainvoke({"resume_text": resume_text})

        return {"candidate_data": result.model_dump(), "raw_resume_text": resume_text}

    except httpx.HTTPError as e:
        # If Cloudinary fails, throw a standard HTTP error back to Node.js
        raise HTTPException(
            status_code=400, detail=f"Failed to download resume: {str(e)}"
        )
    except Exception as e:
        print(f"CRASH REPORT: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to process PDF: {str(e)}")
    finally:
        if os.path.exists(local_pdf_path):
            os.remove(local_pdf_path)
