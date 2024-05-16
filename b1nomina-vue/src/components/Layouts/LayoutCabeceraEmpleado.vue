<template>
    <!-- Contenedor principal del componente -->
    <div class="contend">
        <!-- Sección para la foto del empleado -->
        <div class="foto-empleado">
            <!-- Slot para insertar contenido personalizado para la imagen del empleado -->
            <div class="contend-img">
                <img ref="empleadoFoto" v-if="imagen" id="EmpleadoFoto" alt="Foto" class="photo">   
                <img v-else src="@/components/icons/svg/Avatar-svg-2-icon.svg" class="photo">
            </div>

            <!-- Botón para editar, que emite un evento 'clickEvent' cuando se hace clic -->
            <button @click="emit('clickEvent')" class="edit">
                <!-- Icono de edición dentro del botón -->
                <EditIcon />
            </button>
        </div>
        <!-- Sección para mostrar acciones y detalles del empleado -->
        <div class="acciones">
            <!-- Slot para insertar contenido personalizado para el rol del empleado -->
            <span>
                <slot name="Rol"></slot>
            </span>
            <!-- Slot para insertar contenido personalizado para el nombre del empleado -->
            <h2>
                <slot name="Nombre"></slot>
            </h2>
            <!-- Slot para insertar contenido personalizado para el cargo del empleado -->
            <p>
                <slot name="Cargo"></slot>
            </p>
            <!-- Slot para insertar contenido personalizado para botones adicionales -->
            <div class="botones">
                <slot name="Botones"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
    // Importa el componente EditIcon para usarlo dentro del botón de edición
    import EditIcon from '@/components/icons/Edit-icon.vue';
    // Importa la función defineEmits para declarar eventos personalizados
    import {defineProps, defineEmits, onMounted, ref } from 'vue';
    // Declara el evento 'clickEvent' que este componente puede emitir
    const emit = defineEmits(['clickEvent']);
    const empleadoFoto = ref(null);
    const props = defineProps({
        imagen: {
            default: ''
        }
    })

    const manejarimagen = (imagen) => {
        const base64String = imagen
        if(imagen == null || imagen == undefined || imagen == '') {

        }else {
            empleadoFoto.value.src = base64String;
        }
    };

    onMounted(()=>{
        manejarimagen(props.imagen)
    });

</script>

<style scoped>
/* Estilos para el contenedor principal del componente */
div.contend {
    padding: 24px; 
    background: white; 
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25); 
    justify-content: flex-start; 
    align-items: center; 
    gap: 24px; 
    display: inline-flex;
    width: 100%;
    max-height: 230px;
    box-sizing: border-box;
    gap: 12px;
}

/* Estilos para la sección de la foto del empleado */
div.foto-empleado {
    position: relative;
    width: 10rem;
    height: 10rem;
    max-width: 10rem;
    max-height: 10rem;
    display: flex;
    align-items: center;
    align-self: center;
    justify-content: center;
    border-radius: 999999px;
    border: #1A245B solid 4px;
    z-index: 1;
    box-sizing: content-box;
}

div.contend-img {
    overflow: hidden;
    width: 100%;
    height: 101%;
    border-radius: 999999px;
    display: flex;
    align-items: center;
    align-self: center;
    justify-content: center;
    box-sizing: border-box;
    
}

div.contend-img > img {
    max-height: 10rem;
    max-width: auto;
    object-fit: contain;
}

/* Estilos para el botón de edición */
button.edit {
    position: absolute;
    z-index: 2;
    top: 112px;
    left: 111px;
    width: 48px;
    height: 48px;
    border-radius: 9999px;
    background-color: #1A245B;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

/* Estilos para la sección de acciones y detalles del empleado */
div.acciones {
    flex-grow: 1;
    box-sizing: border-box;
    gap: 12px;
    align-items: stretch;
    display: flex;
    flex-direction: column;
}

/* Estilos para la sección de información adicional del empleado */
div.acciones > div.info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-sizing: border-box;
    align-items: stretch;
}

/* Estilos para el rol del empleado */
div.acciones > span {
    margin: 0;
    width: fit-content;
    box-sizing: border-box;
    padding: 4px 8px;
    background: rgba(42, 227, 116, 0.50); 
    border-radius: 6px; 
    overflow: hidden; 
    justify-content: center; 
    align-items: center; 
    gap: 10px; 
    display: inline-flex;

    color: rgba(0, 0, 0, 0.60);
    font-size: 13.46px;
    font-weight: 500; 
    line-height: 19.23px; 
    word-wrap: break-word;
}

/* Estilos para el nombre del empleado */
div.acciones > h2 {
    color: black;
    font-size: 24px;
    font-family: Poppins; 
    font-weight: 500; 
    line-height: 34px; 
    word-wrap: break-word;
    margin: 0;
}

/* Estilos para el cargo del empleado */
div.acciones > p {
    margin: 0;
    color: black; 
    font-size: 13.46px; 
    font-weight: 500; 
    line-height: 19.23px; 
    word-wrap: break-word;
}

/* Estilos para la sección de botones adicionales */
.botones {
    background: white;
    display: flex;
    flex-direction: row;
    gap: 12px;
    width: 100%;
    box-sizing: border-box;
    height: 49px;
    align-items: center;
    justify-content: start;
}
</style>
