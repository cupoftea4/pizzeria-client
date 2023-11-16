import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Config from './containers/PizzaConfig/Config';
import './styles/_variables.css';
import Simulator from './containers/PizzeriaSimulator/Simulator';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Config />} />
          <Route path="/run" element={<Simulator />} />
        </Routes>
    </Router>
    </>
  );
};

export default App;
