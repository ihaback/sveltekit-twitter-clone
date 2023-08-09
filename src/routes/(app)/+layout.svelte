<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>app</title>
</svelte:head>

<Header username={data.username} />
<slot />
