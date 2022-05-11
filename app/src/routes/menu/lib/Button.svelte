<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicOut } from "svelte/easing";

  export let title: string;
  export let id: number;
  
</script>

<div in:fly="{{ 
  y: 25,
  duration: 2000,
  delay: id * 125,
  easing: cubicOut
}}">
  {title}
</div>

<style lang="sass">
  div
    background-color: #ccc
    color: black
    
    font-size: 24px
    
    border-radius: 5px
    padding: 0.5em
    text-align: center
    text-decoration: none
</style>