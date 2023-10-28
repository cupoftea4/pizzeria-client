import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ReactDocs from './containers/ReactDocs';

const App = () => {
  return (
    <>
      <Router>
      <div>
        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<ReactDocs link='https://react.dev' />} />
          <Route path="/about" element={<h1>Hey!</h1>} />
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;
