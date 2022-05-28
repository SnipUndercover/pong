<script lang="ts">
  import { fade } from "svelte/transition";
</script>

<div transition:fade>
  <h1>
    Sorry,<br />
    this application<br />
    does not support<br />
    mobile devices<br />
    yet.
  </h1>
  <h3>but it may in the future...</h3>
</div>

<style lang="scss">
  div {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    h1:focus {
      outline: none;
    }
    h3 {
      opacity: 25%;
    }
  }
</style>
