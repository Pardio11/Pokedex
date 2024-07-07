<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

const props = defineProps(['name', 'number']);

const numberZeros = computed(() => {
    return String(props.number).padStart(3, '0');
});
</script>

<template>
    <NuxtLink :to="`/pokemon/${number}`" class="next flex ">

        <h3>{{ name }} #{{ numberZeros }}</h3>
        <img src="/icons/next.png" alt="next">
        <div class="curva">

        </div>
    </NuxtLink>
</template>


<style scoped>
a {
    text-decoration: none;
}

.next {
    position: relative;
    width: 100%;
    height: 3rem;
    background-color: #A4A4A4;
    color: white;
    gap: 1.5rem;
    justify-content: end;
    align-items: center;
    transition: all 0.2s ease-out;
    text-transform: capitalize;
}

.next:hover {
    background-color: #30A7D7;
}

.next:hover .curva {
    background: url("/curvaNextBlue.png") no-repeat 0 0;
}

.next img {
    width: 2rem;
    margin-right: 1rem;
}

.curva {
    transition: all 0.2s ease-out;
    background: url("/curvaNext.png") no-repeat 0 0;
    top: 100%;
    right: 0;
    position: absolute;
    height: 52px;
    width: 75px
}
</style>