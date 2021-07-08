<script lang="ts">
	import { assets } from '$app/paths';
	import { colorTypeGradients, formatId } from '$lib/utils';
	export let id;
	export let name;
	export let types: Array<unknown>;
	export let img;

	let finalColor;

	if (types.length === 2) {
		finalColor = colorTypeGradients(types[0].type.name, types[1].type.name, types.length);
	} else {
		finalColor = colorTypeGradients(types[0].type.name, types[0].type.name, types.length);
	}
</script>

<div
	class="thumbnail__container noselect"
	style={`background: linear-gradient(${finalColor[0]}, ${finalColor[1]})`}
>
	<div class="card__header">
		<div class="poke__number">
			{formatId(String(id))}
		</div>
		<!-- this is to prefetch data that will be sent to the component, but im using a page load fn -->
		<!-- <div class="info__icon" on:click={() => onElemClick({ name })}> -->
		<div class="info__icon">
			<svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
				/></svg
			>
		</div>
	</div>

	<div class="image__container">
		<img src={img} alt="pokemon" class="img__thumbnail" height="150" />
	</div>

	<div class="poke__name">
		<h3>{name}</h3>
		<div class="poke__type">
			<!-- TODO: add the hint stuff here -->
			<!-- <div class={`poke__type__bg ${tr.type.name}`}>
					<img src={`${tr.type.name}.png`} alt="poke-type" />
				</div> -->
			{#each types as type}
				<div class={`poke__type__bg ${type.type.name}`}>
					<img
						src={`${assets}/pkn-types/${type.type.name}.png`}
						alt="poke-type"
						aria-label={type.type.name}
						class="hint--bottom"
					/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	:root {
		--grass: #5fbd58;
		--bug: #92bc2c;
		--dark: #595761;
		--dragon: #0c69c8;
		--electric: #f2d94e;
		--fairy: #ee90e6;
		--fighting: #d3425f;
		--fire: #dc872f;
		--flying: #a1bbec;
		--ghost: #5f6dbc;
		--ground: #da7c4d;
		--ice: #75d0c1;
		--normal: #a0a29f;
		--poison: #b763cf;
		--psychic: #ff2ca8;
		--rock: #a38c21;
		--steel: #5695a3;
		--water: #539ddf;
	}

	html {
		--pokename: #000;
		--cardborder: #fff;
		--pokenumber: hsl(228, 28%, 20%);
		--info: #fff;
	}

	html[data-theme='dark'] {
		--pokename: hsl(228, 28%, 20%);
		--cardborder: hsl(228, 28%, 20%);
		--pokenumber: hsl(228, 28%, 20%);
		--info: hsl(228, 28%, 20%);
	}

	.thumbnail__container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem 0;
		margin: 2rem;
		/* border: 15px solid var(--cardborder); */
		border-radius: 1rem;
		min-width: 220px;
		height: 285px;
		text-align: center;
		/* box-shadow: 0 5px 25px 1px rgb(0 0 0 / 50%); */
		box-shadow: 0 1.6px 1.6px rgba(0, 0, 0, 0.023), 0 3.8px 3.8px rgba(0, 0, 0, 0.034),
			0 6.9px 6.9px rgba(0, 0, 0, 0.041), 0 11.4px 11.4px rgba(0, 0, 0, 0.049),
			0 18.8px 18.8px rgba(0, 0, 0, 0.056), 0 32.8px 32.8px rgba(0, 0, 0, 0.067),
			0 71px 71px rgba(0, 0, 0, 0.09);
		transition: all 0.2s ease-in-out;
	}

	.thumbnail__container:hover {
		transform: scale(1.1);
	}

	.info__icon {
		margin-right: 15px;
		margin-top: -4px;
		font-size: 25px;
		color: var(--info);
		opacity: 0.5;
	}

	.info__icon:hover {
		opacity: 1;
	}

	h3 {
		font-family: 'Press Start 2P', cursive;
		margin-bottom: 0.2rem;
		color: var(--pokename);
	}

	.thumbnail__container .poke__number {
		border-radius: 1rem;
		padding: 0.2rem 0.4rem;
		font-weight: 400;
		font-size: 35px;
		color: var(--pokenumber);
		font-family: 'Teko', sans-serif;
	}

	.thumbnail__container img {
		width: 120px;
		height: 120px;
	}

	.thumbnail__container small {
		text-transform: capitalize;
	}

	.card__header {
		width: -webkit-fill-available;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.poke__type {
		display: flex;
		grid-gap: 0 10px;
		gap: 0 20px;
		align-items: center;
		justify-content: center;
		margin-top: 30px;
	}

	.poke__type__bg > img {
		width: 20px;
		height: 20px;
	}

	.poke__type__bg {
		width: 40px;
		height: 40px;
		border-radius: 100%;
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
	}

	.grass {
		background: var(--grass);
		box-shadow: 0 0 20px var(--grass);
	}

	.bug {
		background: var(--bug);
		box-shadow: 0 0 20px var(--bug);
	}

	.dark {
		background: var(--dark);
		box-shadow: 0 0 20px var(--dark);
	}

	.dragon {
		background: var(--dragon);
		box-shadow: 0 0 20px var(--dragon);
	}

	.electric {
		background: var(--electric);
		box-shadow: 0 0 20px #796d26;
	}

	.fairy {
		background: var(--fairy);
		box-shadow: 0 0 20px var(--fairy);
	}

	.fighting {
		background: var(--fighting);
		box-shadow: 0 0 20px var(--fighting);
	}

	.flying {
		background: var(--flying);
		box-shadow: 0 0 20px var(--flying);
	}

	.ghost {
		background: var(--ghost);
		box-shadow: 0 0 20px var(--ghost);
	}

	.ground {
		background: var(--ground);
		box-shadow: 0 0 20px var(--ground);
	}

	.ice {
		background: var(--ice);
		box-shadow: 0 0 20px var(--ice);
	}

	.normal {
		background: var(--normal);
		box-shadow: 0 0 20px var(--normal);
	}

	.poison {
		background: var(--poison);
		box-shadow: 0 0 20px var(--poison);
	}

	.psychic {
		background: var(--psychic);
		box-shadow: 0 0 20px var(--psychic);
	}

	.rock {
		background: var(--rock);
		box-shadow: 0 0 20px var(--rock);
	}

	.steel {
		background: var(--steel);
		box-shadow: 0 0 20px var(--steel);
	}

	.water {
		background: var(--water);
		box-shadow: 0 0 20px var(--water);
	}

	.fire {
		background: var(--fire);
		box-shadow: 0 0 20px var(--fire);
	}

	.image__container {
		height: 150px;
		width: 150px;
	}

	.poke__name h3 {
		margin-top: 0px;
	}

	.MuiTooltip-tooltip {
		font-size: 15px;
	}

	@media screen and (max-width: 767px) {
		.thumbnail__container .img__thumbnail {
			width: 90px;
			height: 90px;
		}
		.thumbnail__container {
			min-width: 175px;
			height: 225px;
			margin: 1.25rem 0.75rem;
			padding: 1.25rem 0;
		}
		.image__container {
			height: 90px;
			width: 90px;
		}
		.thumbnail__container .poke__number {
			font-size: 1.75em;
		}
		.poke__name h3 {
			margin-top: 15px;
			font-size: 1em;
		}
		.poke__type {
			margin-top: 20px;
		}
	}
</style>
