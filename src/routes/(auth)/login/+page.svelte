<script lang="ts">
	import AuthForm from '$lib/components/AuthForm.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<AuthForm type="login" {form} />
