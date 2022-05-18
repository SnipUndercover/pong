<script lang="ts">
  import { fly } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  export let title: string;
  export let id: number;

  const animationProps = {
    y: 25,
    duration: 2000,
    delay: id * 125,
    easing: quintOut,
  };
</script>

<div in:fly={animationProps}>
  {title}
</div>

<style lang="scss">
  div {
    background-color: #ccc;
    color: black;

    font-size: 24px;

    border-radius: 5px;
    padding: 0.5em;
    text-align: center;
    text-decoration: none;
  }
</style>
