<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

const props = defineProps(['pokemon']);
const pokemon = computed(() => props.pokemon);

const error = ref<string | null>(null);
const isLoading = ref(false);
const pokemonData = ref<any>(null); // Adjust the type as per your actual data structure
const pokemonTypes = ref<any>(null);
const fetchPokemonData = async () => {
    isLoading.value = true;
    try {
        const response = await fetch(pokemon.value.url);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        pokemonData.value = data;
        pokemonTypes.value = data.types;
        console.log(pokemonData.value.sprites.front_default)
    } catch (err) {
        error.value = 'Error fetching data: ' + (err instanceof Error ? err.message : 'Unknown error');
    } finally {
        isLoading.value = false;
    }
};

const number = computed(() => {
    if (pokemonData.value && pokemonData.value.id) {
        return String(pokemonData.value.id).padStart(3, '0');
    }
    return '';
});

const imgPokemon = computed(() => {

    if (pokemonData.value && pokemonData.value.id) {
        return pokemonData.value.sprites.front_default
        return "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/" + String(pokemonData.value.id).padStart(3, '0') + ".png";
    }
    return '';
});

onMounted(fetchPokemonData);
watch(pokemon, (newPokemon, oldPokemon) => {
    // Check if the URL has actually changed to avoid unnecessary fetches
    if (newPokemon.url !== oldPokemon.url) {
        fetchPokemonData();
    }
});
</script>

<template>
    <div class="flex col card" tabindex="0">
        <div class="flex center imgContainer">
            <img class="pokemonImg" :src="imgPokemon" />
        </div>
        <h6 class="number">#{{ number }}</h6>
        <h2 class="name">{{ pokemon.name }}</h2>
        <div class="flex types">
            <HomePokemonTags v-for="typePower in pokemonTypes" :typePower="typePower.type.name" />
        </div>
    </div>
</template>

<style scoped>
.card {
    height: fit-content;
    width: fit-content;
    gap: 0;
    padding: 0.3rem;
    border-radius: 0.4rem;
    cursor: pointer;
    margin: 1.4rem 0;
    border: 2px solid rgba(0, 0, 0, 0);
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
}

.card:focus {
    border: 2px solid black;

}

.imgContainer {
    background-color: #F2F2F2;
    width: 16rem;
    height: 16rem;
    border-radius: 0.4rem;
}

.number {
    letter-spacing: 0.05em;
    margin-top: 0.2rem;
    font-weight: 400;
    font-size: small;
    color: rgb(49, 49, 49);
}

.types {
    gap: 0.4rem;
}

.name {
    font-weight: 500;
    font-size: larger;
    letter-spacing: 0.02em;
    margin-top: 0.4rem;
    margin-bottom: 0.3rem;
    text-transform: capitalize;
}

.pokemonImg {
    width: 100%;
    height: 100%;
}
</style>