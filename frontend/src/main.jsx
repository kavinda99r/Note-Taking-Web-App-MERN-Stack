import './theme.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Modal from 'react-modal'
import './index.css'

Modal.setAppElement('#root')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
