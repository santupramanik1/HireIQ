import os
from dotenv import load_dotenv
from config.llm_config import get_llm

# Load your .env file so the script can find your OPENROUTER_API_KEY
load_dotenv() 

def check_llm_connection():
    print("Initiating connection to OpenRouter...")
    
    try:
        # 1. Grab the LLM configuration you just built
        llm = get_llm()
        
        # 2. Give it a very simple, direct prompt using .invoke()
        prompt = "Hello! Tell me one joke about  weather 10 line'"
        
        print("Sending prompt...")
        response = llm.invoke(prompt)
        
        # 3. Print the AI's response
        print("\n✅ SUCCESS! The AI replied:")
        print(f"🤖 {response.content}")
        
    except Exception as e:
        print("\n❌ FAILED TO CONNECT!")
        print(f"Error details: {str(e)}")

if __name__ == "__main__":
    check_llm_connection()