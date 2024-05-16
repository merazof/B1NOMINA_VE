<template>
    <div class="pagination">
        <!--Boton de Previo-->
        <PaginateButton v-if="paginaSeleccionada > 1" @click="controlpagina(paginaSeleccionada - 1)">
            <template #icono>
                <img src="@/components/icons/svg/OneLeft-icon.svg" alt="Prev"> 
            </template>
        </PaginateButton>

        <Paginate-button v-if="paginaSeleccionada > 2" :texto="1" @click="controlpagina(1)"/>
            
        <Paginate-button v-if="paginaSeleccionada > 3" :texto="'...'"/>
        
        <PaginateButton v-for="number in paginasCenter" :key="number" :texto="number" :activate="paginaSeleccionada == number" @click="controlpagina(number)" />

        <Paginate-button v-if="paginaSeleccionada < totalPaginas - 2" :texto="'...'"/>

        <Paginate-button v-if="paginaSeleccionada < totalPaginas - 1" :texto="totalPaginas" @click="controlpagina(totalPaginas)"/>

        <PaginateButton  v-if="paginaSeleccionada < totalPaginas" @click="controlpagina(paginaSeleccionada + 1)" >
            <template #icono>
                <img src='@/components/icons/svg/OneRigth-icon.svg' alt="Next">  
            </template>
        </PaginateButton>
    </div>
</template>

<script setup>
    import PaginateButton from '@/components/botones/Paginate-button.vue';

    import { defineProps, ref, computed, watch, defineEmits  } from 'vue';

    const emit = defineEmits([
        'NumeroSelecionado',
    ])

    const props = defineProps({
        totalPaginas: {
            Number,
            default: 1
        }
    })


    const paginaSeleccionada = ref(1)

    const paginasPrevias = ref(paginaSeleccionada.value - 1);
    const paginasPosteriores = ref(paginaSeleccionada.value + 1);

    const controlpagina = (newvalor) => {
        if ( 1 <= newvalor && newvalor <= props.totalPaginas) {
            paginaSeleccionada.value = newvalor;
            emit('NumeroSelecionado', newvalor)
        }
        
    };

    watch(paginaSeleccionada, (newvalor) => {

        paginasPrevias.value = newvalor - 1;
        paginasPosteriores.value = newvalor + 1;    
    })

    const paginasCenter = computed(() => {
    const paginasArray = [];
    for (let pagina = paginasPrevias.value; pagina <= paginasPosteriores.value; pagina++) {
        if ( 1 <= pagina && pagina <= props.totalPaginas) {
            paginasArray.push(pagina);
        }
    
    }
    return paginasArray;
    });

</script>

<style scoped>
    div.pagination {
        display: flex;
        width: fit-content;
    }
</style>