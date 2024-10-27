from flask import Flask, jsonify, request
import cv2
import requests
import os
import base64
import numpy as np
from dotenv import load_dotenv

app = Flask(__name__)

# Load environment variables
load_dotenv()
api_key = os.getenv("API_KEY")
model_url = "https://detect.roboflow.com/traffic-lights-2-x0i7e-5vax0-cfkyw/1"  # Replace with your Roboflow model URL

# Frame processing variables
previous_color = None  # Store the last detected color
FIRST_BOUND_RATIO = 1 / 3
SECOND_BOUND_RATIO = 2 / 3

def detect_traffic_light_color(frame):
    global previous_color
    
    # Save frame temporarily as an image
    temp_image_path = "temp_frame.jpg"
    cv2.imwrite(temp_image_path, frame)

    # Send frame to Roboflow for prediction
    with open(temp_image_path, "rb") as image_file:
        response = requests.post(
            model_url,
            files={"file": image_file},
            params={"api_key": api_key, "confidence": 40, "overlap": 15}
        )
    
    # Parse the result
    if response.status_code == 200:
        prediction = response.json()
        if prediction['predictions']:
            traffic_light_color = ''
            max_area = 0
            frame_width = frame.shape[1]
            FIRST_BOUND = frame_width * FIRST_BOUND_RATIO
            SECOND_BOUND = frame_width * SECOND_BOUND_RATIO

            for light in prediction['predictions']:
                if (light['width'] * light['height']) > max_area and FIRST_BOUND < light['x'] < SECOND_BOUND:
                    max_area = light['width'] * light['height']
                    traffic_light_color = light['class']

            # Return the detected color if it changed from the previous detection
            if traffic_light_color and traffic_light_color != previous_color:
                previous_color = traffic_light_color
                return traffic_light_color
        else:
            previous_color = None
    else:
        print(f"Error in prediction request: {response.status_code}")
    return None

@app.route('/detect', methods=['POST'])
def detect_route():
    data = request.json
    if 'image' not in data:
        return jsonify({"error": "No image data provided"}), 400
    
    # Decode the base64 image
    image_data = base64.b64decode(data['image'])
    np_arr = np.frombuffer(image_data, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    
    color = detect_traffic_light_color(frame)
    if color:
        return jsonify({"color": color})
    else:
        return jsonify({"color": "none"})

if __name__ == '__main__':
    app.run(debug=True)
