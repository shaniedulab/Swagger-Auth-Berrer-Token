const express = require('express');

const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const { generateToken, verifyToken } = require('./auth');

// Load the Swagger YAML file
const swaggerDocument = yaml.load('swagger.yaml');

//
const app = express();

app.use(express.json());

// var options = {
//     swaggerOptions: {
//         authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
//     }
// };

// Add the Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add the authentication middleware to the /secret endpoint
app.get('/secret', verifyToken, (req, res) => {
  res.send(`Hello, user ${req.user.userId}!`);
});

// Add the /public endpoint
app.get('/public', (req, res) => {
  res.send('This data is public');
});

// Add a login endpoint that generates a JWT token for a given user ID
app.post('/login', (req, res) => {
    console.log("login:=>",req.body.userId);
  const userId = req.body.userId;
  const token = generateToken(userId);
  res.send(token);
});


// ... other Express route handlers ...
app.listen(4000,console.log("server started"))