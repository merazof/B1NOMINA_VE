<template>
    <div class="conted-barra-progreso">
        <span>{{porcentaje}}%</span>
        <div class="contend-progress">
            <div :style="{ width: porcentaje + 'px' }" class="progress"> </div>                       
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    porcentaje: {
        type: [Number, String],
        default: 0
    }
});

</script>

<style scoped>
div.conted-barra-progreso {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: center;
    justify-content: center;
    gap: 12px;
}

div.contend-progress {
    width: 80px;
    height: 9px;
    background-color: #D9D9D9;
    border-radius: 6px;
    box-sizing: content-box;
}

div.progress {
    box-sizing: border-box;
    background: #18B055;
    border-radius: 6px; 
    height: 9px;
    width: 0%;
    max-width: 100%;
    min-width: 0%;
}

span {
    color: #363855;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
    margin: 0;
}
</style>