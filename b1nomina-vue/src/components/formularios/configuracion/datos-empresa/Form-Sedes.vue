<template>
    <form class="formulario" :id="IDFORM" @submit.prevent="Enviar">
        <div class="contend">
            <div class="row">
                <InputBorderDescripcion
                    Placeholder="Ingresar Nombre"
                    Titulo="Nombre"
                    name="Nombre"
                    v-model="NombreSede"
                    @update:modelValue="NombreSede = $event"
                    :requerido="RequiereActualizar"
                />
                
                <InputBorderDescripcion
                    Placeholder="Ciudad"
                    Titulo="Ciudad"
                    name="Ciudad"
                    v-model="CiudadSede"
                    @update:modelValue="CiudadSede = $event"
                    :requerido="RequiereActualizar"
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
                    Placeholder="Ingresar la dirección"
                    Titulo="Dirección de la Sede"
                    name="Dirección"
                    v-model="DireccionSede"
                    @update:modelValue="DireccionSede = $event"
                    :requerido="RequiereActualizar"
                />
            </div>

            <div class="espacioBoto" v-if="RequiereActualizar">
                <TemplateButton :form="IDFORM" Tipo="submit" text="Actualizar"/>
            </div>
        </div>
        <div class="espacioTrash">
            <trashIcon
                Stroke="#1A245B" 
                text="Eliminar"
                @click="eliminarElemento"
            />
        </div>

    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import ListaTemplateBorder from "@/components/listas/Lista-template-border.vue";
import LayoutInputBorder from "@/components/Layouts/LayoutInputBorder.vue";
import TemplateButton from '@/components/botones/Template-button.vue';
import trashIcon from '@/components/icons/trash-icon.vue';

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
});

const IDFORM = "ActualizarSede" + props.Informacion?.id;

const emit = defineEmits([
    "DataNotificacion",
    "ActualizarInformacion"
]);

const NombreSede = ref('')
const CiudadSede = ref('')
const Region = ref('')
const Comuna = ref('')
const DireccionSede = ref('')

//definicion de vaiables de los parametos
const ListaLocalidad = ref(''); //Los datos se asignan segun el idRegion

//filtra la lista de regiones segun el id
const filtroRegion = (id) => {
    ListaLocalidad.value = props.parametros.localidad?.filter(item => item.idregion == id);
};

//control para envio de informacion
const RequiereActualizar = ref(false);

//Contiene la información original
const payload_old = reactive({
    NombreSede: "",
    CiudadSede: "",
    Region: "",
    Comuna: "",
    Direccion: "",
});

//Contiene la información a enviar
const payload = reactive({
    NombreSede: "",
    CiudadSede: "",
    Region: "",
    Comuna: "",
    Direccion: "",
});

//Escuchar cambios en las variables
watch(NombreSede, (nuevoValor) => ActualizarPayload('NombreSede', nuevoValor));
watch(CiudadSede, (nuevoValor) => ActualizarPayload('CiudadSede', nuevoValor));

watch(Region, (nuevoValor) => {
        filtroRegion(nuevoValor);
        ActualizarPayload('Region', nuevoValor);
    }
);
watch(Comuna, (nuevoValor) => ActualizarPayload('Comuna', nuevoValor));

watch(DireccionSede, (nuevoValor) => ActualizarPayload('Direccion', nuevoValor.toLocaleLowerCase()));

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

    const camposIguales = Object.keys(payload_old).every(key => payload_old[key] === payload[key]);

    const alMenosUnValorVacio = Object.values(payload).some(value => value == '');

    RequiereActualizar.value = !(camposIguales);

};

// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {

//actualiza el listado de regiones segun la comuna selecionada
filtroRegion((DATA?.region_id == null)? '' :DATA?.region_id);

NombreSede.value = (DATA?.Nombre == null)? '' :DATA?.Nombre;
CiudadSede.value = (DATA?.ciudad == null)? '' :DATA?.ciudad;

Region.value = (DATA?.region_id == null)? '' :DATA?.region_id;
Comuna.value = (DATA?.comuna_id == null)? '' :DATA?.comuna_id;
DireccionSede.value = (DATA?.direccion == null)? '' :DATA?.direccion;

// Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
  // utilizando '' si DATA?.documento es null.
  payload.NombreSede = DATA?.Nombre ?? '';
  payload_old.NombreSede = DATA?.Nombre ?? '';
  

  payload.CiudadSede = DATA?.ciudad ?? '';
  payload_old.CiudadSede = DATA?.ciudad ?? '';
  
  payload.Region = DATA?.region_id ?? '';
  payload_old.Region = DATA?.region_id ?? '';

  payload.Comuna = DATA?.comuna_id ?? '';
  payload_old.Comuna = DATA?.comuna_id ?? '';

  payload.Direccion = DATA?.direccion ?? '';
  payload_old.Direccion = DATA?.direccion ?? '';

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
  //si ID es nulo crea un usuario
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
            'valor': false
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
    flex-direction: row;
   box-sizing: border-box;
   gap: 12px;
}

div.contend{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    box-sizing: border-box;
    flex-grow: 1;
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

div.espacioBoto{
    width: 100%;
    display: flex;
}

div.espacioTrash {
    display:flex;
    flex-direction: row;
    justify-content: end;
    align-items: start;
    align-self: flex-start;
    box-sizing: border-box;

}



</style>