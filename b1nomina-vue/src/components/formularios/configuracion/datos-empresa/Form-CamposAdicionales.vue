<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <div class="row">
            
            <InputBorderDescripcion
                Placeholder="Ingresar nombre del campo"
                :Titulo="`Campo # ${Informacion.id}`"
                name="CampoAdicional"
                v-model="NombreCampo"
                @update:modelValue="NombreCampo = $event"
                :requerido="RequiereActualizar"
            />
            <div class="espacioTrash">
                
                <InterruptorButton 
                        @ValorEstado="verEstado"
                        :Objid="`EstadoCampo${Informacion.id}`"
                        :Texto="(EstadoCampo)? 'Activo' : 'Inactivo'"
                        Tipo="individual"
                        :Estado="(EstadoCampo)? true :false"
                        :requerido="RequiereActualizar"
                    />
                
                <trashIcon
                    Stroke="#1A245B" 
                    text="Eliminar"
                    @click="eliminarElemento"
                />
            </div>
            
        </div>

        <div class="espacioBoto" v-if="RequiereActualizar">
            <TemplateButton :form="IDFORM" Tipo="submit" text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import TemplateButton from '@/components/botones/Template-button.vue';
import InterruptorButton from '@/components/inputs/Interruptor-button.vue';
import trashIcon from '@/components/icons/trash-icon.vue';

import { defineProps, ref, reactive, watch, defineEmits, onMounted} from 'vue';

const props = defineProps({
    Informacion: {
        type: Object,
        default: {}
    },
});

const RequiereActualizar = ref(false);



const IDFORM = "ActualizarCargo" + props.Informacion?.id;

const emit = defineEmits([
    "DataNotificacion",
    "ActualizarInformacion"
]);

// Definicion de variables de los inputs

const NombreCampo = ref('');

const EstadoCampo = ref(false);

const Estado = ref('');

const verEstado = (valor) => {
    (valor == true)
        ? Estado.value = 1
        : Estado.value = 0
}

//Contiene la información original
const payload_old = reactive({
    id:'',
    NombreCampo: "",
    estado: ''

});

//Contiene la información a enviar
const payload = reactive({
    id:'',
    NombreCampo: "",
    estado: ''

});



//Escuchar cambios en las variables
watch(NombreCampo, (nuevoValor) => ActualizarPayload('NombreCampo', nuevoValor));
watch(Estado, (nuevoValor) => ActualizarPayload('estado', Number(nuevoValor)));


//ve si hay cambios en la informacion y actualiza los campos:
watch(() => props.Informacion, (nuevoValor) => { 
  MostrarValores(nuevoValor) 
});


//actualizar datos del payload a enviar
const ActualizarPayload = (propiedad, valor) => {
    payload[propiedad] = valor;
    verificarCambios();
};

// Define la función verificarCambios que verifica si hay cambios entre los valores antiguos y nuevos de un payload.
const verificarCambios = () => {
    // Comprueba si todos los campos relevantes en payload_old y payload son iguales.
    // Utiliza Object.keys para obtener las claves de ambos objetos y compara sus valores.
    const camposIguales = (payload_old?.NombreCampo ===  payload?.NombreCampo)
    const campoVacio = payload?.NombreCampo == ''
    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales && !campoVacio );
}


// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {


NombreCampo.value = (DATA?.Nombre == null)? '' :DATA?.Nombre;

EstadoCampo.value = (DATA?.estado == 0) ? true : false;

// Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
  // utilizando '' si DATA?.documento es null.
  payload_old.id = DATA?.id ?? '';
  payload.id = DATA?.id ?? '';

  payload_old.NombreCampo = DATA?.Nombre ?? '';
  payload.NombreCampo = DATA?.Nombre ?? '';
  
  payload_old.estado = DATA?.estado ?? '';
  payload.estado = DATA?.estado ?? '';
  
};

const eliminarElemento = () => {
    console.log(props.Informacion)
 };

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = () => {

  
  if (RequiereActualizar){
    console.log(payload)
    emit("DataNotificacion", 
        {
            'texto': "Informacion actualizada con exito", 
            'valor': true
        }
    )
  } else {
    emit("DataNotificacion", 
        {
            'texto': "Todavía hay campos en blanco", 
            'valor':false
        }
    )
  }
};

onMounted(() => {
  MostrarValores(props.Informacion)
});

</script>

<style scoped>

form.formulario {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    box-sizing: border-box;
    position:relative;
}

h4 {
font-size: 22px;
font-weight: 500;
line-height: 30px;
text-align: left;
margin: 0;
}

div.row {
    display: flex;
    justify-content: space-between;
    gap:12px;
    
}

div.espacioBoto {
    width: 100%;
}

div.espacioTrash {
    display:flex;
    flex-direction: row;
    justify-content: end;
    align-items: start;
    align-self: flex-start;
    position: absolute;
    gap:12px;
    top: -0.6rem; 
    right: 0;
}

</style>