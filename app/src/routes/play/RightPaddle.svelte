<script context="module" lang="ts">
  export const UP_KEY = "ArrowUp";
  export const DOWN_KEY = "ArrowDown";
  export const CPU_EPSILON = HEIGHT / 4;

  export function resetPosition() {
    rightPaddlePosition.set(
      new Position({
        y: (Position.MAX_HEIGHT - HEIGHT) / 2,
        x: Position.MAX_WIDTH - MARGIN - WIDTH,
      })
    );
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { HandlerType } from "./Board.svelte";
  import Paddle, { HEIGHT, MARGIN, SPEED, WIDTH } from "./Paddle.svelte";
  import { SIZE as BALL_SIZE } from "./Ball.svelte";
  import { Position } from "./ts/position";
  import { ballPosition, playing, rightPaddlePosition } from "./ts/stores";

  export let handler: HandlerType;

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
    const helperIntervals: number[] = [];
    switch (handler) {
      case HandlerType.PLAYER: {
        window.addEventListener("keydown", keydown);
        window.addEventListener("keyup", keyup);
        break;
      }
      case HandlerType.CPU: {
        helperIntervals.push(
          window.setInterval(() => {
            //* ignore if ball is invisible
            if (!$playing) {
              [up, down] = [false, false];
              return;
            }

            //* ignore if the ball is moving away from us
            if ($ballPosition.angle > 90 && $ballPosition.angle < 270) {
              [up, down] = [false, false];
              return;
            }

            //* only move if the ball is 2/7ths of the width away from the right side
            //* check the position from the center instead of the left side
            if (($ballPosition.x + BALL_SIZE / 2) < (Position.MAX_WIDTH * 5 / 7)) {
              [up, down] = [false, false];
              return;
            }

            const ballPos = $ballPosition.y + BALL_SIZE / 2;
            const paddlePos = $rightPaddlePosition.y + HEIGHT / 2;
            const delta = ballPos - paddlePos;
            if (delta < -CPU_EPSILON) //we're below and epsilon threshold exceeded, move up
              [up, down] = [true, false];
            else if (delta > CPU_EPSILON)
              [up, down] = [false, true];
            else
              [up, down] = [false, false];
          }, 1)
        );
        break;
      }
      default: {
        throw new Error(`Unexpected handler type: ${handler}`);
      }
    }
    const intervalID = window.setInterval(() => {
      if (up && down) return;
      if (down) {
        $rightPaddlePosition.y += SPEED;

        //* refer to LeftPaddle.svelte:47 for an explanation of why the below is necessary
        $rightPaddlePosition.y += HEIGHT;
        $rightPaddlePosition.y -= HEIGHT;
      }
      if (up)
        $rightPaddlePosition.y -= SPEED;
    }, 1);

    return () => {
      clearInterval(intervalID);
      switch (handler) {
        case HandlerType.PLAYER: {
          window.removeEventListener("keydown", keydown);
          window.removeEventListener("keyup", keyup);
          break;
        }
        case HandlerType.CPU: {
          helperIntervals.forEach(window.clearInterval);
          break;
        }
        default: {
          throw new Error(`Unexpected handler type: ${handler}`);
        }
      }
    };
  });
</script>

<Paddle store={rightPaddlePosition} />
