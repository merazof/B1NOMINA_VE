<template>
    <button class="menu-button">
        <MenuIconvue />
    </button>
</template>

<script setup>
import MenuIconvue from '@/components/icons/Menu-icon.vue';
</script>

<style scoped>

button.menu-button {
    width: 60.50px;
    height: 53px;
    padding: 16px;
    background: #1A2771;
    border-radius: 8px;
    border: 1px none;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    display: inline-flex;
    cursor: pointer;

}

button.menu-button:hover {
    background: #212d70;
}

</style>