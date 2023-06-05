# Task Management App

This repository contains a Task Management App built using .NET 7 and Vite React TypeScript. The application allows users to manage and track their tasks efficiently.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Building the Project](#building-the-project)
  - [Usage](#usage)
  - [Running with Docker](#running-with-docker)

## Getting Started

To run the Task Management App on your local machine, follow the steps below:

### Prerequisites

Before you begin, ensure that the following dependencies are installed:

- .NET 7 SDK
- Node.js
- npm (Node Package Manager)
- Docker
- Docker Compose

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/MatijaKocevar/task-management.git
```

2. Navigate to the project directory:

```bash
   cd task-management
```

### Building the Project

To build the entire project, including the frontend dependencies, follow these steps:

1. Build the project:

```csharp
   dotnet build
```

This command will build both the backend and frontend components of the application.

### Usage

To start the application using the development servers, follow these steps:

1. Run the backend development server:

- Navigate to the `task-management` directory:

```csharp
   dotnet watch
```

The development server will automatically reload if there are any code changes.

2. Run the frontend development server:

- Navigate to the `client-app` directory:

```
   cd client-app
```

- Run the frontend development server:

```
   npm start
```

The frontend server will automatically reload if there are any code changes.

3. Access the application:

- Open your web browser and navigate to [https://localhost:5001](https://localhost:5001)

Once the project is built and both the backend and frontend development servers are running, you can access the application through your web browser.

### Running with Docker

To run the Task Management App using Docker, follow these steps:

1. Build and start the Docker containers:

```
   docker-compose build
   docker-compose up
```

This command will build the Docker images and start the containers for the backend and frontend and database.

2. Access the application:

- Open your web browser and navigate to [https://localhost](https://localhost)

The Task Management App will be running inside Docker containers and can be accessed through your web browser.
