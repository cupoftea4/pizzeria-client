import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PizzaModal from './containers/PizzaConfig/PizzaModal';
import Config from './containers/PizzaConfig/Config';
import './styles/_variables.css';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Config/>} />
        <Route path="/menu" element={<PizzaModal/>} />
        </Routes>
    </Router>
    </>
  );
};

export default App;
