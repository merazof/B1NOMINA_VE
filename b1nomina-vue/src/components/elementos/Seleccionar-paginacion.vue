<template>
    <div class="contend">
        <span>
            Empleados por página:
        </span>
        <ListaTemplate
            v-model="Numero"
            :options="Opciones"      
            optionsSelected="12"
        />
    </div>
</template>

<script setup>
import ListaTemplate from '@/components/listas/Lista-template.vue'
import { ref, watch, defineEmits } from 'vue';

const emit = defineEmits([
    'valorSelecionado'
])
const Numero = ref(0)

const Opciones = [

    {
        id: 24, 
        nombre: 24
    },
    {
        id: 36, 
        nombre: 36
    },
    {
        id: 50, 
        nombre: 50
    }
]

watch(Numero, (newValue) => {
    if(newValue == ''){
        emit('valorSelecionado', 12)
    } else {
        emit('valorSelecionado', newValue)
    }
    
});
</script>

<style scoped>
.contend {
    display: flex;
    align-items: center;
    gap: 12px;

}

.contend > span {
    color: black;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
}
</style>