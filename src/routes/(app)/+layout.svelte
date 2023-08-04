<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Header username={data.username} />
<slot />
