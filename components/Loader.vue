<template>
    <svg class="spinner" width="100px" height="100px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

        <circle cx='50' cy='50' r='45' fill='white' stroke-width='6' stroke='gray'>
        </circle>
        <circle cx='50' cy='50' r='15' stroke-width='8' stroke='gray' fill='white'>
        </circle>
        <line x1='3' y1='50' x2='35' y2='50' stroke-width='8' stroke='gray'></line>
        <line x1='65' y1='50' x2='97' y2='50' stroke-width='8' stroke='gray'></line>
    </svg>
</template>


<style scoped>
.spinner {
    animation: rotate 1s ease-in-out infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    80% {
        transform: rotate(360deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>