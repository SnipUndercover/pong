# Pong
A simple game of [*Pong*](https://en.wikipedia.org/wiki/Pong) in [Svelte](https://svelte.dev/) + [TypeScript](https://www.typescriptlang.org).  
Built using [Vite](https://vitejs.dev/).  
Move the left paddle with <kbd>W</kbd> / <kbd>S</kbd>.  
Move the right paddle with <kbd>↑</kbd> / <kbd>↓</kbd>.  
Press <kbd>Space</kbd> to start the ball.

## Setup
```bash
cd app
npm install
```

## Run
```bash
cd app
npm run dev
```

## Build
```bash
cd app
npm run build
npm run preview # Host the app locally
```

## Host on a subdirectory
Edit `src/App.svelte` and change the `Router`'s [`basepath` property](https://github.com/mefechoel/svelte-navigator#properties) to the subdirectory of your needs.  
Then, pass the [`--base` parameter](https://vitejs.dev/config/#base) when running tasks. *(or edit `package.json` to include them for you)*

Example: Host the app on `http://127.0.0.1/app/pong/`:


### `App.svelte`:
```svelte
<Router primary={false} basepath="/app/pong">
  ...
</Router>
```

### `Terminal`:
```bash
cd app
npm run dev -- --base "/app/pong/"

# OR...
npm run build -- --base "/app/pong/"
npm run preview -- --base "/app/pong/"
``` 
