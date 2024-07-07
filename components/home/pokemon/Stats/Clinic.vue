<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps(["category", "weight", "height", "name", "abilities"]);
const formattedWeight = `${Math.floor(props.weight / 10)},${props.weight % 10} kg`;
const formattedHeight = `${Math.floor(props.height / 10)},${props.height % 10} m`;
const pokemonFemale = ref<[]>([]);
const pokemonMale = ref<[]>([]);
const error = ref<string | null>(null);
const fetchPokemonFemale = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/gender/1/");
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        pokemonFemale.value = data.pokemon_species_details;
    } catch (err) {
        error.value = 'Error fetching data: ' + (err instanceof Error ? err.message : 'Unknown error');
    }
};
const fetchPokemonMale = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/gender/2/");
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        pokemonMale.value = data.pokemon_species_details;
    } catch (err) {
        error.value = 'Error fetching data: ' + (err instanceof Error ? err.message : 'Unknown error');
    }
};

const findPokemonInList = (list: { pokemon_species: { name: string } }[]) => {
    return list.some(detail => detail.pokemon_species.name === props.name);
};

// Computed property to check which list the Pokémon belongs to
const isFemale = computed(() => {
    if (findPokemonInList(pokemonFemale.value)) {
        return true;
    }
    return false;
});

const isMale = computed(() => {
    if (findPokemonInList(pokemonMale.value)) {
        return true;
    }
    return false;
});
onMounted(() => {
    fetchPokemonFemale();
    fetchPokemonMale();
});
</script>
<template>
    <div class="card flex">
        <div>
            <h4>Height</h4>
            <p class="mb">{{ formattedHeight }}</p>
            <h4>Weight</h4>
            <p class="mb">{{ formattedWeight }}</p>
            <h4>Gender</h4>
            <div class="flex gender">
                <img src="/icons/male.png" alt="" v-if="isMale">
                <img src="/icons/female.png" alt="" v-if="isFemale">
                <p v-if="(!isMale && !isFemale)">Unknown</p>
            </div>
        </div>
        <div>
            <h4>Category</h4>
            <div class="flex col category mb">
                <p>{{ category }}</p>
            </div>

            <h4>Abilities</h4>
            <div class="flex col ability">
                <p v-for="ability in abilities">- {{ ability.ability.name }}</p>
            </div>
        </div>
    </div>
</template>



<style scoped>
.mb {
    margin-bottom: 1rem;
}

.card {
    background-color: #30A7D7;
    width: 100%;
    border-radius: 0.4rem;
    padding: 1rem 0rem;
    justify-content: space-around;
}

.card h4 {
    font-weight: 400;
    font-size: medium;
    color: white;
    margin-bottom: 0.4rem
}

.card p {
    font-weight: 500;
    font-size: large;

}

.gender {
    gap: 0.4rem;
}

.gender img {
    width: 2rem;
}

.gender img {
    width: 2rem;
}


.ability p {
    text-transform: capitalize;
}
</style>