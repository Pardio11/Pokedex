<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
const props = defineProps(["chain"]);
const speciesList = ref<any[]>([]);

const collectAllSpecies = (chain: any): any[] => {
    const speciesList: any[] = [];

    function traverse(chain: any) {
        speciesList.push(chain.species);
        chain.evolves_to.forEach((evolution: any) => traverse(evolution));
    }

    traverse(chain);
    return speciesList;
};

function extractLastNumber(url: string): number | null {
    const match = url.match(/\/(\d+)\/?$/);
    return match ? parseInt(match[1], 10) : null;
}
onMounted(() => {
    speciesList.value = collectAllSpecies(props.chain);
    console.log(speciesList.value);
});
</script>
<template>
    <div class="card">
        <h3 class="evo">Evolutions</h3>
        <div class="flex center stages">
            <HomePokemonEvolucionStage v-for="(specie, index) in speciesList" :specie="extractLastNumber(specie.url)"
                :isLast="index === speciesList.length - 1" />
        </div>
    </div>
</template>



<style scoped>
.card {
    margin: 0 2rem;
    width: 100%;
    padding: 1rem;
    background-image: url(/evo_bg.png);
    margin-bottom: 3rem;
    color: white;
}

.evo {
    margin-bottom: 1rem;
    font-weight: 500;
}

.stages {
    gap: 1rem;
}

@media (max-width: 768px) {
    .stages {
        flex-direction: column;
    }
}
</style>