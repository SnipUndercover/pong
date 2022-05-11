<script lang="ts">
  import { Link } from 'svelte-navigator';
  import { quintOut } from 'svelte/easing'
  import { fade, fly } from 'svelte/transition'
  import Button from './Button.svelte';

  type Button = {
    title: string;
    to: string;
  }

  const buttons: Button[] = [
    {
      title: "VS CPU",
      to: "cpu"
    },
    {
      title: "Two players (offline)",
      to: "offline"
    },
    {
      title: "Two players (online)",
      to: "online"
    }
  ]
</script>

<main transition:fade>
  <header in:fly="{{ y: -25, duration: 2000, easing: quintOut }}">
    <h1>Welcome to Pong!</h1>
    <h3>Select a mode below:</h3>
  </header>
  <article>
    {#each buttons as button, id}
      <Link to={button.to} style="text-decoration: none">
        <Button title={button.title} {id}/>
      </Link>
    {/each}
  </article>
</main>

<style lang="sass">
  main
    position: absolute
    top: 0
    left: 0
    z-index: 1

    width: 100vw
    height: 100vh
    
    background-color: black

    display: flex
    align-items: center
    flex-direction: column
    justify-content: space-around

    header
      text-align: center
      *:focus
        outline: none

    article
      display: flex
      flex-direction: column
      justify-content: center
      gap: 2vh
</style>
