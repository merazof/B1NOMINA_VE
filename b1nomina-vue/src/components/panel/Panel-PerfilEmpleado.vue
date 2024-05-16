<template>
    <div class="panel-PerfilEmpleado">
        <LayoutCabeceraEmpleado @clickEvent="() => console.log('editarfoto')" :imagen="DatosUsuario?.foto">
            <template #Rol>
                Rol                
            </template>
            <template #Nombre>
                {{ DatosUsuario?.nombres }} {{ DatosUsuario?.apellido_paterno }}
            </template>
            <template #Cargo>
                {{ DatosUsuario?.cargo }}           
            </template>
            <template #Botones>

                <TemplateButton2 text="Ver último combrobante de pago">
                    <template #post>                                        
                        <OjitoIcon Stroke="#002E99"/>
                    </template>
                </TemplateButton2>

                <TemplateButton2 text="Liquidar">
                    <template #post>                                        
                        <DolarIcon color="#002E99" />
                    </template>
                </TemplateButton2>

                <TemplateButton2 text="Desactivar" v-if="DatosUsuario?.activo == 1">
                    <template #post>                                        
                        <ExitColorIcon Stroke="#002E99" />
                    </template>
                </TemplateButton2>
                <TemplateButton2 text="Activar" v-else>
                    <template #post>                                        
                        <ExitColorIcon Stroke="#002E99" />
                    </template>
                </TemplateButton2>

            </template>
        </LayoutCabeceraEmpleado>     
        <!--Descripciones Generales-->  
        <div class="cards">
            <boxInfo color="rgba(0, 112, 255, 0.20)">
                <template #Titulo>
                    <DolarIcon color="black" />
                    Salario mensual
                </template>
                <template #Texto>
                    <span>{{DatosUsuario?.unidad_sueldo_caracater}} {{DatosUsuario?.salario_base >> 0}}</span>
                </template>
            </boxInfo>

            <boxInfo color=" rgba(96.90, 255, 0, 0.20)">
                <template #Titulo>
                    <InfoIcon />
                    Conceptos recurrentes
                </template>
                <template #General>
                    descripcion
                </template>
            </boxInfo>

            <boxInfo color="rgba(255, 137.70, 0, 0.20)">
                <template #Titulo>
                    <SolIcon color="black" />Vacaciones acumuladas
                </template>
                <template #Texto>
                    {{DatosUsuario?.vacaciones_acumuladas}} días
                </template>
            </boxInfo>
        </div>
        <!--Tabla para mostrar información-->
        <LayoutForm>
                <template v-slot:cabecera>
                    <NavButtonTemplate text="Datos Laborales" :seleccionado="panelShow== 1" @click="showInfo(1)" />
                    <NavButtonTemplate text="Datos Personales" :seleccionado="panelShow== 2" @click="showInfo(2)" />
                    <NavButtonTemplate text="Eventos Recurrentes" :seleccionado="panelShow== 3" @click="showInfo(3)" />
                    <NavButtonTemplate text="Solicitudes" :seleccionado="panelShow== 4" @click="showInfo(4)" />
                </template>
                <template v-slot:formulario>
                    <div class="contenedorInfo" v-if="panelShow ==1">            
                        <LayoutTablaEMpleados>
                            <!--Formulario Salario-->
                            <template #boton1>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(1, EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>
                            <!--Formulario Datos Contrato-->
                            <template #boton2>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(2,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>
                            <!--Formulario Puesto Trabajo-->
                            <template #boton4>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(3,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>
                            <!--Formulario-->
                            <template #boton6>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(4,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>

                            <!--primer apartado-->
                            <template #titulo1>                                                                    
                                Salario
                            </template>                            
                            <template #st-1> <!--Cantidad-->                                                                    
                                Periodo
                            </template>
                            <template #text-1>                                                                    
                                {{DatosUsuario?.periodo_sueldo_caracter}}
                            </template>
                            <template #st-2>  <!--Salario base-->                                                                 
                                Unidad Sueldo Base
                            </template>
                            <template #text-2>                                                                    
                                {{DatosUsuario?.unidad_sueldo_caracater}} 
                            </template>
                            <template #st-3>  <!--Salario base-->                                                                 
                                Salario base
                            </template>
                            <template #text-3>                                                                    
                                {{DatosUsuario?.salario_base << 0}}                    
                            </template>
                            
                            <!--segundo apartado-->

                            <template #titulo2>                                                                    
                                Datos de contrato
                            </template>                            
                            <template #st-5> <!--Tipo de contrato-->                                                         
                                Tipo de contrato
                            </template>
                            <template #text-5>                                                                    
                                {{DatosUsuario?.tipo_contrato}}
                            </template>
                            <template #st-6> <!--Término de contrato-->                                                                 
                                Término de contrato
                            </template>
                            <template #text-6>                                                                    
                                {{DatosUsuario?.termino_contrato}}
                            </template>
                            <template #st-7>  <!--Fecha de contratación-->                                                                            
                                Fecha de contratación
                            </template>
                            <template #text-7>                                                                    
                                {{DatosUsuario?.fecha_inicio}}
                            </template>
                            <template #st-8> <!--Fecha terminación del contrato-->                                                                     
                                Fecha terminación del contrato
                            </template>
                            <template #text-8>                                                                    
                                {{DatosUsuario?.fecha_fin}}
                            </template>
                            <template #st-9> <!--Nivel de estudio-->                                                                      
                                Nivel de estudio
                            </template>
                            <template #text-9>                                                                    
                                {{DatosUsuario?.nivel_estudio}}
                            </template>
                            <template #st-10> <!--Días de descanso-->    
                                Días de descanso
                            </template>
                            <template #text-10>                                                                    
                                {{DatosUsuario?.dias_descanso?.split(',').map(dia => almacen?.diasLaborales[dia])?.join(', ')}}
                            </template>

                             <!--segundo apartado-->

                            <template #titulo4>                                                                    
                                Puesto de trabajo
                            </template>                                                        
                            <template #st-13>  <!--Sede de Trabajo-->                                                                            
                                Sede de Trabajo
                            </template>
                            <template #text-13>                                                                    
                                {{DatosUsuario?.nombre_sede}}
                            </template>
                            <template #st-14> <!--Departamento-->                                                                     
                                Departamento
                            </template>
                            <template #text-14>                                                                    
                                {{DatosUsuario?.nomdepartamento}}
                            </template>
                            <template #st-15> <!--Cargo-->                                                                      
                                Cargo
                            </template>
                            <template #text-15>                                                                    
                                {{DatosUsuario?.cargo}}
                            </template>
                            <template #st-16> <!--GRUPO-->    
                                Grupo
                            </template>
                            <template #text-16>                                                                    
                                {{DatosUsuario?.nombre_grupo}}
                            </template>                            
                            <template #st-17> <!--Modalidad-->    
                                Modalidad
                            </template>
                            <template #text-17>                                                                    
                                <InterruptorButton
                                    Tipo="individual"
                                    Texto="Teletrabajo" 
                                    :Estado="(DatosUsuario?.modalidad == 0)?false :true"
                                />
                            </template>

                            <template #titulo6>                                                                    
                                Centralización y Datos Adicionales
                            </template>                                                        
                            <template #st-21>  <!-- Grupo Centralización-->
                                Grupo de Centralización
                            </template>
                            <template #text-21>                                                                    
                                {{DatosUsuario?.Centralizacion}}
                            </template>                     
                            <template #st-22>  <!-- Campo adicional-->
                                Campo 1
                            </template>
                            <template #text-22>                                                                    
                                {{DatosUsuario?.campo1}}
                            </template>                     
                            <template #st-23>  <!-- Campo adicional-->
                                Campo 2
                            </template>
                            <template #text-23>                                                                    
                                {{DatosUsuario?.campo2}}
                            </template>                     
                            <template #st-24>  <!-- Campo adicional-->
                                Campo 3
                            </template>
                            <template #text-24>                                                                    
                                {{DatosUsuario?.campo3}}
                            </template>                     
                            <template #st-25>  <!-- Campo adicional-->
                                Campo 4
                            </template>
                            <template #text-25>                                                                    
                                {{DatosUsuario?.campo4}}
                            </template>                     
                            <template #st-26>  <!-- Campo adicional-->
                                Campo 5
                            </template>
                            <template #text-26>                                                                    
                                {{DatosUsuario?.campo5}}
                            </template>  

                        </LayoutTablaEMpleados>
                    </div>
                    <div class="contenedorInfo" v-if="panelShow ==2">
                        <LayoutTablaEMpleados>
                            <template #boton1>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(5,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>
                            <template #boton3>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(6,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>
                            <template #boton5>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(7,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>

                        <!--primer apartado-->
                            <template #titulo1>                                                                    
                                Datos principales
                            </template>                            
                            <template #st-1>                                                                    
                                Nombres
                            </template>
                            <template #text-1>                                                                    
                                {{DatosUsuario?.nombres}}
                            </template>
                            <template #st-2>                                                                    
                                Apellidos
                            </template>
                            <template #text-2>                                                                    
                                {{DatosUsuario?.apellido_paterno}} {{DatosUsuario?.apellido_materno}}
                            </template>
                            <template #st-3>                                                                    
                                N° de Rut
                            </template>
                            <template #text-3>                                                                    
                                {{DatosUsuario?.rut}}
                            </template>
                            <template #st-4>                                                                    
                                Fecha de Nacimiento
                            </template>
                            <template #text-4>                                                                    
                                {{DatosUsuario?.fecha_nacimiento}}
                            </template>                                                    
                            <template #st-5>                                                                    
                                Nacionalidad
                            </template>
                            <template #text-5>                                                                    
                                {{DatosUsuario?.Nacionalidad}}
                            </template>
                            <template #st-6>                                                                    
                               Estado Civil
                            </template>
                            <template #text-6>                                                                    
                                {{DatosUsuario?.descripcion_estado_civil}}
                            </template>
                            <template #st-7>                                                                    
                                Sexo
                            </template>
                            <template #text-7>                                                                    
                                {{(DatosUsuario?.sexo == 0)? "Femenino" : "Masculino"}}
                            </template>
                            
                        <!--segundo apartado-->

                            <template #titulo3>                                                                    
                                Datos de contacto
                            </template>                            
                            <template #st-9> <!--Correo Electrónico-->                                                         
                                Correo Electrónico
                            </template>
                            <template #text-9>                                                                    
                                {{DatosUsuario?.email}}
                            </template>
                            <template #st-10> <!--Telefono Celular-->                                                                 
                                Telefono Celular
                            </template>
                            <template #text-10>                                                                    
                                {{DatosUsuario?.movil}}
                            </template>
                            <template #st-11>  <!--Telefono Local-->                                                                            
                                Telefono Local
                            </template>
                            <template #text-11>                                                                    
                                {{DatosUsuario?.fijo}}
                            </template>
                            <template #st-12> <!--Región-->                                                                     
                                Región
                            </template>
                            <template #text-12>                                                                    
                                {{DatosUsuario?.nomregion}}
                            </template>
                            <template #st-13> <!--Localidad-->                                                                      
                                Localidad
                            </template>
                            <template #text-13>                                                                    
                                {{DatosUsuario?.nomcomuna}}
                            </template>
                            <template #st-14> <!--Dirección-->    
                               Dirección
                            </template>
                            <template #text-14>                                                                    
                                {{DatosUsuario?.direccion}}
                            </template>

                        <!--segundo apartado-->

                            <template #titulo5>                                                                    
                                Datos de pago
                            </template>     
                                                                               
                            <template #st-17>  <!--Medio de pago-->                                                                            
                                Medio de pago
                            </template>
                            <template #text-17>                                                                    
                                {{DatosUsuario?.nomcomuna}}
                            </template>
                            <template #st-18> <!--Banco-->                                                                     
                                Banco
                            </template>
                            <template #text-18>                                                                    
                                {{DatosUsuario?.nombre_banco}}
                            </template>
                            <template #st-19> <!--Tipo de cuenta-->                                                                      
                                Tipo de cuenta
                            </template>
                            <template #text-19>                                                                    
                                Corriente       
                            </template>
                            <template #st-20> <!--Número de cuenta-->    
                                Número de cuenta
                            </template>
                            <template #text-20>                                                                    
                                {{DatosUsuario?.numero_cuenta}}
                            </template>
                        </LayoutTablaEMpleados>
                    </div>
                    <div class="contenedorInfo" v-if="panelShow ==3">
                        <LayoutEmpy>
                            <template #imagen>                           
                                <img src="@/components/icons/svg/Calculadora-icon.svg">                                    
                            </template>
                            <template #contenido>
                                <h3 class="titulo">Eventos Recurrentes</h3>
                                <span class="texto">
                                    Acá puedes agregar asignaciones o retenciones recurrentes a pagos de tipos previsionales y no previsionales.
                                </span>
                                <TemplateButton2 text="Añadir Evento"/>
                            </template>
                        </LayoutEmpy>
                    </div>
                    <div class="contenedorInfo" v-if="panelShow ==4">
                        <LayoutEmpy>
                            <template #imagen>
                                <img src="@/components/icons/svg/NotificationPerson-icon.svg">    
                            </template>
                            <template #contenido>
                                <h3 class="titulo">No tienes solicitudes Pendientes</h3>
                                <span class="texto">
                                    Aquí podrás visualizar, aceptar y rechazar las solicitudes realizadas por tu empleado.
                                </span>
                                
                            </template>
                        </LayoutEmpy>    
                    </div>
                </template>
        </LayoutForm>
        <!--Modales Editar información-->
        <CicloEditarEmpleado ref="EditarInfo" />

        <ShortTemplateModal
            NombreAccion="Foto de Perfil"
            textSubmit="Cambiar"
            FormId="a"
            ref="shortTemplateModal"
            :DataNotification="{}"
        >
            <template #default>
            
                <p>ACA VA EL FORMULARIO</p>        
                
            </template>
            <template #boton>
                <div>
                    BOTON
                </div>
            </template>
        </ShortTemplateModal>
    </div>
</template>

<script setup>
//componentes
import LayoutCabeceraEmpleado from '@/components/Layouts/LayoutCabeceraEmpleado.vue';
import LayoutForm from '@/components/Layouts/LayoutForm.vue';
import LayoutTablaEMpleados from '@/components/Layouts/LayoutTabla-datosEmpleado.vue'
import boxInfo from '@/components/elementos/Box-info.vue';
import NavButtonTemplate from '@/components/botones/Nav-button-templateForm.vue';
import TemplateButton2 from '@/components/botones/Template-button2.vue';
import InterruptorButton from '@/components/inputs/Interruptor-button.vue';
import TemplateBlanckButton from '@/components/botones/Template-blank-button.vue';
import LayoutEmpy from '@/components/Layouts/LayoutEmpy.vue'
import CicloEditarEmpleado from '@/components/elementos/Ciclo-Editar-Empleado.vue';
import ShortTemplateModal from '@/components/modal/Short-TemplateModal.vue';
//iconos
import DolarIcon from '@/components/icons/Dolar-icon-blanco.vue';
import InfoIcon from '@/components/icons/Info-icon.vue';
import SolIcon from '@/components/icons/Sol-icon.vue';
import OjitoIcon from '@/components/icons/Ojito-icon.vue';
import ExitColorIcon from '@/components/icons/Exit-color-icon.vue'
import EdiIcon from '@/components/icons/Edit-icon.vue';

//Librerias y acciones
import {ref, inject } from 'vue';
import {useRoute}  from 'vue-router';
import almacen from '@/store/almacen';

const DatosUsuario = ref(inject('dataEmpleado'))

const route = useRoute();  
const EmpleadoID = route.params.empleadoId

const panelShow = ref(1)
const showInfo = (id_apartado) => {
    panelShow.value = id_apartado;
};
//referencia del ciclo editar info
const EditarInfo = ref(null);
const shortTemplateModal = ref(null)

/*
onMounted(async () => {
    await console.log(DatosUsuario.value)
})

*/

</script>

<style scoped>
/* 
 Contenedor principal del formulario de empleados, configurado para ocupar todo el espacio disponible
 y organizar sus elementos en una columna. El uso de 'display: flex' y 'flex-direction: column' permite
 una disposición flexible y ordenada de los elementos del formulario.
*/
div.panel-PerfilEmpleado {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:24px; /* Espaciado entre los elementos del formulario para mejorar la legibilidad */
}

div.cards {
    display: flex;
    flex-direction: row;
    gap: 24px;
    justify-content: space-around;
    
}

div.contenedorInfo {
    background: #fcfcfc;
}

h3.titulo {
    font-size: 24px;
    font-weight: 500;
    line-height: 34px;
    text-align: left;
    color: #1A2771;
    margin: 0;
}

span.texto {
    display: flex;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    text-align: justify;
}
</style>