import express, { Application, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Application = express();
const pool = require("./db");
app.use(cors());

app.use(express.json());


//READ
app.get('/list', async (req: Request, res: Response) => {
    try {
        const getUsers = await pool.query("SELECT u.uid,u.name,u.email,u.contact,c.cname,c.website,c.customer_address,r.role FROM user2 u INNER JOIN customer c ON u.uid=c.cid INNER JOIN roles r ON u.uid=r.rid");
        res.json(getUsers.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//READ BY ID
app.get('/list/:roll', async (req: Request, res: Response) => {
    try {
        const { roll } = req.params;
        const getUsers = await pool.query("SELECT u.uid,u.name,u.email,u.contact,c.cname,c.website,c.customer_address,r.role FROM user2 u INNER JOIN customer c ON u.uid=c.cid INNER JOIN roles r ON u.uid=r.rid WHERE uid=$1", [roll]);
        res.json(getUsers.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//CREATE
app.post('/add', async (req: Request, res: Response) => {
    try {
        const { uid, name, email, contact, cname, website, customer_address, role } = req.body;
        const newUser = await pool.query("INSERT INTO user2 (uid,name,email,contact) VALUES ($1,$2,$3,$4) RETURNING *", [uid, name, email, contact]);
        const newCustomer = await pool.query("INSERT INTO customer (cid,cname,website,customer_address) VALUES ($1,$2,$3,$4) RETURNING *", [uid, cname, website, customer_address]);
        const newRole = await pool.query("INSERT INTO roles(rid,role) VALUES($1,$2) RETURNING *", [uid, role]);
        res.json('Successfully Created');
    } catch (err) {
        console.log(err.message);
    }
})

//UPDATE

app.put('/update/:roll', async (req, res) => {
    try {
        const { roll } = req.params;
        const { name, email, contact, cname, website, customer_address, role } = req.body;
        const updateUser = await pool.query("UPDATE user2 SET name=$1,email=$2,contact=$3 WHERE uid=$4", [name, email, contact, roll]);
        const updateCustomer = await pool.query("UPDATE customer SET cname=$1,website=$2,customer_address=$3 WHERE cid=$4", [cname, website, customer_address, roll]);
        const updateRole = await pool.query("UPDATE roles SET role=$1 where rid=$2", [role, roll]);
        res.json("Successfully updated");
    } catch (err) {
        console.log(err.message);
    }
})


//DELETE
app.delete('/delete/:roll', async (req: Request, res: Response) => {
    try {
        const { roll } = req.params;
        const deleteUser = await pool.query("DELETE FROM user2 WHERE uid=$1", [roll]);
        const deleteCustomer = await pool.query("DELETE FROM customer where cid=$1", [roll]);
        const deleteRole = await pool.query("DELETE FROM roles where rid=$1", [roll]);
        res.json('Successfully deleted');
    } catch (err) {
        console.log(err.message);
    }
})

/*UTIL FUNCTION*/

/*
//get the user data from json file
const getUserData = () => {
    const jsonData: any = fs.readFileSync('users.json')
    return JSON.parse(jsonData)
}

//read the user data from json file
const saveUserData = (data: any) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}
*/

app.listen(5000, () => console.log('server running'));