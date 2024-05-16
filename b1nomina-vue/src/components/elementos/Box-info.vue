<template>
    <!-- Utiliza :style para aplicar dinámicamente el color del prop 'color' al div -->
    <div class="contend" :style="{ backgroundColor: color }">
        <span>
            <slot name="Titulo">

            </slot>
        </span>
        <h2>
            <slot name="Texto">

            </slot>
        </h2>
        <div>
            <slot name="General"></slot>
        </div>
    </div>
</template>

<script setup>
import {defineProps} from 'vue';
const props = defineProps({
    color: {
        String,
        default: "rgba(0, 112, 25, 0.20)"
    }
});

</script>

<style scoped>
div.contend {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width:  410px;
    padding: 24px;
    height: 145;
    box-sizing: border-box;
    border-radius: 6px;
}

div.contend > span {
    font-size: 18px;
    font-family: Poppins;
    font-weight: 600;
    line-height: 40px;
    word-wrap: break-word;
    align-items: center;
    display: flex;
    gap: 12px;
}

div.contend > h2 {
    color: black; 
    font-size: 2.5rem; 
    font-family: Poppins; 
    font-weight: 400;
    line-height: 2rem;
    word-wrap: break-word;
    margin: 0;
    align-items: center;
    display: flex;
    gap: 12px;
}

div.contend > div {
    display: flex;
    flex-direction: column;
}
</style>