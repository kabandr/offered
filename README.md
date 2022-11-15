# Offered
Offer Management Tool

## Running a Mongo DB instance using Docker

- We need Docker installed on our machine.
- A docker-compose file is provided in the root project folder with a GUI tool (Adminer) for the DB.

Of course we could also use a local or cloud instance (Mongo Atlas free version is a good start) instead of Docker.

## Running the Server

From project root folder:

```
cd server 
cp .env.example .env
npm install
npm run dev (development mode)
npm start (production mode)
```

Our server runs on port 5000

## Running the Client

From project root folder:

```
cd client
npm install
npm start
```
Our client app runs on port 3000