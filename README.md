# Pong
A simple game of *Pong* in Svelte + Typescript.  
Built using Vite.  
Move the left paddle with `W`/`S`.  
Move the right paddle with `↑`/`↓`.  
Press `Space` to start the ball.

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
Then, pass in `--base "..."` when running tasks.

Example: Host the app on `http://127.0.0.1/app/pong/`:

```svelte
<!-- App.svelte -->

<Router primary={false} basepath="/app/pong">
  ...
</Router>
```

```bash
# Terminal

cd app
npm run dev -- --base "/app/pong/"

# OR...
npm run build -- --base "/app/pong/"
npm run preview -- --base "/app/pong/"
```