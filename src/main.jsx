import { StrictMode } from 'react'
import {Toaster} from "react-hot-toast"

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position='top'></Toaster>
    <App />
  </StrictMode>,
)
