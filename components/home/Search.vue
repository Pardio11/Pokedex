<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emit = defineEmits<{
    (e: 'callSearch', searchTerm: string): void;
}>();

const searchTerm = ref('');

const emitSearch = () => {
    // Emit the 'search' event with the searchTerm value
    emit('callSearch', searchTerm.value);
}
</script>

<template>
    <div class="flex top">
        <div class="flex col">
            <label class="searchLabel">
                Name or Number
            </label>
            <div class="flex searchBar">
                <input type="text" v-model="searchTerm">
                <button class="flex center" @click="emitSearch">
                    <!-- Replace with your search icon -->
                    <img class="searchImg" src="/icons/search.png" alt="search" />
                </button>
            </div>
            <p>Use the Advanced Search to explore Pokemon by type,
                weakness, Ability, and more!</p>
        </div>
        <div class="flex center">
            <div class="greenBox">
                Search for a Pokemon by name or using its
                National Pokedex number.
            </div>
        </div>
    </div>
</template>

<style scoped>
.top {
    justify-content: space-between;
    color: white;
    background-color: #2B2B2B;
    padding: 2rem;
    gap: 4rem;
}

.searchLabel {
    font-family: Rajdhani;
    font-size: x-large;
    margin-bottom: 0.3rem;
}

.searchBar {
    gap: 0.8rem;
}

.searchBar input {
    width: 60%;
    border: #565656 solid 0.2rem;
    border-radius: 0.3rem;
}

.searchBar button {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #F2663F;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
}

.searchImg {
    width: 1.4rem;
}

.greenBox {
    background-color: #39A455;
    padding: 1rem;
    border-radius: 0.3rem;
}

@media (max-width: 678px) {
    .top {
        flex-direction: column;
        gap: 1rem;
    }

    .searchBar input {
        width: 100%;

    }

    .greenBox {
        width: 100%;
    }
}

@media (max-width: 678px) {
    .top {
        flex-direction: column;
        gap: 1rem;
        padding: 2rem 2.5rem;
    }

    .searchBar input {
        width: 100%;

    }

    .greenBox {
        width: 100%;
    }
}
</style>
