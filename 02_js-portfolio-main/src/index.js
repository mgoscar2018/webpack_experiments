import Template from './templates/Template.js';
import './styles/main.css' //para que webpack lo trabaje
import './styles/vars.styl';

console.log('hola');

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
