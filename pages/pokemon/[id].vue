<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
const route = useRoute()

const error = ref<string | null>(null);
const isLoading = ref(false);
const idNext = ref<string | null>(null);
const nextPokemonName = ref<string | null>(null);
const idPrev = ref<string | null>(null);
const prevPokemonName = ref<string | null>(null);
const pokemonData = ref<any>(null);
const pokemonTypes = ref<any>(null);
const pokemonStats = ref<any>(null);
const pokemonDescriptionRed = ref<string>('');
const pokemonDescriptionBlue = ref<string>('');
const pokemonWeight = ref<string>('');
const pokemonHeight = ref<string>('');
const pokemonName = ref<string>('');
const pokemonAbilities = ref<[]>([]);
const pokemonCategory = ref<string>('');
const pokemonBack = ref<string>('');
const pokemonFront = ref<string>('');

const selectedVersion = ref<'red' | 'blue'>('red'); // Default to 'red' version

const pokemonDescription = computed(() => {
    return selectedVersion.value === 'red' ? pokemonDescriptionRed.value : pokemonDescriptionBlue.value;
});

const selectVersion = (version: 'red' | 'blue') => {
    selectedVersion.value = version;
};

const fetchPokemonData = async () => {
    isLoading.value = true;
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + route.params.id);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        pokemonData.value = data;
        pokemonTypes.value = data.types;
        pokemonStats.value = data.stats;
        pokemonWeight.value = data.weight;
        pokemonHeight.value = data.height;
        pokemonName.value = data.name;
        pokemonAbilities.value = data.abilities;
        pokemonBack.value = data.sprites.back_default;
        pokemonFront.value = data.sprites.front_default;
    } catch (err) {
        error.value = 'Error fetching data: ' + (err instanceof Error ? err.message : 'Unknown error');
    } finally {
        isLoading.value = false;
    }
};

const fetchNextPokemonData = async () => {
    if (Number(route.params.id) == 1025)
        idNext.value = 1;
    else
        idNext.value = Number(route.params.id) + 1;
    console.log(idNext.value);
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + idNext.value);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        nextPokemonName.value = data.name;
    } catch (err) {
        error.value = 'Error fetching data: ' + (err instanceof Error ? err.message : 'Unknown error');
    }
};

const fetchPrevPokemonData = async () => {
    if (Number(route.params.id) == 1)
        idPrev.value = 1025;
    else
        idPrev.value = Number(route.params.id) - 1;

    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + idPrev.value);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        prevPokemonName.value = data.name;
    } catch (err) {
        error.value = 'Error fetching data: ' + (err instanceof Error ? err.message : 'Unknown error');
    }
};
const fetchPokemonDescription = async () => {
    isLoading.value = true;
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + route.params.id);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        pokemonDescriptionRed.value = data.flavor_text_entries[11].flavor_text;
        pokemonDescriptionBlue.value = data.flavor_text_entries[9].flavor_text;
        pokemonCategory.value = data.genera[7].genus.replace('Pokémon', '').trim();;
    } catch (err) {
        error.value = 'Error fetching data: ' + (err instanceof Error ? err.message : 'Unknown error');
    } finally {
        isLoading.value = false;
    }
};
const imgPokemon = computed(() => {

    if (pokemonData.value && pokemonData.value.id) {
        return pokemonData.value.sprites.other['official-artwork'].front_default
    }
    return '';
});

const number = computed(() => {
    return String(route.params.id).padStart(3, '0');
});
onMounted(() => {
    fetchPokemonData();
    fetchPokemonDescription();
    fetchPrevPokemonData();
    fetchNextPokemonData();
});
</script>

<template>
    <div class="flex col center bg">
        <div class="flex arrows">
            <Prev v-if="prevPokemonName && idPrev" :number="idPrev" :name="prevPokemonName" />
            <Next v-if="nextPokemonName && idNext" :number="idNext" :name="nextPokemonName" />
        </div>
        <div class="flex center name">
            <h1>{{ pokemonName }}</h1>
            <h1 class="numbers">#{{ number }}</h1>
        </div>
        <div class="flex allInfo">
            <div class="flex col statsImg">
                <div class="flex center imgContainer">
                    <img class="pokemonImg" :src="imgPokemon" />
                </div>
                <div class="stats">
                    <HomePokemonStats :stats="pokemonStats" />
                </div>
            </div>
            <div class="flex col info">

                <div class="flex col description">
                    <p class="">Pokemon Description: </p>
                    <p class="text">{{ pokemonDescription }}</p>
                </div>
                <div class="flex version">
                    <span>Versions:</span>
                    <img class="pokeball" :class="{ red: selectedVersion === 'red' }" src="/icons/redPokeball.png"
                        @click="selectVersion('red')">
                    <img class="pokeball" :class="{ blue: selectedVersion === 'blue' }" src="/icons/bluePokeball.png"
                        @click="selectVersion('blue')">
                </div>

                <HomePokemonStatsClinic
                    v-if="pokemonWeight && pokemonHeight && pokemonName && pokemonAbilities && pokemonCategory"
                    :weight="pokemonWeight" :height="pokemonHeight" :name="pokemonName" :abilities="pokemonAbilities"
                    :category="pokemonCategory" class="clinic" />
                <div class="flex col type">
                    <h4>Type</h4>
                    <div class="flex types">
                        <HomePokemonTags v-for="typePower in pokemonTypes" :typePower="typePower.type.name"
                            :big="true" />
                    </div>
                </div>
                <div class="flex col type">
                    <h4 class="">Angles</h4>
                    <div class="flex angles">
                        <img :src="pokemonFront" />
                        <img :src="pokemonBack" />
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.bg {
    background-image: url(/container_bg.png);
    background-position: center;
    background-repeat: repeat;
}

.arrows {
    width: 100%;
    gap: 0.3rem;
}

.name {
    gap: 1rem;
    margin: 1rem 0;
    text-transform: capitalize;
}

.name h1 {
    font-weight: 500;
    font-size: 2.3em;

}

.numbers {
    color: rgb(97, 97, 97);
}

.allInfo {
    max-width: 50rem;
    justify-content: center;
    gap: 1.2rem;
    padding: 0 2rem;
}

.statsImg {
    align-items: end;
    gap: 1rem;
    max-width: 26rem;
}

.info {
    position: relative;
}

.description {
    margin-top: 1rem;
    font-size: large;
    font-weight: 500;
    gap: 0.4rem;
}

.description .text {
    font-weight: 400;
}

.pokeball {
    width: 1.8rem;
    border-radius: 100%;
    padding: 0.1rem;
    border: 0.2rem #00000000 solid;
}

.red {
    border: 0.2rem #DD2D51 solid;
}

.blue {
    border: 0.2rem #0072B0 solid;
}

.types {
    margin-top: 0.6rem;
    gap: 0.4rem;
}

.stats {
    width: 100%;
}

.clinic {
    margin: 1rem 0;
}

.version {
    margin: 1rem 0;
    font-size: large;
    font-weight: 500;
    align-items: center;
    gap: 0.8rem;
}

.type {
    margin: 1rem 0;
}

.type h4 {
    font-weight: 500;
    font-size: large;
}

.weak {
    margin: 1rem 0;
}

.imgContainer {
    background-color: #F2F2F2;
    width: 100%;
    height: auto;
    border-radius: 0.4rem;
}

.imgContainer img {
    width: 100%;
}

.angles {
    gap: 1.8rem;
}

.angles img {
    width: 8rem;
    margin: -1.6rem;
}

@media (max-width: 978px) {}

@media (max-width: 678px) {
    .allInfo {
        flex-direction: column;
        align-items: center;
        padding: 0 3rem;
    }

    .info {
        width: 100%;
    }

    .statsImg {
        width: 100%;
    }
}

@media (max-width: 568px) {}
</style>