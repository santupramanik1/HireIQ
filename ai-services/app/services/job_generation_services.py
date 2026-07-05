import json
import traceback
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from config.llm_config import get_llm

async def generate_job_details(prompt_text: str) -> dict:
    try:
        llm = get_llm()
        
        prompt = ChatPromptTemplate([
            ("system", """You are an elite HR manager and recruiter. 
            Generate detailed job information based on the user's requested job title/description.
            
            RULES:
            1. Output ONLY a valid JSON object. Do not include introductory text, explanations, or markdown code blocks (e.g. do not wrap in ```json).
            2. The JSON object MUST have the following structure and all fields are required:
            {{
                "title": "A professional job title based on the input",
                "department": "The department name (e.g., Engineering, Marketing, Product)",
                "description": "A detailed 2-3 paragraph overview of the role, team context, and mission",
                "skills": "A comma-separated list of key technical and soft skills (e.g., React, TypeScript, REST APIs, Communication)",
                "requirements": "A bulleted or detailed list of education, experience, and background requirements",
                "responsibilities": "A bulleted list of daily duties and core expectations for the role",
                "minSalary": 80000,
                "maxSalary": 120000
            }}
            """),
            ("human", "Generate job details for: {prompt_text}")
        ])
        
        chain = prompt | llm | StrOutputParser()
        raw_text = await chain.ainvoke({"prompt_text": prompt_text})
        
        cleaned_text = raw_text.strip()
        if cleaned_text.startswith("```json"):
            cleaned_text = cleaned_text.replace("```json", "", 1)
        if cleaned_text.endswith("```"):
            cleaned_text = cleaned_text.rsplit("```", 1)[0]
        cleaned_text = cleaned_text.strip()
        
        parsed_data = json.loads(cleaned_text, strict=False)
        return parsed_data
        
    except Exception as e:
        print("=== JOB GENERATION CRASH REPORT ===")
        traceback.print_exc()
        print("====================================")
        raise e
