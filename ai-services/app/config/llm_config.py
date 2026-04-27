import os 
from langchain_openai import ChatOpenAI

def get_llm():
    api_key=os.getenv("OPEN_ROUTER_API_KEY")
    baseUrl=os.getenv("OPEN_ROUTER_BASE_URL")
    if not api_key:
        raise ValueError("OPENROUTER_API_KEY environment variable is missing in your .env file!")
    if not baseUrl:
        raise ValueError("OPEN_ROUTER_BASE_URL environment variable is missing in your .env file!")
    
    llm=ChatOpenAI(
        model="openai/gpt-oss-120b:free",
        api_key=api_key,
        base_url=baseUrl,
        temperature=0
    )

    return llm
