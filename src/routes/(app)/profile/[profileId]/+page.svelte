<script lang="ts">
	import AppShell from '$lib/components/AppShell.svelte';
	import NoTweet from '$lib/components/NoTweet.svelte';
	import ProfileForm from '$lib/components/ProfileForm.svelte';
	import TweetList from '$lib/components/TweetList.svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<AppShell user_id={data?.user_id}>
	<div slot="main" class="-mt-6">
		<ProfileForm
			profile_user={data?.profile_user}
			user_id={data.user_id}
			is_following={data.is_following}
			{form}
		/>
		<TweetList tweets={data?.tweets ?? []} is_profile />
	</div>
	<svelte:fragment slot="outlet"><NoTweet /></svelte:fragment>
</AppShell>
