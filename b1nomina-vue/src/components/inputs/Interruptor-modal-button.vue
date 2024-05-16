<template>
    <!--Contenedor General-->
    <div class="switch">
        <!-- Checkbox con propiedades dinámicas y evento de cambio -->
        <input 
            type="checkbox" 
            :id="+Objid" 
            :checked="Estado"
            :value="Estado"
            @change="modificarUsuario"
        >
        <!-- Etiqueta asociada al checkbox -->
        <label :for="Objid"></label>
        <!-- Texto descriptivo del switch -->
        <span>{{ Texto }}</span>

        <!-- Modal con formularios para activar/desactivar usuarios -->
        <div>
            <TemplateModal 
                @closeModal="showModal(0)" 
                :FormId="FormId"
                :NombreAccion="TituloModal" 
                :textSubmit="TextoButton"
                :activarModal="activarModal"
                :ModalActivo="1"
                :DataNotification="showNotificacionModal"
            >
                <template #default>
                    <!-- Formulario para activar usuario -->
                    <div v-show="formActivo==1">
                        <FormEmpleadoActivar
                            :EmpleadoIDSelecionado="EmpleadoID_Selecionado"
                            @notificacion="sendData"
                            @activarUsuario="accionCorrecta(1)"
                        />
                    </div>
                    <!-- Formulario para desactivar usuario -->
                    <div v-show="formActivo==2">
                        <FormEmpleadoDesactivar 
                            :EmpleadoIDSelecionado="EmpleadoID_Selecionado"
                            @notificacion="sendData"
                            @desactivarUsuario="accionCorrecta(2)"
                        />
                    </div>
                </template>
            </TemplateModal>
        </div>        
    </div>       
</template>


<script setup>
// Importación de componentes y funciones de Vue
import TemplateModal from '@/components/modal/TemplateModal.vue';
import FormEmpleadoDesactivar from '@/components/formularios/Form-Empleado-Desactivar.vue';
import FormEmpleadoActivar from '@/components/formularios/Form-Empleado-Activar.vue';
import { ref, defineProps, defineEmits} from 'vue';

// Definición de las propiedades que recibe el componente
const props = defineProps({
    Estado: {
        type: Boolean,
        default: false,
    },
    Objid: {
        type: [String, Number] 
    },
    Texto: {
        type: String,
        default: ""
    },
});

// Definición de los eventos que emite el componente
const emit = defineEmits(
    [
        "ValorEstado",
        'actualizarListado',
    ]
);

const modificarUsuario = (evento) => {
    if (props.Estado == true) {
        showModal(1, props.Objid)
    } else {
        showModal(2, props.Objid)
    }
}

/**
 * Ejecuta acciones basadas en el tipo de acción (activar/desactivar usuario).
 * @param {Number} tipo - Tipo de acción a realizar.
 */
const accionCorrecta = (tipo) => {
    if(tipo == 1){ //si se Activo
        showModal()
        emit('actualizarListado', {'Titulo': "Activacion Exitosa", 'Descripcion': "Ahora el empleado esta dentro de los empleados activos"})
    } else if(tipo == 2){ //si se desactivo
        showModal()
        emit('actualizarListado', {'Titulo': "Desactivacion Exitosa", 'Descripcion': "Ahora el empleado esta dentro de los empleados inactivos"})
    } else {
        console.error("error al activar");
    }
}

// Referencia para almacenar datos de notificación
const showNotificacionModal = ref({})
/**
 * Asigna datos de notificación a la referencia.
 * @param {Object} DATA - Datos de notificación.
 */
const sendData = (DATA) => {
    showNotificacionModal.value = DATA //asigna el valor
}

/////////// programacion de los modales de activacion ///////////////

// Variables para controlar la activación y configuración de los modales
const activarModal = ref(false)
const formActivo = ref(null)
const TextoButton = ref('')
const TituloModal = ref('')
const EmpleadoID_Selecionado = ref(null)
const FormId = ref('')

    /**
     * Controla el despliegue del modal y su configuración.
     * @param {Number} Id_modal - Identificador del modal a mostrar.
     * @param {Number} idEmpleado - ID del empleado seleccionado.
     */
    const showModal = (Id_modal=null, idEmpleado=null) => {
        
        if(Id_modal == null && idEmpleado == null) {
            activarModal.value = !activarModal.value;

        } else if (Id_modal == 0) {
            activarModal.value = !activarModal.value;
            document.getElementById(props.Objid).checked = props.Estado
            
        }else {
            EmpleadoID_Selecionado.value = idEmpleado
            if(Id_modal == 2){
                activarModal.value = !activarModal.value;
                formActivo.value = 1;
                TextoButton.value = 'Si, activar';
                TituloModal.value = '¿Estás seguro que deseas activar a este empleado?';
                FormId.value = "FormSend-A";
                
            } else if(Id_modal == 1){
                activarModal.value = !activarModal.value;
                formActivo.value = 2;
                TextoButton.value = 'Si, desactivar';
                TituloModal.value = '¿Estás seguro que deseas desactivar a este empleado?';
                FormId.value = "FormSend-D";
                
            } 
        }
        
    };
</script>


<style scoped>
/*elimina la apariencia regular 
*/
.switch {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 12px;
}

.switch > span {
    color: #000842;
    font-size: 20px;
    font-family: Poppins;
    font-weight: 400;
    word-wrap: break-word;
}
.switch > input {
    display: none;
}

/**Estilo fondo default */
.switch > label {
    display: block;
    position: relative;
    background: #F8F8F8;
    width: 44px;
    height: 25px;
    border-radius: 35px;
    border: 1px solid #D7CDF1;
    cursor: pointer;
}

/**Estilo interno default */
.switch > label::before{
    content: "";
    position: absolute;
    width: 23px;
    height: 22px;
    background: #D7CDF1;
    border-radius: 9999px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    top: 1px;
    left: 1px;
    transition: all 0.3s;
}

/**Estilo fondo al ser selecionado */
.switch > input:checked + label {
    background: #2F1570;
}

/**Estilo interno al ser selecionado */
.switch > input:checked + label::before {
    left: 20px;
    top: 1px;
    background: #F8F8F8;
}

</style>