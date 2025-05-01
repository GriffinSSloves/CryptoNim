import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Providers } from './providers.tsx';
import { BrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </Providers>
  </StrictMode>
);
