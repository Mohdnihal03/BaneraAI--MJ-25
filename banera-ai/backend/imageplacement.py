
import os
import base64
import json
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io



app = Flask(__name__)
CORS(app)

# Configure the Google Gemini API
GOOGLE_API_KEY = "AIzaSyB5YNQHPvA2Xe0_5dqUCh4SpNKAxlFXs9M"  # Replace with your actual API key
genai.configure(api_key=GOOGLE_API_KEY)




def encode_image(image):
    """Convert PIL image to base64 encoded string."""
    buffered = io.BytesIO()
    image.save(buffered, format="JPEG")
    return base64.b64encode(buffered.getvalue()).decode('utf-8')

@app.route('/api/gemini-suggestions', methods=['POST'])
def get_gemini_suggestions():
    try:
        # Check if image is in the request
        if 'image' not in request.files:
            return jsonify({"error": "No image uploaded"}), 400
        
        # Get the image file
        image_file = request.files['image']
        
        # Open the image using PIL
        image = Image.open(image_file)
        
        # Ensure image is in RGB mode
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Prepare brand information (if provided)
        brand_info = request.form.get('brand_info', '{}')
        
        # Create Gemini model
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # Prepare prompt with enhanced text positioning and styling request
        prompt = f"""
        Analyze the banner image and provide comprehensive text placement and styling recommendations:

        For each text element, provide:
        1. Recommended position (x, y coordinates or region)
        2. Font suggestions (font family, size, weight)
        3. Color recommendation
        4. Alignment guidance
        5. Text content suggestions

        Key text elements to analyze:
        - Header
        - Subheader
        - Main promotional text
        - Call-to-Action (CTA)
        - Tagline
        - Key features/benefits

        Output format:
        {{
            "header": {{
                "text": "Compelling Header",
                "position": {{
                    "x": 0.5,  # Horizontal position (0-1, center)
                    "y": 0.2,  # Vertical position (0-1)
                    "width": 0.8,  # Width as fraction of image
                    "height": 0.1  # Height as fraction of image
                }},
                "style": {{
                    "font": "Arial Bold",
                    "size": 48,
                    "color": "#FFFFFF",
                    "alignment": "center",
                    "shadow": true
                }}
            }},
            "cta": {{
                "text": "Action Text",
                "position": {{...}},
                "style": {{...}}
            }}
            // ... other text elements
        }}
        
        Additional Context:
        - Image dimensions: {image.width}x{image.height}
        - Brand Information: {brand_info}
        """
        
        # Encode image to base64
        image_base64 = {
            'mime_type': 'image/jpeg',
            'data': encode_image(image)
        }
        
        # Generate text suggestions with positioning
        response = model.generate_content([prompt, image_base64])
        
        # Parse the JSON response
        try:
            suggestions = json.loads(response.text)
        except json.JSONDecodeError:
            # Fallback parsing if JSON parsing fails
            suggestions = {
                "error": "Could not parse detailed suggestions",
                "raw_response": response.text
            }
        
        return jsonify(suggestions)
    
    except Exception as e:
        # Comprehensive error handling
        return jsonify({
            "error": str(e),
            "fallback_suggestions": {
                "header": {
                    "text": "Discover Your Potential",
                    "position": {"x": 0.5, "y": 0.3},
                    "style": {
                        "font": "Arial Bold",
                        "size": 36,
                        "color": "#000000"
                    }
                }
            }
        }), 500

# Fallback/test route
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Gemini Vision Text Positioning API Backend is running"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)