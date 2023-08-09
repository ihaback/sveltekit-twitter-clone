<script lang="ts">
	import { enhance } from '$app/forms';

	export let tweet: { user: { username: string }; body: string; user_id: string } | null;
	export let user_id: string;
	export let form: { tweetErrorMessage?: string; message?: string } | null;
	export let loading = false;
</script>

<div>
	<h3 class="text-2xl font-bold">{tweet?.user?.username}</h3>
	<p class="pb-3 pt-1">{tweet?.body}</p>
	{#if user_id === tweet?.user_id}
		<form
			method="post"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
			action="?/remove"
		>
			<button
				name="remove"
				type="submit"
				class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-200"
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
