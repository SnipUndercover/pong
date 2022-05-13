<script lang="ts" context="module">
  export type PaddlePosition = "left" | "right";
  export const HEIGHT = 135;
  export const WIDTH = 25;
  export const PADDING = 100;
  export const SPEED = 5;
</script>

<script lang="ts">
  import type { IPosition, Position } from "./ts/position";
  import { toViewport, toViewportX, toViewportY } from "./ts/viewport";
  import { onMount } from "svelte";
  import type { Writable } from "svelte/store";

  export let store: Writable<Position>;
  let viewportPos: IPosition;
  let viewportWidth: number;
  let viewportHeight: number;

  function updateSize() {
    viewportWidth = toViewportX(WIDTH);
    viewportHeight = toViewportY(HEIGHT);
  }

  function updatePosition(pos: Position) {
    viewportPos = toViewport(pos);
  }

  store.subscribe(updatePosition);
  updateSize();
</script>

<svelte:window on:resize={updateSize} />

<div
  style:top={`${viewportPos.y}px`}
  style:left={`${viewportPos.x}px`}
  style:width={`${viewportWidth}px`}
  style:height={`${viewportHeight}px`}
/>

<style lang="scss">
  div {
    background-color: white;
    position: absolute;
  }
</style>
