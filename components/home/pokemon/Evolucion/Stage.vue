<script setup lang="ts">
const props = defineProps(["specie", "isLast"]);

const error = ref<string | null>(null);
const pokemonTypes = ref<any>(null);
const pokemonName = ref<string>('');
const pokemonImg = ref<string>('');
const fetchPokemonDescription = async () => {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + props.specie);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        pokemonTypes.value = data.types;
        pokemonName.value = data.name;
        pokemonImg.value = data.sprites.other['official-artwork'].front_default;
    } catch (err) {
        error.value = 'Error fetching data: ' + (err instanceof Error ? err.message : 'Unknown error');
    }
};
const number = computed(() => {
    return String(props.specie).padStart(3, '0');
});
onMounted(() => {
    fetchPokemonDescription();
});
</script>
<template>
    <div class="flex step">
        <NuxtLink :to="`/pokemon/${specie}`">
            <div class="stage flex col">
                <div class="pokemon flex center">
                    <img :src="pokemonImg" alt="">
                </div>
                <div class="flex id">
                    <h3 class="name">{{ pokemonName }}</h3>
                    <h3 class="number">#{{ number }}</h3>
                </div>
                <div class="flex types">
                    <HomePokemonTags v-for="typePower in pokemonTypes" :typePower="typePower.type.name" :big="false" />
                </div>
            </div>
        </NuxtLink>
        <div v-if="!isLast" class="flex next center">
            <img class="arrow" src="/icons/step.png" />
        </div>
        <div v-if="!isLast" class="flex down center">
            <img class="arrow" src="/icons/downArrow.png" />
        </div>
    </div>
</template>
<style scoped>
.step h3 {
    color: white;
}

.stage {
    align-items: center;
}

.pokemon {
    width: 8.5rem;
    height: 8.5rem;
    border-radius: 100%;
    background-color: #565656;
    border: white solid 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    ;
    margin-bottom: 0.8rem;
}

.pokemon img {
    width: 7.5rem;
    height: 7.5rem;
}

.id {
    gap: 0.5rem;
}

.name {
    font-weight: 400;
    font-size: large;
    text-transform: capitalize;
}

.number {
    color: #A4ACAF;
    font-weight: 300;
    font-size: large;
}

.types {
    gap: 0.4rem;
}

.next {
    height: 8.5rem;
    width: fit-content;
}

.down {
    display: none;
}

.down .arrow {
    margin-top: 1rem;
}

.arrow {
    width: 4rem;
    height: 4rem;
}

@media (max-width: 768px) {
    .next {
        display: none;
    }

    .down {
        display: flex;
        height: 6rem;
        width: fit-content;
    }

    .step {
        flex-direction: column;
        align-items: center;
    }
}
</style>