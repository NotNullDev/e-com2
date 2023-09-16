<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import '../app.css';

	function login() {
		signIn('github');
	}

	async function logout() {
		await signOut();
		invalidateAll();
	}

	const user = $page.data.session?.user;
</script>

<div class="min-h-screen h-full bg-base-200 overflow-hidden">
	<header class="flex justify-between shadow-base-100 p-4 items-center shadow">
		<div class="container mx-auto flex justify-between items-center">
			<a href="/">e-com 2</a>
			{#if !user}
				<button class="btn btn-primary" on:click={login}>login</button>
			{:else}
				<div class="flex gap-2 items-center">
					<a class="btn btn-ghost" href="/profile">profile</a>
					<button class="btn btn-primary" on:click={logout}>logout</button>
				</div>
			{/if}
		</div>
	</header>
	<slot />
</div>
