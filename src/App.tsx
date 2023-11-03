import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ReactDocs from './containers/ReactDocs';
import PizzaModal from './containers/PizzaConfig/PizzaModal';
import './styles/_variables.css';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ReactDocs link='https://react.dev' />} />
          <Route path="/menu" element={<PizzaModal/>} />
        </Routes>
    </Router>
    </>
  );
};

export default App;
