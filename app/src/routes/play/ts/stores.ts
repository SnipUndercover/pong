import { writable } from "svelte/store";
import { SIZE } from "../Ball.svelte";
import { HEIGHT, PADDING, WIDTH } from "../Paddle.svelte";
import { AngledPosition, Position } from "./position";

export const ballPosition = writable<AngledPosition>(
  new AngledPosition({
    y: (Position.MAX_HEIGHT - SIZE) / 2,
    x: (Position.MAX_WIDTH - SIZE) / 2,
    angle: Math.random() * 360,
  })
);
export const leftPaddlePosition = writable<Position>(
  new Position({
    y: (Position.MAX_HEIGHT - HEIGHT) / 2,
    x: PADDING,
  })
);
export const rightPaddlePosition = writable<Position>(
  new Position({
    y: (Position.MAX_HEIGHT - HEIGHT) / 2,
    x: Position.MAX_WIDTH - PADDING - WIDTH,
  })
);