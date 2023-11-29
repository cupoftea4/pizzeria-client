import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Config from './containers/PizzaConfig/Config';
import Simulator from './containers/PizzeriaSimulator/Simulator';
import './styles/_variables.css';
import { WebSocketProvider } from './context/websocket';

const App = () => {
  return (
    <>
      <WebSocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Config />} />
            <Route path="/run" element={<Simulator />} />
          </Routes>
        </Router>
      </WebSocketProvider>
    </>
  );
};

export default App;
