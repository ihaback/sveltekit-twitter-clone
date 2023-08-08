<script lang="ts">
	import AppShell from '$lib/components/AppShell.svelte';
	import TweetDeleteForm from '$lib/components/TweetDeleteForm.svelte';
	import TweetForm from '$lib/components/TweetForm.svelte';
	import TweetList from '$lib/components/TweetList.svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<AppShell user_id={data.user_id}>
	<svelte:fragment slot="main">
		<TweetForm {form} />
		<div slot="main" class="pt-6">
			<TweetList tweets={data?.tweets ?? []} is_profile={false} />
		</div>
	</svelte:fragment>
	<svelte:fragment slot="outlet">
		<TweetDeleteForm tweet={data?.tweet} user_id={data.user_id} {form} />
	</svelte:fragment>
</AppShell>
