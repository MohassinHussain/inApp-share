# inApp-share (iAS)

## Overview

**inApp-share (iAS)** is a React.js web application that simplifies sharing YouTube-like videos within the app itself, eliminating the need to rely on external platforms. Users can seamlessly share videos with their friends directly through the app, allowing them to receive and view videos in real-time. The app leverages Firebase for Gmail authentication and MongoDB to store and retrieve shared video information. The app is designed with simplicity and user experience in mind, making it an intuitive platform for video sharing.

## Features

- **Home Page:** Displays a YouTube-like interface with a video list. Each video has a share option, allowing users to share it directly with friends.
- **Video Sharing:** Authenticated users can share videos with others through the app. User1 can send a video, and User2 will receive it directly within the app.
- **Video Sent and Received Sections:** Separate sections to track the videos you've shared and the videos you've received from other users.
- **Friends (Mates) Section:** Users can manage their friend list by adding or editing friends' email addresses. This allows you to easily share videos with specific friends.
- **Gmail Authentication:** Secure login and registration using Gmail through Firebase Authentication.

## Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS (for styling)
  - AI tools for optimized design
- **Backend:**
  - MongoDB (for storing shared video information)
  - Firebase Authentication (for secure user login via Gmail)
- **Other Tools:**
  - React Router (for navigation)
  - YouTube Data API (for video content)

## Project Structure

- **Home:** Displays videos similar to YouTube. Each video has a share option.
- **Video Sent:** A section that lists all the videos the user has shared.
- **Video Received:** A section that shows all the videos the user has received from others.
- **Friends (Mates):** Allows users to add and manage friends by email for easy video sharing. Users can edit friend details as needed.

## How It Works

1. **User Authentication:** Users sign in using Gmail, ensuring secure and simple access through Firebase Authentication.
2. **Add Friends:** In the "Friends" section, users can add friends by entering their email address, which is required for sharing videos.
3. **Share Videos:** In the "Home" section, users can select videos and click the share option. The app will allow them to select a friend from their friend list to share the video.
4. **Receive Videos:** Users can see shared videos in the "Video Received" section.
5. **Track Video Activity:** Users can monitor their sharing history in the "Video Sent" section.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/)
- Firebase account (https://firebase.google.com/)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/inApp-share.git
2. Navigate to the project directory:

     bash: cd inApp-share
3. Install
     bash: npm install

Set up Firebase Authentication:

    Go to Firebase and create a new project.
    Enable Gmail Authentication in the Firebase console under "Authentication" -> "Sign-in method" -> "Google."
    Get the Firebase configuration details (API key, Auth domain, etc.) from the Firebase console and add them to your project.

Set up MongoDB:

    Ensure MongoDB is installed locally or on a cloud platform like MongoDB Atlas.
    Create a database for your app and update your backend with the MongoDB connection string.
Usage

    Log in using your Gmail credentials.
    Add friends via their email addresses in the "Friends" section.
    Browse videos in the "Home" section and share them with friends.
    Check the "Video Sent" and "Video Received" sections to manage your shared and received videos.

Future Improvements

    Notification System: Add real-time notifications when a user receives a new video.
    Search Friends: Implement a search feature to quickly find and add friends.
    Video Commenting: Allow users to comment on shared videos.
