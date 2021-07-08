<script>
	import Logo from '../../static/pokedex.png';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	let doc = null;
	let win = null;
	if (browser) {
		onMount(() => {
			document.documentElement.setAttribute('data-theme', 'light');
			doc = document;
			win = window;
		});
	}
	let isChecked = false;
	// FIXME: thinking of moving this fully to __layout and deleting navbar component
	// don't access these functions till after component mounts
	const changeTheme = () => {
		const currentTheme = doc.documentElement.getAttribute('data-theme');
		let targetTheme = 'light';

		if (currentTheme === 'light') {
			targetTheme = 'dark';
			isChecked = false;
		} else {
			isChecked = true;
		}
		doc.documentElement.setAttribute('data-theme', targetTheme);
	};

	const openGithub = () => win.open('https://github.com/s1varam/pokedex');
</script>

<div class="app__header">
	<div class="switch">
		<div class="toggle">
			<label for="themeSwitch" />
			<input type="checkbox" name="swich-theme" id="themeSwitch" on:click={changeTheme} checked />
			<div class="toggle-bg" />
			<div class="toggle-thumb">
				<i class="fas fa-sun" />
				<i class="fas fa-moon" />
			</div>
		</div>
	</div>
	<div class="poke__logos noselect">
		<img
			src={Logo}
			alt="pokelogo"
			class="poke__logo"
			on:click={() => goto('/', { noscroll: false, keepfocus: false })}
		/>
	</div>
	<div class="pokeball__box github__icon" on:click={openGithub}>
		<i class="fab fa-github fa-2x" />
	</div>
</div>
