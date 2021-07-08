<script>
	import { regions, types } from '$lib/utils';
	import './styles.css';
	export let regionChange;
	export let typeChange;
	export let searchChange;
	export let sortBy;
	export let regionSelection;
	export let typeSelection;
	export let sortSelection;
	export let search;
</script>

<div class="filter__container noselect">
	<div class="filter__items">
		<div>Region</div>
		<!-- svelte-ignore a11y-no-onchange -->
		<select value={regionSelection.name} on:change={regionChange}>
			{#each regions as region}
				<option value={region.name}>
					{region.name}&nbsp;({region.offset + 1}-{region.limit + region.offset})
				</option>
			{/each}
		</select>
	</div>

	<div class="filter__items">
		<div>Type</div>
		<!-- svelte-ignore a11y-no-onchange -->
		<select value={typeSelection} on:change={typeChange}>
			{#each types as t}
				<option value={t}>{t}</option>
			{/each}
		</select>
	</div>

	<div class="filter__items">
		<div>Sort by</div>
		<select bind:value={sortSelection} on:blur={() => (search = '')}>
			{#each sortBy as sort}
				<option value={sort}>{sort}</option>
			{/each}
		</select>
	</div>

	<div class="filter__items">
		<label for="search">Search</label>
		<!-- <input id="search" type="text" value={search} on:change={searchChange} /> -->
		{#if sortSelection === 'ID'}
			<input id="search" type="number" bind:value={search} on:keyup={searchChange} />
		{:else}
			<input id="search" type="test" bind:value={search} on:keyup={searchChange} />
		{/if}
	</div>
</div>

<style>
	@import './styles.css';
</style>
