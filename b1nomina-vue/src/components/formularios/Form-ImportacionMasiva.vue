<template>
    <form class="formulario" id="FormImportM" @submit.prevent="EnviarDoc">
        <p>
            Descarga el formato de Excel que te ayudará a ingresar la información de tus empleados y luego cargarlo en nuestro sistema.
        </p>
        <div class="row-form">
          <TemplateButton2 
            text="Descargar formato Excel" 
            @click="descargarPlantilla" 
          >
            <template #post>
              <DonwloadIconVue />
            </template>            
          </TemplateButton2>  

        </div>

        <h2 class="titulo-form">
            Cargar Archivo
        </h2>
        <p>
            Luego de haber terminado de llenar el archivo con toda la información de los nuevos empleados, puedes cargarlo aquí:
        </p>
        <div class="row-form">
            <InputDocsForm
                @respuesta="checkFile"
                @actualizarDocumento="tomarData"
                ref="InputDocsMasive"
            />
        </div>
    </form>
</template>

<script setup>
import DonwloadIconVue from '@/components/icons/Donwload-icon.vue';
import TemplateButton2 from '@/components/botones/Template-button2.vue'
import InputDocsForm from '@/components/inputs/Input-Docs-form.vue';
import { defineEmits, ref, defineExpose} from 'vue';
import axios from 'axios'
import { useRoute } from 'vue-router';

    const route = useRoute();
    // idSociedad es un String
    const idSociedad = route.params.sociedadId;

const InputDocsMasive = ref(null)
const DataDocumento = ref('');
const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));
//toma la direccion del navegador
            const BaseURL = (window.location);

const emit = defineEmits([
    'actualizarDocumento',
    'respuesta',
]);

const resetInput = () => {

  InputDocsMasive.value?.reset();
}

defineExpose({
  resetInput
});

const checkFile = (respuesta) => emit("respuesta", respuesta);

const tomarData = (datosDelDocumento) => {
  DataDocumento.value = datosDelDocumento.value;
}


const EnviarDoc = () => {
    try {
        cargarDocumentoDAtaMasiva(ID_USERMASTER, DataDocumento.value)
    } catch (error) {
      InputDocsMasive.value?.reset();
      emit("respuesta", {'texto':error, 'valor':false});
    }
};

const descargarPlantilla = () => {
  const BaseURL = (window.location);
  //abre una ventana para descargar un recurso dado por el servidor
  axios.get(`sociedad/${idSociedad}/dowload_file_bulk_user`)
  .then(response => {
    const direccion = response?.data
   
    //console.log('http://' + BaseURL.hostname + '/' + direccion.data, "_blank", "width=500,height=500")
    window.open('http://' + BaseURL.hostname + '/' + direccion.data, "_blank", "width=500,height=500");
    //InputDocsMasive.value?.reset();
  })
  .catch(error => {
    emit("respuesta", {'texto':error?.data.message, 'valor':false});
  })
}

const cargarDocumentoDAtaMasiva = async (idCreator, Datos) => {
  const formData = new FormData();
  formData.append('File', Datos); // Asume que 'Datos' es un objeto File
  if(Datos != '') {
    await axios.post(`/user/bulk_load_users?sociedadId=${idCreator}&creatorUserId=${idCreator}`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    })
    .then(
      // Maneja la respuesta exitosa.
      res => {
        // Verifica si la respuesta tiene un estado HTTP 200 (OK).
        if (res.status == 200 || res.status == 201 ){
          // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.
          emit("respuesta", {'texto':res.data?.message, 'valor':true})   
          
          let archivo = res.data?.fileResult
          if(res.data?.fileResult){
            //abre una ventana para descargar un recurso dado por el servidor
            window.open('http://' + BaseURL.hostname + archivo, "_blank", "width=500,height=500");
          }

        }
      }
    )
    .catch(
      // Maneja los errores de la solicitud.
      err => {
        console.log(err)
        // Verifica si la respuesta del error contiene un objeto de respuesta.
        if (err.response) { 
          // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
          emit("respuesta", {'texto':err.response.data?.message, 'valor':false})            
        }
      }
    );
  } else {
    emit("respuesta", {'texto':'El campo esta vacio', 'valor':false})
  }
};

</script>

<style scoped>
/* Define el estilo del formulario, utilizando 
flexbox para organizar los elementos en una 
columna con un espacio de  16px entre ellos */
form.formulario {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

div.row-form {
    display: flex;
    flex-direction: row;
    gap: 24px;
    width: 100%;
    align-items: center;
    justify-content: center;
  }

/* Estilo para el título del formulario, asegurando que el texto sea legible y estéticamente agradable */
h2.titulo-form {
    margin: 0px;
    color: black;
    font-size: 22px;
    font-family: Poppins;
    font-weight: 500;
    line-height: 32px;
    word-wrap: break-word;
} 

form > p {
font-family: Poppins;
font-size: 16px;
font-weight: 400;
line-height: 26px;
letter-spacing: 0em;
text-align: left;
margin: 0;

}
</style>