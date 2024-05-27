import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

console.log(process.env.REACT_APP_PUBLIC_URL)

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter
            basename={process.env.NODE_ENV === 'development' ? '/' : process.env.REACT_APP_PUBLIC_URL}
        >
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
