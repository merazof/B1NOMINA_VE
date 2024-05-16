<template>
    <div class="panel-empleados">
        <div class="acciones-form">
            <div class="filtros">
                <InputShearch v-model="shearch" @update:modelValue="shearch = $event" />

                <ListaTemplate v-model="filtroSede" :options="ListaSedes" optionsSelected="Sede"/>
                <ListaTemplate v-model="filtroDepartamento" :options="ListaDepartamentos" optionsSelected="Departamento"/>
                <ListaTemplate v-model="filtroGrupo" :options="ListaGrupos" optionsSelected="Grupo"/>
            </div>     
            <CicloCrearEmpleado 
                @Notificacion="showNotificacion"
            />            

        </div><!--final contenedor acciones-form-->

        <div class="acciones-masivas" v-show="ListaIds.length > 0">
            <ListaTemplate optionsSelected="Acciones en Lote"/>
            <span>Has seleccionado {{ ListaIds.length }} de los {{ 12 }} empleados</span>
        </div>

        <!--tabla con los datos-->
        <div class="cuerpo-tabla">
            <span class="NoEncontrado" v-if="(ListaEmpleados.length < 1)? true : false">
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
    //componentes
    import CicloCrearEmpleado from '@/components/elementos/Ciclo-Crear-Empleado.vue';
    import InputShearch from '@/components/inputs/Input-shearch.vue';
    import ListaTemplate from '@/components/listas/Lista-template.vue';
    import EmpleadosGeneral from '@/components/tablas/Empleados/Empleados-general.vue';
    //alertas
    import AlertShort from '@/components/alertas/Alert-short-template.vue';

    //librerias
    import { ref, onMounted, reactive, toRefs, watch, inject} from 'vue';
    
    import axios from 'axios';

    // Inyectar el valor proporcionado por la url
    import { useRoute } from 'vue-router';

    // Inyecta la función proporcionada
    const ActualizarDatosNavegador = inject('ActualizarValoresNavegacion');

    const route = useRoute();
    // idSociedad es un String
    const idSociedad = route.params.sociedadId;

    const ListaIds = ref([]); //Contiene los id de los empleados seleccionados

    const InteraccionListaEmpleadosSelecionados = (arreglo) => {
        // Convertir el objeto proxy a un array real
        ListaIds.value = Array.from(arreglo);
    }

    //toma la referencia del componente notificacion para utilizar el metodo mostrar
    const notificacionStatus = ref(null);

    const showNotificacion = (Data) => {
        notificacionStatus.value.ActivarNotificacion(
            Data //Formato: {'Titulo': "empleado especial", 'Descripcion': "esta es la descripcion de la cartica"}   
        );
        ActualizarDatosNavegador();
    }



    //fin control del modal

    //variables a utilizar de forma reactiva
    const state = reactive({
        ListaEmpleados: [], // areglo con los datos de los empleados
    });

    //lista de sedes
    const ListaSedes = ref([]);
    const filtroSede = ref(0);

    //lista de Departamentos
    const ListaDepartamentos = ref({});
    const filtroDepartamento = ref(0)

    //lista de grupos
    const ListaGrupos = ref([]);
    const filtroGrupo = ref(0)

    //valor ingresado por el usuario
    const shearch = ref('')
    
    //lista de empleados
    const {ListaEmpleados} = toRefs(state);
    
    /**
    * Realiza una solicitud GET a la API para obtener la lista de sedes asociadas a una sociedad.
    *
    * @function pedirSedes
    * @returns {Promise<void>} - Retorna una promesa que se resuelve cuando se completa la solicitud.
    *
    * @example
    * // Ejemplo de uso:
    * pedirSedes();
    */
    const pedirSedes = async () => {
     //   await axios.get(`list_sede_sociedad?idSociedad=${sociedadId}&page=1&records=20`)
        await axios.get(`/sociedad/${idSociedad}/list_sede?page=${1}&records=20`)
        .then(
            (res) => {
                ListaSedes.value = res.data; //asigna el valor de la consulta a la variable
            }
        )
        .catch(
            (err) => {
                if (err.status == 404) {
                    ListaSedes.value = []; //asigna el valor vacio si no hay datos.
                }
                ListaSedes.value = [];
            }
        )
    };

    /**
    * Función asíncrona que solicita a la API los datos de los Departamentos y los asigna al componente ListaTemplate.
    *
    * @async
    * @function pedirDepartamentos
    * @returns {Promise<void>} No devuelve nada, pero actualiza el estado de ListaDepartamentos con los datos obtenidos.
    * @throws {Error} Si la solicitud falla, se lanza un error y ListaDepartamentos se establece en un array vacío.
    */
    const pedirDepartamentos = async () => {
        await axios.get(`/sociedad/${idSociedad}/list_departamentos?page=${1}&records=20`, {"id": idSociedad})
        .then(
            (res) => {
                ListaDepartamentos.value = res.data;  //asigna el valor de la consulta a la variable
            }
        )
        .catch(
            (err) => {
                if (err){
                    ListaDepartamentos.value = []; //asigna el valor vacio a la variable
                }
            }
        )
    };

    /**
    * Función asíncrona que solicita a la API los datos de los Departamentos y los asigna al componente ListaTemplate.
    *
    * @async
    * @param idSociedad parametro que recibe de los props
    * @function pedirDepartamentos
    * @returns {Promise<void>} No devuelve nada, pero actualiza el estado de ListaGrupos con los datos obtenidos.
    * @throws {Error} Si la solicitud falla, se lanza un error y ListaGrupos se establece en un array vacío.
    */
    const pedirGrupos = async () => {
        await axios.get(`/sociedad/${idSociedad}/list_grupos_empleados`)
        .then(
            (res) => {
                ListaGrupos.value = res.data;  //asigna el valor de la consulta a la variable
            }
        )
        .catch(
            (err) => {
                ListaGrupos.value = [];  //asigna vacio a la data sino hay respuesta
            }
        )
    };  
    
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
        await axios.get(`/sociedad/${idSociedad}/list_empleados`)
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

    //parametros a pasar con la peticion
    const parametrosPeticionEmpleados = {
        "departamento_id": 0,
        "grupo_id": 0,
        "sede_id": 0
    };

    /**
    * Solicita a la API los datos de los empleados según el filtro proporcionado y los almacena en ListaEmpleados.
    *
    * @async
    * @function pedirEmpleado2
    * @returns {Promise} - Una promesa que se resuelve cuando la solicitud HTTP se completa.
    * @throws {Error} - Si ocurre un error durante la solicitud HTTP, se lanzará un error.
    *
    * @example
    * // Llamar a la función para obtener empleados con ciertos parámetros desde la api
    * pedirEmpleado2();
    */
    const pedirEmplead2 = async () => {
        await axios.post(`/sociedad/${idSociedad}/searchsdg`, parametrosPeticionEmpleados)
        .then(
            (res) => {
                ListaEmpleados.value = res.data; //almacena los datos devueltos por la api
            }
        )
        .catch(
            (err) => {
                if (err){
                    ListaEmpleados.value = []; //muestra el error
                }
            }
        )
    };

    //filtros
    /**
    * Asigna el valor de "departamento" al arreglo de parámetros de la petición de empleados.
    * Si el valor es vacío o nulo, asigna  0 a 'departamento_id'. Si el valor es un número,
    * lo convierte a entero y lo asigna a 'departamento_id'. Luego, según los valores de
    * los parámetros, llama a la función 'pedirEmpleados' o 'pedirEmplead2'.
    *
    * @param {string | number} valor - El valor del departamento que se asignará.
    * @returns {void} Modifica el objeto 'parametrosPeticionEmpleados.departamento_id'.
    */
    const addDepartamento = (valor) => {
        if (valor == '' || valor == null) {
            // si el valor de la seleccion es texto o nulo asigna 0
            parametrosPeticionEmpleados.departamento_id = 0;
        } else {
            //si el valor es un numero, asigna el valor en entero al arreglo
            parametrosPeticionEmpleados.departamento_id = parseInt(valor);         
        }
        (parametrosPeticionEmpleados.departamento_id === 0 & parametrosPeticionEmpleados.grupo_id === 0 & parametrosPeticionEmpleados.sede_id === 0)
        ? pedirEmpleados() //si los valores de parametrosPeticionEmpleados son 0
        : pedirEmplead2(); //si los valores de parametrosPeticionEmpleados varian de 0        
    };

    /**
    * Asigna el valor de "sede" al objeto de parámetros de la petición de empleados.
    * Si el valor es vacío o nulo, asigna   0 a 'sede_id'. Si el valor es un número,
    * lo convierte a entero y lo asigna a 'sede_id'. Luego, según los valores de
    * los parámetros, llama a la función 'pedirEmpleados' o 'pedirEmplead2'.
    *
    * @param {string | number} valor - El valor de la sede que se asignará.
    * @returns {void} No devuelve ningún valor, pero modifica el objeto 'parametrosPeticionEmpleados'.
    */ 
    const addSede = (valor) => {
        if (valor == '' || valor == null) {
            //si el valor es vacio o nulo, asigna 0
            parametrosPeticionEmpleados.sede_id = 0
        }else {
            //convierte el valor a entero y lo guarda en el arreglo
            parametrosPeticionEmpleados.sede_id = parseInt(valor);
        }

        //solicita la actualizaion de los datos
        (parametrosPeticionEmpleados.departamento_id === 0 & parametrosPeticionEmpleados.grupo_id === 0 & parametrosPeticionEmpleados.sede_id === 0)?
        pedirEmpleados(): //si los valores de parametrosPeticionEmpleados son 0
        pedirEmplead2(); //si los valores de parametrosPeticionEmpleados varian de 0     
    };

    /**
    * Asigna el valor de "grupo" al arreglo de parámetros de la petición de empleados.
    * Si el valor es vacío o nulo, asigna  0 a 'grupo_id'. Si el valor es un número,
    * lo convierte a entero y lo asigna a 'grupo_id'. Luego, según los valores de
    * los parámetros, llama a la función 'pedirEmpleados' o 'pedirEmplead2'.
    *
    * @param {string | number} valor - El valor del grupo que se asignará.
    * @returns {void} No devuelve ningún valor, pero modifica el objeto 'parametrosPeticionEmpleados'.
    */ 
    const addGrupo = (valor) => {
        if (valor == '' || valor == null) {
            parametrosPeticionEmpleados.grupo_id = 0
        } else {
            //convierte el valor a entero y lo guarda en el arreglo
            parametrosPeticionEmpleados.grupo_id = parseInt(valor);
        }
       
        //solicita la actualizaion de los datos
        (parametrosPeticionEmpleados.departamento_id === 0 & parametrosPeticionEmpleados.grupo_id === 0 & parametrosPeticionEmpleados.sede_id === 0)?
        pedirEmpleados(): //si los valores de parametrosPeticionEmpleados son 0
        pedirEmplead2(); //si los valores de parametrosPeticionEmpleados varian de 0     
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

    //escucha el cambio de la variable y ejecuta la funcion
    watch(filtroSede, addSede);
    //escucha el cambio de la variable y ejecuta la funcion
    watch(filtroDepartamento, addDepartamento);
    //escucha el cambio de la variable y ejecuta la funcion
    watch(filtroGrupo, addGrupo);
    //escucha los cambios en la variable y ejecuta la funcion filtrar
    watch(shearch, filtrar);

    // al montar el componente ejecuta las funciones
    onMounted(async () => {

        await pedirEmpleados(); //solicita los empleados
        await pedirSedes(); //solicita las sedes disponibles
        await pedirDepartamentos(); //solicita los departamentos
        await pedirGrupos(); //solicita los grupos        
    });
</script>

<style scoped>
/* 
 Contenedor principal del formulario de empleados, configurado para ocupar todo el espacio disponible
 y organizar sus elementos en una columna. El uso de 'display: flex' y 'flex-direction: column' permite
 una disposición flexible y ordenada de los elementos del formulario.
*/
div.panel-empleados {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:24px; /* Espaciado entre los elementos del formulario para mejorar la legibilidad */
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
 Acciones masivas, asegurando que los elementos estén alineados verticalmente en el centro y tengan
 un espaciado específico entre ellos para una presentación clara y organizada.
*/
div.acciones-masivas{
    display: flex;
    gap: 24px; /* Espaciado entre los elementos de acción masiva para una distribución equilibrada */
    align-items: center; /* Alineación vertical de los elementos para una mejor estética y usabilidad */
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
 Botón de agregar usuario, asegurando que su contenido tenga una posición superior en el eje Z para
 garantizar que se muestre correctamente sobre otros elementos.
*/
div.Add-user-button > div {
    z-index: 50; /* Posicionamiento en el eje Z para asegurar la visibilidad del botón */
}

/* 
 Párrafo dentro del modal, ajustando el margen, alineación del texto y estilos de fuente para una
 mejor legibilidad y presentación del contenido.
*/
p.decripcion-modal{
    margin: 0; /* Elimina el margen por defecto para mantener un diseño limpio */
    text-align: justify; /* Justifica el texto para una lectura más fluida */
    font-size: 16px; /* Tamaño de fuente adecuado para facilitar la lectura */
    font-weight: 400; /* Peso de la fuente para mantener un equilibrio visual */
}
</style>
