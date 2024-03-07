//file imports
import Session from './webutils/smanager/session.js';
import User_Manager from './webutils/db/userdb.js';
//modules
import dotenv from 'dotenv';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';
dotenv.config(); //dotenv config

const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = new Server(server);


const _Session_Manager_ = new Session();
const _User_Manager_ = new User_Manager();

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS.split(','),
}));

app.use(express.json());

const _Test_Email = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
const check_if_user_exist = async (username) => {
    return await _User_Manager_.User_Exists(username);
}

app.post('/create', async (req, res) => {
    const body = req.body;

    const username = body.username;
    const password = body.password;
    const age = body.age;
    const email = body.email;


    if ((username && password && age && email) !== (null || NaN || '')) {
        if (_Test_Email(email)) {
            if (age <= 0) {
                res.status(500).json({
                    message: 'Age is invalid.'
                });
            } else {
                //Checking is user already exists.
                if (await check_if_user_exist(username)) {
                    res.status(409).json({
                        message: 'User already exists.'
                    });
                } else {
                    //Good to Go.
                    const Create_User = await _User_Manager_.addUser({
                        username: username, password: password, personal: {
                            age: age,
                            email: email,
                        }
                    }); //Finally Creating User.
                    console.log('Added User.');
                    if (Create_User.status === true) {
                        console.log('Creation status true.');
                        //User successfully created now return a session key.
                        const Add_Session = await _Session_Manager_.addSession(username, password);
                        if (Add_Session.success === true) {
                            const Session_Key_Obtained = Add_Session.ssid;
                            res.status(200).json({
                                status: 200,
                                proceed: true,
                                ssid: Session_Key_Obtained
                            });
                            console.log('Session added.');
                        } else {
                            res.status(500).json({
                                status: 500,
                                message: 'Internal Server Error.'
                            })
                            console.log('Session not added.');
                        }
                    } else {
                        console.log('Error validating User .status problem.');
                        res.status(500).json({
                            message: 'Internal Server Error.'
                        });
                    }
                }

            }
        } else {
            res.status(500).json({
                message: 'Email is invalid.'
            });
        }
    } else {
        res.status(500).json({
            message: 'Cannot accept empty values.'
        });
    }
});
app.post('/', (req, res) => {

})
app.get('/health', async (req, res) => {
    console.log("Health Checkup.")
    res.status(200).json({
        health: 'GOOD'
    });
});
server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});