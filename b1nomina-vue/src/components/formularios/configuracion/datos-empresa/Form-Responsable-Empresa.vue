<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <h4>Responsable de la empresa</h4>
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar Nombre"
                Titulo="Nombre"
                name="Nombre"
                v-model="NombreResponsable"
                @update:modelValue="NombreResponsable = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
        
            <InputBorderDescripcion
                Placeholder="Ingresar Rut"
                Titulo="RUT"
                name="Documento"
                v-model="numeroDocumento"
                @update:modelValue="numeroDocumento = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"/>
            
            <InputBorderDescripcion
                Placeholder="Ingresar Email "
                Titulo="Email de contacto"
                v-model="correoResponsable"
                @update:modelValue="correoResponsable = $event"
                Tipo="email"
                :requerido="RequiereActualizar"
                name="CorreoElectronico"
            />

            <InputBorderDescripcion
                Placeholder="Ingresar Teléfono"
                Titulo="Teléfono  de contacto"
                v-model="telefonoResponsable"
                @update:modelValue="telefonoResponsable = $event"
                :requerido="RequiereActualizar"
                name="Telefono"
            />
        </div>

        
        <div class="espacioBoto" v-if="RequiereActualizar">
            <TemplateButton :form="IDFORM" Tipo="submit" text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import TemplateButton from '@/components/botones/Template-button.vue';

import { defineProps, ref, reactive, watch, defineEmits, onMounted} from 'vue';

const props = defineProps({
    Informacion: {
        type: Object,
        default: {}
    },
    parametros: {
        type: Object,
        default: {}
    },
})

const IDFORM = "DatosResponsableEmpresa"

const emit = defineEmits([
    "DataNotificacion",
]);

// Definicion de variables de los inputs

const NombreResponsable = ref('');
const numeroDocumento = ref('');
const correoResponsable= ref('');
const telefonoResponsable = ref('');

//control para envio de informacion
const RequiereActualizar = ref(false);

//Contiene la información original
const payload_old = reactive({
    NombreResponsable: "",
    numeroDocumento: "",
    correoResponsable: "",
    telefonoResponsable: "",
});

//Contiene la información a enviar
const payload = reactive({
    NombreResponsable: "",
    numeroDocumento: "",
    correoResponsable: "",
    telefonoResponsable: "",
});

//Escuchar cambios en las variables
watch(NombreResponsable, (nuevoValor) => ActualizarPayload('NombreResponsable', nuevoValor?.toLocaleLowerCase()));
watch(numeroDocumento, (nuevoValor) => ActualizarPayload('numeroDocumento', nuevoValor));
watch(correoResponsable, (nuevoValor) => ActualizarPayload('correoResponsable', nuevoValor?.toLocaleLowerCase()));
watch(telefonoResponsable, (nuevoValor) => ActualizarPayload('telefonoResponsable', nuevoValor));

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
    const camposIguales = Object.keys(payload_old).every(key => payload_old[key] === payload[key]);

    // Verifica si al menos uno de los valores en el nuevo payload no es una cadena vacía.
    const alMenosUnValorVacio = Object.values(payload).some(value => value == '');

    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales && alMenosUnValorVacio);
}


// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {

NombreResponsable.value = (DATA?.NombreResponsable == null)? '' :DATA?.NombreResponsable;
numeroDocumento.value = (DATA?.RutResponsable == null)? '' :DATA?.RutResponsable;
correoResponsable.value = (DATA?.emailResponsable == null)? '' :DATA?.emailResponsable;
telefonoResponsable.value = (DATA?.telefonoResposnable == null)? '' :DATA?.telefonoResposnable;


// Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
  // utilizando '' si DATA?.documento es null.
  payload_old.NombreResponsable = DATA?.NombreResponsable ?? '';
  payload.NombreResponsable = DATA?.NombreResponsable ?? '';
  
  payload_old.numeroDocumento = DATA?.RutResponsable ?? '';
  payload.numeroDocumento = DATA?.RutResponsable ?? '';

  payload_old.correoResponsable = DATA?.emailResponsable ?? '';
  payload.correoResponsable = DATA?.emailResponsable ?? '';

  payload_old.telefonoResponsable = DATA?.telefonoResposnable ?? '';
  payload.telefonoResponsable = DATA?.telefonoResposnable ?? '';

}

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */const Enviar = () => {
  
  if (RequiereActualizar.value == true){
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
  console.log(props.Informacion)
});


</script>


<style scoped>

form.formulario {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    box-sizing: border-box;
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

</style>