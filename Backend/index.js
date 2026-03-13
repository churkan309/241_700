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
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

const port = 8000;

let conn = null;
const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    });
    console.log('Connected to MySQL database');
}

let users = [];
let counter = 1;

/*
app.get('/testdb', (req, res) => {
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    }).then((conn) => {
        conn
        .query('SELECT * FROM users')
        .then((results) => {
            res.json(results[0]);
        }).catch((err) => {
            console.error('Error executing query:', err);
            res.json({ error: err});
        });
    })
});
*/

//path = GET /users สำหรับด get ข้อมูล users ทั้งหมด
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users')
    res.json(results[0]);
});

const validateData = (userData) => {
    let errors = [];
    if (!userData.firstName) {
        errors.push('กรุณากรอกชื่อจริง');
    }
    if (!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }
    if (!userData.gender) {
        errors.push('กรุณากรอกเพศ');
    }
    if (!userData.interests) {
        errors.push('กรุณากรอกงานอดิเรก');
    }
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย');
    }
    return errors;
}

//path = POST /users สำหรับเพิ่ม user ใหม่
app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const errors = validateData(user);
        if (errors.length > 0) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
        const results = await conn.query('INSERT INTO users SET ?', user)
        console.log('results:',results);
        res.json({
            message: 'User created successfully',
            data: results[0]
        })
    } catch (error) {
        const errorMessage = error.message || 'Error adding user';
        const errors = error.errors || [];
        console.error('Error creating user:', error);
        res.status(500).json({
            message: errorMessage,
            error: errors
        });
    }
});

// path GET /users/:id สำหรับด get ข้อมูล user ที่มี id ตรงกับที่ส่งมา
app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query('SELECT * FROM users WHERE id = ?', id)
        if (results[0].length == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }
        res.json(results[0][0]);
    }
    catch (error) {
        console.error('Error fetching user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error fetching user',
            error: error.message
        });
    }
})



//PUT /users/:id สำหรับแก้ไขข้อมูล user ที่มี id ตรงกับที่ส่งมา
app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        let updatedUser = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id])
        if (results[0].affectedRows == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }
        res.json({
            message: 'User updated successfully',
            data: updatedUser
        });
    }
    catch (error) {
        console.error('Error updating user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error updating user',
            error: error.message
        });
    }
})

// DELETE /users/:id สำหรับลบ user ที่มี id ตรงกับที่ส่งมา
app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query('DELETE FROM users WHERE id = ?', id)
        if (results[0].affectedRows == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }
        res.json({
            message: 'User deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
})

/*
app.get('/testdb-new', async (req, res) => {
    try {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8700
        });
        const results = await conn.query('SELECT * FROM users');
        res.json(results[0]);
    } catch (err) {
        console.error('Error connecting to database:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
*/

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
/*
app.get('/users', (req, res) => {
    res.json(users);
});
*/


//path: POST /user
app.post('/user', (req, res) => {
    //res.json({message: 'Data received successfully'});
    let user = req.body;
    users.push(user);
    user.id = counter;
    counter += 1;

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
        data: {
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

app.listen(port, async () => {
    await initMySQL();
    console.log(`Server is running on http://localhost:${port}`);
});

