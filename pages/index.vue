<script setup lang="ts">
import { ref, onMounted } from 'vue';

const pokemonList = ref<any | null>([]);
const allPokemonList = ref<any[]>([]);
const pendingPokemonList = ref<any[]>([]);
const isLoading = ref(false);
const sortValue = ref(1);
const invert = ref<boolean>(false);
const error = ref<string | null>(null);

const fetchPokemonData = async (url: string) => {
    try {

        isLoading.value = true;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        allPokemonList.value.push(...data.results);
        pendingPokemonList.value = [...allPokemonList.value];
        pokemonList.value = pendingPokemonList.value.splice(0, 1025);
    } catch (err) {
        error.value = 'Error fetching data: ' + (err instanceof Error ? err.message : 'Unknown error');
    } finally {
        isLoading.value = false;
    }
};

const editPokemonList = (reset: boolean, order = "") => {
    if (reset) {
        pendingPokemonList.value = [...allPokemonList.value];
        pokemonList.value = [];
    }

    if (invert.value === true) {
        pendingPokemonList.value.reverse();
    }

    if (order === "A-Z") {
        pendingPokemonList.value.sort((a: any, b: any) => a.name.localeCompare(b.name));
    }

    if (order === "Z-A") {
        pendingPokemonList.value.sort((a: any, b: any) => b.name.localeCompare(a.name));
    }
    if (order === "mix") {
        shuffleArray(pendingPokemonList.value);
    }
    pokemonList.value = pendingPokemonList.value.splice(0, 1025);
};

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const sort = (value: number, reset = true) => {
    sortValue.value = value;
    if (value == 1) {
        invert.value = false;
        editPokemonList(reset);
    }
    if (value == 2) {
        invert.value = true;
        editPokemonList(reset);
    }
    if (value == 3) {
        editPokemonList(reset, "A-Z");
    }
    if (value == 4) {
        editPokemonList(reset, "Z-A");
    }
}

const mix = () => {
    editPokemonList(true, "mix");
}

const search = (searchTerm: String) => {
    if (searchTerm.trim() != '') {
        pendingPokemonList.value = [...allPokemonList.value];
        const filteredPokemon = pendingPokemonList.value.filter((pokemon: any) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        pendingPokemonList.value = filteredPokemon;
        sort(sortValue.value, false);
    }
}
const loadMore = () => {
    if (pendingPokemonList.value.length > 0) {
        pokemonList.value.push(...pendingPokemonList.value.splice(0, 1025));
    }
};


onMounted(async () => {
    await fetchPokemonData('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025');
});
</script>

<template>
    <HomeSearch @callSearch="search" />
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
            <button class="loadBtn" @click="loadMore" v-if="pendingPokemonList.length > 0">Load more Pokemon</button>
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
    justify-items: center;
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