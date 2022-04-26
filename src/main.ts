import './style.css';

const tmpApp = document.querySelector<HTMLDivElement>('#app');

if (tmpApp == undefined) 
    throw new Error('Missing <div id="app">');

export const app = tmpApp;
