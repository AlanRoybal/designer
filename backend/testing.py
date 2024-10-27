import cv2
import requests
import time
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("API_KEY")

# Initialize Roboflow
model_url = "https://detect.roboflow.com/traffic-lights-2-x0i7e-5vax0-cfkyw/1"  # Update with your Roboflow model URL

# Video path
video_path = "video1.mp4"  # Replace with your video file path
cap = cv2.VideoCapture(video_path)

MAX_WIDTH = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
FIRST_BOUND = MAX_WIDTH / 3
SECOND_BOUND = MAX_WIDTH / 3 * 2

# Define the frame interval (e.g., every 30 frames)
frame_interval = 15  # Adjust for how frequently you want to analyze frames

frame_count = 0
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
        
        # Parse and display the result
        if response.status_code == 200:
            prediction = response.json()
            if prediction['predictions']:
                x_value = 0
                y_value = 0
                traffic_light_color = ''
                max_area = 0
                light_detected = False
                # START
                for light in prediction['predictions']:
                    if (light['width'] * light['height']) > max_area and light['x'] > FIRST_BOUND and light['x'] < SECOND_BOUND:
                        max_area = light['width'] * light['height']
                        traffic_light_color = light['class']
                        print(f"Frame {frame_count}: Traffic light color detected: {traffic_light_color}")
                        print(f"X: {light['x']} and Y: {light['y']} and Confidence: {light['confidence']}")
                        light_detected = True  # Set the flag to True if a light is detected
                
                if not light_detected:
                    print(f"Frame {frame_count}: No traffic light detected.")
                # FINISH
            else:
                print(f"Frame {frame_count}: No traffic light detected.")
        else:
            print(f"Error in prediction request: {response.status_code}")

        # Optional: Add a delay to avoid overwhelming the API
        time.sleep(0.1)

    frame_count += 1

# Release the video capture object
cap.release()
