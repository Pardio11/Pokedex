<script setup lang="ts">
import { defineProps, computed, ref, onMounted } from 'vue';
const props = defineProps(['typePower']);
const type = computed(() => props.typePower);

const typeToColorMap = computed(() => {
    const typePower = props.typePower;

    // Define your color mappings based on type
    switch (typePower) {
        case 'fire':
            return { backgroundColor: '#FD7D24' };
        case 'water':
            return { backgroundColor: '#4592C4' };
        case 'grass':
            return { backgroundColor: '#9BCC50' };
        case 'bug':
            return { backgroundColor: '#729f3f' };
        case 'fairy':
            return { backgroundColor: '#fdb9e9' };
        case 'ghost':
            return { backgroundColor: '#7b62a3' };
        case 'normal':
            return { backgroundColor: '#a4acaf' };
        case 'psychic':
            return { backgroundColor: '#f366b9' };
        case 'steel':
            return { backgroundColor: '#9eb7b8' };
        case 'dark':
            return { backgroundColor: '#707070' };
        case 'fighting':
            return { backgroundColor: '#d56723' };
        case 'electric':
            return { backgroundColor: '#eed535' };
        case 'ice':
            return { backgroundColor: '#51c4e7' };
        case 'poison':
            return { backgroundColor: '#b97fc9' };
        case 'rock':
            return { backgroundColor: '#a38c21' };
        case 'flying':
            return { background: 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)' };
        case 'dragon':
            return { background: 'linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)' };
        case 'ground':
            return { background: 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)' };
        default:
            return '#808080'; // Default color if type is not recognized
    }
});
</script>

<template>
    <div class="flex center tag" :style="typeToColorMap">
        <h6>{{ type }}</h6>
    </div>
</template>

<style scoped>
.tag {

    width: 5rem;
    padding: 0.1rem 0;
    border-radius: 0.2rem;
}

.tag h6 {
    font-weight: 400;
    font-size: smaller;
    text-transform: capitalize;
}
</style>