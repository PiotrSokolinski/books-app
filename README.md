# React + NestJS App

This project contains a full-stack application with a React frontend and a NestJS backend.

### Folder Structure

- **frontend/**: Contains the React app.
- **backend/**: Contains the NestJS backend API.

## Prerequisites

- Docker
- Docker Compose
- Node.js (for development purposes)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/books-app.git
```

### 2. Change directory
```bash
cd books-app
```

### 3. Install dependencies
Make sure you have Docker and Docker Compose are installed on your machine.

### 3. Start the application
To start both the React frontend and NestJS backend, you can use the following commands:
```bash
make build
make up
```
This command will:

Build the Docker containers for both the React frontend and NestJS backend.
Start the application using Docker Compose.

### 4. Access the application
Once the containers are running, you can access the application through your browser:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)
Additionally, the Swagger API documentation is available at:
- Documentation: [http://localhost:5000/docs](http://localhost:5000/docs)
Data is stored in a PostgreSQL database, which is also running in a Docker container.
- Database: [http://localhost:5432](http://localhost:5432)


### 5. Stop the application
To stop the application, you can use the following command:

```bash
make down
```
This will stop and remove the Docker containers.



## Important Notes

This is not a production-ready application. The current setup is intended for development purposes only with some more advanced concepts that can be used in production.

### Changes to make it production-ready:

## Frontend:
#### 1. Unit tests
- More unit tests need to be added to the components to ensure proper functionality and improve test coverage.

#### 2. Integration tests
- More integration tests need to be added to test the interaction between components.

#### 3. End-to-end Cypress tests
- More end-to-end tests need to be added to test the application as a whole.

#### 4. Storybook
- More components need to be added to Storybook to showcase the UI components.

#### 5. Infrastructure
- Terraform configuration needs to be updated to deploy the application to AWS in ECS cluster with Fargate.
- Ensure that the frontend is served using a CDN for better performance.
- Ensure that the application is highly available and scalable by using AWS services like Load Balancer, Auto Scaling, etc.

#### 6. CI/CD
- GitHub Actions need to be updated to run tests and deploy the application to AWS.

#### 7. Code documentation
- Add more comments and documentation to the codebase to make it easier to understand and maintain.

#### 8. Security
- Add authentication and authorization mechanisms to secure the application.

#### 9. Logging
- Create own logger that is designed for production use for the specific needs of the application. This can be done using a logger service (e.g., Winston, Pino) to manage log levels and output formats.

#### 10. Monitoring
- Add monitoring and alerting to the application to track performance and errors.

## Backend

#### 1. Unit tests
- More unit tests need to be added to the services and controllers to ensure proper functionality and improve test coverage.

#### 2. E2E tests
- More end-to-end tests need to be added to test the API endpoints.

#### 3. Smoke tests
- More smoke tests to ensure the application is running correctly.

#### 4. Infrastructure
- Terraform configuration needs to be updated to deploy the application to AWS in ECS cluster with Fargate.
- Ensure that the database is running in a secure, reliable environment (e.g., a managed database like AWS RDS).
- Ensure that application is highly available and scalable by using AWS services like Elastic Load Balancer, Auto Scaling, etc.

#### 5. CI/CD
- GitHub Actions need to be updated to run tests and deploy the application to AWS.

#### 6. Environment Variables:
- Use SecretManager or System Manager in AWS to store sensitive information like database credentials.

#### 7. Security:
- Ensure that proper authentication and authorization mechanisms are in place (e.g., JWT, OAuth).
- Protect the backend API with throttling, rate limiting, and other security measures.
- Add HTTPS for secure communication.

#### 8. Database Configuration:
- In production, configure the database to run in a secure, reliable environment (e.g., a managed database like AWS RDS).
- Avoid using the `synchronize: true` option in TypeORM, as it auto-generates schema changes which can be dangerous in production.
- Use migrations to handle schema updates (`synchronize: false` and manage migrations manually).

#### 9. Logging:
- Create own logger that is designed for production use for the specific needs of the application. This can be done using a logger service (e.g., Winston, Pino) to manage log levels and output formats.
- Disable unnecessary logging in production.

#### 10. Monitoring:
- Add monitoring and alerting to the application to track performance and errors.

#### 11. Performance Optimization:
- Enable caching mechanisms where appropriate (e.g., Redis/ValKey).
- Optimize database queries and indexes for better performance in full text search queries.

#### 12. Error Handling:
- Ensure consistent error handling, especially for API responses (using error middleware).

#### 13. Code Documentation:
- Add more comments and documentation to the codebase to make it easier to understand and maintain.

#### 14. Load Testing:
- Perform load testing to ensure the application can handle the expected traffic.


---

Majority of the changes mentioned above were started to indicate their importance in the production environment. However, the implementation of these changes is not complete. The purpose of this project is to provide a starting point for a full-stack application with React and NestJS and to demonstrate how to set up a development environment using Docker and Docker Compose.
Places of potential changes are marked with `TODO` comments in the codebase. Feel free to explore and see where skeletons for these changes have been added and configured.
