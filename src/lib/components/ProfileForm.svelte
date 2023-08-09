<script lang="ts">
	import { enhance } from '$app/forms';
	import type { User } from '@prisma/client';

	export let profile_user: User | null;
	export let user_id: string;
	export let is_following: boolean;
	export let form: { message?: string; tweetErrorMessage?: string } | null;

	export let loading = false;
</script>

<div class="-mt-6 bg-blue-200 pt-24" />
<div class="feed-padding flex items-center justify-between">
	<img
		class="-mt-16 h-32 w-32 cursor-pointer rounded-full border-4 border-blue-400"
		src={profile_user?.image_url}
		alt=""
	/>
	{#if profile_user?.id !== user_id}
		<form
			method="post"
			action="?/follow"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
		>
			<button
				class="relative top-9 rounded-full border border-gray-300 px-4 py-1.5 font-bold transition duration-150 ease-in-out hover:text-gray-400 disabled:text-gray-400"
				type="submit"
				disabled={loading}
			>
				{is_following ? 'Unfollow' : 'Follow'}
			</button>
		</form>
	{/if}
</div>
{#if form?.message}
	<div class="relative top-4 right-3">
		<div class="flex justify-end pt-3 text-red-700 absolute right-0">
			{form.message}
		</div>
	</div>
{/if}
<div class="feed-padding my-1">
	<h2 class="text-xl font-bold tracking-tight">
		{profile_user?.username}
	</h2>
	<span class="text-gray-500 dark:text-gray-400">
		{profile_user?.id}
	</span>
</div>
