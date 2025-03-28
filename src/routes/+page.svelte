<script>
  import { goto } from '$app/navigation';
  import { readable } from 'svelte/store';
  import { createTable, Subscribe, Render } from 'svelte-headless-table';
  import Icon from '@iconify/svelte';

  let viewMode = $state('normal');

  function toggleViewMode() {
    viewMode = viewMode === 'table' ? 'normal' : 'table';
  }

  // Search
  let { data } = $props();
  let rows = data['Feuille 1'];

  let search = $state('');

  let filteredRows = $derived.by(() => {
    if (!search || search === '') {
      return rows;
    }
    return rows.filter(row => {
      if (!row.Nom || !row.Initiale) {
        return false;
      }

      return row.Nom.toLowerCase().includes(search.toLowerCase()) || row.Initiale.toLowerCase().includes(search.toLowerCase());
    });
  });

  let numberOfColumns = $derived.by(() => {
    if (filteredRows.length < 100) {
      return 1;
    } else if (filteredRows.length < 200) {
      return 2;
    } else if (filteredRows.length < 300) {
      return 3;
    } else {
      return 4;
    }
  });

  function findIndex(rang) {
    return rows.findIndex(row => row.Rang === rang);
  }

  // Table
  const tableData = $derived(readable(filteredRows));
  
  const table = $derived(createTable(tableData));

  const columns = $derived(table.createColumns([
    table.column({
      header: 'Nom',
      accessor: 'Nom',
      cell: ({ value }) => value ?? '-',
    }),
    table.column({
      header: 'Initiale',
      accessor: 'Initiale',
      cell: ({ value }) => value ?? '-',
    }),
    table.column({
      header: 'Année de naissance',
      accessor: 'Année de naissance',
      cell: ({ value }) => value ?? '-',
    }),
    table.column({
      header: 'Département de naissance',
      accessor: 'Département de naissance',
      cell: ({ value }) => value ?? '-',
    }),
    table.column({
      header: 'Année de mort',
      accessor: 'Année de mort ',
      cell: ({ value }) => value ?? '-',
    }),
    table.column({
      header: 'Grade militaire',
      accessor: 'Grade militaire',
      cell: ({ value }) => value ?? '-',
    }),
  ]));

  const { headerRows, rows: tableRows, tableAttrs, tableBodyAttrs } = $derived(table.createViewModel(columns));

  function onTableRowClick (rang) {
    goto(`/etudiant/${findIndex(rang)}`);
  }
</script>

<div class="hero">
  <div class="hero-image"></div>

  <div class="hero-content">
    <h1 class="text-slate-100">AUX ÉTUDIANTS ET ANCIENS ÉTUDIANTS DE LA FACULTÉ DES LETTRES</h1>
    <span class="text-slate-300 italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis in nunc ultrices ultricies. Nullam eget felis in nunc ultrices ultricies.</span>
  </div>
</div>

<main>
  <div class="controls">
    <input type="text" class="rounded-2xl outline-2 outline-slate-500 focus:outline-slate-300 text-slate-200" placeholder="Rechercher un nom..." bind:value={search} />
    <span class="toggle-button" on:click={toggleViewMode}>
      {#if viewMode === 'normal'}
        <Icon icon="ix:table-rows" height="2rem" class="text-slate-300" />
      {:else}
        <Icon icon="ix:prio-high" height="2rem" class="text-slate-300" />
      {/if}
    </span>
  </div>

  {#if viewMode === 'normal'}
    <ul class="names" style="columns:{numberOfColumns}">
    {#each filteredRows as row, index}
      <li>
        <a href="/etudiant/{findIndex(row.Rang)}">
          {row.Initiale} {row.Nom}
        </a>
      </li>
    {/each}
    </ul>
  {:else}
    <div class="table-wrapper">
      <table {...$tableAttrs}>
        <thead>
          {#each $headerRows as headerRow (headerRow.id)}
            <Subscribe rowAttrs={headerRow.attrs()} let:rowAttrs>
              <tr {...rowAttrs}>
                {#each headerRow.cells as cell (cell.id)}
                  <Subscribe attrs={cell.attrs()} let:attrs>
                    <th {...attrs}>
                      <Render of={cell.render()} />
                    </th>
                  </Subscribe>
                {/each}
              </tr>
            </Subscribe>
          {/each}
        </thead>
        <tbody {...$tableBodyAttrs}>
          {#each $tableRows as row (row.id)}
            <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                <tr {...rowAttrs} on:click={() => onTableRowClick(row.original.Rang)}>
                  {#each row.cells as cell (cell.id)}
                    <Subscribe attrs={cell.attrs()} let:attrs>
                      <td {...attrs}>
                        <Render of={cell.render()} />
                      </td>
                    </Subscribe>
                  {/each}
                </tr>
            </Subscribe>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</main>

<style lang="scss">
  .hero {
    position: relative;
    height: 70vh;
  }

  .hero-image {
    z-index: -1;
    position: absolute;
    background-image: url('$lib/assets/sorbonne.jpg');
    top: 0;
    left: 0;
    height: 70vh;
    width: 100vw;
    background-size: cover;
  }

  .hero-image::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(37, 19, 17, 0.74), rgba(37, 19, 17, 1.0));
  }

  .hero-content {
    max-width: 50vw;
    position: absolute;
    margin-top: 10rem;
    margin-left: 10rem;

    h1 {
      font-size: 3rem;
      font-family: "Cinzel", serif;
      color: #f8d16d;
    }
  }

  main {
    background-color: #251311;
    padding: 2rem 4rem;
    min-height: 2176px;
  }

  .names {
    columns: 4;
    font-family: "Cinzel", serif;
    text-transform: uppercase;
    text-align: center;

    a {
      color: #f8d16d;
    }
  }

  .controls {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;

    > input[type="text"] {
      width: 100%;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      margin-right: 1rem;
    }

    > .toggle-button {
      cursor: pointer;

      svg {
        width: 2px !important;
        height: 2px !important;
      }
    }
  }

  .table-wrapper {
		border-spacing: 0;
		border-top: 1px solid rgba(71, 85, 105, 0.3);
		border-left: 1px solid rgba(71, 85, 105, 0.3);
		border-right: 1px solid rgba(71, 85, 105, 0.3);
    border-radius: 1rem;
    width: 100%;
  }

  table {
    width: 100%;
	}

	th, td {
		border-bottom: 1px solid rgba(71, 85, 105, 0.3);
		padding: 0.5rem 1rem;
    text-align: left;
	}

  th {
    color: #e2e8f0;
  }

  tbody tr {
    cursor: pointer;
  }

  tbody tr:hover {
    background-color: #2c1b19;
  }

  td {
    color: #94a3b8;
  }
  
</style>
