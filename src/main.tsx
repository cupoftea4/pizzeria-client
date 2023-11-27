import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/styles/index.css';
import '@/styles/reset.css';

// FIXME: Temporary disabled StrictMode because ws unsubscribe seems not to work properly
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
