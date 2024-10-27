from flask import Flask, jsonify, request
import cv2
import requests
import os
import time
from dotenv import load_dotenv

app = Flask(__name__)

# Load environment variables
load_dotenv()
api_key = os.getenv("API_KEY")
model_url = "https://detect.roboflow.com/traffic-lights-2-x0i7e-5vax0-cfkyw/1"  # Replace with your Roboflow model URL

# Video path
video_path = "video1.mp4"  # Replace with your video file path
cap = cv2.VideoCapture(video_path)

# Frame processing variables
MAX_WIDTH = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
FIRST_BOUND = MAX_WIDTH / 3
SECOND_BOUND = MAX_WIDTH / 3 * 2
frame_interval = 15  # Adjust for how frequently you want to analyze frames
frame_count = 0
previous_color = None  # Store the last detected color

def detect_traffic_light_color():
    global frame_count, previous_color
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break  # Exit loop if no more frames are available

        # Process every nth frame (to avoid sending too many requests)
        if frame_count % frame_interval == 0:
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

            # Optional delay to avoid API overload
            time.sleep(0.1)

        frame_count += 1

    # Reset video if it reaches the end
    cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

@app.route('/detect', methods=['GET'])
def detect_route():
    color = detect_traffic_light_color()
    if color:
        return jsonify({"color": color})
    else:
        return jsonify({"color": "none"})

if __name__ == '__main__':
    app.run(debug=True)
