<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from '../../routes/(app)/tweets/[tweetId]/./$types';

	export let tweet: { user: { username: string }; body: string; user_id: string } | null;
	export let user_id: string;
	let form: ActionData;
</script>

<div>
	<h3 class="text-2xl font-bold">{tweet?.user?.username}</h3>
	<p class="pb-3 pt-1">{tweet?.body}</p>
	{#if user_id === tweet?.user_id}
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
	{#if form?.tweetErrorMessage}
		<div class="w-full block">
			<div class="text-red-700 pt-3">
				{form.tweetErrorMessage}
			</div>
		</div>
	{/if}
</div>
