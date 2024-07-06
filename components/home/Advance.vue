<script setup lang="ts">

</script>
<template>
    <div class="bar flex">
        <div class="tab">
            <div class="content flex center">
                <span>Show Advanced Search</span>
                <NuxtImg class="downIcon" src="/icons/down.png" alt="Advanced" />
            </div>
        </div>
    </div>

</template>



<style scoped>
.bar {
    position: relative;
    background-color: #565656;
    height: 2rem;
    width: 100%;
}

.tab {
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 100%;
    color: white;
    width: 15rem;
    border-top: 20px solid #565656;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
}

.tab .content {
    justify-content: center;
    width: 100%;
    margin-top: -25px;
    gap: 0.5rem;
}

.downIcon {
    width: 1.2rem;
    height: 1.2rem;
}
</style>