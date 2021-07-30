"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const app = express_1.default();
const pool = require("./db");
app.use(express_1.default.json());
//READ
app.get('/user/list', (req, res) => {
    const users = getUserData();
    //  console.log(users);
    res.send(users);
});
//CREATE
app.post('/user/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roll, name, email, contact, role } = req.body;
        const newUser = yield pool.query("INSERT INTO user1 (roll,name,email,contact,role) VALUES ($1,$2,$3,$4,$5) RETURNING *", [roll, name, email, contact, role]);
        res.json(newUser.rows);
    }
    catch (err) {
        console.log(err.message);
    }
}));
//UPDATE
app.patch('/user/update/:username', (req, res) => {
    //get the username from url
    const username = req.params.username;
    //get the update data
    const userData = req.body;
    //get the existing user data
    const existUsers = getUserData();
    //check if the username exist or not       
    const findExist = existUsers.find((user) => user.name === username);
    if (!findExist) {
        return res.status(409).send({ error: true, msg: 'username not exist' });
    }
    //filter the userdata
    const updateUser = existUsers.filter((user) => user.name !== username);
    //push the updated data
    updateUser.push(userData);
    //finally save it
    saveUserData(updateUser);
    res.send({ success: true, msg: 'User data updated successfully' });
});
//DELETE
app.delete('/user/delete/:username', (req, res) => {
    const username = req.params.username;
    //get the existing userdata
    const existUsers = getUserData();
    //filter the userdata to remove it
    const filterUser = existUsers.filter((user) => user.name !== username);
    if (existUsers.length === filterUser.length) {
        return res.status(409).send({ error: true, msg: 'username does not exist' });
    }
    //save the filtered data
    saveUserData(filterUser);
    res.send({ success: true, msg: 'User removed successfully' });
});
/*UTIL FUNCTION*/
//get the user data from json file
const getUserData = () => {
    const jsonData = fs_1.default.readFileSync('users.json');
    return JSON.parse(jsonData);
};
//read the user data from json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data);
    fs_1.default.writeFileSync('users.json', stringifyData);
};
app.listen(5000, () => console.log('server running'));
