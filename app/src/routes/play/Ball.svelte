<script lang="ts" context="module">
  export const SIZE = 16;
  export const MIN_SPEED = 2;
  export const MAX_SPEED = 6;

  export function resetPosition() {
    ballPosition.set(
      new AngledPosition({
        y: (Position.MAX_HEIGHT - SIZE) / 2,
        x: (Position.MAX_WIDTH - SIZE) / 2,
        angle: Math.random() * 360,
      })
    );
  }

  export function restartBall(interval: number) {
    clearInterval(interval);
    playing.set(false);
    setTimeout(() => {
      playing.set(true);
    }, 1000);
  }
</script>

<script lang="ts">
  import { AngledPosition, IPosition, Position } from "./ts/position";
  import {
    toViewport,
    toViewportX as toViewportHorizontal,
    toViewportY as toViewportVertical,
  } from "./ts/viewport";
  import {
    ballPosition,
    leftPaddlePosition,
    rightPaddlePosition,
    rightScore,
    leftScore,
    playing,
  } from "./ts/stores";
  import { IRect, isIntersecting } from "./ts/rect";
  import { HEIGHT, WIDTH } from "./Paddle.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let viewportRect: IRect<IPosition> = {
    pos: toViewport($ballPosition),
    width: toViewportHorizontal(SIZE),
    height: toViewportVertical(SIZE),
  };

  let speed = MIN_SPEED;

  function update() {
    viewportRect.pos = toViewport($ballPosition);
    viewportRect.width = toViewportHorizontal(SIZE);
    viewportRect.height = toViewportVertical(SIZE);
  }

  onMount(() => {
    resetPosition();
    update();
    const unsubscribe = ballPosition.subscribe(update);
    let intervalID: number;
    const callback = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;

      window.removeEventListener("keydown", callback);
      const start = Date.now();
      intervalID = window.setInterval(() => {
        const ballRect: IRect<IPosition> = {
          pos: $ballPosition,
          width: SIZE,
          height: SIZE,
        };

        // bounce off paddles

        if (
          isIntersecting(ballRect, {
            pos: $leftPaddlePosition,
            width: WIDTH,
            height: HEIGHT,
          })
        ) {
          // left paddle
          const newAngle = AngledPosition.getAngleBetween(
            //* get angle between the center of the ball and the center of the paddle
            //* NOT the top left corner
            {
              x: $ballPosition.x + SIZE / 2,
              y: $ballPosition.y + SIZE / 2,
            },
            {
              x: $leftPaddlePosition.x + WIDTH / 2,
              y: $leftPaddlePosition.y + HEIGHT / 2,
            }
          );
          $ballPosition.angle = newAngle;
        }

        if (
          isIntersecting(ballRect, {
            pos: $rightPaddlePosition,
            width: WIDTH,
            height: HEIGHT,
          })
        ) {
          // right paddle
          const newAngle = AngledPosition.getAngleBetween(
            //* (refer to line 87)
            {
              x: $ballPosition.x + SIZE / 2,
              y: $ballPosition.y + SIZE / 2,
            },
            {
              x: $rightPaddlePosition.x + WIDTH / 2,
              y: $rightPaddlePosition.y + HEIGHT / 2,
            }
          );
          $ballPosition.angle = newAngle;
        }

        // bounce from bottom and top

        // mind the size
        if (
          $ballPosition.y <= 0 ||
          $ballPosition.y + SIZE >= Position.MAX_HEIGHT
        )
          $ballPosition.angle = -$ballPosition.angle;

        // have we scored?

        if ($ballPosition.x <= 0) {
          $rightScore += 1;
          console.log("ending speed:", speed);
          restartBall(intervalID);
        }
        
        // again, mind the size
        if ($ballPosition.x + SIZE >= Position.MAX_WIDTH) {
          $leftScore += 1;
          console.log("ending speed:", speed);
          restartBall(intervalID);
        }

        // Math.sin() && Math.cos() work in radians; we need to convert

        const dx =
          Math.cos(AngledPosition.toRadians($ballPosition.angle)) * speed;
        $ballPosition.x += dx;

        const dy =
          Math.sin(AngledPosition.toRadians($ballPosition.angle)) * speed;
        $ballPosition.y += dy;

        //* (refer to LeftPaddle.svelte:47)
        //* this time we need to keep track of both the bottom and right sides
        //* so that no parts of the ball will get cut off

        // ensure the bottom will not escape
        $ballPosition.y += SIZE;
        $ballPosition.y -= SIZE;

        // ensure the right side will not escape
        $ballPosition.x += SIZE;
        $ballPosition.x -= SIZE;

        // speed the ball up
        // stay at MIN_SPEED for 10 seconds, then linearly increase until MAX_SPEED

        speed = Math.min( // limit max speed to MAX_SPEED
          Math.max( // limit min speed to MIN_SPEED
            MIN_SPEED,
            (Date.now() - start - 30000) / 10000
          ),
          MAX_SPEED 
        );
      }, 1);
    };
    window.addEventListener("keydown", callback);

    return () => {
      unsubscribe();
      window.removeEventListener("keydown", callback);
      clearInterval(intervalID);
    };
  });
</script>

<svelte:window on:resize={update} />

<div
  style:top={`${viewportRect.pos.y}px`}
  style:left={`${viewportRect.pos.x}px`}
  style:width={`${viewportRect.width}px`}
  style:height={`${viewportRect.height}px`}
  in:fly={{ y: -25, duration: 1000 }}
/>

<style lang="scss">
  div {
    background-color: white;
    position: absolute;
  }
</style>
