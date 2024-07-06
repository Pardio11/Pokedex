<script setup lang="ts">
import { ref, onMounted } from 'vue';

const MAX_POKEMON = 1025;

const pokemonList = ref<any | null>([]);
const allPokemonList = ref<any[]>([]);
const isLoading = ref(false);
const invert = ref<boolean>(false);
const error = ref<string | null>(null);
const next = ref<string | null>(null);

const fetchPokemonData = async (url: string, reset: boolean, order = "") => {
    try {
        if (pokemonList.value.length === 0 || reset) {
            isLoading.value = true; // Set isLoading to true only if pokemonList.value is empty
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        if (reset) {
            pokemonList.value = [];
        }

        if (invert.value === true) {
            pokemonList.value.push(...data.results.reverse());
            next.value = data.previous;
        } else {
            pokemonList.value.push(...data.results);
            next.value = data.next;
            if (next.value !== null) {
                const urlParams = new URLSearchParams(new URL(next.value).search);
                const currentOffset = parseInt(urlParams.get('offset') || '0');
                const limit = parseInt(urlParams.get('limit') || '20');
                const newLimit = calculateNextOffset(currentOffset, limit);

                if (limit !== newLimit) {
                    next.value = `https://pokeapi.co/api/v2/pokemon?offset=${currentOffset}&limit=${newLimit}`;
                    if (newLimit <= 0) {
                        next.value = null;
                    }
                }
            }
        }

        if (order === "A-Z") {
            pokemonList.value.sort((a: any, b: any) => a.name.localeCompare(b.name));
            next.value = 'add';
        }

        if (order === "Z-A") {
            pokemonList.value.sort((a: any, b: any) => b.name.localeCompare(a.name));
            next.value = 'add';
        }
        if (order === "mix") {
            shuffleArray(pokemonList.value);
            next.value = 'add';
        }

    } catch (err) {
        error.value = 'Error fetching data: ' + (err instanceof Error ? err.message : 'Unknown error');
    } finally {
        isLoading.value = false; // Set isLoading to false after the fetch operation completes
    }
};

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};
const sort = async (value: number) => {
    console.log(value);
    if (value == 1) {
        fetchPokemonData('https://pokeapi.co/api/v2/pokemon', true);
        invert.value = false;
    }
    if (value == 2) {
        fetchPokemonData('https://pokeapi.co/api/v2/pokemon?offset=1005&limit=20', true);
        invert.value = true;
    }
    if (value == 3) {
        await fetchPokemonData('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025', true, "A-Z");
        allPokemonList.value = pokemonList.value;
        pokemonList.value = allPokemonList.value.splice(0, 20);
    }
    if (value == 4) {
        fetchPokemonData('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025', true, "Z-A");
        allPokemonList.value = pokemonList.value;
        pokemonList.value = allPokemonList.value.splice(0, 20);
    }
}

const mix = async () => {
    await fetchPokemonData('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025', true, "mix");
    allPokemonList.value = pokemonList.value;
    pokemonList.value = allPokemonList.value.splice(0, 20);
}

const loadMore = async () => {
    if (next.value == 'add') {
        pokemonList.value.push(...allPokemonList.value.splice(0, 20));
        if (allPokemonList.value.length == 0) {
            next.value = null
        }
    }
    else {
        if (next.value) {
            await fetchPokemonData(next.value, false);
        }
    }
};

function calculateNextOffset(currentOffset: number, limit: number): number {
    const newOffset = currentOffset + limit;
    return newOffset > MAX_POKEMON ? MAX_POKEMON - currentOffset : limit;
}

onMounted(() => {
    fetchPokemonData('https://pokeapi.co/api/v2/pokemon', false); // Fetch data for Pokémon ID 1 (Bulbasaur)
});
</script>

<template>
    <HomeSearch />
    <HomeAdvance />
    <div class="bottom flex col">
        <HomeFilter @callSort="sort" @callMix="mix" />
        <div class="list" v-if="!isLoading">
            <HomePokemonCard v-for="pokemon in pokemonList" :pokemon="pokemon" />
        </div>
        <div class="flex center load" v-else>
            <Loader />
        </div>

        <div class="flex center">
            <button class="loadBtn" @click="loadMore" v-if="next">Load more Pokemon</button>
        </div>
    </div>
</template>
<style scoped>
.bottom {
    padding: 0 4rem;
}



.list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));

    gap: 10px;
    margin-top: 1.6rem;
}

.loadBtn {
    color: white;
    background-color: #30A7D7;
    width: fit-content;
    border: none;
    border-radius: 0.4rem;
    padding: 1rem 2rem;
    font-size: medium;
    margin: 2rem 0;
    cursor: pointer;
    transition: all 0.2s;
}

.loadBtn:hover {
    background-color: #1B82B1;
}

.load {
    width: 100%;
    height: 100%;
}
</style>