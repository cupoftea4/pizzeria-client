import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Config from './containers/PizzaConfig/Config';
import './styles/_variables.css';
import './styles/_global.css';

const App = () => {
  return (
    <>
      <Router>
        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<Config/>} />
          <Route path="/about" element={<h1>Hey!</h1>} />
        </Routes>
    </Router>
    </>
  );
};

export default App;
