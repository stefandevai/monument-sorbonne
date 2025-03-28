<script lang="ts">
  import SorbonneLogo from '$lib/components/SorbonneLogo/index.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<nav class="header">
  <a href="/">
    <SorbonneLogo />
  </a>
  <ul>
    <li><a href="/statistiques">Statistiques</a></li>
    <li><a href="/a-propos">À propos</a></li>
  </ul>
</nav>

{@render children()}

<style lang="scss">
  .header {
    height: 4rem;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    background-color: white;

    > ul {
      display: flex;
      gap: 1rem;
      margin-left: auto;
      font-size: 0.8rem;
    }
  }
</style>
