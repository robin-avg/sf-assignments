import express, { Application, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';


const app: Application = express();

//app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "../logic")));

var jsonData: any;
app.get('/', (req: Request, res: Response) => {
    res.render('index');
})

app.get('/read', (req: Request, res: Response) => {
    fs.readFile('users.json', 'utf-8', (err, content) => {
        if (err) {
            console.log(err);
        } else {
            jsonData = JSON.parse(content);
            console.log(jsonData);
        }
    })
    res.render('read', { jsonData: jsonData });
})



app.listen(5000, () => console.log('server running'));