<script lang="ts">
    import {page} from '$app/stores';
    import {signIn, signOut} from '@auth/sveltekit/client';
    import '../app.css';
    import {Button, Dropdown, Input} from 'stwui';
    import {goto} from "$app/navigation";

    let visible = false;

    function closeDropdown() {
        visible = false;
    }

    async function gotoProfile() {
        closeDropdown();
        await goto("/profile");
    }

    async function logout() {
        closeDropdown()
        await signOut();
    }

    function toggleDropdown() {
        visible = !visible;
    }

    function login() {
        signIn('github');
    }

    let value: string;
    let options = ['Option 1', 'Option 2', 'Option 3'];
    let filtered = options;

    function filter(e: Event) {
        const target = e.target as HTMLInputElement;
        filtered = options.filter((opt) => opt.toLowerCase().includes(target.value.toLowerCase()));
    }

    function filterOptions(option: string) {
        if (option) {
            filtered = options.filter((opt) => opt.toLowerCase().includes(option.toLowerCase()));
        } else {
            filtered = options;
        }
    }

    $: filterOptions(value);

    const user = $page.data.session?.user;
</script>

<div class="min-h-screen h-full bg-background overflow-hidden">
    <header class="flex justify-between shadow-base-100 p-4 items-center shadow bg-surface border-b">
        <div class="container mx-auto flex justify-between items-center bg-base-100">
            <div class="flex gap-10 items-center">
                <a href="/">e-com 2</a>
                <div class="flex items-center justify-center">
                    <Input name="input"  type="search" placeholder="Find product"/>
                    <Button type="ghost">Search</Button>
                </div>
            </div>
            {#if !user}
                <Button type="primary" class="w-24" on:click={login}>login</Button>
            {:else}
                <div class="flex gap-2 items-center ">
                    <Button type="link">
                        <a href="/create-product" class="btn btn-ghost">Create product</a>
                    </Button>
                    <Dropdown bind:visible={visible}>
                        <button
                                aria-label="dropdown toggle"
                                slot="trigger"
                                on:click={toggleDropdown}
                                type="button"
                                class="bg-white flex items-center justify-center text-sm rounded-full h-10 w-10 active:hover:animate-none active:hover:scale-95"
                                id="user-menu-button"
                        >
                            <span class="sr-only">Open user menu</span>
                            <img
                                    class="h-8 rounded-full focus-within:brightness-110 hover:brightness-110"
                                    src={user.image}
                                    alt="your avatar"
                            />
                        </button>
                        <Dropdown.Items slot="items">
                            <Dropdown.Items.Item on:click={gotoProfile} label="Profile"/>
                            <Dropdown.Items.Item on:click={logout} label="Logout"/>
                        </Dropdown.Items>
                    </Dropdown>
                </div>
            {/if}
        </div>
    </header>
    <slot/>
</div>
