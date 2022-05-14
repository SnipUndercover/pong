<script lang="ts" context="module">
  export const HEIGHT = 170;
  export const WIDTH = 16;
  export const PADDING = 100;
  export const SPEED = 2.5;
</script>

<script lang="ts">
  import type { IPosition, Position } from "./ts/position";
  import { toViewport, toViewportX, toViewportY } from "./ts/viewport";
  import type { Writable } from "svelte/store";
  import { onMount } from "svelte";

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
  
  onMount(updateSize);
  store.subscribe(updatePosition);
</script>

<svelte:window
  on:resize={updateSize}
  on:resize={() => updatePosition($store)}
/>

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
