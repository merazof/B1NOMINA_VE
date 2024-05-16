<template>
    <form class="formulario" id="Form2" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos personales</h2>
        <div class="row-form">
            <LayoutInputLineal textLabel="Nacionalidad" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="nacionalidad" 
                        :options="ListaNacionalidad" 
                        :requerido="formulario1Requerido"    
                        optionsSelected="Seleccionar"                    
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Género" :requerido="formulario1Requerido">
                <template v-slot>
                   <InputRadioButton 
                        v-model="genero" 
                        grupo="genero" 
                        texto="Masculino" 
                        :valor="1"
                        id-radius="Masculino"  
                    />
                   <InputRadioButton 
                        v-model="genero" 
                        grupo="genero" 
                        texto="Femenino" 
                        :valor="2"
                        id-radius="Femenino"  
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de nacimiento"
                v-model="fechaNacimiento"
                @update:modelValue="fechaNacimiento = $event"
                :requerido="formulario1Requerido"
            />

            <LayoutInputLineal textLabel="Estado civil" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="estadoCivil" 
                        :options="parametros.estadocivil" 
                        optionsSelected="Seleccionar"
                        :requerido="formulario1Requerido"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <h2 class="titulo-form">Datos de contacto</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Region" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal 
                        v-model="region" 
                        :options="parametros.regiones" 
                        optionsSelected="Seleccionar"
                        :requerido="formulario1Requerido"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Localidad" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal 
                        v-model="localidad" 
                        :options="ListaLocalidad" 
                        optionsSelected="Seleccionar"
                        :requerido="formulario1Requerido"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Placeholder="Ingresar dirección" 
                Titulo="Direccion" 
                v-model="direccion"
                @update:modelValue="direccion = $event"
                :requerido="formulario1Requerido"
            />
        </div>

        <div class="row-form">

            <InputLinealDescripcion 
                Placeholder="Ingresar Número" 
                Titulo="Teléfono Celular" 
                v-model="telefonoCelular"
                @update:modelValue="telefonoCelular = $event"
                :minimo-caracteres="8"
                :maximo-caracteres="12"
                :requerido="formulario1Requerido"
            />

            <InputLinealDescripcion 
                Placeholder="Ingresar Número" 
                Titulo="Teléfono Local" 
                v-model="telefonoLocal"
                @update:modelValue="telefonoLocal = $event"
                :requerido="formulario1Requerido"
            />
        </div>
        
    </form>
</template>

<script setup>
import InputLinealDescripcion from '../inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from '../listas/Lista-template-lineal.vue';
import LayoutInputLineal from '../Layouts/LayoutInputLineal.vue';
import InputRadioButton from '../botones/Input-Radio-button.vue';

import axios from "axios";

import { ref, watch, defineEmits, defineProps, reactive, defineExpose} from 'vue';

// Define los eventos que el componente puede emitir
const emit = defineEmits([
  "nextModal", // Nombre del evento que puede ser emitido por este componente
  "respuesta"
]);

const props = defineProps({
    EmpleadoID: {
       type: [Number, String], // Especifica que el tipo de la propiedad es Number
       default: null
    },
    parametros: {
        type: Object,
        default: {}
    },
});

// Método para reiniciar el formulario
const resetForm = () => {
    //datos personales
    nacionalidad.value = '';
    genero.value = "";
    fechaNacimiento.value = "";
    estadoCivil.value = "";

    //datos de contacto
    region.value = '';
    localidad.value = '';
    direccion.value = '';
    telefonoLocal.value = '';
    telefonoCelular.value = "";
    // Reinicia el payload
    Object.keys(payload).forEach(key => {
        payload[key] = "";
    });

    formulario1Requerido.value = false;
    formulario2Requerido.value = false;
}
// Exponer la función de limpieza para que sea accesible desde el componente padre
defineExpose({
    resetForm
});

const NextModal = (idEpleadoCreado) => {
  emit("nextModal", idEpleadoCreado); // Emite el evento 'nextModal' con el idEpleadoCreado como argumento
};

//lista de nacionalidades
const ListaNacionalidad = [
    {
        id: 1,
        nombre: "Nacional"
    },
    {
        id: 2,
        nombre: "Extrangero"
    },

];
const ListaLocalidad = ref(''); //Los datos se asignan segun el idRegion

// inicializacion de variables reactivas

const formulario1Requerido = ref(false)
const formulario2Requerido = ref(false)
//datos personales
const nacionalidad = ref('');
const genero = ref('');
const fechaNacimiento = ref('');
const estadoCivil = ref(''); 

//datos de contacto
const region = ref('');
const localidad = ref('');
const direccion = ref('');
const telefonoCelular = ref('');
const telefonoLocal = ref('');

// payload del formulario datos personales
const payload = reactive({
    "nacionalidad": "",
    "genero": "",
    "fechaNacimiento": "",
    "estadoCivil": "",
    "region": "",
    "localidad": "",
    "direccion": "",
    "telefonoCelular": "",
    "telefonoLocal": '',
});

// payload del formulario datos de contacto
/*
const payload2 = reactive({
    "region": "",
    "localidad": "",
    "direccion": "",
    "telefonoCelular": "",
    "telefonoLocal": '',
});
*/

//filtra la lista de regiones segun el id
const filtroRegion = (id) => {
    ListaLocalidad.value = props.parametros.localidad.filter(item => item.idregion == id)
};

//actualizar datos del payload a enviar
const ActualizarPayload1 = (propiedad, valor) => {
    payload[propiedad] = valor;
    formulario1Requerido.value = Object.values(payload).some(value => value !== "")
};
//actualizar datos del payload a enviar
/*
const ActualizarPayload2 = (propiedad, valor) => {
    payload2[propiedad] = valor;
    formulario2Requerido.value = Object.values(payload2).some(value => value !== "")    
};
*/

//Escuchar cambio en las entradas

watch(nacionalidad, (nuevoValor) => ActualizarPayload1('nacionalidad', nuevoValor));
watch(genero, (nuevoValor) => ActualizarPayload1('genero', nuevoValor));
watch(fechaNacimiento, (nuevoValor) => ActualizarPayload1('fechaNacimiento', nuevoValor));
watch(estadoCivil, (nuevoValor) => ActualizarPayload1('estadoCivil', nuevoValor));
watch(region, (nuevoValor) => {
        filtroRegion(nuevoValor);
        ActualizarPayload1('region', nuevoValor);
    }
);
watch(localidad, (nuevoValor) => ActualizarPayload1('localidad', nuevoValor));
watch(direccion, (nuevoValor) => ActualizarPayload1('direccion', nuevoValor));
watch(telefonoCelular, (nuevoValor) => ActualizarPayload1('telefonoCelular', nuevoValor));
watch(telefonoLocal, (nuevoValor) => ActualizarPayload1('telefonoLocal', nuevoValor));


const actualizarDatosPersonales = async (ID_USERMASTER, Datos) => {
  await axios.put(`/user/${props.EmpleadoID}/save_preuser?userUpdater=${ID_USERMASTER}`, Datos)
  .then(
    res => {
      if (res?.status == 201 || res?.status == 200 ){
        emit("respuesta", {'texto':res?.data.message, 'valor':true})
        NextModal(props.EmpleadoID);
      }            
    }
  )
  .catch(
    // Maneja los errores de la solicitud.
        err => {
            // Verifica si la respuesta del error contiene un objeto de respuesta.
            if (err.response.status == 500) { 
                // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
                //console.log(err)
                emit("respuesta", {'texto':err.response.message, 'valor':false})      
            } else if (err.response.status == 422) {
                // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
                emit("respuesta", {'texto':err.response.message, 'valor':false})  
            } else {
                console.log(err.response.data)
                emit("respuesta", {'texto':err.response.data.message, 'valor':false})
            }
        }
    );
}


const getData = (ID_empleado) => {
    return new Promise(async (resolve, reject) => {
        if (ID_empleado != null && ID_empleado >= 0) {
            try {
                // Solicita los datos personales
                const respuesta = await axios.get(`/user/${ID_empleado}/precarga`);
                if (respuesta?.data) {
                    // Resuelve la promesa con true si hay datos
                    resolve({ success: true, data: respuesta.data });
                } else {
                    // Resuelve la promesa con false si no hay datos
                    resolve({ success: false, data: {} });
                }
            } catch (error) {
                if (error.response && error.response.status == 404) {
                    // Resuelve la promesa con false si no hay datos
                    resolve({ success: false, data: {} });
                } else {
                    // Rechaza la promesa si hay un error distinto de 404
                    reject(error);
                }
            }
        } else {
            // Rechaza la promesa si el ID es inválido
            reject(new Error('ID de empleado inválido'));
        }
    });
}


/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar =  async () => {
    if (props.EmpleadoID == null) {
        console.log("enviar al formulario 1");
    }

    //verifica si los payloads tienen datos
    let statuspay = Object.values(payload).some(value => value !== "");
    //let statuspay2 = Object.values(payload2).some(value => value !== "");

    //si uno de los payload tiene cambios
    if (statuspay  == true ){
        //verifica que el id pasado sea diferente de nullo y mayor que 0
        if (props.EmpleadoID != null && props.EmpleadoID >= 0) {
            //Almacena si hay datos Laboras o no del usuario en el sistema
            let respuestaGetData = await getData(props.EmpleadoID);

            //verifica que no ocurran errores al solicitar los datos
            if(respuestaGetData.success != null || respuestaGetData.success != undefined){

                //verifica si los datos existe
                if(respuestaGetData.data != {}) {
                    let DataUser = respuestaGetData.data
                    
                    //Si la data es diferente de vacio, le añade al 
                    payload.nombres = DataUser.nombres
                    payload.apellidos = DataUser.apellidos
                    payload.documento = DataUser.documento;
                    payload.correo = DataUser.correo;
                    (payload.telefonoLocal == '')? 0 : payload.telefonoLocal;

                    // Recuperar el objeto como una cadena de texto y convertirlo de nuevo a un objeto
                    let ID_USUARIO = JSON.parse(localStorage.getItem('userId'));

                    actualizarDatosPersonales(ID_USUARIO, payload);

                    /*
                    if (statuspay2 == statuspay ) {
                        console.log("enviar datos justos");
                        let payload12 = payload + payload2;
                        actualizarDatosPersonales(ID_USUARIO, payload12);
                    }
                    if (statuspay2 == true || statuspay == true) {
                        console.log("enviar payload lleno");
                        if (statuspay == true) {
                            console.log(payload);
                            actualizarDatosPersonales(ID_USUARIO, payload);
                        }
                        if (statuspay2 == true) {
                            console.log(payload2);
                            actualizarDatosPersonales(ID_USUARIO, payload2);
                        }     
                    }
                    */
                } else {
                    emit("respuesta",{'texto':"error al pedir los datos personales", "valor":false})
                }   
            } else { // si la respues es nula
               emit("respuesta",{'texto':"error al pedir los datos personales", "valor":false})
            }
        }
    } else {//no hay modificaciones en los payloads
        NextModal(props.EmpleadoID)
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

/*
* Contenedor para elementos multimedia, organizados 
* en columnas con un espacio de  12px entre ellos 
*/
div.multimedia {
    display: flex;
    flex-direction: column;
    gap:  12px;
}

/**
* Estilo para el botón de añadir una foto, con bordes 
* y un padding específico para un mejor aspecto visual 
*/

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
    color: black;  
    font-size:  22px;  
    font-family: Poppins;  
    font-weight:  500;  
    line-height:  32px;  
    word-wrap: break-word;
}

/*
* Estilo para el texto dentro del botón de añadir una foto, 
* asegurando que el texto sea legible y coherente con el diseño 
*/
.add-photo > span {
    color: #C2C2C2;
    font-size:  18px;
    font-family: Poppins;
    font-weight:  600;
    line-height:  40px;
    word-wrap: break-word;
}
</style>
