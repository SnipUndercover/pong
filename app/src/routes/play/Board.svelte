<script lang="ts">
  import LeftPaddle from "./LeftPaddle.svelte";
  import RightPaddle from "./RightPaddle.svelte";
  import Ball from "./Ball.svelte";
  import { fade } from 'svelte/transition'
</script>

<div transition:fade>
  <LeftPaddle />
  <RightPaddle />
  <Ball />
</div>

<style lang="scss">
  div {
    width: 100vw;
    height: 100vh;
  }
</style>