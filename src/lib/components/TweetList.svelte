<script lang="ts">
	export let tweets: {
		id: string;
		body: string;
		user_id: string;
		user?: {
			username: string;
			image_url: string;
		};
	}[];
	export let is_profile: boolean;
</script>

{#if tweets.length === 0}
	<p class="border-t border-t-gray-200 px-4 pt-4">No tweets yet</p>
{:else}
	{#each tweets as tweet}
		<ul class={`list-none`}>
			<li class="border-t border-t-gray-200 pl-4">
				<div class="block pt-4 sm:flex">
					<a class="mb-4 flex-shrink-0 sm:mb-0" href={`/profile/${tweet.user_id}`}>
						<img
							class="h-10 w-10 cursor-pointer rounded-full border-4 border-blue-400"
							src={tweet?.user?.image_url}
							alt=""
						/>
					</a>
					<div class="block pt-2 sm:pl-4 sm:pt-0">
						<a
							href={`/profile/${tweet.user_id}`}
							class="block text-base font-bold leading-none hover:text-blue-500 hover:underline"
						>
							{tweet?.user?.username}
						</a>
						<a
							class="block pb-5 pr-4 pt-1 text-xl"
							data-sveltekit-noscroll
							href={is_profile
								? `/profile/${tweet.user_id}/tweets/${tweet.id}`
								: `/tweets/${tweet.id}`}
						>
							{tweet.body}
						</a>
					</div>
				</div>
			</li>
		</ul>
	{/each}
{/if}
