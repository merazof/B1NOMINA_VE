<template>    
        <nav class="aside " id="aside" @mouseleave="desplegarMenu=false">
            <div class="head">
                <div class="profile" v-show="desplegarMenu">
                    <LogoTextVue />
                </div>
                <MenuButton @click="desplegarMenu = !desplegarMenu"/>
            </div>

            <div class="contend">
                <!--Botones superiores-->
                <div class="contend1">
                    <div class="options" v-for="modulo in modulosAsignados" :key="modulo.idModulo">
                        <!--Dashboard-->
                        <NavButton :class="{'order': !desplegarMenu}">
                            <template #direccion>
                                <router-link :to="{ path: `/sociedad/${sociedadId}/${modulo.urlModulo}` }">
                                    <CuboIcon />
                                    <span :class="{'show': desplegarMenu}">
                                        {{modulo.nombreModulo}}
                                    </span>
                                </router-link>
                            </template>               
                        </NavButton>
                    </div>
                </div>
                <!--Botones inferiores-->
                <div class="contend2">
                    <div class="options">
                        <!--Notificaciones-->
                        <NotificationButton :class="{'order': !desplegarMenu}">
                            <template #direccion>
                                <router-link :to="{ name: 'notificaciones' }">
                                    <CampanaIcon />
                                    <span :class="{'show': desplegarMenu}">
                                        Notificaciones
                                        <CantidadNotificaciones num="5"/>
                                    </span>
                                </router-link>
                            </template>
                        </NotificationButton>
                        <!-- Soporte y Asistencia-->
                        <NavButton :class="{'order': !desplegarMenu}">
                            <template #direccion>
                                <router-link to="/help">
                                    <HelpCircleIcon />
                                    <span :class="{'show': desplegarMenu}">Soporte y Asistencia</span>
                                </router-link>
                            </template>
                        </NavButton>
                        <!--Configuración-->
                        <NavButton :class="{'order': !desplegarMenu}">
                            <template #direccion>
                                <router-link :to="{ path: `/sociedad/${sociedadId}/configuracion` }">
                                    <TuerquitaIcon />
                                    <span :class="{'show': desplegarMenu}">
                                        Configuración
                                    </span>
                                </router-link>
                            </template>
                        </NavButton>
                    </div>
                </div>
            </div>

            <!--Parte inferior del navegados-->
            <SociedadBox :desplegarMenu="desplegarMenu"/>
            
        </nav>       
</template>

<script setup>
// Componentes
import LogoTextVue from './logos/Logo-text.vue';
import MenuButton from './botones/Menu-button.vue';
import NavButton from './botones/Nav-button.vue';
import NotificationButton from './botones/Notification-button.vue';
import CantidadNotificaciones from './CantidadNotificaciones.vue';

//Iconos

import CuboIcon from './icons/Cubo-icon.vue';
//import TwoPersonIcon from './icons/TwoPerson-icon.vue';
//import TableIcon from './icons/Table-icon.vue';
//import AjustesIcon from './icons/Ajustes-icon.vue';
import CampanaIcon from './icons/Campana-icon.vue';
import HelpCircleIcon from './icons/HelpCircle-icon.vue';
import TuerquitaIcon from './icons/Tuerquita-icon.vue';
import SociedadBox from '@/components/box/Sociedad-box.vue';

//axios
import axios from 'axios';

// Generar reactividad del componente
import {onMounted, ref} from 'vue';


import { useRoute } from 'vue-router';

const route = useRoute();
const sociedadId = route.params.sociedadId;

//controla si se a acionado el desplegar menú
const desplegarMenu = ref(false)

//valor por defecto
const modulosAsignados = ref(
    [
        {
            "idModulo": 1,
            "nombreModulo": "DashBoard",
            "urlModulo": "dashboard",
            "iconoModulo": "",
            "asignado": true,
        },
    ]
);

const listaModulos2 = ref([{}]);

//solicita los modulos disponibles
const OptenerModulos = () => {
    return axios.get(`user/${localStorage.getItem('userId')}/asignated_modules`, localStorage.getItem('userId'))
    .then(
        (respuesta) => {
            //asigna el valor de la consulta a la lista de modulos
            listaModulos2.value = respuesta.data
            // Crear un nuevo arreglo con los elementos donde "asignado" es verdadero
            modulosAsignados.value = listaModulos2.value.filter(modulo => modulo.asignado);
        }
    )
    .catch(
        (error) => {
            //console.log(error)
        }
    );
}

//al momento de  montar el componente
onMounted(() => {
    //ejecuta la peticion
    OptenerModulos();
});

</script>

<style scoped>

/*Contenedor general */
.aside {
    z-index: 5;
    height: 100vh;
    width: fit-content;
    padding: 48px 17.75px;
    background-color: #1A245B;
    color: #CDE0F1;
    justify-content: space-between;
    transition: all 0.4s ease;
    display: flex;
    flex-direction: column;
    position: absolute;
    box-sizing: border-box;
}
/*logo y boton de aprtura */
.head {
    display: flex;
    align-items: center;
    height: 52.5px;
    justify-content: space-between;
    margin-bottom: 32px;
    gap: 12px;
}
/*logo*/
.head > img {
    cursor: pointer;
}
/*contenedor general de las listas de modulos*/
div.contend {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
/*Icono dentro de las opciones*/
.options img {
    margin-right: 16px;
}
/*link correspondiente dentro de las opciones */
.options a {
    font-family: 'Poppins' , helvetica;
    color: #CDE0F1;
    text-decoration: none;
}
/*Contenedor general de las opcines */
.options {
    z-index: 3;
}


/*Estilo de los iconos */
.icon {
    height: 20.5px;
    width: 20.5px;
    cursor: pointer;
}

.show {
    display: flex;
}

.order > a {
    display: flex;
    justify-content: center;
}
</style>