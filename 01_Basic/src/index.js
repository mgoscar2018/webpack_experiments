/*
1) Inicializar directorio con git
    >git init
2) Inicializar proyecto
    >npm init -y
3) Instalar webpack
    >npm i webpack webpack-cli -D
4) Ejecutar webpack
    >npx webpack

NOTA: Se puede ejecutar en modo desarrollo 
    >npx webpack --mode development
... o en modo producción:
    >npx webpack --mode production
*/

import sum from './utils/sum.js';

const saludo = 'HOLA OSCAR';

console.log(saludo);
console.log(sum(2,3));