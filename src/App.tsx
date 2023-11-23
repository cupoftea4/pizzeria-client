import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Config from './containers/PizzaConfig/Config';
import './styles/_variables.css';
import Simulator from './containers/PizzeriaSimulator/Simulator';
import OrderModal from './containers/PizzeriaSimulator/OrderModal';
import { cooksMock, menuMock, orderMock } from './types/orders_mock';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Config />} />
          <Route path="/run" element={<Simulator />} />
          <Route path="/run/modal" element={
            <OrderModal
              cooks={cooksMock}
              order={orderMock}
              minimumPizzaTime={123}
              menu={menuMock}
            />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
