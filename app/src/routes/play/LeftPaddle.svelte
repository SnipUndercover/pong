<script context="module" lang="ts">
  export const UP_KEY = "KeyW";
  export const DOWN_KEY = "KeyS";

  export function resetPosition() {
    leftPaddlePosition.set(
      new Position({
        y: (Position.MAX_HEIGHT - HEIGHT) / 2,
        x: PADDING,
      })
    );
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import Paddle, { HEIGHT, PADDING, SPEED } from "./Paddle.svelte";
  import { Position } from "./ts/position";
  import { leftPaddlePosition } from "./ts/stores";

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

  onMount(() => {
    resetPosition();
    const intervalID = window.setInterval(() => {
      if (up && down) return;
      if (down) {
        $leftPaddlePosition.y += SPEED;

        //* the position only keeps track of the top left corner of the paddle
        //* the bottom and right sides are kept unbounded
        //* if the y is less than HEIGHT units away from the bottom of the board,
        //* the paddle will get cut short; we don't want that

        //* move the paddle to the bottom of itself
        //* if the translation (or movement, if you prefer) ends up moving the paddle out of bounds,
        //* the position will snap to the bottom of the board instead
        $leftPaddlePosition.y += HEIGHT;

        //* move the paddle back up to where it was before
        //* if it was out of bounds, this moves it HEIGHT units away from the bottom of the board
        //* which subsequently makes sure the bottom of the paddle always will be in bounds
        $leftPaddlePosition.y -= HEIGHT;

        //* no need to keep track of the right side, since we're only moving up and down
      }
      if (up)
        //* top is already bounded, so we don't need to do anything special here
        //* if we end up out of bounds, we'll snap to the top of the board instead
        $leftPaddlePosition.y -= SPEED;
    }, 1);

    return () => {
      clearInterval(intervalID);
    }
  });
</script>

<svelte:window on:keydown={keydown} on:keyup={keyup} />

<Paddle store={leftPaddlePosition} />
