<template>
    <form class="formulario" id="Form4" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos de Pago</h2> 
        <div class="row-form">
            <LayoutInputLineal textLabel="Medio de pago">
                <template v-slot>
                    <InputRadioButton 
                        v-model="MedioPago" 
                        grupo="MedioPago" 
                        texto="Transferencia" 
                        :valor="0"
                        id-radius="Transferencia"
                    />
                   <InputRadioButton 
                        v-model="MedioPago" 
                        grupo="MedioPago" 
                        texto="Cheque" 
                        :valor="1"
                        id-radius="Cheque"
                    />
                    <InputRadioButton 
                        v-model="MedioPago" 
                        grupo="MedioPago" 
                        texto="Al contado" 
                        :valor="2"
                        id-radius="Alcontado"
                    />
                </template>
            </LayoutInputLineal>
        </div>
        <div class="row-form" v-show="MedioPago == 0">
            <LayoutInputLineal textLabel="Banco" :requerido="MedioPago == 0">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Banco" 
                        :options="parametros.bancos" 
                        optionsSelected="Seleccionar"
                        :requerido="MedioPago == 0"
                    />
                </template>
            </LayoutInputLineal>

             <!---->
            <LayoutInputLineal textLabel="Tipo de cuenta" :requerido="MedioPago == 0">
                <template v-slot>
                   <InputRadioButton 
                        v-model="TCuenta" 
                        grupo="TCuenta" 
                        texto="Corriente" 
                        :valor="0"
                        id-radius="CCorriente"  
                        :requerido="MedioPago == 0"                      
                    />
                   <InputRadioButton 
                        v-model="TCuenta" 
                        grupo="TCuenta"
                        texto="Ahorro"
                        :valor="1"
                        id-radius="CAhorro"  
                    />
                </template>
            </LayoutInputLineal>            
        </div>

        <div class="row-form cut" v-show="MedioPago == 0" :requerido="MedioPago == 0">
            <InputLinealDescripcion 
                Titulo="N° Cuenta"
                v-model="NCuenta"
                @update:modelValue="NCuenta = $event"
                :minimo-caracteres="16"
                :requerido="MedioPago == 0"
            />
        </div>  
        
        <h2 class="titulo-form">Información Adicional</h2> 

        <div class="row-form">
            <LayoutInputLineal textLabel="Modificar Campo">
                <template v-slot>
                    
                </template>
            </LayoutInputLineal>
            <LayoutInputLineal textLabel="Modificar Campo">
                <template v-slot>
                    
                </template>
            </LayoutInputLineal>
        </div>
    </form>
</template>

<script setup>
import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
import InputRadioButton from '@/components/botones/Input-Radio-button.vue';

import axios from "axios";

import { ref, watch, reactive, defineProps, defineEmits, onMounted} from 'vue';

const props = defineProps({
    EmpleadoID:{
        type: [Number, String],
        default: -1
    },
    parametros: {
        type: Object,
        default: {}
    },
});

// Define los eventos que el componente puede emitir
const emit = defineEmits([
    'closeModal',
    'respuesta',
]);

// inicializacion de variables reactivas
const MedioPago = ref(0);
const Banco = ref('');
const TCuenta = ref('');
const NCuenta = ref('');


// payload de la peticion
const payload = reactive({
    "banco_id": '',
    "medio": '0',
    "tipo_cuenta": '',
    "numero_cuenta": '',
    "user_id": '',
});

//actualizar datos del payload
const ActualizarPayload = (propiedad, valor) => {
    payload[propiedad] = valor;
};

watch(Banco, (nuevoValor) => ActualizarPayload('banco_id', nuevoValor));
watch(MedioPago, (nuevoValor) => ActualizarPayload('medio', String(nuevoValor)));
watch(TCuenta, (nuevoValor) => ActualizarPayload('tipo_cuenta', Number( nuevoValor)));
watch(NCuenta, (nuevoValor) => ActualizarPayload('numero_cuenta', nuevoValor));

const resetForm = () => {
    MedioPago.value = 0;
    Banco.value = '';
    TCuenta.value = '';
    NCuenta.value = '';
    // Reinicia el payload
    Object.keys(payload).forEach(key => {
        payload[key] = '';
    });
};

defineExpose({
    resetForm
});

const CloseModal = () => {
    emit('closeModal');
};

const crearDatosPago = async (ID_USERMASTER,Data) => {
    await axios.post(`create_datos_pago?userCreatorId=${ID_USERMASTER}`,Data)
    .then(
        // Maneja la respuesta exitosa.
        res => {
        // Verifica si la respuesta tiene un estado HTTP 201 (Creado).
        if (res.status == 201){
            // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.
            emit("respuesta", {'texto':res?.data?.message, 'valor':true})
            // Llama a la función CloseModal Que cambia el valor de visualizacion del modal
            CloseModal();
        }            
        }
    )
    .catch(
        // Maneja los errores de la solicitud.
        err => {
            // Verifica si la respuesta del error contiene un objeto de respuesta.
            if (err.response) { 
                // Si el estado HTTP es 422 (Solicitud no procesable), imprime un mensaje de error.
                if (err.status == 422){
                emit({'texto': "no se puede procesar la solcitud", 'valor':false});
                } 
                    // Imprime el error completo.
                    //console.log(err);
                    // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
                    emit("respuesta", {'texto':err.response.data.message, 'valor':false})
                                   
            }
        }
    );
}

const editarDatosPago = async (ID_USERMASTER, Data) => {
    await axios.put(`create_datos_pago?userCreatorId=${ID_USERMASTER}`,Data)
    .then(
        // Maneja la respuesta exitosa.
        res => {
        // Verifica si la respuesta tiene un estado HTTP 201 (Creado).
        if (res.status == 200 || res.status == 201){
            // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.
            emit("respuesta", {'texto':res.data.message, 'valor':true})
            // Llama a la función CloseModal Que cambia el valor de visualizacion del modal
            CloseModal();
        }            
        }
    )
    .catch(
        // Maneja los errores de la solicitud.
        err => {
            // Verifica si la respuesta del error contiene un objeto de respuesta.
            if (err.response) { 
                // Si el estado HTTP es 422 (Solicitud no procesable), imprime un mensaje de error.
                if (err.status == 422){
                emit({'texto': "no se puede procesar la solcitud", 'valor':false});
                } 
                    // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
                    emit("respuesta", {'texto':err.response.data?.message, 'valor':false})
                                   
            }
        }
    );
}

const getData = async (ID_empleado) => {
    return new Promise(async (resolve, reject) => {
        if (ID_empleado != null && ID_empleado >= 0) {
            try {
                // Solicita los datos personales
                const respuesta =  await axios.get(`user/${ID_empleado}/datos_pago`);
                if (respuesta.status == 200 || respuesta.status == 201) {
                    // Resuelve la promesa con true si hay datos y envia los datos
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

const verificarMediodePago = (medio) => {
    if(medio != 0){
        payload.NumeroCuenta = '';
        payload.banco_id = 0;
        payload.tipo_cuenta = 0; 
    }
}

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {
    if (props.EmpleadoID == null) {
        //console.log("enviar al formulario 1");
    }

    let statuspay = Object.values(payload).some(value => value !== "");
    //si uno de los payload tiene cambios
    if (statuspay  == true){
        //verifica que el id pasado sea diferente de nullo y mayor que 0
        if (props.EmpleadoID != null && props.EmpleadoID > 0) {
            //Almacena si hay datos Laboras o no del usuario en el sistema
            let respuestaGetData = await getData(props.EmpleadoID);

            // Recuperar el objeto como una cadena de texto y convertirlo de nuevo a un objeto
            let ID_USUARIO = JSON.parse(localStorage.getItem('userId'));

            if(respuestaGetData.success != null){

                if(respuestaGetData.success == true){

                    if(ID_USUARIO > 0){
                        payload.user_id = props.EmpleadoID                      
                        //Si el medio es diferente de transferencia, se borran los otros campos al enviar
                        verificarMediodePago(payload.medio);
                        //ejecuta la peticion
                        editarDatosPago(ID_USUARIO, payload)
                    } else {
                        emit("respuesta", {"texto":"Usuario no autorizado", "valor": false})
                    } 
                } else {
                    //console.log("creardata")
                    if(ID_USUARIO > 0){
                        payload.user_id = props.EmpleadoID       
                        
                        //Si el medio es diferente de transferencia, se borran los otros campos al enviar
                        verificarMediodePago;
                        //ejecuta la peticion
                        crearDatosPago(ID_USUARIO, payload)
                    } else {
                        emit("respuesta", {"texto":"Usuario no autorizado", "valor": false})
                    }                    
                }
            } else {
                emit("respuesta", {"texto":"error al verificar los datos del empleado", "valor": false})
            }            
        } else {
            emit("respuesta", {'texto':"Error al validar el ID del usuario", 'valor':false})  
        }
    } else {//no hay modificaciones en los payloads
        CloseModal();
    }
};
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

div.row-form.cut {
    max-width: 48%;
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
    color: black;  
    font-size:  22px;  
    font-family: Poppins;  
    font-weight:  500;  
    line-height:  32px;  
    word-wrap: break-word;
}

/* Estilo para el texto dentro del botón de añadir una foto, 
asegurando que el texto sea legible y coherente con el diseño */
.add-photo > span {
    color: #C2C2C2;
    font-size:  18px;
    font-family: Poppins;
    font-weight:  600;
    line-height:  40px;
    word-wrap: break-word;
}
</style>
