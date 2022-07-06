import React from 'react';
import ReactDom from "react-dom/client"; //ANTES: import ReactDOM from 'react-dom';
import App from './components/App';

/* La siguiente línea de código despliega un warning debido que a partir de React 18 
el método “ReactDOM.render” no es soportado */
//ReactDOM.render(<App />, document.getElementById('app'));

const root = ReactDom.createRoot(document.getElementById("app"));
root.render(<App />);