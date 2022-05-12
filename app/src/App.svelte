<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Menu from "./routes/menu/Menu.svelte";
  import Todo from "./Todo.svelte";
  import routes from "./routes";
</script>

<Router>
  <Route path="/">
    <Menu />
  </Route>
  <Route path={routes[0].to}>
    <Todo text="Implement CPU gameplay" />
  </Route>
  <Route path={routes[1].to}>
    <Todo text="Implement offline gameplay" />
  </Route>
  <Route path={routes[2].to}>
    <Todo text="Implement online gameplay" />
  </Route>
</Router>
