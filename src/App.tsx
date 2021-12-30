import SolHub from './components/SolHub';
import SocketProvider from './components/context/socket';
import './App.css';

const App = () => (
    <SocketProvider>
        <SolHub />
    </SocketProvider>
);

export default App;
