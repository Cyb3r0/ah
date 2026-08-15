import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HosnProvider } from './context/HosnContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HosnProvider>
      <App />
    </HosnProvider>
  </StrictMode>,
);
