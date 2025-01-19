import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'mobx-react'
import stores from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider stores={stores}>
      <App />
    </Provider>
  </StrictMode>,
)
