<script lang="ts">
  import { Router, Route } from 'svelte-navigator';
  import Menu from './routes/menu/Menu.svelte';
</script>

<Router>
  <Route path="/">
    <Menu/>
  </Route>
  <Route path="/cpu">
  <!-- TODO -->
  </Route>
  <Route path="/offline">
    <!-- TODO -->
  </Route>
  <Route path="/online">
    <!-- TODO -->
  </Route>
</Router>

