<template>
  <form class="formulario" id="Form1" @submit.prevent="Enviar">
    <h2 class="titulo-form">Datos básicos</h2>
    <!---->
    <div class="row-form">
      <LayoutInputLineal textLabel="Tipo de Documento" :requerido="true">
        <template v-slot>
          <ListaTemplateLineal
            v-model="tipoDocumentoSelect"
            :options="ListaTiposDocumentos"
            optionsSelected="Seleccionar"
            :requerido="true"
          />
        </template>
      </LayoutInputLineal>

      <InputLinealDescripcion
        Placeholder="Ejemplo: 1234567-8"
        Titulo="Número de documento"
        name="Documento"
        v-model="numeroDocumento"
        @update:modelValue="numeroDocumento = $event"
        :requerido="true"
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
        :requerido="true"
        name="Nombres"
      />
      <InputLinealDescripcion
        Placeholder="Ejemplo: Peres"
        Titulo="Apellido Paterno"
        v-model="apellidos"
        @update:modelValue="apellidos = $event"
        :requerido="true"
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
        :requerido="true"
        name="CorreoElectronico"
      />

      <LayoutInputLineal textLabel="Enviar invitación a B1 Nomina por Email">
        <template v-slot>
          <InputRadioButton
            v-model="invitacion"
            grupo="EnviarInvitacion"
            texto="No"
            :valor="0"
          />
          <InputRadioButton
            v-model="invitacion"
            grupo="EnviarInvitacion"
            texto="Si"
            :valor="1"
          />
        </template>
      </LayoutInputLineal>
    </div>
    <div class="row-form" v-show="mostrarFoto">
      <inputPicForm ref="inputFoto" @actualizarDataImagen="actualizarDataImagen" />
    </div>
  </form>
</template>

<script setup>
import InputLinealDescripcion from "@/components/inputs/Input-Lineal-descripcion.vue";
import ListaTemplateLineal from "@/components/listas/Lista-template-lineal.vue";
import LayoutInputLineal from "@/components/Layouts/LayoutInputLineal.vue";
import InputRadioButton from "@/components/botones/Input-Radio-button.vue";
import inputPicForm from "@/components/inputs/Input-Pic-form.vue";

import { ref, watch, defineEmits, defineProps, reactive, defineExpose } from "vue";
import axios from "axios";

//lista de
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

// se espera una propiedad EmpleadoID de tipo Number o String que corresponde al ID del empleado que se esta añadiendo.
const props = defineProps({
  EmpleadoID: {
    type: [Number, String], // Especifica que el tipo de la propiedad es Number
  },
  parametros: {
    type: Object,
    default: {},
  },
});

// Define los eventos que el componente puede emitir. En este caso, se especifica un evento llamado 'nextModal'.
const emit = defineEmits([
  "nextModal", // Nombre del evento que puede ser emitido por este componente
  "respuesta",
]);

const inputFoto = ref(null);
const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));

// Método para reiniciar el formulario
const resetForm = () => {
  // Reinicia los campos a sus valores iniciales
  numeroDocumento.value = "";
  nombres.value = "";
  apellidos.value = "";
  tipoDocumentoSelect.value = "";
  correo.value = "";
  foto.value = "";
  invitacion.value = 0;
  // Reinicia el payload
  Object.keys(payload).forEach((key) => {
    payload[key] = "";
  });
  inputFoto.value.reset();
};

// Exponer la función de limpieza para que sea accesible desde el componente padre
defineExpose({
  resetForm,
});

// Función para manejar el cambio de modal. Recibe un idEpleadoCreado como parámetro y emite el evento 'nextModal' con este id.
const NextModal = (idEpleadoCreado) => {
  emit("nextModal", idEpleadoCreado); // Emite el evento 'nextModal' con el idEpleadoCreado como argumento
};

// inicializacion de variables reactivas
const numeroDocumento = ref("");
const nombres = ref("");
const apellidos = ref("");
const tipoDocumentoSelect = ref(""); //Documento selecionado
const correo = ref("");
const foto = ref("");
const invitacion = ref(0);
const dataImagen = ref("");
const mostrarFoto = ref(true)

// payload de la peticion
const payload = reactive({
  apellidos: "",
  correo: "",
  documento: "",
  nombres: "",
});
const actualizarDataImagen = (evento) => {
  dataImagen.value = evento;
};
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
};

watch(numeroDocumento, (nuevoValor) => ActualizarPayload("documento", nuevoValor));
watch(nombres, (nuevoValor) => ActualizarPayload("nombres", nuevoValor?.toUpperCase()));
watch(apellidos, (nuevoValor) =>
  ActualizarPayload("apellidos", nuevoValor?.toUpperCase())
);
watch(correo, (nuevoValor) => ActualizarPayload("correo", nuevoValor?.toLowerCase()));
watch(() => props.EmpleadoID, (nuevoValor) => {
  
  if(nuevoValor == null){
    //console.log(nuevoValor)
    mostrarFoto.value = true
  } else {
    ExisteFoto(nuevoValor);
  }
});

/**
 * Valores en desarrollo
 * watch(invitacion, (nuevoValor) => ActualizarPayload('invitacion', nuevoValor));
 */

// Función para crear un usuario preliminar (preuser) en el sistema.
// Utiliza axios para realizar una solicitud POST al endpoint '/user/create_preuser'.
// Los datos del usuario a crear se pasan como argumento 'Datos'.
const CrearUsuario = async (Datos) => {
  // Realiza la solicitud POST y espera la respuesta.
  await axios
    .post("/user/create_preuser", Datos)
    .then(
      // Maneja la respuesta exitosa.
      (res) => {
        // Verifica si la respuesta tiene un estado HTTP 201 (Creado).
        if (res.status == 201) {
          // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.
          emit("respuesta", { texto: res?.data?.message, valor: true });

          const newUserId = res.data.newUserId;

          // Llama a la función si nexmodal data imagen esta vacia o es indefinido NextModal pasando el ID del nuevo usuario.
          if (dataImagen.value == undefined || dataImagen.value == "") {
            NextModal(newUserId);
          } else {
            console.log(dataImagen)
            subirFoto(ID_USERMASTER, dataImagen.value, newUserId);
          }
        }
      }
    )
    .catch(
      // Maneja los errores de la solicitud.
      (err) => {
        // Verifica si la respuesta del error contiene un objeto de respuesta.
        if (err?.response) {
          // Si el estado HTTP es 422 (Solicitud no procesable), imprime un mensaje de error.
          if (err.status == 422) {
                ActualizarDatosBasicos(ID_USERMASTER, Datos,props.EmpleadoID)

          } else {
            console.log(err)
            // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
            emit("respuesta", { texto: err.response.data?.message, valor: false });
          }
        } else {
          emit({ texto: "no se puede procesar la solcitud", valor: false });
        }
      }
    );
};

const ExisteFoto = (IDUsuario) => {
 //console.log("ejecutando consulta");
 axios.get(`/user/${IDUsuario}/have_pic`)
    .then((respuesta) => {
      if(respuesta.status == 200){
       // console.log("consulta true");

        mostrarFoto.value = false;
        inputFoto.value.reset();
      }
    })
    .catch((err) => {
      if (err) {
        //console.log("consulta false");
        mostrarFoto.value = true;
      }
    });
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

const ActualizarDatosBasicos = async (idCreator, Datos, ID_EMpleado) => {
  let data = await getData(ID_EMpleado);
  if (data == false) {
    CrearUsuario(Datos);
  } else {
    // Realiza la solicitud PUT y espera la respuesta.
    await axios
      .put(`/user/${ID_EMpleado}/update_preuser?user_updater=${idCreator}`, Datos)
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
            // Si el estado HTTP es 422 (Solicitud no procesable), imprime un mensaje de error.
            if (err.response.status == 422) {
              emit.log({ texto: "no se puede procesar la solcitud", valor: false });
            }else {
              // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
              emit("respuesta", { texto: err.response.data.message, valor: false });
            }            
          }
        }
      );
  }
};

//OPTIENE LA DATA DEL USUARIO indicado retorna verdadero o falso si se encuentra o no
const getData = (ID_empleado) => {
  return new Promise((resolve, reject) => {
    if (ID_empleado == null) {
      resolve(null);
    } else if (ID_empleado >= 0) {
      axios
        .get(`/user/${ID_empleado}/precarga`)
        .then((respuesta) => {
          if (respuesta.data) {
            resolve(respuesta.data);
          } else {
            resolve({}); // Si no hay datos, resuelve con un objeto vacío
          }
        })
        .catch((error) => {
          if (error.status == 422) {
            resolve(null); // Problema al pedir los datos, resuelve con null
          } else if (error.status == 404) {
            resolve({}); // Si no hay datos, resuelve con un objeto vacío
          } else {
            reject(error); // Rechaza la promesa con el error
          }
        });
    } else {
      resolve(null); // Si ID_empleado es negativo, resuelve con null
    }
  });
};

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
const Enviar = () => {
  //si ID es nulo crea un usuario
  let statuspay = Object.values(payload).some((value) => value !== "");

  if (props.EmpleadoID == null && statuspay == true) {
    CrearUsuario(payload);
  }

  if (props.EmpleadoID != null && props.EmpleadoID > 0) {
    if (statuspay == true) {
      ActualizarDatosBasicos(ID_USERMASTER, payload, props.EmpleadoID);
    } else {
      NextModal(props.EmpleadoID);
    }
  }
};
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
