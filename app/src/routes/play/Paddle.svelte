<script lang="ts" context="module">
  export const HEIGHT = 170;
  export const WIDTH = 16;
  export const PADDING = 100;
  export const SPEED = 2.5;
</script>

<script lang="ts">
  import type { IPosition, Position } from "./ts/position";
  import {
    toViewport,
    toViewportX as toViewportHorizontal,
    toViewportY as toViewportVertical,
  } from "./ts/viewport";
  import type { Writable } from "svelte/store";
  import { onMount } from "svelte";
  import type { IRect } from "./ts/rect";

  export let store: Writable<Position>;
  let viewportRect: IRect<IPosition>;

  function updateSize() {
    viewportRect.width = toViewportHorizontal(WIDTH);
    viewportRect.height = toViewportVertical(HEIGHT);
  }

  function updatePosition(pos: Position) {
    viewportRect.pos = toViewport(pos);
  }

  onMount(updateSize);
  store.subscribe(updatePosition);
</script>

<svelte:window
  on:resize={updateSize}
  on:resize={() => updatePosition($store)}
/>

<div
  style:top={`${viewportRect.pos.y}px`}
  style:left={`${viewportRect.pos.x}px`}
  style:width={`${viewportRect.width}px`}
  style:height={`${viewportRect.height}px`}
/>

<style lang="scss">
  div {
    background-color: white;
    position: absolute;
  }
</style>
