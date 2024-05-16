<template>
    
    <form class="formulario" id="ActualizarContrato" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos de Contrato</h2>
        
        <div class="row-form">
            <LayoutInputLineal textLabel="Tipo de contrato" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="TipoDeContrato" 
                        :options="parametros?.tipocontrato" 
                        :requerido="RequiereActualizar"
                        :preseleccion="TipoDeContrato" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Nivel de Estudio" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="NivelEstudio" 
                        :options="parametros?.nivelestudio" 
                        :requerido="RequiereActualizar"
                        :preseleccion="NivelEstudio" 
                        optionsSelected="Seleccionar"  
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Término del contrato" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="TerminoContrato"
                        :options="parametros?.terminocontrato" 
                        :requerido="RequiereActualizar"
                        :preseleccion="TerminoContrato" 
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de Contratacion"
                v-model="FechaContratacion"
                @update:modelValue="FechaContratacion = $event"
                :requerido="RequiereActualizar"
            />
            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de Finalizacion de contrato"
                v-model="FechaFinalizacionContrato"
                @update:modelValue="FechaFinalizacionContrato = $event"
                :Deshabilitar="TerminoContrato == 0"
                :requerido="TerminoContrato != 0"
            />
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Placeholder="" 
                Titulo="Hora de Entrada" 
                v-model="HoraEntrada"
                @update:modelValue="HoraEntrada = $event"
                :requerido="RequiereActualizar"
                Tipo="Time"
            />

            <InputLinealDescripcion 
                Placeholder="" 
                Titulo="Hora de salida" 
                v-model="HoraSalida"
                @update:modelValue="HoraSalida = $event"
                :requerido="RequiereActualizar"
                Tipo="Time"
            />
        </div>
        
        <h2 class="titulo-form">Días de descanso</h2>

        <div class="row-form">
            <InputCheckbox :Objid="1" :checked="ListaDiasLibres.includes('1')" @update="DiasLibres" texto="Lunes" />
            <InputCheckbox :Objid="2" :checked="ListaDiasLibres.includes('2')" @update="DiasLibres" texto="Martes" />
            <InputCheckbox :Objid="3" :checked="ListaDiasLibres.includes('3')" @update="DiasLibres" texto="Miércoles" />
            <InputCheckbox :Objid="4" :checked="ListaDiasLibres.includes('4')" @update="DiasLibres" texto="Jueves" />
            <InputCheckbox :Objid="5" :checked="ListaDiasLibres.includes('5')" @update="DiasLibres" texto="Viernes" />
            <InputCheckbox :Objid="6" :checked="ListaDiasLibres.includes('6')" @update="DiasLibres" texto="Sábado" />
            <InputCheckbox :Objid="7" :checked="ListaDiasLibres.includes('7')" @update="DiasLibres" texto="Domingo" />
        </div>
    </form>
</template>

<script setup>
import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
import InputCheckbox from '@/components/inputs/Input-Checkbox.vue';
import {reactive, ref, watch, inject, onMounted} from 'vue';


import peticiones from '@/peticiones/p_empleado';

const DatosUsuario = reactive(inject('dataEmpleado'));
const parametros = reactive(inject('parametros'));
const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));

const RequiereActualizar = ref(false);

//variables del formaulario 1
const TipoDeContrato = ref('');
const NivelEstudio = ref('')
const TerminoContrato = ref('');
const FechaContratacion = ref('');
const FechaFinalizacionContrato = ref('');
const HoraEntrada = ref('');
const HoraSalida = ref('');
const ListaDiasLibres = ref([]);


// payload de las peticiones
const payload = reactive({
    "dias_descanso": '',
    "fecha_fin": '',
    "fecha_inicio": '',
    "hora_egreso": '',
    "hora_ingreso": '',
    "jefatura":'',
    "nivel_estudio_id": '',
    "termino_contrato": '',
    "tipo_contrato": '',
});
// payload de las peticiones
const payload_old = reactive({
    "dias_descanso": '',
    "fecha_fin": '',
    "fecha_inicio": '',
    "hora_egreso": '',
    "hora_ingreso": '',
    "jefatura":'',
    "nivel_estudio_id": '',
    "termino_contrato": '',
    "tipo_contrato": '',
});

const MostrarValores = (DATA) => {
        // Asigna el valor de DATA?.documento a numeroDocumento.value, utilizando '' si DATA?.documento es null.
        RequiereActualizar.value = false;
        
        TipoDeContrato.value = (DATA?.tipo_contrato_id == null)? '' :DATA?.tipo_contrato_id;
        payload_old.tipo_contrato = DATA?.tipo_contrato_id ?? '';
        payload.tipo_contrato = DATA?.tipo_contrato_id ?? '';

        NivelEstudio.value = (DATA?.nivel_estudio_id == null)? '' :DATA?.nivel_estudio_id;
        payload_old.nivel_estudio_id = DATA?.nivel_estudio_id ?? '';
        payload.nivel_estudio_id = DATA?.nivel_estudio_id ?? '';

        TerminoContrato.value = (DATA?.termino_contrato_id == null)? '' : DATA?.termino_contrato_id;
        payload_old.termino_contrato = DATA?.termino_contrato_id ?? '';
        payload.termino_contrato = DATA?.termino_contrato_id ?? '';

        FechaContratacion.value = (DATA?.fecha_inicio == null)? '' :DATA?.fecha_inicio;
        payload_old.fecha_inicio = DATA?.fecha_inicio ?? '';
        payload.fecha_inicio = DATA?.fecha_inicio ?? '';


        FechaFinalizacionContrato.value = (DATA?.fecha_fin == null | DATA?.fecha_fin.toLowerCase() == 'no asignado')? '' :DATA?.fecha_fin;
        payload_old.fecha_fin = (DATA?.fecha_fin == null | DATA?.fecha_fin.toLowerCase() == 'no asignado')? '1990-01-01' :DATA?.fecha_fin;
        payload.fecha_fin = (DATA?.fecha_fin == null | DATA?.fecha_fin.toLowerCase() == 'no asignado')? '1990-01-01' :DATA?.fecha_fin;

        HoraEntrada.value = (DATA?.hora_ingreso == null || DATA?.hora_ingreso == '') ? '08:00' : DATA?.hora_ingreso;
        payload_old.hora_ingreso = DATA?.hora_ingreso ?? '08:00';
        payload.hora_ingreso = DATA?.hora_ingreso ?? '08:00';
            
        HoraSalida.value = (DATA?.hora_egreso == null || DATA?.hora_egreso == '') ? '18:00' : DATA?.hora_egreso;
        payload_old.hora_egreso = DATA?.hora_egreso ?? '18:00';
        payload.hora_egreso = DATA?.hora_egreso ?? '18:00';
        
        ListaDiasLibres.value = DATA?.dias_descanso?.split(',')
        payload_old.dias_descanso = DATA?.dias_descanso ?? '';
        payload.dias_descanso = DATA?.dias_descanso ?? '';

        payload_old.jefatura = DATA?.jefatura ?? '';
        payload.jefatura = DATA?.jefatura ?? '';
    }

//actualizar datos del payload
const ActualizarPayload = (propiedad, valor) => {
  // Asigna el nuevo valor a la propiedad especificada dentro del objeto 'payload'.
  payload[propiedad] = valor;
  
  verificarCambios();

};

// Define la función verificarCambios que verifica si hay cambios entre los valores antiguos y nuevos de un payload.
const verificarCambios = () => {
    // Comprueba si todos los campos relevantes en payload_old y payload son iguales.
    // Utiliza Object.keys para obtener las claves de ambos objetos y compara sus valores.
    const camposIguales = Object.keys(payload_old).every( key => payload_old[key] == payload[key]);
    
    // Verifica si al menos uno de los valores en el nuevo payload no es una cadena vacía.
    const alMenosUnValorVacio = Object.values(payload).some(value => value == '');

    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales && alMenosUnValorVacio);
}

const DiasLibres = (value) => {
    const indice = ListaDiasLibres.value.indexOf(value)
    
    if (indice!== -1) {
        // Si el número está en el arreglo, lo elimina
        ListaDiasLibres.value.splice(indice, 1);
    } else {
        // Si el número no está en el arreglo, lo agrega
        ListaDiasLibres.value.push(value);
    }
    ActualizarPayload('dias_descanso', ListaDiasLibres.value.join(','))
};
    
// Observar cambios en la variable
watch(TipoDeContrato, (nuevoValor) => ActualizarPayload('tipo_contrato', nuevoValor));
watch(NivelEstudio, (nuevoValor) => ActualizarPayload('nivel_estudio_id', nuevoValor));
watch(TerminoContrato, 
    (nuevoValor) => {
        ActualizarPayload('termino_contrato', nuevoValor);
        if(nuevoValor == 0) {
            ActualizarPayload('fecha_fin', '1990-01-01')
        }
    }
);
watch(FechaContratacion, (nuevoValor) => ActualizarPayload('fecha_inicio', nuevoValor));
watch(FechaFinalizacionContrato, (nuevoValor) => ActualizarPayload('fecha_fin', nuevoValor));
watch(HoraEntrada, (nuevoValor) => ActualizarPayload('hora_ingreso', String(nuevoValor)));
watch(HoraSalida, (nuevoValor) => ActualizarPayload('hora_egreso', String(nuevoValor)));

watch(DatosUsuario, (nuevaInfo) => {
        MostrarValores(nuevaInfo)
    })

const emit = defineEmits([
        'respuestaServidor',
    ])

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {
    //si ID es nulo crea un usuario
 
    if (RequiereActualizar.value == true) {
        const respuesta = await peticiones.ActualizarContrato(DatosUsuario.value?.user_id, ID_USERMASTER, payload);
        if(respuesta.success == true){
            emit('respuestaServidor', {'texto':respuesta?.data?.message, 'valor':true})
        } else {
            console.error(respuesta?.error)
            emit('respuestaServidor', {'texto':respuesta?.error, 'valor':false})
        }

    } else {
        emit('respuestaServidor', {'texto': "No se requiere actualizar", 'valor':true});
    }
};
onMounted(() => {
    MostrarValores(DatosUsuario.value)
});

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
    color: #1A2771;  
    font-size:  22px;  
    font-family: Poppins;  
    font-weight:  500;  
    line-height:  32px;  
    word-wrap: break-word;
}


</style>

