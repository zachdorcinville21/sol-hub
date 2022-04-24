import SolHub from './components/SolHub';
import SocketProvider from './components/context/socket';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Collectibles from './components/Collectibles';
import WalletProvider from './context/wallet';

const App = () => (
    <BrowserRouter>
        <SocketProvider>
            <WalletProvider>
                <Routes>
                    <Route path="/" element={<SolHub />} />
                    <Route path="/collectibles" element={<Collectibles />} />
                </Routes>
            </WalletProvider>
        </SocketProvider>
    </BrowserRouter>
);

export default App;
