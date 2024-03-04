Initialize Node.js Project: 
npm init -y

Install Essential Packages: 
npm install cross-env dotenv

Install Dependencies for Backend: 
npm install express dotenv cors mongoose jsonwebtoken bcrypt colors validator

Install Development Dependencies: 
npm install nodemon jest cross-env -D

Create a .env file and add your environment variables:
PORT=4000 
MONGO_URI=mongodb+srv://your-mongo-uri
SECRET=xxx

Run Development Server: npm run dev

Test Scripts - if needed:

npm start - run the server
npm test - run tests
npm run dev - start the server in a production environment

TEST SCRIPTS IF NEEDED:
    "start": "cross-env NODE_ENV=production node index.js", 
    "dev": "cross-env NODE_ENV=development nodemon index.js", 
    "test": "cross-env NODE_ENV=test jest --verbose --runInBand" 

config.js
require("dotenv").config();
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT;

const MONGO_URI =
process.env.NODE_ENV === "test"
? process.env.TEST_MONGO_URI
: process.env.MONGO_URI;
    
module.exports = {
  NODE_ENV,
  MONGO_URI,
  PORT,
};

index.js
const config = require("./config");

console.log("Database: ", config.MONGO_URI);
console.log("NODE_ENV: ", config.NODE_ENV);
console.log("PORT: ", config.PORT);