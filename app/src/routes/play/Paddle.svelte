<script lang="ts" context="module">
  export const HEIGHT = 170;
  export const WIDTH = 16;
  export const MARGIN = 100;
  export const SPEED = 2.5;
</script>

<script lang="ts">
  import type { Writable } from "svelte/store";
  import { onMount } from "svelte";
  import {
    toViewport,
    toViewportX as toViewportHorizontal,
    toViewportY as toViewportVertical,
  } from "./ts/viewport";
  import type { IPosition, Position } from "./ts/position";
  import type { IRect } from "./ts/rect";

  export let store: Writable<Position>;

  let viewportRect: IRect<IPosition> = {
    pos: toViewport($store),
    width: toViewportHorizontal(WIDTH),
    height: toViewportVertical(HEIGHT),
  };

  function update() {
    viewportRect.pos = toViewport($store);
    viewportRect.width = toViewportHorizontal(WIDTH);
    viewportRect.height = toViewportVertical(HEIGHT);
  }

  onMount(() => {
    const unsubscribe = store.subscribe(update);

    return () => unsubscribe();
  });
</script>

<svelte:window on:resize={update} />

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
