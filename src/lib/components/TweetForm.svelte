<script lang="ts">
	import { enhance } from '$app/forms';
	export let form: { message?: string; tweetErrorMessage?: string } | null;
	export let loading = false;
</script>

<form
	method="post"
	class="feed-padding flex w-full flex-col gap-8"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
	action="?/create"
>
	<label class="flex w-full flex-col gap-1">
		<textarea
			name="body"
			rows={6}
			class="w-full flex-1 rounded-md border-2 border-gray-200 px-3 py-2 text-lg leading-6 focus:border-blue-500"
		/>
	</label>
	<div class="text-right">
		<button
			type="submit"
			name="intent"
			class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-200"
			disabled={loading}
		>
			Post
		</button>
		{#if form?.message}
			<div class="pt-3 text-red-700" id="tweet-error">
				{form.message}
			</div>
		{/if}
	</div>
</form>
