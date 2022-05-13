<script context="module" lang="ts">
  export const UP_KEY = "KeyW";
  export const DOWN_KEY = "KeyS";
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import Paddle, { HEIGHT, PADDING, SPEED } from "./Paddle.svelte";
  import { Position } from "./ts/position";
  import { leftPaddlePosition, ballPosition } from "./ts/stores";

  let up = false;
  let down = false;

  leftPaddlePosition.set(
    new Position({
      y: (Position.MAX_HEIGHT - HEIGHT) / 2,
      x: PADDING,
    })
  );

  function keydown(e: KeyboardEvent) {
    if (!up && e.code === UP_KEY) {
      up = true;
    } else if (!down && e.code === DOWN_KEY) {
      down = true;
    }
  }

  function keyup(e: KeyboardEvent) {
    if (up && e.code === UP_KEY) {
      up = false;
    } else if (down && e.code === DOWN_KEY) {
      down = false;
    }
  }

  let intervalId: number;

  onMount(() => {
    intervalId = window.setInterval(() => {
      if (up && down) return;
      if (down) {
        $leftPaddlePosition.y += SPEED;
        // positions are counted from the top left corner
        // because of that only the top left corner is bounded to [0, MAX_HEIGHT]
        // the bottom is not bounded
        // the below will ensure the bottom bound will be inside the board
        $leftPaddlePosition.y += HEIGHT;
        $leftPaddlePosition.y -= HEIGHT;
      }
      if (up)
        // top is already bounded; we don't need to do that here
        $leftPaddlePosition.y -= SPEED;
    }, 1);
  });

  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

<svelte:window on:keydown={keydown} on:keyup={keyup} />

<Paddle store={leftPaddlePosition} />
