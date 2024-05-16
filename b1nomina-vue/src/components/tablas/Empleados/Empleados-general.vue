<template>
    <div class="conted"> 
        <!--Contenedor de la tabla-->
        <table class="TablaEmpleados">
            <!--Encabezado de la tabla-->
            <tr class="rowTabla encabezado">
                <th class="filaCheckbox"> 
                    <InputCheckbox />
                </th>
                <th class="rowNombre">
                    EMPLEADOS 
                </th>
                <th class="">
                    RUT
                </th>
                <th class=""> 
                    CARGO
                </th>
                <th class=""> 
                    SALARIO BASE
                </th>
                <th class="Estado"> 
                    ESTADO 
                </th>
                <th class=""> 
                    ACCIONES 
                </th>
            </tr>
            <!--Final encabezado-->

            <!--Cuerpo de la tabla-->
            <EmpleadosRow  v-for="(item) in DatosPaginados" :key="item.id">
                <!--ChecBox-->
                <template v-slot:checkbox>
                    <InputCheckbox 
                        :Objid="item.id" 
                        @update="InteraccionListaEmpleadosSelecionados"
                    />
                </template>
                <!--Nombre y apelidos-->
                <template v-slot:NombresApellidos>
                    {{item.nombres}} 
                    {{ item.apellido_paterno }}
                    {{ item.apellido_materno }}
                </template>
                <!--Rut-->
                <template v-slot:rut>
                    {{item.rut}}
                </template>
                 <!--Cargo-->
                <template v-slot:cargo>
                    {{ item.cargo }}
                </template>
                <!--Saladio / sueldo-->
                <template v-slot:sueldo>
                    {{ item.sueldo }}
                </template>
                <!--Estado-->
                <template v-slot:activateComponente>
                    <InterruptorButton 
                        :Objid="item.id" 
                        :Estado="item.activo"
                        @actualizarListado="resultadoActivacion"
                    />
                    <span v-if="item.activo == true">Activo</span>
                    <span v-else>Inactivo</span>
                </template>
                <template v-slot:accionButton>
                    <router-link :to="{ name: 'panel-empleado', params: { sociedadId: almacen.SociedadID, empleadoId: item.id } }">
                        <OjitoIcon text="Ver Perfil" Stroke="#1A2771"/>    
                    </router-link>
          
                    <DescargaIcon @click="console.log('descargar info' + item.id)" text="Descargar"/>
                </template>
            </EmpleadosRow>
            <!--Final cuerpo-->
        </table>        
        
        <div class="espacio-paginacion">
            <SeleccionarPaginacion @valorSelecionado="asignarValor"/>
            <Paginacion :totalPaginas="totalpaginas()" @NumeroSelecionado="getDataPorPagina"/>
        </div>
        
    </div>
   
</template>

<script setup>
import OjitoIcon from '@/components/icons/Ojito-icon.vue';
import DescargaIcon from '@/components/icons/Descarga-icon.vue';
import InterruptorButton from '@/components/inputs/Interruptor-modal-button.vue';
import InputCheckbox from '@/components/inputs/Input-Checkbox.vue';
import EmpleadosRow from './Empleados-Row.vue';
import Paginacion from '@/components/elementos/Paginacion.vue';
import SeleccionarPaginacion from '@/components/elementos/Seleccionar-paginacion.vue'

import { ref, defineProps, watchEffect, onMounted, watch, defineEmits} from 'vue';

import { useRoute } from 'vue-router';

import almacen from '@/store/almacen.js';

const route = useRoute();
const sociedadId = route.params.sociedadId;

// Define los props
const props = defineProps({
  listaEmpleados: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits([
    'upData',
    'actualizar_Lista',
    'mostrarNotificacion',
]);

const resultadoActivacion = (Data) => {
    
    emit('mostrarNotificacion', Data)
    emit('actualizar_Lista')
}

// Accede a la lista de empleados desde props
const ListaEmpleados = ref(props.listaEmpleados);

const listaEmpleadosSelecionados = ref([]);

/**
 * Función para manejar la interacción con una lista de empleados seleccionados.
 * Esta función agrega o remueve un valor de la lista basado en si el valor ya está presente.
 *
 * @param {Number} value - El valor a agregar o remover de la lista.
 */
 const InteraccionListaEmpleadosSelecionados = (value) => {

  // Verifica si el valor no es null
  if (value !== null) {
    // Verifica si el valor ya está en la lista
    if (listaEmpleadosSelecionados.value.includes(value)) {
      // Si el valor ya está en la lista, lo remueve
      // Encuentra el índice del valor en la lista
      const index = listaEmpleadosSelecionados.value.indexOf(value);
      // Verifica si el índice es válido (mayor que -1)
      if (index > -1) {
        // Remueve el valor de la lista usando splice
        listaEmpleadosSelecionados.value?.splice(index,   1);
      }
    } else {
      // Si el valor no está en la lista, lo agrega
      // Agrega el valor al final de la lista
      listaEmpleadosSelecionados.value?.push(value);
    }
  }
};

const upData = (arrayData) => {
    // Convertir el objeto proxy a un array real
    const arrayReal = [...arrayData];
    emit('upData', arrayReal);
};

watch(listaEmpleadosSelecionados.value, upData)

//configuracion del paginado
const DatosPaginados = ref([]); //arreglo con los datos picados
const paginaActual = ref(1); //inicializacion de la pagina
const elementosPorPagina = ref(12); //numero de filas por pagina

const asignarValor = (Numero) => {
    elementosPorPagina.value = Numero;
}

//total de paginas
const totalpaginas = () => {
    //devuelve el numero de paginas segun los datos y redondea el resultado
    return Math.ceil(ListaEmpleados.value.length / elementosPorPagina.value);
};

//optener data segun la pagina
function getDataPorPagina(numeroPagina){
    //vacia la lista al cambiar iniciar

    //si el valor de numeroPagina es null o undefined le asigna 1
    (numeroPagina == undefined || numeroPagina == null)
        ? numeroPagina = 1
        : paginaActual.value = numeroPagina;   
    
    DatosPaginados.value = ([]);

    //rango del indice
    let ini = (numeroPagina * elementosPorPagina.value) - elementosPorPagina.value;
    let fin = (numeroPagina * elementosPorPagina.value);
    
    //recorre los datos de lista y los indexa en la paginacion
    DatosPaginados.value = ListaEmpleados.value.slice(ini, fin)
};


//al cambiar los datos reinicia el renderizado
watchEffect(() => {
  ListaEmpleados.value = props.listaEmpleados;
  //al detectar el cambio en la lista solicita los datos
  getDataPorPagina();
});

//al montar el componente solicita la data
onMounted(()=> {
    //ejecuta la actualizacion del paginado
    ListaEmpleados.value = props.listaEmpleados;
});
</script>

<style scoped>
/* Estilos generales para la tabla de empleados */
.TablaEmpleados {
    width: 100%; /* Asegura que la tabla ocupe el ancho completo del contenedor */
}

/**
 * Contenedor general de la tabla
 * Utiliza Flexbox para organizar elementos en una columna y alinearlos al final
 */
.conted {
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 24px; /* Espacio entre elementos */
}

/**
 * Estilos para la paginación dentro del contenedor
 * Alinea los botones de paginación al final del contenedor
 */
div.espacio-paginacion {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


/**
 * Estilos para el encabezado de la tabla
 * Define el fondo, borde, y estilos de fuente para el encabezado
 */
tr.encabezado {
    width: 100%;
    height: 24px;
    box-sizing: border-box;
    background: #FCFCFD;
    border-bottom: 0.96px #EAECF0 solid;
    color: #667085;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word; /* Asegura que el texto no exceda el ancho de la celda */
}

/**
 * Evita que el texto sobrepase el límite de la celda
 * Aplica estilos para asegurar que el texto se ajuste dentro de las celdas
 */
th {
 word-break: break-word;
 white-space: nowrap;
}

/**
 * Estilos para el cuerpo de la tabla
 * Define la altura de las filas y utiliza Flexbox para organizar el contenido
 */
tr.cuerpo {
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-self: end;
}

/**
 * Estilo general para las filas de la tabla
 * Define la altura y el ancho de las filas
 */
tr.rowTabla {
    width: 100%;
    box-sizing: content-box;
    height: 48px;
    display: table-row;
}

/* Estilos para cada celda de la tabla */
tr.cuerpo > td {
    width: auto; /* Ancho automático basado en el contenido */
    height: 48px;
    background: none; /* Sin fondo para una apariencia limpia */
    box-sizing: border-box; /* Para incluir padding y borde en el ancho total */
    padding: 12px; /* Espacio interno para mejorar la legibilidad */
    border:#FCFCFD; /* Borde superior para separar las filas */
    border-bottom: 0.96px #EAECF0 solid;
    align-self: center; /* Centrado verticalmente */
    align-items: center; /* Centrado horizontalmente */
    text-align: center; /* Alineación del texto al centro */
    margin: auto; /* Margen automático para centrar el contenido */
}

/**
 * Estilos para la columna de acciones (generalmente botones o iconos)
 * Organiza los elementos de acción en un contenedor flex
 */
th.acciones {
    display: flex;
    gap: 12px; /* Espacio entre acciones */
    justify-content: center; /* Centrado de acciones */
    box-sizing: border-box;
}

/* Estilos para la primera columna, que puede contener checkboxes */
.filaCheckbox {
    max-width: 80px !important; /* Ancho máximo para mantener la consistencia */
    box-sizing: border-box;
    margin: auto; /* Margen automático para centrar */
}

/**
 * Estilos para la columna de nombres de empleados
 * Alinea el texto al inicio y limita el ancho máximo para evitar desbordamientos
 */
th.rowNombre,

/* Estilos para la columna de acciones (iconos) */
.acciones > div {
    display: flex;
    gap: 12px; /* Espacio entre iconos */
    justify-content: center; /* Centrado de iconos */
    white-space: nowrap; /* Evita el salto de línea para iconos */
}
</style>
