import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const db = require("../models");

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const routes = require('../routes/All-routes');
app.use('/data', routes);


db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running at port ${port}`);
    })
})

