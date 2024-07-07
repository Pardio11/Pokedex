<script setup lang="ts">
import { defineProps } from 'vue';

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
    background-color: #9A9A9A;
    border-radius: 0.4rem;
    padding: 0.6rem 2rem;
    gap: 0.4rem;
}

.container h4 {
    font-weight: 500;
    margin-bottom: 0.6rem;
    color: rgb(49, 49, 49);
}

.bars {
    gap: 0.35rem;
    width: 100%;
}
</style>