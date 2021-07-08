<script>
	import '$lib/hint.css';
	import '$lib/styles.css';
	import '$lib/info.css';
	import '$lib/pokemon-card.css';
	import Navbar from '$lib/Navbar.svelte';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
		rel="stylesheet"
	/>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap"
		rel="stylesheet"
	/>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Teko:wght@300;400&display=swap"
		rel="stylesheet"
	/>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
		rel="stylesheet"
	/>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
	/>
</svelte:head>

<Navbar />

<slot />
