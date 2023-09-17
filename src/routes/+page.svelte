<script lang="ts">
    import {appStore} from '$lib/store';
    import {api} from '$lib/trpc';
    import {onMount} from 'svelte';
    import {Autocomplete, InputNumber, Rating, Select} from "stwui";
    import {HeartIcon} from "lucide-svelte"

    async function fetchAllProducts() {
        $appStore.products = await api.getAllProducts.query();
    }

    // locations

    let locationFilter: string;
    let locations = ['Warsaw', 'Wroclaw', 'Krakow', 'Gdansk', 'Poznan'];
    let filteredLocations = locations;
    function filterLocations(e: Event) {
        const target = e.target as HTMLInputElement;
        filteredLocations = locations.filter((opt) => opt.toLowerCase().includes(target.value.toLowerCase()));
    }
    function filterLocationOptions(locationOption: string) {
        if (locationOption) {
            filteredLocations = locations.filter((opt) => opt.toLowerCase().includes(locationOption.toLowerCase()));
        } else {
            filteredLocations = locations;
        }
    }
    $: filterLocationOptions(locationFilter);

    // categories
    let categoryFilter: string;
    let categories = ['Toys', 'Cosmetics', 'Electronics'];
    let filteredCategories = categories;
    function filterCategories(e: Event) {
        const target = e.target as HTMLInputElement;
        filteredCategories = categories.filter((opt) => opt.toLowerCase().includes(target.value.toLowerCase()));
    }
    function filterCategoriesOptions(categoryOption: string) {
        if (categoryOption) {
            filteredCategories = categories.filter((opt) => opt.toLowerCase().includes(categoryOption.toLowerCase()));
        } else {
            filteredCategories = categories;
        }
    }
    $: filterCategoriesOptions(categoryFilter);

    onMount(fetchAllProducts);
</script>

<div class="flex gap-10 m-10">
    <nav class="w-[300px] h-[80vh] bg-surface p-4 flex flex-col gap-4">
        <div class="flex flex-col">
            <h4>Categories</h4>
            <Autocomplete
                    name="autocomplete"
                    placeholder="Search for a location"
                    bind:value={categoryFilter}
                    on:input={filterCategories}
                    {categories}
            >
                <Autocomplete.Options slot="options">
                    {#if filteredCategories.length > 0}
                        {#each filteredCategories as option}
                            <Autocomplete.Options.Option {option}/>
                        {/each}
                    {:else}
                        <Autocomplete.Options.EmptyOption/>
                    {/if}
                </Autocomplete.Options>
            </Autocomplete>
        </div>

        <div class="flex flex-col">
            <h4>Product rating</h4>
            <Rating name="rating" size="md" class="mt-2 text-yellow-700"/>
        </div>

        <div class="flex flex-col">
            <h4>Location</h4>
            <Autocomplete
                    name="autocomplete"
                    placeholder="Search for a location"
                    bind:value={locationFilter}
                    on:input={filterLocations}
                    {locations}
            >
                <Autocomplete.Options slot="options">
                    {#if filteredLocations.length > 0}
                        {#each filteredLocations as option}
                            <Autocomplete.Options.Option {option}/>
                        {/each}
                    {:else}
                        <Autocomplete.Options.EmptyOption/>
                    {/if}
                </Autocomplete.Options>
            </Autocomplete>
        </div>

        <div class="flex flex-col">
            <h4>Price</h4>

            <div class="flex flex-col gap-3 pt-1">
                <InputNumber class="w-full" name="price" placeholder="0">
                    <InputNumber.Label slot="label">Starting from</InputNumber.Label>
                </InputNumber>
                <InputNumber class="w-full" name="price" placeholder="Infinity">
                    <InputNumber.Label slot="label">Up to</InputNumber.Label>
                </InputNumber>
            </div>

        </div>

        <div class="flex flex-col">
            <h4>Condition</h4>

            <div class="flex flex-col gap-3 pt-1">
                <Select name="select-1" placeholder="Any">
                    <Select.Options slot="options">
                        <Select.Options.Option option={{
                            value: 'any',
                            label: 'Any'
                        }}/>
                        <Select.Options.Option option={{
                            value: 'new',
                            label: 'New'
                        }}/>
                        <Select.Options.Option option={{
                            value: 'used',
                            label: 'Used'
                        }}/>
                    </Select.Options>
                </Select>
            </div>

        </div>

    </nav>
    <div class="mx-auto w-[50vw] bg-surface layflex-1">
        {#each $appStore.products as product}
            <div class="border-b p-4 rounded-md my-2 flex hover:bg-default-hover/50 ">
                <img alt="product preview" src={product.previewImage} class="w-32 h-32 m-2"/>
                <div class="flex gap-2 flex-col flex-1 hover:cursor-pointer">
                    <div class="text-3xl">{product.title}</div>
                    <Rating disabled class="text-yellow-700" value={4} name="rating" size="md"/>
                </div>
                <div class="flex gap-24 border-l pl-4 w-72 justify-between">
                    <div class="text-2xl font-medium">{product.price} EURO</div>
                    <HeartIcon class="cursor-pointer hover:rotate-12"/>
                </div>
            </div>
        {/each}
    </div>
</div>
