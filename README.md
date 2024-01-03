# Web Terminal

This project is a simple implementation of a web-based terminal. 

## Tech Stack

The application is built with the following technologies:

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js is used to create the server for this application.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js. Express is used to create the HTTP server and handle HTTP requests.
- **Socket.IO**: A JavaScript library for real-time web applications. It enables real-time, bidirectional communication between web clients and servers. It's used in this application to send command output from the server to the client in real time.
- **SQLite**: A C library that provides a lightweight disk-based database. It allows accessing the database using a nonstandard variant of the SQL query language. In this application, it's used to store commands.
- **bcryptjs**: A library to help you hash passwords. It's used in this application for password hashing.
- **jsonwebtoken**: An implementation of JSON Web Tokens. It's used in this application for user authentication.
- **body-parser**: Node.js body parsing middleware. It's used to parse incoming request bodies in a middleware before your handlers.

## Running the Project

To run this project, you need to have Docker installed. Once you have Docker, you can build and run the Docker image:

```bash
docker build -t web-terminal .
docker run -p 3000:3000 web-terminal
```

Then, open your web browser and navigate to http://localhost:3000.

## Usage
Type commands into the input field and press the "Submit" button to execute them. The output will be displayed in the output area above the input field. You can also retrieve all previous commands by clicking the "Get All Previous Commands" button.

## Warning
This project is for demonstration purposes only and could have potential security risks. It allows execution of arbitrary commands, which can be exploited if the application is exposed to untrusted users. Please use this responsibly and do not use it in a production environment without proper security measures in place.