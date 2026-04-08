import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

/* Tailwind first, then design tokens, then global, then components */
import './styles/tailwind.css'
import './styles/variables.css'
import './styles/global.css'
import './styles/components.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
