<script lang="ts" context="module">
	import { getPokemon } from '$lib/data';
	export async function load({ page, fetch, session, context }) {
		let error;
		const pokemon = await getPokemon(0, 151).catch((err) => (error = err));
		return {
			props: {
				pokemon,
				error
			}
		};
	}
</script>

<script lang="ts">
	import { filterPokemon } from '$lib/data';
	import { regions, types } from '$lib/utils';
	import PokemonCard from '$lib/PokemonCard.svelte';
	import Filter from '$lib/Filter.svelte';
	export let error;
	export let pokemon = [];
	// needed view[] bc checking for filters and zero pokemon made things janky
	let view = pokemon;
	let filtered = [];
	let search: string | number;
	let regionSelection = regions[0];
	let typeSelection = types[0];
	let sortBy = ['ID', 'Name'];
	let sortSelection = sortBy[0];
	let noPokemonReason = '';

	// FIXME: move these functions to <Filter/> ?
	async function regionChange(e): Promise<void> {
		filtered = [];
		search = '';
		typeSelection = 'all types';
		for (const region of regions) {
			if (region.name === e.target.value) {
				regionSelection = region;
				view = pokemon = await getPokemon(regionSelection.offset, regionSelection.limit);
				break;
			}
		}
	}

	function typeChange(e) {
		typeSelection = e.target.value;
		search = '';
		if (typeSelection !== 'all types') {
			view = filtered = filterPokemon(pokemon, typeSelection);
		}
	}

	// FIXME: function sortChange(e) {} not needed?

	function searchChange(e) {
		let searchArr = [];
		for (const p of view) {
			if (
				p.name.includes(e.target.value.toLowerCase()) ||
				p.id.toString().includes(e.target.value)
			) {
				searchArr.push(p);
			}
		}
		searchArr.length > 0
			? (noPokemonReason = null)
			: (noPokemonReason = 'No such Pokemon in this region');

		view = searchArr;
	}
</script>

<div class="app__container">
	<Filter
		{regionChange}
		{typeChange}
		{searchChange}
		{regionSelection}
		{typeSelection}
		{sortSelection}
		{sortBy}
		{search}
	/>

	{#if error}
		<h1>{error.message}</h1>
	{:else if view.length > 0}
		<div class="pokemon__container">
			<div class="all__pokemons">
				{#each view as pkn}
					<a href={`/${pkn.name}`}>
						<PokemonCard
							name={pkn.name}
							types={pkn.types}
							id={pkn.id}
							img={pkn.sprites.other.dream_world.front_default
								? pkn.sprites.other.dream_world.front_default
								: pkn.sprites.other['official-artwork'].front_default}
						/>
					</a>
				{/each}
			</div>
		</div>
	{:else}
		<div class="no__data noselect">No such Pokémon in this region :/</div>
	{/if}
</div>
