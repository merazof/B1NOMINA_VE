<template>
    <!--contenedor-->
    <div class="Add-user-button">
            <TemplateModal 
                @closeModal="showModal(0)" 
                :activarModal="mostrarModal"
                :FormId="'Form'+idFormularioActivo+'r'"
                :DataNotification="dataNotificacion"
                NombreAccion="Retomar Información" 
                textSubmit="Actualizar"
                :ModalActivo="1"
            >
                <template #default>
                
                    <p class="decripcion-modal">
                        La información de la persona será utilizada para ayudarte a generar la nómina más rápida que has visto, recuerda que siempre podrás regresar a editar cualquier valor.
                    </p>
                    
                    <NavForm 
                        :edit="true"
                        :idFormularioActivo="idFormularioActivo"
                        @-show-modal="editModal"
                    />
                    
                    <FormRDatosBasicos 
                        @nextModal="avanzarForm"
                        @respuesta="activarNotificacionModal" 
                        :EmpleadoID="ID_Empleado_Selecionado"
                        :Informacion="Data_Usuario"                 
                        v-if="idFormularioActivo == 1"
                        ref="Form1" 
                    />
                    
                    <FormRDatosPersonales 
                        @nextModal="avanzarForm"
                        @respuesta="activarNotificacionModal"
                        :EmpleadoID="ID_Empleado_Selecionado"
                        :Informacion="Data_Usuario" 
                        :parametros="parametrosDP"
                        v-if="idFormularioActivo == 2"
                        ref="Form2"   
                    />
                    
                    <FormRDatosLaborales 
                        @nextModal="avanzarForm"
                        @respuesta="activarNotificacionModal"
                        :EmpleadoID="ID_Empleado_Selecionado"
                        :parametros="parametrosDL"
                        :Informacion="Data_Usuario" 
                        v-if="idFormularioActivo == 3"
                        ref="Form3"
                    />

                    <FormRDatosPago
                        @closeModal="showModal"
                        @respuesta="activarNotificacionModal"
                        :EmpleadoID="ID_Empleado_Selecionado"
                        :parametros="parametrosDPa"
                        :Informacion="Data_Usuario" 
                        v-if="idFormularioActivo == 4"
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
    </div><!--final contenedor add user-->
</template>

<script setup>
    //componentes
    import TemplateButton2 from '@/components/botones/Template-button2.vue'
    import TemplateModal from '@/components/modal/TemplateModal.vue';
    import NavForm from '@/components/navs/Nav-form.vue'
    //formularios
    import FormRDatosBasicos from '@/components/formularios/enContratacion/Form-R-datosBasicos.vue';
    import FormRDatosPersonales from '@/components/formularios/enContratacion/Form-R-datosPersonales.vue';
    import FormRDatosLaborales from '@/components/formularios/enContratacion/Form-R-datosLaborales.vue';
    import FormRDatosPago from '@/components/formularios/enContratacion/Form-R-datosPago.vue';

    //librerias
    import { ref, onMounted, defineEmits, reactive} from 'vue';
    import axios from 'axios';
    import { useRoute } from 'vue-router';
    import peticiones_EnContratacion from '@/peticiones/g_empleado';

    const emit = defineEmits([
        "notificacion",
    ])
    const EmpleadoID = ref(0)

    const route = useRoute();
    // idSociedad es un String
    const idSociedad = route.params.sociedadId;

    //variable con el valor del formulario a mostrar
    const idFormularioActivo = ref(1);

     //arreglo con la data
    const dataNotificacion = ref({})
    
    const activarNotificacionModal = (DATA) => {
        dataNotificacion.value = DATA //asigna el valor
    }    

    const ID_Empleado_Selecionado = ref('');
    const Data_Usuario = ref({}); // almacena la información de usuario dada por la api

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
        ID_Empleado_Selecionado.value = null;
    };

    const PedirInfo = async (ID_Empleado) => {
       
        EmpleadoID.value = ID_Empleado;
        
        //pide los datos básicos
        let respuesta = await peticiones_EnContratacion?.PedirDatosProspectoCompleto(ID_Empleado)
       
        console.log(respuesta.data)

        if (respuesta.success){
            console.log("//////// Actualizar Informacion /////////////")
            ID_Empleado_Selecionado.value = ID_Empleado
            Data_Usuario.value = respuesta?.data;

            showModal(idFormularioActivo.value)
        } else {
            ID_Empleado_Selecionado.value = -1;
            showN({
                    'Titulo': "Error al consultar", 
                    'Descripcion': "En estos momentos no se puede acceder a los datos de este Usuario"
                })
        }
    }

    const mostrarModal = ref(false)

    const editModal = (idModal) => {
        idFormularioActivo.value = idModal
    }
    /**
     * Controla el despliegue del modal
     * @param mostrarModal
     */
    const showModal = (Id_modal = 0) => {   
        if(Id_modal >= 1){
                mostrarModal.value = true;
        } else {
            idFormularioActivo.value = 0;
            showN({
                    'Titulo': "Información Modificada con exito", 
                    'Descripcion': "El proceso de actualización del usuario se ha realizazo con éxito"
                })
            mostrarModal.value = !mostrarModal.value;
        }
    }

    const retrocederForm = () => {
        if(idFormularioActivo.value > 1){
            idFormularioActivo.value--

            PedirInfo(EmpleadoID.value)
        }
        
    };

    const avanzarForm = (idEmpleadoCreado) => {
        ID_Empleado_Selecionado.value = idEmpleadoCreado;
        if(idFormularioActivo.value < 4){
            idFormularioActivo.value++
            PedirInfo(EmpleadoID.value)
        }
    };

    const showN = (Data) => {
        emit('notificacion', Data);
        idFormularioActivo.value = 1
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
                const asignarValores = (parametros, objetoDestino) => {
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
                console.error(err?.response.data)
            }
        )
    }

    defineExpose({
        PedirInfo,
    })
    
// al montar el componente ejecuta las funciones
onMounted(async () => {
    await pedirParametros(); //solicita los parametros para crear usuarios
});

</script>