from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Instantiate the OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/generate', methods=['POST'])
def generate_lyrics():
    study_notes = request.json['study_notes']
    prompt = f"Generate song lyrics based on these study notes: {study_notes}"

    try:
        # Updated code using the client instance
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # or "gpt-4" if available
            messages=[{"role": "user", "content": prompt}],
            max_tokens=200,
            temperature=0.7,
        )
        
        # Access the message content correctly
        lyrics = response.choices[0].message.content.strip()
        return jsonify({"lyrics": lyrics})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)