from flask import Flask, request, jsonify
from crewai import Agent, Task, Crew
from langchain_groq import ChatGroq  # Correct import
from langchain.callbacks import get_openai_callback
from flask_cors import CORS
import os
from dotenv import load_dotenv
load_dotenv()



app = Flask(__name__)
# Enable CORS for all routes
CORS(app)

# Replace Streamlit session state with a global variable or persistent storage
session_state = {}

# Set up LangChain with Groq
model = 'groq/mixtral-8x7b-32768'

llm = ChatGroq(
    temperature=0,
    groq_api_key=os.getenv("GROQ_API_KEY"),
    model_name=model
)



@app.route('/submit', methods=['POST'])
def generate_prompt():
    """Endpoint to generate a banner prompt."""
    try:
        # Get data from the request body
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Store the input data in session state
        session_state["background_input"] = data.get("background", "")
        session_state["purpose_input"] = data.get("purpose", "")
        session_state["keyword_input"] = data.get("keywords", "")
        session_state["selected_aspect_ratio"] = data.get("selectedAspectRatio", "")

        # Print received data for debugging
        print("Received data:", data)

        # Define the agent for generating the image prompt
        Prompt_Generation_Agent = Agent(
            role='Prompt_Generation_Agent',
            goal="""Generate a detailed and descriptive prompt for creating an image 
                  based on the given background type, purpose, keywords, and aspect ratio.""",
            backstory="""You are a creative AI capable of generating detailed image prompts 
                      that capture the essence of the user's input and translate it into visual elements.""",
            verbose=True,
            allow_delegation=False,
            llm=llm,
        )

        # Define the task for generating the image prompt
        prompt_task = Task(
            description=f"""Generate a descriptive prompt for an image based on the following inputs:
            Background: {session_state["background_input"]}
            Purpose: {session_state["purpose_input"]}
            Keywords: {session_state["keyword_input"]}
            Aspect Ratio: {session_state["selected_aspect_ratio"]}
            """,
            agent=Prompt_Generation_Agent,
            expected_output="A detailed prompt for an image creation tool."
        )

        crew = Crew(
            agents=[Prompt_Generation_Agent],
            tasks=[prompt_task],
            verbose=1
        )

        # Track token usage with LangChain's callback
        with get_openai_callback() as cb:
            # Generate the result
            result = crew.kickoff()
            prompt = result.get('output') if isinstance(result, dict) else result
            print(f"Total Tokens: {cb.total_tokens}")
            print(f"Prompt Tokens: {cb.prompt_tokens}")
            print(f"Completion Tokens: {cb.completion_tokens}")

        # Print the prompt to the terminal
        print("Generated Prompt:", prompt)

        # Store the prompt in session state
        session_state['image_prompt'] = prompt

        return jsonify({
            "prompt": prompt,
            "token_usage": {
                "total_tokens": cb.total_tokens,
                "prompt_tokens": cb.prompt_tokens,
                "completion_tokens": cb.completion_tokens
            }
        }), 200
    
    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)