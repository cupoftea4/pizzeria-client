import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Config from './containers/PizzaConfig/Config';
import Simulator from './containers/PizzeriaSimulator/Simulator';
import './styles/_variables.css';
import { WebSocketProvider } from './context/websocket';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer
        position="top-center" theme="colored" pauseOnFocusLoss={false} autoClose={5000}
      />
    </>
  );
};

export default App;
