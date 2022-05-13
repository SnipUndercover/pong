<script context="module" lang="ts">
  export const UP_KEY = "ArrowUp";
  export const DOWN_KEY = "ArrowDown";
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Paddle, { HEIGHT, PADDING, SPEED } from "./Paddle.svelte";
  import { Position } from "./ts/position";
  import { rightPaddlePosition, ballPosition } from "./ts/stores";

  let up = false;
  let down = false;

  rightPaddlePosition.set(
    new Position({
      y: (Position.MAX_HEIGHT - HEIGHT) / 2,
      x: Position.MAX_WIDTH - PADDING,
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
      if (up) $rightPaddlePosition.y -= SPEED;
      if (down) $rightPaddlePosition.y += SPEED;
    }, 1);
  });

  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

<svelte:window on:keydown={keydown} on:keyup={keyup} />

<Paddle store={rightPaddlePosition}/>
