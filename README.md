# AspireNex - Quiz Manager

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
5. [Usage](#usage)
6. [Author](#author)

## Introduction

The Online Quiz Manager is a web application designed to facilitate the creation, management, and reporting of quizzes. Built using modern web technologies, it provides a seamless experience for users to create quizzes, add questions, and generate detailed reports.

## Technologies Used

- **`Backend:`**

  - **Node.js**
  - **Express.js**
  - **MongoDB**
  - **Mongoose**
  - **JWT (JSON Web Tokens):**

- **`Frontend:`**

  - **Next.js**
  - **React**
  - **Tailwind CSS**
  - **Redux**

## Features

- **`User Authentication:`**

  - Secure user login, registration, and logout functionalities using JWT for session management.

- **`Quiz Management:`**

  - Create new quizzes with various settings.
  - Update existing quizzes to modify questions, settings, and details.
  - Delete quizzes that are no longer needed.

- **`Question Management:`**

  - Add new questions to quizzes, supporting multiple choice, true/false, and short answer formats.
  - Update existing questions to correct mistakes or modify options.
  - Delete questions from quizzes to streamline content.

- **`Reporting:`**

  - Generate and view detailed reports for each quiz, including the number of correct and incorrect answers, total questions, and overall performance.

- **`Responsive Design:`**

  - The application is optimized for various devices and screen sizes, ensuring a seamless experience on mobile, tablet, and desktop.

- **`Quiz Sharing:`**

  - Generate shareable links and codes for quizzes, allowing users to easily distribute quizzes to participants.

- **`Search and Filter:`**

  - Easily search for quizzes and questions using keywords and filter them based on categories or other criteria.

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ken314526/AspireNex---Quiz-Manager
   ```

2. Navigate to the backend directory:

   ```bash
   cd AspireNex---Quiz-Manager/backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file and add your environment variables:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=8080
   FRONTEND_URL=http://localhost:3000
   ```
5. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add your environment variable:

   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
   ```

4. Start the frontend server:

   ```bash
   npm run dev
   ```

## Usage

Once the development server is running, you can view the application in your browser by navigating to http://localhost:3000.

## Author

Developed by **Abhishek Sharma**
