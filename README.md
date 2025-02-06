# Ticketing Microservices Application

## Overview
A ticket booking platform built with microservices architecture using Node.js, React, and Kubernetes.

## Tech Stack
- Node.js & TypeScript
- React for Frontend
- MongoDB for Database
- NATS Streaming for Event Bus
- Docker & Kubernetes for Container Orchestration
- Jest for Testing

## Services
- Auth: User authentication
- Orders: Order management
- Tickets: Ticket creation/editing
- Payments: Payment processing
- Expiration: Order expiration handling
- Client: React frontend

## Infrastructure
- Kubernetes Deployments & Services
- MongoDB instances per service
- NATS Streaming Server
- Ingress-Nginx Controller

## Local Development Setup
1. Prerequisites:
```bash
# preferably chocolatey for windows
# Install required tools
choco install kubernetes-cli
choco install skaffold
choco install docker-desktop

# Create JWT secret
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_jwt_key

# Start Skaffold
skaffold dev

# Run tests for each service
cd auth && npm run test
cd orders && npm run test
cd tickets && npm run test
cd payments && npm run test

- API Routes

- Auth Service
POST /api/users/signup
POST /api/users/signin
GET /api/users/currentuser

- Orders Service
GET /api/orders
POST /api/orders
DELETE /api/orders/:orderId

- Tickets Service
GET /api/tickets
POST /api/tickets
PUT /api/tickets/:id

- Payments Service
POST /api/payments

- Event Flow
User creates ticket
Order is created
Payment is processed
Order is completed/expired

- Production Deployment

Push images to Docker Hub
Configure Kubernetes cluster
Apply deployments
Setup domain & SSL

- Common Issues & Solutions
NATS Connection: Check NATS_URL environment variable
MongoDB Connection: Verify service names
JWT Issues: Ensure secret is properly set