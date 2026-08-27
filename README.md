# Purplexity

Purplexity is an AI-powered search application that combines web search with large language models to help users find information and get useful answers in a conversational way.

I built this project to understand how an AI-powered product works end to end, from the frontend and backend to authentication, databases, APIs, web search, and LLM integration.



## Features

* AI-powered search and responses
* Web search using Tavily
* AI responses using Groq
* User authentication
* JWT-based authentication
* Password hashing with bcrypt
* PostgreSQL database
* Prisma ORM
* Input validation with Zod
* REST APIs with Express
* Responsive user interface

## How It Works

```text
User Query
    ↓
Frontend
    ↓
Backend API
    ↓
Tavily Web Search
    ↓
Search Results
    ↓
Groq LLM
    ↓
AI Response
    ↓
Frontend
```

The user starts by entering a question or search query. The backend sends the query to Tavily to retrieve relevant information from the web.

The retrieved information is then passed to the Groq-powered LLM, which processes the context and generates a response. The final response is returned to the frontend and displayed to the user.

## Tech Stack

### Frontend

* React
* Vite

### Backend

* Node.js
* Express
* TypeScript
* Axios
* Zod

### Database

* PostgreSQL
* Prisma

### Authentication

* JWT
* bcrypt

### AI & Search

* Groq
* Tavily

### Deployment

* Vercel

## Project Structure

```text
Purplexity/
├── frontend/
├── backend/
└── README.md
```



## What I Learned

This project gave me practical experience in connecting different parts of a modern web application.

Some of the things I worked with include:

* Building REST APIs with Express and TypeScript
* Working with PostgreSQL and Prisma
* Implementing JWT authentication
* Integrating third-party APIs
* Working with web search and LLM APIs
* Validating API requests using Zod
* Connecting frontend and backend services
* Deploying a full-stack application on Vercel

The biggest takeaway was understanding that building an AI application involves much more than simply calling an LLM API. The surrounding application architecture, data flow, authentication, API handling, and user experience are equally important.

## Future Improvements


* Better source citations
* Streaming AI responses
* Improved search quality
* Better error handling
* More advanced AI features
* Further performance optimization

## Author

**Ankit Raj**

[GitHub](https://github.com/anki7rJ) · [LinkedIn](www.linkedin.com/in/ankitraj-cse)
