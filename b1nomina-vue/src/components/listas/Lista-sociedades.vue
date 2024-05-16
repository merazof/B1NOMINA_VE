<template>
    <div  class="sociedadView-fondo-cards">                
        <div v-for="(item) in sociedadesRef" :key="item.id">
            <Suspense>
                <template #default>
                   <CardSociedad  :name="item.nombre" :id="item.id"/>
                </template> 
                <template  #fallback>
                    <cargarSociedad />
                </template>
            </Suspense> 
        </div>
    </div>

</template>

<script setup>
//componentes
import cargarSociedad from '@/components/splashscreen/Carga-sociedad.vue'

//librerias
import { defineAsyncComponent, toRef, defineProps, onMounted } from 'vue';

//recibe la data de las sociedades
const props = defineProps({
    sociedades: {
        type: Array,
        default: []
    }
})

//carga de forma asincrona el componente 
let CardSociedad = defineAsyncComponent(() => new Promise(
    (resolve) => {
        setTimeout(
            () => {
                resolve(import("@/components/CardSociedad.vue"))
            }, 1600 //tiempo de carga
        )
    }
))

//convierte la informacion a una referencia reactiva
const sociedadesRef = toRef(props, 'sociedades');

if (sociedadesRef.value.length > 0){
    onMounted( () =>{
        CardSociedad
    })
}
</script>