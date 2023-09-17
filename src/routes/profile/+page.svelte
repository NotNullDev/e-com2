<script lang="ts">
	import { page } from '$app/stores';
	import {Card} from "stwui";

	const user = $page.data.session?.user;
</script>

<Card bordered={false} class="container mx-auto mt-20">
	<Card.Content slot="content">
		<h2 class="text-2xl">Current user:</h2>
		<pre class="whitespace-pre">{JSON.stringify(user, null, 2)}</pre>
	</Card.Content>
</Card>
