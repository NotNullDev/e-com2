<script lang="ts">
	import { page } from '$app/stores';

	const user = $page.data.session?.user;
</script>

<div class="my-20 container mx-auto app-card">
	<h2 class="text-2xl">Current user:</h2>
	<pre class="whitespace-pre">{JSON.stringify(user, null, 2)}</pre>
</div>
