<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import Menu from './routes/menu/Menu.svelte';
  import Todo from './Todo.svelte';
</script>

<Router>
  <Route path="/">
    <Menu/>
  </Route>
  <Route path="/cpu">
    <Todo text="Implement CPU gameplay"/>
  </Route>
  <Route path="/offline">
    <Todo text="Implement offline gameplay"/>
  </Route>
  <Route path="/online">
    <Todo text="Implement online gameplay"/>
  </Route>
</Router>

