<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineEmits } from 'vue';

const emit = defineEmits<{
    (e: 'callSort', parameter: number): void;
    (e: 'callMix'): void;
}>();
const dropdownOpen = ref(false);
const selectedOption = ref({ text: 'Lowest Number (First)', value: 1 });
const options = ref([
    { value: 1, text: 'Lowest Number (First)' },
    { value: 2, text: 'Highest Number (First)' },
    { value: 3, text: 'A-Z' },
    { value: 4, text: 'Z-A' },
]);

const toggleDropdown = (event: Event) => {
    event.stopPropagation();
    dropdownOpen.value = !dropdownOpen.value;
};

const selectOption = (option: { value: number; text: string }) => {
    selectedOption.value = option;
    dropdownOpen.value = false;
    callSort(option.value);
};

const closeDropdown = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select')) {
        dropdownOpen.value = false;
    }
};

function callSort(parameter: number) {
    emit('callSort', parameter); // Emit the event with the parameter
}

onMounted(() => {
    document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
});
</script>
<template>
    <div class="flex filter">
        <button class="refreshBtn flex" @click="emit('callMix')">
            <NuxtImg class="refreshIcon" src="/icons/refresh.png" />
            <span>Suprise Me!</span>
        </button>
        <div class="flex sort ">
            <span class="sortText">Sort By</span>

            <div class="custom-select">
                <div class="select-selected" @click="toggleDropdown">
                    <NuxtImg src="/icons/pokeball.png" class="pokeball" />
                    <span class="option-text">{{ selectedOption.text }}</span>
                    <NuxtImg :src="dropdownOpen ? 'icons/upArrow.png' : '/icons/downArrow.png'" class="arrow" />
                </div>
                <div class="select-options" v-show="dropdownOpen">
                    <div v-for="option in options" :key="option.value" class="select-option"
                        @click="selectOption(option)">
                        <span class="option-text">{{ option.text }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.filter {
    margin-top: 2.8rem;
    align-items: center;
}

.refreshBtn {
    align-items: center;
    gap: 1rem;
    height: fit-content;
    padding: 0.7rem 5rem;
    width: fit-content;
    color: white;
    background-color: #30A7D7;
    border-radius: 0.4rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
}

.refreshBtn:hover {
    background-color: #1B82B1;
}

.refreshBtn span {
    font-size: large;
    font-family: Exo;
}

.refreshIcon {
    width: 1.6rem;
}

.filter {
    justify-content: space-between;
}

.sort {
    align-items: center;
    gap: 1rem;
}

.sortText {
    color: rgb(164, 164, 164);
    font-size: 1.4em;
    font-weight: 500;
}

.custom-select {
    position: relative;
    width: 20rem;
}

.select-selected {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: white;
    background-color: #313131;
    padding: 0.4rem 0;
    border-radius: 0.4rem;
}

.pokeball {
    width: 2rem;
    margin: 0 0.6rem;
}

.arrow {
    width: 1.6rem;
    margin-left: auto;
    margin-right: 0.6rem;
}

.option-text {
    font-weight: 400;
    font-size: medium;
}

.select-options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    color: white;
    background-color: #616161;

}

.select-option {
    display: flex;
    align-items: center;
    padding: 0.3rem 0.8rem;
    cursor: pointer;
}

.select-option:hover {
    background-color: #313131;
}

@media (max-width: 978px) {
    .sort {
        flex-direction: column;
        gap: 0.2rem;
        align-items: start;
    }

    .filter {
        align-items: end;
    }

    .refreshBtn {

        padding: 0.7rem 2rem;

    }

}

@media (max-width: 678px) {
    .filter {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .refreshBtn {
        width: 100%;
        justify-content: center;
    }

    .sort {
        flex-direction: row;
        gap: 1rem;
        align-items: center;
    }

    .greenBox {
        width: 100%;
    }
}

@media (max-width: 568px) {
    .sort {
        flex-direction: column;
        gap: 0.2rem;
        align-items: start;
    }
}
</style>