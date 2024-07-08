<script setup lang="ts">
const props = defineProps(["stats"]);
</script>
<template>
    <div class="container flex col">
        <h4>Stats</h4>
        <div class="flex bars">
            <HomePokemonStatsColumn v-for="stat in stats" :stats="stat" />
        </div>
    </div>
</template>


<style scoped>
.container {
    background-color: #a6a6a6;
    border-radius: 0.4rem;
    padding: 0.6rem 1rem;
    gap: 0.4rem;
}

.container h4 {
    font-weight: 500;
    margin-bottom: 0.6rem;
    color: rgb(49, 49, 49);
}

.bars {
    gap: 0.3rem;
    width: 100%;
}
</style>