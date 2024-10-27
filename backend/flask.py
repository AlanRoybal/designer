# flask_server.py
from flask import Flask, request, jsonify
from roboflow import Roboflow
import cv2
import numpy as np
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("API_KEY")

app = Flask(__name__)

# Initialize Roboflow
rf = Roboflow(api_key=api_key)
project = rf.workspace().project("traffic-lights-2-x0i7e-5vax0-cfkyw")
model = project.version(1).model

@app.route('/predict', methods=['POST'])
def predict():
    # Decode the image
    file = request.files['frame'].read()
    npimg = np.frombuffer(file, np.uint8)
    frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    
    # Save frame temporarily to pass to Roboflow
    temp_image_path = "temp_frame.jpg"
    cv2.imwrite(temp_image_path, frame)
    
    # Get prediction from Roboflow
    prediction = model.predict(temp_image_path, confidence=40, overlap=30).json()
    
    # Find traffic light color
    traffic_light_color = "None"
    if prediction['predictions']:
        traffic_light_color = prediction['predictions'][0]['class']

    return jsonify({'traffic_light_color': traffic_light_color})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
