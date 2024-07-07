<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps(['stats']);
let level = props.stats.base_stat;
const formattedName = props.stats.stat.name.replace(/-/g, ' ');
// Compute which bars should be colored based on the level
const barsToColor: Array<number> = [];
for (let index = 15; index >= 1; index--) {
    if (index >= 14) {
        if (level >= 10) {
            level -= 10;
            barsToColor.push(index);
        }
    } else {
        if (level >= 20) {
            level -= 20;
            barsToColor.push(index);
        }
    }
}
</script>

<template>
    <div class="flex col column">
        <div v-for="index in 15" :key="index" :id="'bar-' + index"
            :class="['bar', barsToColor.includes(index) ? 'colored' : '']">
        </div>
        <p>{{ formattedName }}</p>
    </div>
</template>

<style scoped>
.column {
    gap: 0.2rem;
    width: 100%;
    align-items: center;
}

.column p {
    margin: 0;
    font-size: small;
    font-weight: 500;
    text-transform: capitalize;
}

.bar {
    background-color: #FFFFFF;
    width: 100%;
    height: 0.5rem;
}

.colored {
    background-color: #30A7D7;
    width: 100%;
    height: 0.5rem;
}
</style>