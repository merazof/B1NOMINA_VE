<template>
    <div class="panel">   
            <div class="acciones-form">
                <div class="filtros">
                    <InputShearch 
                        v-model="shearch" 
                        @update:modelValue="shearch = $event" />
                </div>
                <CicloCrearEmpleado />
                
            </div>
            <AddUserEnContratacion  v-if="show"/> 
            <!--tabla con los datos-->
            <div class="cuerpo-tabla" v-else>
                <span 
                    class="NoEncontrado" 
                    v-if="(ListaEmpleados.length < 1) ? true : false"
                >
                    No hay datos asociados
                </span>
    
                <EnContratacion v-else 
                    :listaEmpleados="ListaEmpleados"
                    @ActualizarData="actualizarEmpleados"
                    @showNotificacion="showNotificacionShort"
                />
                
                <AlertShort
                    ref="notificacionStatus"
                />
            </div>
    </div>
</template>

<script setup>
    import AddUserEnContratacion from '@/components/elementos/Add-User-enContratacion.vue';
    import EnContratacion from '@/components/tablas/Empleados/EnContratacion.vue';
    import InputShearch from '@/components/inputs/Input-shearch.vue';
    import AlertShort from '@/components/alertas/Alert-short-template.vue';
    import CicloCrearEmpleado from '@/components/elementos/Ciclo-Crear-Empleado.vue';

    import {ref, inject, watch, onMounted, toRef} from 'vue';
    import axios from 'axios';

    const show = ref(true)

    const notificacionStatus = ref(null)
    const showNotificacionShort = (Info) => {
        notificacionStatus?.value.ActivarNotificacion(Info);
    }

    // Inyectar el valor proporcionado por la url
    const idSociedad = inject('IDsociedad');

    const shearch = ref('');

    const ListaEmpleados = toRef([]);

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
    try {
        await axios.get(`/sociedad/${idSociedad}/list_no_empleados`)
        .then(
            (res) => {
                ListaEmpleados.value = res.data; //almacena los datos devueltos por la api
                show.value = false;
            }
        )
        .catch(
            (error) => {
                console.error("Error al pedir empleados:", error);
                ListaEmpleados.value = []; // si hay un error asigna un valor vacio
                show.value = true;
            }
        );
    } catch (error) {
        console.error("Error en pedirEmpleados:", error);
        ListaEmpleados.value = [];
        show.value = true;
    }
};


    const actualizarEmpleados = async () => {
        await axios.get(`/sociedad/${idSociedad}/list_no_empleados`)
        .then(
            (res) => {
                ListaEmpleados.value = res?.data; //almacena los datos devueltos por la api
            }
        )
        .catch(
            (error) => {
                console.error(error.data)
                ListaEmpleados.value = []; // si hay un error asigna un valor vacio
            }
        )
    };

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

    
    // al montar el componente ejecuta las funciones
    onMounted(
        async () => {
            await pedirEmpleados(); //solicita los empleados
        }        
    );
</script>

<style scoped>
/* 
 Contenedor principal del formulario de empleados, configurado para ocupar todo el espacio disponible
 y organizar sus elementos en una columna. El uso de 'display: flex' y 'flex-direction: column' permite
 una disposición flexible y ordenada de los elementos del formulario.
*/
div.panel {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    gap:24px; /* Espaciado entre los elementos del formulario para mejorar la legibilidad */
    box-sizing: border-box;
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
</style>