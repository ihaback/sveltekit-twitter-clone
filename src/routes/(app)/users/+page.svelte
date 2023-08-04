<script lang="ts">
	import AppShell from '$lib/components/AppShell.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AppShell user_id={data.user_id}>
	<div slot="main" class="-mt-6 h-full">
		<ul class="list-none">
			{#each data?.users as user}
				<li class="border-t border-t-gray-200 pl-4">
					<a class="block pt-4 sm:flex" href={`/profile/${user.id}`}>
						<div class="mb-4 flex-shrink-0 sm:mb-0">
							<img
								class="h-10 w-10 cursor-pointer rounded-full border-4 border-blue-400"
								src={user?.image_url}
								alt=""
							/>
						</div>
						<div class="block pt-2 sm:pl-4 sm:pt-0">
							<div
								class="block text-base font-bold leading-none hover:text-blue-500 hover:underline"
							>
								{user?.username}
							</div>
							<div class="block pb-5 pr-4 pt-1 text-xl">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
	<div slot="outlet" />
</AppShell>
