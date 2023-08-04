<script lang="ts">
	import { enhance } from '$app/forms';
	import AppShell from '$lib/components/AppShell.svelte';
	import ProfileForm from '$lib/components/ProfileForm.svelte';
	import TweetList from '$lib/components/TweetList.svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<AppShell user_id={data.user_id}>
	<div slot="main" class="-mt-6">
		<ProfileForm profile_user={data?.profile_user} is_following={data.is_following} {form} />
		<TweetList tweets={data?.tweets ?? []} is_profile />
	</div>
	<svelte:fragment slot="outlet">
		<div>
			<h3 class="text-2xl font-bold">{data?.tweet?.user?.username}</h3>
			<p class="pb-3 pt-1">{data?.tweet?.body}</p>
			{#if data.user_id === data.tweet?.user_id}
				<form method="post" use:enhance action="?/delete">
					<button
						name="delete"
						type="submit"
						class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
					>
						Delete
					</button>
				</form>
			{/if}
		</div>
	</svelte:fragment>
</AppShell>
