/*
//ทำการ import โมดูล http
const http = require('http');
const host = 'localhost';
const port = 8000;

//กำหนดค่าเซิร์ฟเวอร์

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('Hello, World! This is my first server.');
}
//run server
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
*/

const express = require('express');
const bodyParser = require('body-parser');
const e = require('express');
const { use } = require('react');
const app = express();

app.use(bodyParser.json());

const port = 8000;

let users = [];
let counter = 1;

/**
 * GET /users - ดึงข้อมูลผู้ใช้ทั้งหมด
 * POST /user - เพิ่มผู้ใช้ใหม่
 * PUT /user/:id - แก้ไขข้อมูลผู้ใช้ตาม id (แก้ไขทั้งหมด
 * PATCH /user/:id - แก้ไขข้อมูลผู้ใช้ตาม id (แก้ไขบางส่วน)
 * DELETE /user/:id - ลบผู้ใช้ตาม id
 */

//path: /test
app.get('/test', (req, res) => {
    
    let user = {
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com'
        };
    
    //res.send('Hello, World! test');
    res.json(user);
    
});


//path: GET /users
app.get('/users', (req, res) => {
    res.json(users);
});

//path: POST /user
app.post('/user', (req, res) => {
    //res.json({message: 'Data received successfully'});
    let user = req.body;
    users.push(user);
    user.id = counter;
    counter+=1;

    res.json({
    message: 'User added successfully', 
    user: user
    });
    //res.send(req.body);
});


//path: PUT /user/:id
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;

    //หา user จาก id ที่ส่งมา
    let selectIndex = users.findIndex(user => user.id == id);
    //res.send(selectindex+'');
    
    //อัพเดตข้อมูล user ตาม id ที่ส่งมา
    users[selectIndex].firstname = updatedUser.firstname || users[selectIndex].firstname;
    users[selectIndex].lastname = updatedUser.lastname || users[selectIndex].lastname;

    res.json({
        message: 'User updated successfully',
        data:{
            user: updatedUser,
            indexUpdate: selectIndex
        }
    });

    //ส่ง users ที่อัพเดทแล้วกลับไป
    
});

app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let updatedUser = req.body;

    //หา user จาก id ที่ส่งมา
    let selectIndex = users.findIndex(user => user.id == id);
    //res.send(selectindex+'');
    
    //อัพเดตข้อมูล user ตาม id ที่ส่งมา
    if (updatedUser.firstname) {
        users[selectIndex].firstname = updatedUser.firstname;
    }
    if (updatedUser.lastname) {
        users[selectIndex].lastname = updatedUser.lastname;
    }

    res.json({
        message: 'User updated successfully',
        data: {
            user: users[selectIndex],
            indexUpdate: selectIndex
        }
    });

    //ส่ง users ที่อัพเดทแล้วกลับไป
    
});

app.delete('/user/:id', (req, res) => {
    let id = req.params.id;

    //หา id ที่ต้องการลบ
    let selectIndex = users.findIndex(user => user.id == id);
    
    
    //ลบ user ตาม id ที่ส่งมา
    users.splice(selectIndex, 1);

    res.json({
        message: 'User deleted successfully',
        indexDeleted: selectIndex
    }); 
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

 