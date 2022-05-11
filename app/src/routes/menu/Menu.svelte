<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { cubicOut } from 'svelte/easing'
  import { fade, fly } from 'svelte/transition'
  import Button from './lib/Button.svelte';

  const buttons = [
    {
      title: "VS CPU",
      to: "cpu",
      id: 1
    },
    {
      title: "Two players (offline)",
      to: "offline",
      id: 2
    },
    {
      title: "Two players (online)",
      to: "online",
      id: 3
    }
  ]
</script>

<main out:fade>
  <header in:fly="{{ y: -25, duration: 2000, easing: cubicOut }}">
    <h1>Welcome to Pong!</h1>
    <h3>Select a mode below:</h3>
  </header>
  <article>
    {#each buttons as button}
      <Link to={button.to} style="text-decoration: none">
        <Button title={button.title} id={button.id}/>
      </Link>
    {/each}
  </article>
</main>

<style lang="sass">
  main
    width: 100vw
    height: 100vh
    
    display: flex
    align-items: center
    flex-direction: column
    justify-content: space-around

    header
      text-align: center

      h1:focus
        outline: none

    article
      display: flex
      flex-direction: column
      justify-content: center
      gap: 2vh
</style>
