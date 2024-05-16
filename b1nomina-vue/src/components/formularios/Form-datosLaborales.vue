<template>
    <form class="formulario" id="Form3" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos Laborales</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Tipo de contrato" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="TipoDeContrato" 
                        :options="parametros.tipocontrato" 
                        :requerido="formulario1Requerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Nivel de Estudio" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="NivelEstudio" 
                        :options="parametros?.nivelestudio" 
                        :requerido="formulario1Requerido"
                        optionsSelected="Seleccionar"  
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Término del contrato" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="TerminoContrato"
                        :options="parametros.terminocontrato" 
                        :requerido="formulario1Requerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de Contratacion"
                v-model="FechaContratacion"
                @update:modelValue="FechaContratacion = $event"
                :requerido="formulario1Requerido"
            />
            <InputLinealDescripcion 
                Tipo="date"
                Titulo="Fecha de Finalizacion de contrato"
                v-model="FechaFinalizacionContrato"
                @update:modelValue="FechaFinalizacionContrato = $event"
                :Deshabilitar="TerminoContrato == 0"
                :requerido="TerminoContrato != 0"
            />
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Salario base" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SalarioBase" 
                        :options="parametros.tiposalario" 
                        :requerido="formulario1Requerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Unidad Sueldo Base" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="UnidadSueldo" 
                        :options="parametros.unidadessueldo" 
                        :requerido="false"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <InputLinealDescripcion 
                Placeholder="$..." 
                Titulo="Valor del salario" 
                v-model="MontoSalario"
                @update:modelValue="MontoSalario = $event"
                :requerido="formulario1Requerido"
                Tipo="Number"
            />
        </div>

        <h2 class="titulo-form">Puesto de trabajo</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Sede de Trabajo" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SedeDeTrabajo" 
                        :options="parametros.sede" 
                        :requerido="formulario1Requerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Departamento" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Departamento" 
                        :options="parametros.departamento" 
                        :requerido="formulario1Requerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Cargo" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Cargo" 
                        :options="parametros.cargos" 
                        :requerido="formulario1Requerido"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Grupo" :requerido="formulario1Requerido">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Grupo" 
                        :options="parametros.grupos" 
                        :requerido="formulario1Requerido"
                        optionsSelected="Sin Asignar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Modalidad" :requerido="formulario1Requerido">
                <template v-slot>
                    <InterruptorButton 
                        @ValorEstado="verEstado"
                        Objid="Teletrabajo"
                        Texto="Teletrabajo"
                        Tipo="individual"
                        :Estado="(EstatusModalidad)? true :false"
                        :requerido="formulario1Requerido"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <h2 class="titulo-form">Días de descanso</h2>

        <div class="row-form">
            <InputCheckbox Objid="1" @update="DiasLibres" texto="Lunes" />
            <InputCheckbox Objid="2" @update="DiasLibres" texto="Martes" />
            <InputCheckbox Objid="3" @update="DiasLibres" texto="Miércoles" />
            <InputCheckbox Objid="4" @update="DiasLibres" texto="Jueves" />
            <InputCheckbox Objid="5" @update="DiasLibres" texto="Viernes" />
            <InputCheckbox Objid="6" @update="DiasLibres" texto="Sábado" />
            <InputCheckbox Objid="7" @update="DiasLibres" texto="Domingo" />
        </div>
    </form>
</template>

<script setup>
import InputLinealDescripcion from '../inputs/Input-Lineal-descripcion.vue';
import ListaTemplateLineal from '../listas/Lista-template-lineal.vue';
import LayoutInputLineal from '../Layouts/LayoutInputLineal.vue';
import InterruptorButton from '../inputs/Interruptor-button.vue';
import InputCheckbox from '../inputs/Input-Checkbox.vue';

import axios from "axios";
import { ref, watch, reactive, defineProps, defineEmits, inject} from 'vue';

// Define las propiedades que el componente espera recibir. En este caso, se espera una propiedad llamada EmpleadoID de tipo Number.
const props = defineProps({
  EmpleadoID: {
    type: [Number, String], // Especifica que el tipo de la propiedad es Number
    default: -1
  },
  parametros: {
        type: Object,
        default: {}
  },
});

// Define los eventos que el componente puede emitir. En este caso, se especifica un evento llamado 'nextModal'.
const emit = defineEmits([
  "nextModal", // Nombre del evento que puede ser emitido por este componente
  "respuesta"
]);

const EstatusModalidad = ref(false);

const idSociedad = inject('IDsociedad');

const verEstado = (valor) => {
    (valor == true)
        ? Modalidad.value = 1
        : Modalidad.value = 0
}

//inicialiacion de las varables
const formulario1Requerido = ref(false)
const formulario2Requerido = ref(false)

//variables del formaulario 1
const TipoDeContrato = ref('');
const NivelEstudio = ref('')
const TerminoContrato = ref('');
const FechaContratacion = ref('');
const FechaFinalizacionContrato = ref('');
const SalarioBase = ref('');
const UnidadSueldo =ref('')
const MontoSalario = ref('');
//variables del formularo 2
const SedeDeTrabajo = ref('');
const Departamento = ref('');
const Cargo = ref('');
const Grupo = ref('');
const Modalidad = ref('');
const ListaDiasLibres = ref([]);

/**
 * Función para manejar la interacción con una lista de empleados seleccionados.
 * Esta función agrega o remueve un valor de la lista basado en si el valor ya está presente.
 *
 * @param {Number} value - El valor a agregar o remover de la lista.
 */
const DiasLibres = (value) => {
    // Verifica si el valor no es null
    if (value !== null) {
        // Verifica si el valor ya está en la lista
        if (ListaDiasLibres.value.includes(value)) {
            // Si el valor ya está en la lista, lo remueve
            // Encuentra el índice del valor en la lista
            const index = ListaDiasLibres.value.indexOf(value);
            // Verifica si el índice es válido (mayor que -1)
            if (index > -1) {
            // Remueve el valor de la lista usando splice
            ListaDiasLibres.value.splice(index, 1);
            }
        } else {
            // Si el valor no está en la lista, lo agrega
            // Agrega el valor al final de la lista
            ListaDiasLibres.value.push(value);
        }
    }
};

// payload de las peticiones
const payload = reactive({

    tipo_contrato: '',
    nivel_estudio_id: '',
    termino_contrato: '',
    fecha_inicio: "",
    fecha_fin: "",
    periodo_salario: '',
    unidad_sueldo: "",
    salario_base: '',
    hora_ingreso: '',
    hora_egreso: '',
    jefatura: '',


    sede_id: '',
    departamento_id: '',
    cargo_id: '',    
    grupo_id: '',
    modalidad: '',

    user_id: '',
    sociedad_id: '',
    dias_descanso: '',

    

});

//actualizar datos del payload
const ActualizarPayload = (propiedad, valor) => {
    payload[propiedad] = valor;
    formulario1Requerido.value = Object.values(payload).some(value => value !== "")
};
//actualizar datos del payload2

/*
const ActualizarPayload2 = (propiedad, valor) => {
    payload2[propiedad] = valor;
    formulario2Requerido.value = Object.values(payload2).some(value => value !== "")
};
*/

// Observar cambios en la variable
watch(TipoDeContrato, (nuevoValor) => ActualizarPayload('tipo_contrato', Number(nuevoValor)));
watch(NivelEstudio, (nuevoValor) => ActualizarPayload('nivel_estudio_id', nuevoValor));
watch(TerminoContrato, 
    (nuevoValor) => {
        ActualizarPayload('termino_contrato', Number(nuevoValor));
        if(nuevoValor == 0) {
            ActualizarPayload('fecha_fin', '1990-01-01')
        
        }
    }
);
watch(FechaContratacion, (nuevoValor) => ActualizarPayload('fecha_inicio', nuevoValor));
watch(FechaFinalizacionContrato, (nuevoValor) => ActualizarPayload('fecha_fin', nuevoValor));
watch(SalarioBase, (nuevoValor) => ActualizarPayload('periodo_salario', Number(nuevoValor)));
watch(UnidadSueldo, (nuevoValor) => ActualizarPayload('unidad_sueldo', String(nuevoValor)));
watch(MontoSalario, (nuevoValor) => {
    ActualizarPayload('salario_base', Math.abs(nuevoValor))
});
watch(SedeDeTrabajo, (nuevoValor) => ActualizarPayload('sede_id', Number(nuevoValor)));
watch(Departamento, (nuevoValor) => ActualizarPayload('departamento_id', Number(nuevoValor)));
watch(Cargo, (nuevoValor) => ActualizarPayload('cargo_id', Number(nuevoValor)));
watch(Grupo, (nuevoValor) => ActualizarPayload('grupo_id', Number(nuevoValor)));
watch(Modalidad, (nuevoValor) => ActualizarPayload('modalidad', Number(nuevoValor)));

const resetForm = () => {
    TipoDeContrato.value = '';
    TerminoContrato.value = '';
    FechaContratacion.value = '';
    FechaFinalizacionContrato.value = '';
    SalarioBase.value = '';
    MontoSalario.value = '';
    SedeDeTrabajo.value = '';
    Departamento.value = '';
    Cargo.value = '';
    Grupo.value = '';
    Modalidad.value = '';
    ListaDiasLibres.value = []
    // Reinicia el payload
    Object.keys(payload).forEach(key => {
        payload[key] = '';
    });
    /*
    Object.keys(payload2).forEach(key => {
        payload[key] = '';
    });*/
}

defineExpose({
    resetForm,
})
const NextModal = (idEpleadoCreado) => {
  emit("nextModal", idEpleadoCreado); // Emite el evento 'nextModal' con el idEpleadoCreado como argumento
};

const crearDatoslaborales = async (ID_USERMASTER, Data) => {
    await axios.post(`create_datos_laborales?userCreatorId=${ID_USERMASTER}`,Data)
    .then(
        // Maneja la respuesta exitosa.
        res => {
        // Verifica si la respuesta tiene un estado HTTP 201 (Creado).
        if (res.status == 201){
            // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.
            emit("respuesta", {'texto':res?.data?.message, 'valor':true})
            // Llama a la función NextModal pasando el ID del nuevo usuario.
            NextModal(props.EmpleadoID);
        }            
        }
    )
    .catch(
        // Maneja los errores de la solicitud.
        err => {
            ////console.log(err)
            // Verifica si la respuesta del error contiene un objeto de respuesta.
            if (err) { 
                // Si el estado HTTP es 422 (Solicitud no procesable), imprime un mensaje de error.
                if (err?.status == 422){
                    emit({'texto': "no se puede procesar la solcitud", 'valor':false});
                }else if (err.response.status == 521) {
                    actualizadDatosLaborales(Data)
                }  else {
                    // Imprime el error completo.
                    console.error(err?.response);
                    // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
                    emit("respuesta", {'texto':err?.response?.data?.message, 'valor':false})                    
                }                                   
            }
        }
    );
}

const actualizadDatosLaborales = async (Data) => {
    console.log(Data)
    if(Data){
        await axios.put(`datos_laborales/${props.EmpleadoID}/update`,Data)
        .then(
            // Maneja la respuesta exitosa.
            (res) => {
                // Verifica si la respuesta tiene un estado HTTP 200 (OK).
                if (res.status == 200 || res.status == 201 ) {
                    // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.                    
                    emit("respuesta", { texto: res.data?.message, valor: true });
                    NextModal(props.EmpleadoID);
                } else {
                    // Emite un evento 'respuesta' con un objeto que contiene un mensaje y un valor booleano.
                    emit("respuesta", { texto: res, valor: true });
                    NextModal(props.EmpleadoID);
                }

            }
        )
        .catch(
            // Maneja los errores de la solicitud.
            (err) => {
                console.log(err)
                // Verifica si la respuesta del error contiene un objeto de respuesta.
                if (err.response) {
                    // Si el estado HTTP es 422 (Solicitud no procesable), imprime un mensaje de error.
                    if (err.status == 422) {
                        emit("respuesta", {texto: "no se puede procesar la solcitud", valor: false });
                    } else {
                        // Emite un evento 'respuesta' con un objeto que contiene un mensaje de error y un valor booleano.
                        emit("respuesta", { texto: err.response.data.message, valor: false });
                    }                    
                }
            }
        );
    }
}

const getData = async (ID_empleado) => {
    return new Promise(async (resolve, reject) => {
        if (ID_empleado != null && ID_empleado >= 0) {
            try {
                // Solicita los datos personales
                const respuesta =  await axios.get(`/user/${ID_empleado}/datos_labores`)
                //console.log(respuesta)
                if (respuesta) {
                    //console.log(respuesta)
                    // Resuelve la promesa con true si hay datos
                    resolve({ success: true, data: respuesta.data });
                } else {
                    //console.log(respuesta)
                    // Resuelve la promesa con false si no hay datos
                    resolve({ success: false, data: {} });
                }
            } catch (error) {
                //console.log(error)
                if (error?.response?.status == 404) {
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
 * 
 * @params {payload} Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {
    if (props.EmpleadoID != null && props.EmpleadoID > 0) {    

        //verifica si los payloads tienen datos
        let statuspay = Object.values(payload).some(value => value !== "");
        //let statuspay2 = Object.values(payload2).some(value => value !== "");

        //si uno de los payload tiene cambios
        if (statuspay  == true){
            //verifica que el id pasado sea diferente de nullo y mayor que 0
            if (props.EmpleadoID != null && props.EmpleadoID > 0) {

                //Almacena si hay datos Laboras o no del usuario en el sistema
                //console.log(props.EmpleadoID)
                let respuestaGetData = await getData(props.EmpleadoID);


                // Recuperar el objeto como una cadena de texto y convertirlo de nuevo a un objeto
                let ID_USUARIO = JSON.parse(localStorage.getItem('userId'));
                
                //console.log(respuestaGetData?.success)

                if(respuestaGetData.success != null){

                    if(respuestaGetData.success == true){
                        let DataLaborales = respuestaGetData.data
                        //actualizar datos laborales
                    } else {
                        if(ID_USUARIO > 0){
                            payload.user_id = props.EmpleadoID                        
                            payload.sociedad_id = Number(idSociedad)
                            
                            if (ListaDiasLibres.value.length >= 1) {
                                payload.dias_descanso = ListaDiasLibres.value.join(",")
                            } else {
                                payload.dias_descanso = '6,7';
                            }

                            if (payload.modalidad == ''){
                                payload.modalidad = 0
                            }

                            payload.hora_ingreso = "08:00";
                            payload.hora_egreso = "18:00";
                            payload.jefatura = 0;

                            crearDatoslaborales(ID_USUARIO, payload)

                        } else {
                            console.error("usuario no autorizado")
                        }                    
                    }
                } else {
                    emit("nextModal", {"texto":"error al verificar los datos del empleado", "valor": false})
                }

                
            } else {
                emit("respuesta", {'texto':"Error al validar el ID del usuario", 'valor':false})  
            }
        } else {//no hay modificaciones en los payloads
            NextModal(props.EmpleadoID)
        }
    } else {
        emit("respuesta", {'texto':"Error enviar los datos", 'valor':false})  
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


</style>
