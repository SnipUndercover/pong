<script lang="ts" context="module">
  export enum HandlerType {
    PLAYER = "player",
    CPU = "cpu",
  }
</script>

<script lang="ts">
  import LeftPaddle from "./LeftPaddle.svelte";
  import RightPaddle from "./RightPaddle.svelte";
  import Ball from "./Ball.svelte";
  import Scoreboard from "./Scoreboard.svelte";
  import { fade } from 'svelte/transition'
  import { playing } from "./ts/stores";

  export let handler: HandlerType = HandlerType.PLAYER;
</script>

<div transition:fade>
  <LeftPaddle />
  <RightPaddle {handler}/>
  {#if $playing}
    <Ball />
  {/if}
  <Scoreboard />
</div>

<style lang="scss">
  div {
    width: 100vw;
    height: 100vh;
  }
</style>