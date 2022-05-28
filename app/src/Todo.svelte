<script lang="ts">
  import { fade } from "svelte/transition";
  export let text: string;
</script>

<div transition:fade>
  <h1>{text ? `TODO: ${text}` : "TODO"}</h1>
</div>

<style lang="scss">
  div {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    h1:focus {
      outline: none;
    }
  }
</style>
