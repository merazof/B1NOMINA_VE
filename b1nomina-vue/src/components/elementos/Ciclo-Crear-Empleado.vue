<template>
    <!--contenedor-->
    <div class="Add-user-button">
        <!--Boton para agregar usuarios-->
        <TemplateButton text="Agregar Empleado" @click="showOptions">
            <template #default >
                <PersonPlussIcon/>
            </template>
        </TemplateButton>
        
        <!--Lista de opciones que se despliega-->
        <ListaOpciones v-show="mostrarOpciones" @mouseleave="mostrarOpciones = !mostrarOpciones">
            <template #opcion1>
                <!--Boton de carga basica-->
                <BigOptionButton 
                    Accion="Crear empleado"
                    Texto="Agrega un nuevo empleado y accede directamente a su perfil para completar sus datos."
                    @click="showModal(1)"
                />
            </template>

            <template #opcion2>
                <!--Boton de carga masiva-->
                <BigOptionButton  
                    Accion="Importación Masiva"
                    Texto="Importa de forma masiva los campos personalizados de tus empleados desde un único archivo, para crear múltiples empleados a la vez."
                    @click="showModal(2)"
                />
            </template>
            
            <template #opcion3>
                <!--Boton de actualizacion masiva-->
                <BigOptionButton 
                    Accion="Actualización Masiva"
                    Texto="Actualiza de forma masiva los campos personalizados para todos los empleados desde un único archivo."
                    @click="showModal(3)"
                />
            </template>
        </ListaOpciones>
        <div>
            <TemplateModal 
                @closeModal="showModal" 
                :activarModal="mostrarModal"
                :FormId="'Form'+idFormularioActivo"
                :DataNotification="dataNotificacion"
                NombreAccion="Nuevo Registro" 
                textSubmit="Guardar"
                :ModalActivo="1"
            >
                <template #default>
                
                    <p class="decripcion-modal">
                        La información de la persona será utilizada para ayudarte a generar la nómina más rápida que has visto, 
                        recuerda que siempre podrás regresar a editar cualquier valor.
                    </p>
                    
                    <NavForm 
                        :idFormularioActivo="idFormularioActivo" 
                    />
                    
                    <FormDatosBasicos 
                        @nextModal="avanzarForm"
                        @respuesta="sendData" 
                        :EmpleadoID="ID_Usuario_Creado"                    
                        v-show="idFormularioActivo == 1"
                        ref="Form1" 
                    />
                    
                    <FormDatosPersonalesVue 
                        @nextModal="avanzarForm"
                        @respuesta="sendData"
                        :EmpleadoID="ID_Usuario_Creado"
                        :parametros="parametrosDP"
                        v-show="idFormularioActivo == 2"
                        ref="Form2"   
                    />
                    
                    <FormDatosLaborales 
                        @nextModal="avanzarForm"
                        @respuesta="sendData"
                        :EmpleadoID="ID_Usuario_Creado"
                        :parametros="parametrosDL"
                        v-show="idFormularioActivo == 3"
                        ref="Form3"
                    />

                    <FormDatosPago
                        @closeModal="showModal"
                        @respuesta="sendData"
                        :EmpleadoID="ID_Usuario_Creado"
                        :parametros="parametrosDPa"
                        v-show="idFormularioActivo == 4"
                        ref="Form4"
                    />
                
                </template>
                
                <template #boton>
                    <TemplateButton2 
                        text="Atras" 
                        @click="retrocederForm" 
                        v-show="idFormularioActivo > 1"
                    />        
                </template>
            </TemplateModal>

            <TemplateModal 
                @closeModal="showModal" 
                :activarModal="mostrarModal2"
                FormId="FormImportM"
                :DataNotification="dataNotificacion"
                NombreAccion="Importación Masiva" 
                textSubmit="Enviar"
                :ModalActivo="2"
            >
                <template #default>
                    <FormImportacionMasiva                       
                        @respuesta="sendData"
                        ref="FormCargaMasiva"
                    />
                </template>
                
            </TemplateModal>
        </div>        
    </div><!--final contenedor add user-->
</template>

<script setup>
    //componentes
    import TemplateButton from '@/components/botones/Template-button.vue';
    import TemplateButton2 from '@/components/botones/Template-button2.vue'
    import ListaOpciones from '@/components/listas/Lista-Opciones.vue'
    import BigOptionButton from '@/components/botones/Big-Option-button.vue'
    import TemplateModal from '@/components/modal/TemplateModal.vue';
    import NavForm from '@/components/navs/Nav-form.vue'
    //formularios
    import FormDatosBasicos from '@/components/formularios/Form-datosBasicos.vue';
    import FormDatosPersonalesVue from '@/components/formularios/Form-datosPersonales.vue';
    import FormDatosLaborales from '@/components/formularios/Form-datosLaborales.vue';
    import FormDatosPago from '@/components/formularios/Form-datosPago.vue';
    import FormImportacionMasiva from '@/components/formularios/Form-ImportacionMasiva.vue';
    //iconos
    import PersonPlussIcon from '../icons/Person-Pluss-icon.vue';

    //librerias
    import { ref, onMounted, defineEmits} from 'vue';
    import axios from 'axios';
    import { useRoute } from 'vue-router';

    const emit = defineEmits([
        "Notificacion",
    ])

    const route = useRoute();
    // idSociedad es un String
    const idSociedad = route.params.sociedadId;

    //variable con el valor del formulario a mostrar
    const idFormularioActivo = ref(1);
    //controla la visualizacion de las opciones
    const mostrarOpciones = ref(false);
    /**
     * Controla la visualizacion de la lista de opciones de agregar empleado
     * @param mostrarOpciones - variable que cambia de valor
    */
    const showOptions = () => {
        mostrarOpciones.value = !mostrarOpciones.value
    }

     //arreglo con la data
     const dataNotificacion = ref({})
    
    const sendData = (DATA) => {
        dataNotificacion.value = DATA //asigna el valor
    }

    

    const ID_Usuario_Creado = ref('');

    // Crear referencias a los componentes hijos
    const Form1 = ref(null);
    const Form2 = ref(null);
    const Form3 = ref(null);
    const Form4 = ref(null);

    const limpiarFormularios = () => {
    // Llamar a las funciones de limpieza de cada componente hijo
        Form1.value?.resetForm();
        Form2.value?.resetForm();
        Form3.value?.resetForm();
        Form4.value?.resetForm();
        ID_Usuario_Creado.value = null;
    };

    const mostrarModal = ref(false)
    const mostrarModal2 = ref(false)
    const mostrarModal3 = ref(false)

    const FormCargaMasiva = ref(null);

    /**
     * Controla el despliegue del modal
     * @param mostrarModal
     */
    const showModal = (Id_modal) => {
        if(Id_modal == 1){
            
            if(idFormularioActivo.value != 1 && mostrarModal.value == true){
                showN(
                    {
                    'Titulo': "Empleado Creado con exito", 
                    'Descripcion': "El proceso de creacion del usuario se ha realizazo con éxito"
                    }
                )
            }
            limpiarFormularios();
            mostrarModal.value = !mostrarModal.value;
            idFormularioActivo.value = 1;
            
        } else if(Id_modal == 2){            
            mostrarModal2.value = !mostrarModal2.value;
            FormCargaMasiva.value.resetInput()

        } else if(Id_modal == 3){
            //console.log("mostrarmodal 3")
            //modal en desarrollo
            mostrarModal3.value = !mostrarModal3.value;
        }
    }

    const retrocederForm = () => {
        if(idFormularioActivo.value > 1){
            idFormularioActivo.value--
        }
        
    };
    const avanzarForm = (idEmpleadoCreado) => {
        ID_Usuario_Creado.value = idEmpleadoCreado;
        if(idFormularioActivo.value < 4){
            idFormularioActivo.value++
        }
    };

    const showN = (Data) => {
        emit('Notificacion',Data);
    }

    //parametros formularios
    const parametrosDP = ref({
        nacionalidad: [],
        estadocivil: [],
        regiones: [],
        localidad: [],
    });
    const parametrosDL = ref({
        tipocontrato: [],//
        terminocontrato: [],//
        tiposalario: [], //
        sede: [],//
        departamento: [],//
        cargos: [],//
        grupos: [],//
        nivelestudio: [],//
        unidadessueldo: [],

    });    
    const parametrosDPa = ref({
        bancos: [],        
    });
    
    // Realiza una solicitud GET a la API para obtener parámetros
    const pedirParametros = async () => {
        axios.get(`/sociedad/${idSociedad}/parametros_crear_usuario`)
        .then(
            (respuesta) => {              
                // Verifica y procesa los parámetros recibidos para cada categoría
                // Asegúrate de que las propiedades existan dentro de 'respuesta.data.parametros'

                // Mapeo de claves de respuesta.data.parametros a propiedades de destino
                const mapeoParametros = {
                    nacionalidad: 'nacionalidad',
                    estadocivil: 'estadocivil',
                    regiones: 'regiones',
                    localidad: 'localidad',
                    bancos: 'bancos',
                    tipocontrato: 'tipocontrato',
                    terminocontrato: 'terminocontrato',
                    tiposalario: 'tiposalario',
                    sede: 'sede',
                    departamentos: 'departamento',
                    cargos: 'cargos',
                    grupos: 'grupos',
                    unidadessueldo: 'unidadessueldo',
                    nivelestudio: 'nivelestudio'
                };

                // Función para asignar valores a los objetos de destino
                function asignarValores(parametros, objetoDestino) {
                    for (const clave in parametros) {
                        if (parametros.hasOwnProperty(clave) && mapeoParametros[clave]) {
                            const propiedadDestino = mapeoParametros[clave];
                            if (objetoDestino[propiedadDestino]) {
                                objetoDestino[propiedadDestino].push(...parametros[clave]);
                            }
                        }
                    }
                }

                // Asignación de valores
                asignarValores(respuesta.data.parametros, parametrosDP.value);
                asignarValores(respuesta.data.parametros, parametrosDPa.value);
                asignarValores(respuesta.data.parametros, parametrosDL.value);
            }
        )
        .catch(
            err => {
                // Maneja errores de la solicitud
                //console.log(err)
            }
        )
    }
    
// al montar el componente ejecuta las funciones
onMounted(async () => {
    await pedirParametros(); //solicita los parametros para crear usuarios
});


</script>