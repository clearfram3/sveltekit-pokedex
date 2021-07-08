<script lang="ts" context="module">
	import { getAllPokemonInfo } from '$lib/data';
	export async function load({ page, fetch, session, context }) {
		const name = page.params.name;
		const pkn = await getAllPokemonInfo(name);

		return {
			props: {
				...pkn
			}
		};
	}
</script>

<script lang="ts">
	import '$lib/info.css';
	import { formatId, colorTypeGradients } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { assets } from '$app/paths';
	export let name;
	export let id;
	export let evoChain;
	export let genera;
	export let imageURL;
	export let genderRate;
	export let description;
	export let abilities;
	export let stats;
	export let evoChainUrl;
	export let weight;
	export let height;
	export let types;
	const ts = [...types];
	let finalColor;
	let genderPercents = [0, 0];

	if (types.length === 2) {
		finalColor = colorTypeGradients(ts[0], ts[1], ts.length);
	} else {
		finalColor = colorTypeGradients(ts[0], ts[0], ts.length);
	}

	switch (genderRate) {
		case 0:
			genderPercents = [100, 0];
			break;
		case 1:
			genderPercents = [87.5, 12.5];
			break;
		case 2:
			genderPercents = [75, 25];
			break;
		case 3:
			genderPercents = [62.5, 37.5];
			break;
		case 4:
			genderPercents = [50, 50];
			break;
		case 5:
			genderPercents = [37.5, 62.5];
			break;
		case 6:
			genderPercents = [25, 75];
			break;
		case 7:
			genderPercents = [12.5, 87.5];
			break;
		case 8:
			genderPercents = [0, 100];
			break;
		default:
			[0, 0];
			break;
	}
</script>

<div class="info__container">
	<div class="info__container__img">
		<div class="pokemon__id">
			{formatId(String(id))}
		</div>

		<div class="pokemon__name">
			{name}
		</div>

		<div class="pokemon__genera" style={`background: ${finalColor[0]}`}>
			{genera}
		</div>

		<div>
			<img src={imageURL} alt="poke-img" />
		</div>
		<div class="info__container__data__type">
			{#each ts as type}
				<div class={`poke__type__bg ${type}`}>
					<img
						src={`${assets}/pkn-types/${type}.png`}
						alt="poke-type"
						aria-label={type}
						class="hint--bottom"
					/>
				</div>
			{/each}
		</div>
		<div class="dimensions">
			<p>
				<span class="info__container__headings" style="font-size: 20px">Height</span>
				{`${height / 10} m/${`${Math.floor((height / 10) * 3.28)}'${Math.round(
					(((height / 10) * 3.28) % 1) * 12
				)}"`} `}
			</p>
			<p>
				<span class="info__container__headings" style="font-size: 20px">Weight</span>
				{` ${(weight / 10).toFixed(1)} kg/${(weight * 0.2205).toFixed(1)} lbs`}
			</p>
		</div>
		<div class="gender__container">
			{#if genderRate === -1}
				Genderless
			{:else}
				<div>
					<span>{genderPercents[0]}% <i class="fa fa-mars" /></span><span>
						{genderPercents[1]}% <i class="fa fa-venus" /></span
					>
				</div>
			{/if}
		</div>
	</div>
	<!-- <hr class="separator" /> -->
	<div class="info__container__data">
		<div class="right__box">
			<div>
				<div class="info__container__headings">About</div>
				<div class="desc">
					{description}
				</div>
			</div>
			<div class="info__container__data__header">
				<div class="info__container__data__abilities">
					<div class="info__container__headings">Abilities</div>
					<div class="ability__list__bg">
						<ul class="ability__list">
							{#each abilities as ability}
								<li>
									<div class="ability">{ability}&nbsp;</div>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
			<div>
				<div class="info__container__headings stats">Base Stats</div>
				<div class="info__container__data__data">
					{#each stats as stat (stat.statName)}
						<div class="info__container__stat__columns">
							<div class="info__container__stat__columns__name">{stat.statName}</div>
							<div class="info__container__stat__columns__val">{stat.statVal}</div>
						</div>
					{/each}
				</div>
			</div>
			<div>
				<div class="info__container__headings">Evolution</div>
				<div class="evolution__box">
					{#each evoChain as evo, idx}
						<div class="evolution__sub__box">
							<div>
								<div
									class="evolution__img__div"
									style={`background: linear-gradient(${finalColor[0]}, ${finalColor[1]})`}
								>
									<div class="transparency__div">
										<img
											src={evo.image_url}
											class="evo_img"
											alt={`pokemon evolution: ${evo.species_name}`}
											height="80"
											width="80"
											on:click={() =>
												goto(`/${evo.species_name}`, { noscroll: false, keepfocus: false })}
										/>
									</div>
								</div>
								<div class="evolution__poke__name">{evo.species_name}</div>
							</div>
							{#if evoChain[idx + 1]}
								<i class="fas fa-long-arrow-alt-right fa-2x" />
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@import '$lib/info.css';
</style>
