<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <h4>Datos básicos de tu empresa</h4>
        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar Nombre"
                Titulo="nombre de la empresa"
                name="nombre"
                v-model="NombreEmpresa"
                @update:modelValue="NombreEmpresa = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
        
            <InputBorderDescripcion
                Placeholder="Ingresar Rut"
                Titulo="Rut de la empresa"
                name="Documento"
                v-model="numeroDocumento"
                @update:modelValue="numeroDocumento = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"/>
            
            <InputBorderDescripcion
                Placeholder="Ingresar Correo Electrónico "
                Titulo="Email de contacto"
                v-model="correoEmpresa"
                @update:modelValue="correoEmpresa = $event"
                Tipo="email"
                :requerido="RequiereActualizar"
                name="CorreoElectronico"
            />
        </div>

        <h4>Ubicación de la empresa</h4>
        <div class="row">
            <InputBorderDescripcion 
                Placeholder="Ingresar nombre de la ciudad"
                Titulo="Ciudad"
                name="Ciudad"
                v-model="CiudadEmpresa"
                @update:modelValue="CiudadEmpresa = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
            <LayoutInputBorder textLabel="Región" :requerido="RequiereActualizar">
                <template v-slot>
                  <ListaTemplateBorder
                    v-model="Region"
                    :options="parametros.regiones"
                    :requerido="RequiereActualizar"            
                    :preseleccion="Region"  
                    optionsSelected="Seleccionar"
                  />
                </template>
            </LayoutInputBorder>

              <LayoutInputBorder textLabel="Comuna" :requerido="RequiereActualizar">
                <template v-slot>
                  <ListaTemplateBorder
                    v-model="Comuna"
                    :options="ListaLocalidad"
                    :requerido="RequiereActualizar"            
                    :preseleccion="Comuna"  
                    optionsSelected="Seleccionar"
                  />
                </template>
              </LayoutInputBorder>
        </div>
        <div class="row">
            <InputBorderDescripcion 
                Placeholder="Ingresar dirección de la empresa"
                Titulo="Dirección de la empresa"
                name="Direccion"
                v-model="Direccion"
                @update:modelValue="Direccion = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
        </div>
        <div class="espacioBoto" v-if="RequiereActualizar">
            <TemplateButton :form="IDFORM" Tipo="submit" text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import ListaTemplateBorder from "@/components/listas/Lista-template-border.vue";
import LayoutInputBorder from "@/components/Layouts/LayoutInputBorder.vue";
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

const IDFORM = "DatosBasicosEmpresa"

const emit = defineEmits([
    "DataNotificacion",
]);

// Definicion de variables de los inputs

const NombreEmpresa = ref('');
const numeroDocumento = ref('');
const correoEmpresa= ref('');
const CiudadEmpresa = ref('');
const Region = ref('');
const Comuna = ref('');
const Direccion = ref('');

//definicion de vaiables de los parametos
const ListaLocalidad = ref({}); //Los datos se asignan segun el idRegion

//filtra la lista de regiones segun el id
const filtroRegion = (id) => {
    ListaLocalidad.value = props.parametros.localidad?.filter(item => item.idregion == id);
};

//control para envio de informacion
const RequiereActualizar = ref(false);

//Contiene la información original
const payload_old = reactive({
    NombreEmpresa: "",
    numeroDocumento: "",
    correoEmpresa: "",
    CiudadEmpresa: "",
    Region: "",
    Comuna: "",
    Direccion: "",
});

//Contiene la información a enviar
const payload = reactive({
    NombreEmpresa: "",
    numeroDocumento: "",
    correoEmpresa: "",
    CiudadEmpresa: "",
    Region: "",
    Comuna: "",
    Direccion: "",
});

//Escuchar cambios en las variables
watch(NombreEmpresa, (nuevoValor) => ActualizarPayload('NombreEmpresa', nuevoValor?.toLocaleLowerCase()));
watch(numeroDocumento, (nuevoValor) => ActualizarPayload('numeroDocumento', nuevoValor));
watch(correoEmpresa, (nuevoValor) => ActualizarPayload('correoEmpresa', nuevoValor?.toLocaleLowerCase()));
watch(CiudadEmpresa, (nuevoValor) => ActualizarPayload('CiudadEmpresa', nuevoValor?.toLocaleLowerCase()));
watch(Region, (nuevoValor) => {
        filtroRegion(nuevoValor);
        ActualizarPayload('Region', nuevoValor);
    }
);
watch(Comuna, (nuevoValor) => ActualizarPayload('Comuna', nuevoValor));

watch(Direccion, (nuevoValor) => ActualizarPayload('Direccion', nuevoValor));

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

//actualiza el listado de regiones segun la comuna selecionada
filtroRegion((DATA?.region_id == null)? '' :DATA?.region_id);

NombreEmpresa.value = (DATA?.nombre == null)? '' :DATA?.nombre;
numeroDocumento.value = (DATA?.rut == null)? '' :DATA?.rut;
correoEmpresa.value = (DATA?.correo == null)? '' :DATA?.correo;
CiudadEmpresa.value = (DATA?.ciudad == null)? '' :DATA?.ciudad;

Region.value = (DATA?.region_id == null)? '' :DATA?.region_id;
Comuna.value = (DATA?.comuna_id == null)? '' :DATA?.comuna_id;
Direccion.value = (DATA?.direccion == null)? '' :DATA?.direccion;

// Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
  // utilizando '' si DATA?.documento es null.
  payload_old.NombreEmpresa = DATA?.nombre ?? '';
  payload.NombreEmpresa = DATA?.nombre ?? '';
  
  payload_old.numeroDocumento = DATA?.rut ?? '';
  payload.numeroDocumento = DATA?.rut ?? '';

  payload_old.correoEmpresa = DATA?.correo ?? '';
  payload.correoEmpresa = DATA?.correo ?? '';

  payload_old.CiudadEmpresa = DATA?.ciudad ?? '';
  payload.CiudadEmpresa = DATA?.ciudad ?? '';

  payload_old.Region = DATA?.region_id ?? '';
  payload.Region = DATA?.region_id ?? '';

  payload_old.Comuna = DATA?.comuna_id ?? '';
  payload.Comuna = DATA?.comuna_id ?? '';

  payload_old.Direccion = DATA?.direccion ?? '';
  payload.Direccion = DATA?.direccion ?? '';

}

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = () => {
  
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
  MostrarValores(props.Informacion.Sociedad)
  console.log(props.Informacion)
});

</script>

<style scoped>

form.formulario {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px
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