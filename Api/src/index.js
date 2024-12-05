const express = require('express');
const routes = require('./routes');
const cors = require('./app/middlewares/corsMiddleware');
const path = require('path');
const createUser = require('./utils/createUser');

const port = process.env.PORT;

const app = express();

app.use(cors);

app.use(express.json());
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(routes);
createUser();

app.listen(port, () => console.log(`🔥 Server is runnin in http://localhost:${port} 🔥`));