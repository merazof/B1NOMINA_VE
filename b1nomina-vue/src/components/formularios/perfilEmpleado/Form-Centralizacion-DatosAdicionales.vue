<template>
    
    <form class="formulario" id="" @submit.prevent="">
        <h2 class="titulo-form">Datos Laborales</h2>
        
        <div class="row-form">
            <InputLinealDescripcion 
                Placeholder="Ingrese Nombre" 
                Titulo="Campo 1" 
                v-model="variable"
                @update:modelValue="variable = $event"
                :requerido="formularioRequerido"
                Tipo="String"
            />
            <InputLinealDescripcion 
                Placeholder="Ingrese Nombre" 
                Titulo="Campo 2" 
                v-model="variable"
                @update:modelValue="variable = $event"
                :requerido="formularioRequerido"
                Tipo="String"
            />
            
        </div>
        <div class="row-form">
            <InputLinealDescripcion 
                Placeholder="Ingrese Nombre" 
                Titulo="Campo 3" 
                v-model="variable"
                @update:modelValue="variable = $event"
                :requerido="formularioRequerido"
                Tipo="String"
            />
            <InputLinealDescripcion 
                Placeholder="Ingrese Nombre" 
                Titulo="Campo 4" 
                v-model="variable"
                @update:modelValue="variable = $event"
                :requerido="formularioRequerido"
                Tipo="String"
            />
            
        </div>
        <div class="row-form">
            <InputLinealDescripcion 
                Placeholder="Ingrese Nombre" 
                Titulo="Campo 5" 
                v-model="variable"
                @update:modelValue="variable = $event"
                :requerido="formularioRequerido"
                Tipo="String"
            />
            
        </div>
        <div class="row-form">
            <LayoutInputLineal textLabel="Grupo de centralización" :requerido="false">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="variable" 
                        :options="parametros?.variable" 
                        :requerido="false"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>
    </form>
    
</template>

<script setup>

const props = defineProps({
        ID_Empleado: {
            type: [String, Number],
            default: 0
        },
        parametos: {
            type: Object,
            default: {}
        }
    });

const variable = ref('')
const formularioRequerido = ref(false);
</script>

<style scoped>
/* Establece el diseño de la fila del formulario, 
usando flexbox para alinear elementos en filas y 
espaciarlos uniformemente */
div.row-form {
    display: flex;
    flex-direction: row;
    gap:24px;
    width:  100%;
    align-items: center;
    justify-content: space-between;
}

/* Define el estilo del formulario, utilizando 
flexbox para organizar los elementos en una 
columna con un espacio de  16px entre ellos */
form.formulario {
    display: flex;
    flex-direction: column;
    gap:  16px
}

/* Contenedor para elementos multimedia, organizados 
en columnas con un espacio de  12px entre ellos */
div.multimedia {
    display: flex;
    flex-direction: column;
    gap:  12px;
}

/* Estilo para el botón de añadir una foto, con bordes 
y un padding específico para un mejor aspecto visual */
div.multimedia div.add-photo{
    border-radius:  6px;
    border:  0.5px #363855 dashed;
    border-width:  5px;
    box-sizing: border-box;
    padding:  12px  48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:  100%;
    height: fit-content;
}

/* Estilo para el título del formulario, asegurando que el texto sea legible y estéticamente agradable */
h2.titulo-form {
    margin:  0px;
    color: black;  
    font-size:  22px;  
    font-family: Poppins;  
    font-weight:  500;  
    line-height:  32px;  
    word-wrap: break-word;
}


</style>
