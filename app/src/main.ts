import App from "./App.svelte";
import "./assets/scss/style.scss";

const app = new App({
  target: document.getElementById("app") as HTMLDivElement // will always be present
});

export default app;
