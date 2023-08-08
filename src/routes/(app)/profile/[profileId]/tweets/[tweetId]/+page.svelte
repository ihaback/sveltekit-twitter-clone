<script lang="ts">
	import { enhance } from '$app/forms';
	import AppShell from '$lib/components/AppShell.svelte';
	import ProfileForm from '$lib/components/ProfileForm.svelte';
	import TweetDeleteForm from '$lib/components/TweetDeleteForm.svelte';
	import TweetList from '$lib/components/TweetList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AppShell user_id={data.user_id}>
	<div slot="main" class="-mt-6">
		<ProfileForm profile_user={data?.profile_user} is_following={data.is_following} />
		<TweetList tweets={data?.tweets ?? []} is_profile />
	</div>
	<svelte:fragment slot="outlet">
		<TweetDeleteForm tweet={data?.tweet} user_id={data.user_id} />
	</svelte:fragment>
</AppShell>
