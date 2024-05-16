<template>
    <form class="formulario" id="Form2r" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos personales</h2>
        <div class="row-form">
            <LayoutInputLineal textLabel="Nacionalidad" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="nacionalidad" 
                        :options="ListaNacionalidad" 
                        :requerido="RequiereActualizar"    
                        :preseleccion="nacionalidad"     
                        optionsSelected="Seleccionar"               
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Género" :requerido="RequiereActualizar">
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
                :requerido="RequiereActualizar"
            />

            <LayoutInputLineal textLabel="Estado civil" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="estadoCivil" 
                        :options="parametros.estadocivil" 
                        :preseleccion="estadoCivil" 
                        :requerido="RequiereActualizar"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <h2 class="titulo-form">Datos de contacto</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Region" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal 
                        v-model="region" 
                        :options="parametros.regiones" 
                        :preseleccion="region" 
                        :requerido="RequiereActualizar"        
                        optionsSelected="Seleccionar"                
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Localidad" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal 
                        v-model="localidad" 
                        :options="ListaLocalidad" 
                        :preseleccion="localidad" 
                        :requerido="RequiereActualizar"       
                        optionsSelected="Seleccionar"                 
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
                :requerido="RequiereActualizar"
                
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
                :requerido="RequiereActualizar"
            />

            <InputLinealDescripcion 
                Placeholder="Ingresar Número" 
                Titulo="Teléfono Local" 
                v-model="telefonoLocal"
                @update:modelValue="telefonoLocal = $event"
            />
        </div>
        
    </form>
</template>

<script setup>
import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
import InputRadioButton from '@/components/botones/Input-Radio-button.vue';

import axios from "axios";

import { ref, watch, defineEmits, defineProps, reactive, defineExpose, onMounted} from 'vue';

const props = defineProps({
    EmpleadoID: {
       type: [Number, String], // Especifica que el tipo de la propiedad es Number
       default: null
    },
    parametros: {
        type: Object,
        default: {}
    },
    Informacion: {
        type: Object,
    }
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

    RequiereActualizar.value = false;
}


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


const ListaLocalidad = ref({}); //Los datos se asignan segun el idRegion

// inicializacion de variables reactivas

const RequiereActualizar = ref(false)
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

// payload del formulario datos personales
const payload_old = reactive({
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
    RequiereActualizar.value = !(camposIguales && !alMenosUnValorVacio);
}


//filtra la lista de regiones segun el id
const filtroRegion = (id) => {
    ListaLocalidad.value = props.parametros.localidad.filter(item => item.idregion == id);
};

//Escuchar cambio en las entradas

watch(nacionalidad, (nuevoValor) => ActualizarPayload('nacionalidad', nuevoValor));
watch(genero, (nuevoValor) => ActualizarPayload('genero', nuevoValor));
watch(fechaNacimiento, (nuevoValor) => ActualizarPayload('fechaNacimiento', nuevoValor));
watch(estadoCivil, (nuevoValor) => ActualizarPayload('estadoCivil', nuevoValor));
watch(region, (nuevoValor) => {
        filtroRegion(nuevoValor);
        ActualizarPayload('region', nuevoValor);
    }
);
watch(localidad, (nuevoValor) => ActualizarPayload('localidad', nuevoValor));
watch(direccion, (nuevoValor) => ActualizarPayload('direccion', nuevoValor));
watch(telefonoCelular, (nuevoValor) => ActualizarPayload('telefonoCelular', nuevoValor));
watch(telefonoLocal, (nuevoValor) => ActualizarPayload('telefonoLocal', nuevoValor));

watch(() => props.Informacion, (nuevoValor) => { 
  MostrarValores(nuevoValor) 
});




const actualizarDatosPersonales = async (ID_USERMASTER, Datos) => {
     //Si la data es diferente de vacio, le añade al 
    Datos.nombres = props.Informacion?.nombres;
    Datos.apellidos = props.Informacion?.apellido_paterno;
    Datos.documento = props.Informacion?.rut;
    Datos.correo = props.Informacion?.email;
    (Datos?.telefonoLocal == '')? 0 : Datos?.telefonoLocal;

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
            console.error(err)
            // Verifica si la respuesta del error contiene un objeto de respuesta.
            if (err.response.status == 500) { 
                // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
                ////console.log(err)
                emit("respuesta", {'texto':err?.response?.data.message, 'valor':false})      
            } else if (err.response.status == 422) {
                // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
                emit("respuesta", {'texto':err.response.message, 'valor':false})  
            } else {
                //console.log(err.response.data)
                emit("respuesta", {'texto':err.response.data.message, 'valor':false})
            }
        }
    );
}

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = () => {

    if (RequiereActualizar) {
        actualizarDatosPersonales(props.EmpleadoID, payload);
    } else {
        NextModal(props.EmpleadoID);
    }

};


// Define la función MostrarValores que actualiza los valores de varios campos basados en los datos proporcionados.
const MostrarValores = (DATA) => {

    //actualiza el listado de regiones segun la comuna selecionada
    filtroRegion((DATA?.region_id == null)? '' :DATA?.region_id);

    //datos personales
    nacionalidad.value = (DATA?.nacionalidad_id == null)? '' :DATA?.nacionalidad_id;
    genero.value = (DATA?.sexo_id == null)? 1 :DATA?.sexo_id;
    fechaNacimiento.value = (DATA?.fecha_nacimiento == null)? '' :DATA?.fecha_nacimiento;
    estadoCivil.value = (DATA?.estado_civil_id == null)? '' :DATA?.estado_civil_id;

    //datos de contacto
    region.value = (DATA?.region_id == null)? '' :DATA?.region_id;
    localidad.value = (DATA?.comuna_id == null)? '' :DATA?.comuna_id;
    direccion.value = (DATA?.direccion == null)? '' :DATA?.direccion;
    telefonoCelular.value = (DATA?.movil == null)? '' :DATA?.movil;
    telefonoLocal.value = (DATA?.fijo == null)? '' :DATA?.fijo;

    payload_old.nacionalidad = DATA?.nacionalidad_id ?? '';
    payload.nacionalidad = DATA?.nacionalidad_id ?? '';
 
    payload_old.genero = DATA?.sexo_id ?? '';
    payload.genero = DATA?.sexo_id ?? '';
 
    payload_old.fechaNacimiento = DATA?.fecha_nacimiento ?? '';
    payload.fechaNacimiento = DATA?.fecha_nacimiento ?? '';
 
    payload_old.estadoCivil = DATA?.estado_civil_id ?? '';
    payload.estadoCivil = DATA?.estado_civil_id ?? '';
 
    payload_old.region = DATA?.region_id ?? '';
    payload.region = DATA?.region_id ?? '';
 
    payload_old.localidad = DATA?.comuna_id ?? '';
    payload.localidad = DATA?.comuna_id ?? '';
 
    payload_old.direccion = DATA?.direccion ?? '';
    payload.direccion = DATA?.direccion ?? '';
 
    payload_old.telefonoCelular = DATA?.movil ?? '';
    payload.telefonoCelular = DATA?.movil ?? '';
 
    payload_old.telefonoLocal = DATA?.fijo ?? '';
    payload.telefonoLocal = DATA?.fijo ?? '';
 
}




// Define los eventos que el componente puede emitir
const emit = defineEmits([
  "nextModal", // Nombre del evento que puede ser emitido por este componente
  "respuesta"
]);


// Exponer la función de limpieza para que sea accesible desde el componente padre
defineExpose({
    resetForm
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
