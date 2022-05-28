<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Menu from "./routes/menu/Menu.svelte";
  import Todo from "./Todo.svelte";
  import MobileWarning from "./routes/menu/MobileWarning.svelte";
  import routes from "./routes";
  import Board, { HandlerType } from "./routes/play/Board.svelte";
  import mobile from 'is-mobile';
</script>

<Router primary={false} basepath="/">
  <Route>
    <Menu />
  </Route>
  <Route path={routes[0].to}>
    {#if mobile()} 
      <MobileWarning />
    {:else}
      <Board handler={HandlerType.CPU} />
    {/if}
  </Route>
  <Route path={routes[1].to}>
    {#if mobile()} 
      <MobileWarning />
    {:else}
      <Board />
    {/if}
  </Route>
  <Route path={routes[2].to}>
    <Todo text="Implement online gameplay" />
  </Route>
</Router>
