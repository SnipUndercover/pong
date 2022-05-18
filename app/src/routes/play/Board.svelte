<script lang="ts">
  import LeftPaddle from "./LeftPaddle.svelte";
  import RightPaddle from "./RightPaddle.svelte";
  import Ball from "./Ball.svelte";
  import Scoreboard from "./Scoreboard.svelte";
  import { fade } from 'svelte/transition'
  import { playing } from "./ts/stores";
</script>

<div transition:fade>
  <LeftPaddle />
  <RightPaddle />
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