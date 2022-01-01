import express from 'express';
import cors from 'cors';
import { getSolPrice } from './controllers/getSolPrice.js';
import { getSolDayChange } from './controllers/getSolDayChange.js';
import UserController from './controllers/types/UserController.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { sendMessage } from './controllers/sendMessage.js';
import { getConversations } from './controllers/getConversations.js';
import { setVal, getVal } from './controllers/RedisController.js';

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

const PORT = 5000;

const uc = new UserController();

app.get('/sol-price', getSolPrice);

app.get('/sol-day-change', getSolDayChange);

app.post('/create-user', uc.createUser);

app.post('/update-username', uc.updateUsername);

app.post('/get-username', uc.getUsername);

app.post('/get-conversations', getConversations);

app.post('/set-redis-val', setVal);

app.post('/get-redis-val', getVal);

io.on('connection', socket => {
    socket.on('new-user-connected', userInfo => {
        const [walletAddress, username] = userInfo;
        console.log('user joined');
        uc.addOnlineUser(socket.id, walletAddress, username);
        console.log(uc.onlineUsers);
    });

    socket.on('send-msg', data => {
        const [senderWalletAddress, receiverWalletAddress, message] = data;
        sendMessage(senderWalletAddress, receiverWalletAddress, message);

        const receiver = uc.getOnlineUser(receiverWalletAddress);

        if (receiver !== null) {
            console.log("🚀 ~ file: index.js ~ line 59 ~ receiverSocketId", receiver.socket_id);
            io.to(receiver.socket_id).emit('new-message', { 
                message: message, 
                senderWalletAddress: senderWalletAddress, 
                receiverWalletAddress: receiverWalletAddress, 
            });
        }
    });

    socket.on('disconnect', () => {
        console.log(uc.onlineUsers);
        console.log('user left')
        uc.removeOnlineUser(socket.id);
        console.log(uc.onlineUsers);
    });
});


server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

