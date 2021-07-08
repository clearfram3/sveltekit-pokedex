export async function getPokemon(offset: number, limit: number) {
	const { results } = await getRegionalPokemonUrls(offset, limit);
	const data = await getBasicPokemonData(results);
	return data.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
}

async function getRegionalPokemonUrls(
	offset: number,
	limit: number
): Promise<Record<string, string>[]> {
	try {
		return await (
			await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
		).json();
	} catch (err) {
		console.error('#Error# getRegionalPokemonUrls:', err);
	}
}

async function getBasicPokemonData(
	results: Record<string, string>[]
): Promise<Record<string, unknown>[]> {
	try {
		const pokemon = [];

		await Promise.all(
			results.map(({ url }) =>
				fetch(`${url}`)
					.then((res) => res.json())
					.then((res) => pokemon.push(res))
			)
		);
		return pokemon;
	} catch (err) {
		console.error('#Error# getBasicPokemonData:', err);
	}
}

export function filterPokemon(
	pokemon: Record<string, unknown>[],
	selectedType: string
): Array<unknown> {
	const filtered = [];
	for (const p of pokemon) {
		for (const { type } of p.types) {
			if (type.name === selectedType) {
				filtered.push(p);
			}
		}
	}
	return filtered.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
}

export async function getAllPokemonInfo(name: string) {
	// console.log('### getAllPokemonInfo ###');
	const res1 = await fetchPokemonStats(name);
	// console.log('# fetchPokemonStats:', res1);
	const res2 = await fetchPokemonDescription(name);
	// console.log('# fetchPokemonDescription:', res2);
	const res3 = await fetchEvoDetails(res2.evoChainUrl);
	// console.log('# fetchEvoDetails:', res3);
	return { ...res1, ...res2, evoChain: res3 };
}

export async function fetchPokemonStats(
	pokemonName: string
): Promise<Record<string, string | null | Array<unknown>>> {
	try {
		const res = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)).json();
		const types = [...res.types].map((t) => t.type.name);
		const stats = [];
		const abilities = [];

		for (const { ability } of res.abilities) {
			abilities.push(ability.name);
		}
		for (const { stat, base_stat } of res.stats) {
			const Obj = { statName: stat.name, statVal: base_stat };
			stats.push(Obj);
		}

		return {
			types,
			id: res.id,
			imageURL: res.sprites.other.dream_world.front_default
				? res.sprites.other.dream_world.front_default
				: res.sprites.other['official-artwork'].front_default,
			name: pokemonName,
			stats,
			abilities,
			weight: res.weight,
			height: res.height
		};
	} catch (err) {
		console.error('#Error# fetchPokemonStats:', err);
	}
}

export async function fetchPokemonDescription(
	pokemonName: string
): Promise<Record<string, string | number>> {
	try {
		let genera = '';
		let description = '';

		const res = await (
			await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
		).json();

		for (const flavor of res.flavor_text_entries) {
			if (flavor.language.name === 'en') {
				description = flavor.flavor_text;
				break;
			}
		}

		for (const gen of res.genera) {
			if (gen.language.name === 'en') {
				genera = gen.genus;
				break;
			}
		}
		return {
			description,
			genera,
			genderRate: res.gender_rate,
			evoChainUrl: res.evolution_chain.url
		};
	} catch (err) {
		console.error('#Error# getAllPokemons:', err);
	}
}

export async function fetchEvoDetails(url: string): Promise<Record<string, string | null>[]> {
	const res = await (await fetch(url)).json();
	const evoChain = [];
	let evoData = res.chain;
	do {
		const evoDetails = evoData.evolution_details[0];
		evoChain.push({
			species_name: evoData.species.name,
			min_level: !evoDetails ? 1 : evoDetails.min_level,
			trigger_name: !evoDetails ? null : evoDetails.trigger.name,
			item: !evoDetails ? null : evoDetails.item
		});

		evoData = evoData.evolves_to[0];
	} while (!!evoData && evoData.hasOwnProperty('evolves_to'));
	// below is the old fetchEvoImages(evoChain): Promise<Record<string, string | null>[]>
	for (const link of evoChain) {
		const { sprites } = await (
			await fetch(`https://pokeapi.co/api/v2/pokemon/${link.species_name}`)
		).json();

		sprites.other.dream_world.front_default
			? (link.image_url = sprites.other.dream_world.front_default)
			: (link.image_url = sprites.other['official-artwork'].front_default);
	}
	return evoChain;
}
