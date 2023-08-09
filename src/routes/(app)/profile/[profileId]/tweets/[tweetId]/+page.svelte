<script lang="ts">
	import AppShell from '$lib/components/AppShell.svelte';
	import ProfileForm from '$lib/components/ProfileForm.svelte';
	import TweetDeleteForm from '$lib/components/TweetDeleteForm.svelte';
	import TweetList from '$lib/components/TweetList.svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<AppShell user_id={data.user_id}>
	<div slot="main" class="-mt-6">
		<ProfileForm
			profile_user={data?.profile_user}
			user_id={data.user_id}
			is_following={data.is_following}
			{form}
		/>
		<TweetList tweets={data?.tweets ?? []} is_profile />
	</div>
	<svelte:fragment slot="outlet">
		<TweetDeleteForm tweet={data?.tweet} user_id={data.user_id} {form} />
	</svelte:fragment>
</AppShell>
