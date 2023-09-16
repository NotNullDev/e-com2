<script lang="ts">
	import { page } from '$app/stores';
	import ProfileDropdown from '$lib/components/profile-dropdown.svelte';
	import SearchProductsCombobox from '$lib/components/search-products-combobox.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import '../app.css';

	function login() {
		signIn('github');
	}

	const user = $page.data.session?.user;
</script>

<div class="min-h-screen h-full bg-base-200 overflow-hidden">
	<header class="flex justify-between shadow-base-100 p-4 items-center shadow">
		<div class="container mx-auto flex justify-between items-center">
			<div class="flex gap-10 items-center">
				<a href="/">e-com 2</a>
				<SearchProductsCombobox />
			</div>
			{#if !user}
				<button class="btn btn-primary" on:click={login}>login</button>
			{:else}
				<div class="flex gap-2 items-center">
					<ProfileDropdown />
				</div>
			{/if}
		</div>
	</header>
	<slot />
</div>
