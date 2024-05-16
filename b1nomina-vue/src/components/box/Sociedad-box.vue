<template>
    <!--Si el panel esta desplegado despliega esta parte-->
    <div class="perfil" v-if="desplegarMenu">
        <Avatar class="Avatar" @click="seleccion"/>
        <div class="perfil-text" >
            <span class="text-perfil text-perfil-1">{{nombreSociedad}}</span>
            <span class="text-perfil">Rut {{rutScoiedad}}</span>
        </div>
        <div v-show="desplegarMenu">
            <TresPuntosIcon class="icon" @click="logOut"/>
        </div>           
    </div>

    <!--Si el panel esta recogido despliega esta parte-->
    <div class="perfil-hidden" v-else>
        <Avatar class="Avatar" @click="seleccion"/>
    </div>
</template>

<script setup>
// uso 
import { defineProps } from 'vue';
import TresPuntosIcon from '@/components/icons/TresPuntos-icon.vue';
//AVATAR
import Avatar from '@/components/avatars/Avatar1.vue'
import { useRouter } from 'vue-router';

const props = defineProps({
    desplegarMenu:{
        Boolean,
        default: false
    },
    nombreSociedad: {
        String,
        default: "Nombre Empresa"
    },
    rutScoiedad: {
        String,
        default: "12345678-9"
    }
});

//Redireccion
const router = useRouter();

const logOut = () => {

    localStorage.clear();
    // Utiliza Vue Router para redirigir al usuario a la página de inicio de sesión
    router.replace('/login');
};

//al selecionar el avatar
const seleccion = () => {
    //al selecionar
    router.push('/sociedad')
};

</script>

<style scoped>
/*Contenedor del perfil */
div.perfil {
    display: flex;
    justify-content: center;
    padding: 24px 0px;
    align-items: center;
    border-radius: 8px;
    border: 2px #4E5FBD solid;
    background: #1A2771;
    color: #CDE0F1;
    margin-top: 48px;
    box-sizing: content-box;
    width: 100%;
    justify-content: space-evenly;
}
/*Imagensociedad */
.profile img {
    display: flex;
    width: 188.978px;
    height: 34.514px;
    padding: 1px 0px;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
}

/*Estilos cuando menú esta cerrado */
div.perfil-hidden{
    margin-top: 48px;
    display: flex;
    justify-content: center;
}
/*estilos del avatar de la sociedad */
.avatar {
    margin-right: 16px;
    cursor: pointer;
}
/*Texto del perfil */
.text-perfil {
    font-size: 12px;
}
/*estilos especificos*/
.text-perfil-1 {
    font-size: 14px;
}
/*Contenedor de los textos del perfil */
.perfil-text {
    display: flex;
    flex-direction: column;
}
.Avatar {
    cursor: pointer;
}

.icon {
    height: 20.5px;
    width: 20.5px;
    cursor: pointer;
}
</style>