<template>
    <div class="panel-inactivos">
        <div class="acciones-form">
            <div class="filtros">
                <InputShearch 
                    v-model="shearch" 
                    @update:modelValue="shearch = $event" />
            </div>
        </div>

        <!--tabla con los datos-->
        <div class="cuerpo-tabla">
            <span class="NoEncontrado" 
                v-if="(ListaEmpleados.length < 1)? true : false"
            >
                No hay datos asociados a los filtros
            </span>

            <EmpleadosGeneral
                v-else 
                :listaEmpleados="ListaEmpleados"  
                @upData="InteraccionListaEmpleadosSelecionados"
                @actualizar_Lista="pedirEmpleados"
                @mostrarNotificacion="showNotificacion"
            />
        </div>
        <AlertShort
            ref="notificacionStatus"
        />
    </div>
</template>

<script setup>
import InputShearch from '@/components/inputs/Input-shearch.vue';
import EmpleadosGeneral from '@/components/tablas/Empleados/Empleados-general.vue';
//alertas
import AlertShort from '@/components/alertas/Alert-short-template.vue';
    
import {ref, inject, watch, onMounted} from 'vue';
import axios from 'axios';

const ActualizarDatosNavegador = inject('ActualizarValoresNavegacion');

// Inyectar el valor proporcionado por la url
const idSociedad = inject('IDsociedad');

const shearch = ref('');

const ListaEmpleados = ref([]);
const ListaIds = ref([]); //Contiene los id de los empleados seleccionados

//se ejecuta al selecionar empleados
const InteraccionListaEmpleadosSelecionados = (arreglo) => {
        // Convertir el objeto proxy a un array real
        ListaIds.value = Array.from(arreglo);
        //console.log(ListaIds.value); // Ahora debería mostrar un array real
}

//toma la referencia del componente notificacion para utilizar el metodo mostrar
const notificacionStatus = ref(null);

const showNotificacion = (Data) => {
    notificacionStatus.value.ActivarNotificacion(
        Data //Formato: {'Titulo': "empleado especial", 'Descripcion': "esta es la descripcion de la cartica"}   
    );
    ActualizarDatosNavegador();
}

// Arreglo que contiene el arreglo original
let listaEmpleadosOriginal = null;
/**
 * aplica un filtro segun el texto ingresado
 * @param {String} text - entrada del texto del usuario

*/
const filtrar = (text) => {
    // Si la lista original no está establecida, guarda la lista actual como la original
    if (listaEmpleadosOriginal === null) {
        listaEmpleadosOriginal = [...ListaEmpleados.value];
    }

    // Si el texto es vacío, restablece la lista mostrada a la lista original
    if (text.trim() === '') {
        ListaEmpleados.value = [...listaEmpleadosOriginal];
        return;
    }

    // Normaliza el texto de búsqueda
    let normalizarText = text?.toLowerCase().trim();

    // Filtra la lista original basándose en el texto de búsqueda
    const filtrado = listaEmpleadosOriginal.filter(
        (empleado) => empleado.nombre?.toLowerCase().includes(normalizarText) ||
        empleado.apellido_paterno?.toLowerCase().includes(normalizarText) ||
        empleado.rut?.includes(normalizarText)
    );

    // Actualiza la lista mostrada con los resultados filtrados
    ListaEmpleados.value = filtrado;
};


watch(shearch, (valor) => filtrar(valor));

/**
* Solicita a la API los datos de los empleados y los almacena en el componente ListaTemplate como props.
*
* @async
* @function pedirEmpleados
* @param parametrosPeticionEmpleados Json con los datos de la consulta
* @returns {Promise<void>} No devuelve nada, pero actualiza el valor de ListaEmpleados.
*
* @example
* // Llamada a la función para obtener los datos de los empleados
* pedirEmpleados();
*
* @throws {Error} Si ocurre un error durante la solicitud, se asigna un array vacío a ListaEmpleados.
*/
const pedirEmpleados = async () => {
    await axios.get(`/sociedad/${idSociedad}/list_empleados_inactivos`)
    .then(
        (res) => {
            ListaEmpleados.value = res.data; //almacena los datos devueltos por la api
        }
    )
    .catch(
        (err) => {
            ListaEmpleados.value = []; // si hay un error asigna un valor vacio
        }
    )
};

// al montar el componente ejecuta las funciones
onMounted(async () => {

   await pedirEmpleados(); //solicita los empleados
});
</script>

<style scoped>

/* 
 Contenedor principal del formulario de empleados, configurado para ocupar todo el espacio disponible
 y organizar sus elementos en una columna. El uso de 'display: flex' y 'flex-direction: column' permite
 una disposición flexible y ordenada de los elementos del formulario.
*/
div.panel-inactivos {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:24px; /* Espaciado entre los elementos del formulario para mejorar la legibilidad */
}

/* 
 Sección de filtros, organiza los elementos en una fila con un espaciado específico entre ellos para
 una fácil navegación y selección de filtros.
*/
div.filtros {
    display: flex;
    flex-direction: row;
    gap: 12px; /* Espaciado entre los elementos de filtro para mantener la interfaz limpia y ordenada */
}

/* 
 Mensaje de "No encontrado", ajustando el tamaño de fuente y el color para proporcionar un feedback
 visual adecuado al usuario.
*/
span.NoEncontrado {
    font-size: 24px;
    color: rgb(56, 56, 56); /* Color gris oscuro para mantener un tono coherente con el diseño */
}

/* 
 Sección de filtros, organiza los elementos en una fila con un espaciado específico entre ellos para
 una fácil navegación y selección de filtros.
*/
div.filtros {
    display: flex;
    flex-direction: row;
    gap: 12px; /* Espaciado entre los elementos de filtro para mantener la interfaz limpia y ordenada */
}

/* 
 Sección de acciones del formulario, distribuye los elementos en una fila y justifica el espacio entre ellos
 para una distribución equilibrada.
*/
div.acciones-form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

</style>