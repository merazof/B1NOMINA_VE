<template>
  <form class="formulario" id="Form1r" @submit.prevent="Enviar">
    <h2 class="titulo-form">Datos básicos</h2>
    <!---->
    <div class="row-form">
      <LayoutInputLineal textLabel="Tipo de Documento" :requerido="RequiereActualizar">
        <template v-slot>
          <ListaTemplateLineal
            v-model="tipoDocumentoSelect"
            :options="ListaTiposDocumentos"
            :requerido="RequiereActualizar"            
            :preseleccion="tipoDocumentoSelect"  
            optionsSelected="Seleccionar"
          />
        </template>
      </LayoutInputLineal>

      <InputLinealDescripcion
        Placeholder="Ejemplo: 1234567-8"
        Titulo="Número de documento"
        name="Documento"
        v-model="numeroDocumento"
        @update:modelValue="numeroDocumento = $event"
        :requerido="RequiereActualizar"
        :Deshabilitar="tipoDocumentoSelect != 2"
        :minimo-caracteres="3"
        :maximo-caracteres="100"
      />
    </div>

    <div class="row-form">
      <InputLinealDescripcion
        Placeholder="Ejemplo: Juan"
        Titulo="Nombres"
        v-model="nombres"
        @update:modelValue="nombres = $event"
        :requerido="RequiereActualizar"
        name="Nombres"
      />
      <InputLinealDescripcion
        Placeholder="Ejemplo: Peres"
        Titulo="Apellido Paterno"
        v-model="apellidos"
        @update:modelValue="apellidos = $event"
        :requerido="RequiereActualizar"
        name="Apellidos"
      />
    </div>

    <div class="row-form">
      <InputLinealDescripcion
        Placeholder="Ejemplo@gmail.com"
        Titulo="Correo electrónico"
        v-model="correo"
        @update:modelValue="correo = $event"
        Tipo="email"
        :requerido="RequiereActualizar"
        name="CorreoElectronico"
      />
    </div>
    <div class="row-form" v-show="mostrarFoto">
      <inputPicForm ref="inputFoto" @actualizarDataImagen="actualizarDataImagen" />
    </div>
  </form>
</template>

<script setup>
//importaciones
import InputLinealDescripcion from "@/components/inputs/Input-Lineal-descripcion.vue";
import ListaTemplateLineal from "@/components/listas/Lista-template-lineal.vue";
import LayoutInputLineal from "@/components/Layouts/LayoutInputLineal.vue";
import inputPicForm from "@/components/inputs/Input-Pic-form.vue";

import { ref, watch, defineEmits, defineProps, reactive, defineExpose, onBeforeMount, onMounted } from "vue";
import axios from "axios";



//Configuracion del componente

// se espera una propiedad EmpleadoID de tipo Number o String que corresponde al ID del empleado que se esta añadiendo.
const props = defineProps({
  EmpleadoID: {
    type: [Number, String], // Especifica que el tipo de la propiedad es Number
    default: 0
  },
  parametros: {
    type: Object,
    default: {},
  },
  Informacion: {
    type: Object,
    default:{
      apellidos: "",
      correo: "",
      documento: "",
      nombres: "",
    }
  }
});




// inicializacion de variables reactivas

const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));

//Valores
const numeroDocumento = ref("");
const nombres = ref("");
const apellidos = ref("");
const correo = ref("");



const dataImagen = ref("");


const RequiereActualizar = ref(false)

//Configuraciones
const tipoDocumentoSelect = ref("2"); //Documento selecionado
const mostrarFoto = ref(true);
const ListaTiposDocumentos = [
  {
    id: 1,
    nombre: "Pasaporte",
  },
  {
    id: 2,
    nombre: "RUT",
  },
];


//Contiene la información a enviar
const payload_old = reactive({
  apellidos: "",
  correo: "",
  documento: "",
  nombres: "",
});

const payload = reactive({
  apellidos: "",
  correo: "",
  documento: "",
  nombres: "",
});

//referencia de objetos:
const inputFoto = ref(null);

/////////////// Funciones ///////////////////////////

//Manejo de datos

//Actualizar valores del payload


watch(numeroDocumento, (nuevoValor) => ActualizarPayload("documento", nuevoValor));
watch(nombres, (nuevoValor) => { ActualizarPayload("nombres", nuevoValor.toUpperCase())});
watch(apellidos, (nuevoValor) => ActualizarPayload("apellidos", nuevoValor.toUpperCase()));
watch(correo, (nuevoValor) => ActualizarPayload("correo", nuevoValor.toLowerCase()));


watch(() => props.EmpleadoID, (nuevoValor) => { (nuevoValor == null) ? mostrarFoto.value = true : ExisteFoto(nuevoValor);});

watch(() => props.Informacion, (nuevoValor) => { 
  MostrarValores(nuevoValor) 
});


/**
 * Actualiza el valor de una propiedad específica dentro del objeto 'payload'.
 *
 * @param {string} propiedad - El nombre de la propiedad a actualizar en el objeto 'payload'.
 * @param {any} valor - El nuevo valor que se asignará a la propiedad especificada.
 *
 * @example
 * // 'payload' es un objeto con una estructura predefinida.
 * const payload = {
 *   nombre: '',
 *   edad: 0
 * };
 *
 * // Llamando a ActualizarPayload para cambiar el nombre.
 * ActualizarPayload('nombre', variable);
 *
 * // Ahora, 'payload' se verá así:
 * // {
 * //   nombre: 'Pedro',
 * //   edad: 30
 * // }
 */
 const ActualizarPayload = (propiedad, valor) => {
  // Asigna el nuevo valor a la propiedad especificada dentro del objeto 'payload'.
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
    RequiereActualizar.value = !(camposIguales && !alMenosUnValorVacio);
}

// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {

  // Asigna el valor de DATA?.documento a numeroDocumento.value, utilizando '' si DATA?.documento es null.
  numeroDocumento.value = (DATA?.rut == null)? '' :DATA?.rut;
  
  // Asigna el valor de DATA?.nombres a nombres.value, utilizando '' si DATA?.nombres es null.
  nombres.value = (DATA?.nombres == null)? '' :DATA?.nombres;

  // Asigna el valor de DATA?.apellidos a apellidos.value, utilizando '' si DATA?.apellidos es null.
  apellidos.value = (DATA?.apellido_paterno == null)? '' :DATA?.apellido_paterno;

  // Asigna el valor de DATA?.correo a correo.value, utilizando '' si DATA?.correo es null.
  correo.value = (DATA?.email == null)? '' :DATA?.email;

  // Establece el valor de tipoDocumentoSelect.value en 2, indicando un tipo de documento predeterminado.
  tipoDocumentoSelect.value = 2;

  // Asigna el valor de DATA?.documento a payload_old.documento y payload.documento,
  // utilizando '' si DATA?.documento es null.
  payload_old.documento = DATA?.rut ?? '';
  payload.documento = DATA?.rut ?? '';

  // Repite el proceso para los demás campos, asignando valores a payload_old y payload,
  // utilizando '' si los valores correspondientes en DATA son null.
  payload_old.nombres = DATA?.nombres ?? '';
  payload.nombres = DATA?.nombres ?? '';

  payload_old.apellidos = DATA?.apellido_paterno ?? '';
  payload.apellidos = DATA?.apellido_paterno ?? '';

  payload_old.correo = DATA?.email ?? '';
  payload.correo = DATA?.email ?? '';
}


const actualizarDataImagen = (evento) => {
  dataImagen.value = evento;
};


// Acciones

// Función para manejar el cambio de modal. Recibe un idEpleadoCreado como parámetro y emite el evento 'nextModal' con este id.
const NextModal = (idEpleadoCreado) => {
  emit("nextModal", idEpleadoCreado); // Emite el evento 'nextModal' con el idEpleadoCreado como argumento
};

// Método para reiniciar el formulario
const resetForm = () => {
  // Reinicia los campos a sus valores iniciales
  numeroDocumento.value = "";
  nombres.value = "";
  apellidos.value = "";
  tipoDocumentoSelect.value = "";
  correo.value = "";
  // Reinicia el payload
  Object.keys(payload).forEach((key) => {
    payload[key] = "";
  });
  inputFoto.value.reset();
};

//Accion final:

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = () => {
  //si ID es nulo crea un usuario
  let statuspay = Object.values(payload).some((value) => value !== "");

  if (props.EmpleadoID != null && props.EmpleadoID > 0) {
    if (statuspay == true) {
      ActualizarDatosBasicos(ID_USERMASTER, payload, props.EmpleadoID);
    } else {
      NextModal(props.EmpleadoID);
    }
  }
};


// Comunicación con api:



const ActualizarDatosBasicos = async (idCreator, Datos, ID_EMpleado) => {
    // Realiza la solicitud PUT y espera la respuesta.
    await axios.put(`/user/${ID_EMpleado}/update_preuser?user_updater=${idCreator}`, Datos)
      .then(
        // Maneja la respuesta exitosa.
        (res) => {
          // Verifica si la respuesta tiene un estado HTTP 200 (OK).
          if (res.status == 200) {
            // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.
            emit("respuesta", { texto: res.data?.message, valor: true });
          }

          
          // Llama a la función si nexmodal data imagen esta vacia o es indefinido NextModal pasando el ID del nuevo usuario.
          if (mostrarFoto.value == false) {
            NextModal(props.EmpleadoID);
          } else {
            if (dataImagen.value == undefined || dataImagen.value == "") {
              NextModal(props.EmpleadoID);
            } else {
              //console.log(mostrarFoto.value+ "mostrar foto")
              subirFoto(ID_USERMASTER, dataImagen.value, props.EmpleadoID);
            } 
          }
        }
      )
      .catch(
        // Maneja los errores de la solicitud.
        (err) => {
          // Verifica si la respuesta del error contiene un objeto de respuesta.
          if (err.response) {
            console.error(err)
            // Si el estado HTTP es 422 (Solicitud no procesable), imprime un mensaje de error.
            if (err.response.status == 422) {
              
              emit("respuesta",{ texto: "no se puede procesar la solcitud", valor: false });
            }else {
              // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
              emit("respuesta", { texto: err.response.data.message, valor: false });
            }            
          }
        }
      );
};


// Función para actualizar los datos básicos de un usuario preliminar (preuser) en el sistema.
// Utiliza axios para realizar una solicitud PUT al endpoint '/user/{EmpleadoID}/update_preuser'.
// Los datos a actualizar se pasan como argumento 'Datos', y 'idCreator' es el ID del usuario que realiza la actualización.
const subirFoto = async (idCreator, Datos, ID_EMpleado) => {
  const formData = new FormData();
  formData.append("File", Datos); // Asume que 'Datos' es un objeto File

  await axios.post(`/user/${ID_EMpleado}/upload_pic_user?creatorUserId=${idCreator}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(
      // Maneja la respuesta exitosa.
      (res) => {
        // Verifica si la respuesta tiene un estado HTTP 200 (OK).
        if (res.status == 200 || res.status == 201) {
          // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.
          emit("respuesta", { texto: res.data?.message, valor: true });

          // Llama a la función NextModal pasando el ID del empleado.
          NextModal(ID_EMpleado);
        }
      }
    )
    .catch(
      // Maneja los errores de la solicitud.
      (err) => {
        // Verifica si la respuesta del error contiene un objeto de respuesta.
        if (err.response) {
          // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
          emit("respuesta", { texto: err.response.data?.message, valor: false });
        }
      }
    );
};

const ExisteFoto = async (IDUsuario) => {
 //console.log("ejecutando consulta");
  await axios.get(`/user/${IDUsuario}/have_pic`)
    .then((respuesta) => {
      if(respuesta.status == 200){

        mostrarFoto.value = false;
        inputFoto.value.reset();
      }
    })
    .catch((err) => {
      if (err) {
        mostrarFoto.value = true;
      }
    });
};




// Define los eventos que el componente puede emitir. En este caso, se especifica un evento llamado 'nextModal'.
const emit = defineEmits([
  "nextModal", // Nombre del evento que puede ser emitido por este componente
  "respuesta",
]);

// Exponer la función de limpieza para que sea accesible desde el componente padre
defineExpose({
  resetForm,
});


onMounted(() => {
  MostrarValores(props.Informacion)
});


</script>

<style scoped>
/* Establece el diseño de la fila del formulario, 
    usando flexbox para alinear elementos en filas y 
    espaciarlos uniformemente 
  */

div.row-form {
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

/* Define el estilo del formulario, utilizando 
flexbox para organizar los elementos en una 
columna con un espacio de  16px entre ellos */
form.formulario {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

/* Estilo para el texto dentro del botón de añadir una foto, 
asegurando que el texto sea legible y coherente con el diseño */
.add-photo > span {
  color: #c2c2c2;
  font-size: 18px;
  font-family: Poppins;
  font-weight: 600;
  line-height: 40px;
  word-wrap: break-word;
}
</style>
