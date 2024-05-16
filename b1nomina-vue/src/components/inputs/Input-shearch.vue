<template>
    <div class="buscar">
        <input 
           type="text" 
           :placeholder="Placeholder"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           class="shearch"
        >
        <LupaIcon/>
    </div>
</template>

<script setup>
import LupaIcon from '@/components/icons/Lupa-icon.vue'
import { defineProps } from 'vue';

const props = defineProps({
    Placeholder : {
        type: String,
        default: "Buscar",
    },
    modelValue: {
        type: String,
        default: '',
    },
}) 

</script>

<style scoped>
div.buscar {
    width: 361px;
    height: 49.5px;
    margin: 0;
    display: flex;
    justify-content: start;
    align-items: center;

    position: relative;
}
input.shearch {
    box-sizing: border-box;
    padding: 15px 16px 15px 35px;
    height: 52px;
    font-size: 16px;
    border-radius: 8px;
    border: 2px #4E5FBD solid;
    background-color: white !important;
    color: Black;
    width: 100%;
}
input.shearch::placeholder {
    color: #999999;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
}  

svg {
    position: absolute;
    padding-left: 11px;
}

</style>