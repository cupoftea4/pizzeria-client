import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ReactDocs from './containers/ReactDocs';
import PizzaModal from './containers/PizzaModal';
import './styles/_global.css';
import './styles/_variables.css';

const App = () => {
  return (
    <>
      <Router>
        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<ReactDocs link='https://react.dev' />} />
          {/* for testing purposes */}
          <Route path="/about" element={<PizzaModal/>} />
        </Routes>
    </Router>
    </>
  );
};

export default App;
