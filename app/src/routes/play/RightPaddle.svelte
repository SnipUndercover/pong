<script context="module" lang="ts">
  export const UP_KEY = "ArrowUp";
  export const DOWN_KEY = "ArrowDown";

  export function resetPosition() {
    rightPaddlePosition.set(
      new Position({
        y: (Position.MAX_HEIGHT - HEIGHT) / 2,
        x: Position.MAX_WIDTH - PADDING - WIDTH,
      })
    );
  }
</script>

<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Paddle, { HEIGHT, PADDING, SPEED, WIDTH } from "./Paddle.svelte";
  import { Position } from "./ts/position";
  import { rightPaddlePosition, ballPosition } from "./ts/stores";

  let up = false;
  let down = false;

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

  let intervalID: number;

  onMount(resetPosition);
  onMount(() => {
    intervalID = window.setInterval(() => {
      if (up && down) return;
      if (down) {
        $rightPaddlePosition.y += SPEED;

        //* refer to LeftPaddle.svelte:49 for an explanation of why the below is necessary
        $rightPaddlePosition.y += HEIGHT;
        $rightPaddlePosition.y -= HEIGHT;
      }
      if (up)
        $rightPaddlePosition.y -= SPEED;
    }, 1);
  });

  onDestroy(() => {
    clearInterval(intervalID);
  });
</script>

<svelte:window on:keydown={keydown} on:keyup={keyup} />

<Paddle store={rightPaddlePosition} />
