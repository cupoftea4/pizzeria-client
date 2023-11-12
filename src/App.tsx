import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Config from './containers/PizzaConfig/Config';
import './styles/_variables.css';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Config/>} />
        </Routes>
    </Router>
    </>
  );
};

export default App;
