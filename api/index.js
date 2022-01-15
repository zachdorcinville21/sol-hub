import express from 'express';
import cors from 'cors';
import { getSolPrice } from './controllers/getSolPrice.js';
import { getSolDayChange } from './controllers/getSolDayChange.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import UserController from './controllers/types/UserController.js';
import ConvoFactory from './controllers/types/ConvoFactory.js';

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
const cf = new ConvoFactory();

app.get('/sol-price', getSolPrice);

app.get('/sol-day-change', getSolDayChange);

app.post('/create-user', uc.createUser);

app.post('/update-username', uc.updateUsername);

app.post('/update-email', uc.updateEmail);

app.post('/get-username', uc.getUsername);

app.post('/get-conversations', cf.getConversations);

app.post('/delete-conversation', cf.deleteConversation);

io.on('connection', socket => {
    socket.on('new-user-connected', ({ walletAddress, username }, callback) => {
        console.log('user joined');
        uc.addOnlineUser(socket.id, walletAddress, username);
    });

    socket.on('send-msg', async data => {
        const [senderWalletAddress, receiverWalletAddress, message] = data;
        await cf.sendMessage(senderWalletAddress, receiverWalletAddress, message);

        const receiver = uc.getOnlineUser(receiverWalletAddress);

        if (receiver !== null) {
            io.to(receiver.socket_id).emit('new-message', { 
                message: message, 
                senderWalletAddress: senderWalletAddress, 
                receiverWalletAddress: receiverWalletAddress, 
            });
        } else {
            await uc.sendEmail(senderWalletAddress, receiverWalletAddress, message);
        }
    });

    socket.on('walletDisconnect', () => {
        console.log('user left');
        uc.removeOnlineUser(socket.id);
    });

    socket.on('disconnect', () => {
        uc.removeOnlineUser(socket.id);
    });
});


server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

