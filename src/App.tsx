import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PizzaModal from './containers/PizzaConfig/PizzaModal';
import './styles/_variables.css';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Hey</h1>} />
          <Route path="/menu" element={<PizzaModal/>} />
        </Routes>
    </Router>
    </>
  );
};

export default App;
