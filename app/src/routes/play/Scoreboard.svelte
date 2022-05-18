<script lang="ts">
  import { leftScore, rightScore } from "./ts/stores";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";

  onMount(() => {
    leftScore.set(0);
    rightScore.set(0);
  })

  const params = { y: -25, duration: 1000 }
</script>

<div>
  {#key $leftScore}
    <p in:fly={params}>{$leftScore}</p>
  {/key}
  {#key $rightScore}
    <p in:fly={params}>{$rightScore}</p>
  {/key}
</div>

<style lang="scss">
  div {
    color: #7f7f7f;
    font-size: 4em;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25vw;
    padding: 0.5em;
    p {
      margin: 0;
    }
  }
</style>
