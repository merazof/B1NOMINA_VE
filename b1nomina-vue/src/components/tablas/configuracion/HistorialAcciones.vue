<template>
    <div>
        <!--Contenedor de la tabla-->
        <table class="TablaEmpleados">
            <!--Encabezado de la tabla-->
            <tr class="rowTabla encabezado">
                <th class="rowNombre">
                    FECHA Y HORA 
                </th>
                <th class="">
                    NOMBRE DE USUARIO
                </th>
                <th class=""> 
                    ROl
                </th>
                <th class=""> 
                    DETALLE
                </th>
                <th class=""> 
                    VALOR
                </th>
            </tr>

            <!--Cuerpo de la tabla-->
            <HistorialAccionesRow  v-for="(item) in DatosPaginados" :key="item.id">
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
                        @actualizarListado="() => emit('actualizar_Lista')"
                    />
                    <span v-if="item.activo == true">Activo</span>
                    <span v-else>Inactivo</span>
                </template>
                <template v-slot:accionButton>
                    <router-link :to="{ name: 'panel-empleado', params: { sociedadId: almacen.SociedadID, empleadoId: item.id } }">
                        <OjitoIcon class="icon" />    
                    </router-link>
            
                    <DescargaIcon @click="console.log('descargar info' + item.id)" text="Descargar"/>
                </template>
            </HistorialAccionesRow>
            <!--Final cuerpo-->
        </table>        
            
        <div class="espacio-paginacion">
            <SeleccionarPaginacion @valorSelecionado="asignarValor"/>
            <Paginacion :totalPaginas="totalpaginas()" @NumeroSelecionado="getDataPorPagina"/>
        </div>
    </div>
    
</template>

<script setup>
import HistorialAccionesRow from '@/components/tablas/configuracion/HistorialAcciones-Row.vue';
import Paginacion from '@/components/elementos/Paginacion.vue';
import SeleccionarPaginacion from '@/components/elementos/Seleccionar-paginacion.vue'

import { ref, defineProps, watchEffect, onMounted, watch, defineEmits} from 'vue';

import { useRoute } from 'vue-router';

import almacen from '@/store/almacen.js';

const route = useRoute();
const sociedadId = route.params.sociedadId;

// Define los props
const props = defineProps({
  listaAcciones: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits([
    'upData',
    'actualizar_Lista'

]);

// Accede a la lista de empleados desde props
const listaAcciones = ref(props.listaAcciones);

const upData = (arrayData) => {
    // Convertir el objeto proxy a un array real
    const arrayReal = [...arrayData];
    emit('upData', arrayReal);
};

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
    return Math.ceil(listaAcciones.value.length / elementosPorPagina.value);
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
    DatosPaginados.value = listaAcciones.value.slice(ini, fin)
};


//al cambiar los datos reinicia el renderizado
watchEffect(() => {
  listaAcciones.value = props.listaAcciones;
  //al detectar el cambio en la lista solicita los datos
  getDataPorPagina();
});

//al montar el componente solicita la data
onMounted(()=> {
    //ejecuta la actualizacion del paginado
    listaAcciones.value = props.listaAcciones;
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


</style>
