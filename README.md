Task Management App

This repository contains a Task Management App built using .NET 7 and Vite React TypeScript. The application allows users to manage and track their tasks efficiently.
Table of Contents

    Getting Started
        Prerequisites
        Installation
        Building the Project
        Usage
        Running with Docker
    Contributing
    License

Getting Started

To run the Task Management App on your local machine, follow the steps below:
Prerequisites

Before you begin, ensure that the following dependencies are installed:

    .NET 7 SDK
    Node.js
    npm (Node Package Manager)
    Docker
    Docker Compose

Installation

    Clone the repository:

    bash

git clone https://github.com/MatijaKocevar/task-management.git

Building the Project

To build the entire project, including the frontend dependencies, follow these steps:

    Build the project:

    bash

    dotnet build

    This command will build both the backend and frontend components of the application.

Usage

To start the application using the development servers, follow these steps:

    Run the backend development server:

    bash

dotnet watch run

The development server will automatically reload if there are any code changes.

Run the frontend development server:

    Navigate to the client-app directory:

    bash

cd client-app

Run the frontend development server:

bash

        npm start

    The frontend server will automatically reload if there are any code changes.

    Access the application:
        Open your web browser and navigate to https://localhost:5001

Once the project is built and both the backend and frontend development servers are running, you can access the application through your web browser.
Running with Docker

To run the Task Management App using Docker, follow these steps:

    Build and start the Docker containers:

    bash

    docker-compose up --build

    This command will build the Docker images and start the containers for the backend and frontend.

    Access the application:
        Open your web browser and navigate to https://localhost

The Task Management App will be running inside Docker containers and can be accessed through your web browser.
