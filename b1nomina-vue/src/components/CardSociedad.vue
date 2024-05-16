<template>
    <div class="cardsociedad" :id="`card${id}`">
        <div class="cardsociedad-body">
            <h3 class="cardsociedad-titulo titulo">
                {{ name }}
            </h3>
            <img class="cardAvatar" src="../components/icons/svg/Avatar-svg-icon.svg" alt="ICON sociedad">
            <router-link class="cardsociedad-button" :to="`/sociedad/${id}/`" @click="() => almacen.updatedSociedadID(id)">
                    Selecionar
            </router-link>
        </div>
    </div>
</template>

<script setup>
import almacen from '@/store/almacen.js';
import {defineProps} from 'vue';

const props = defineProps({
    name: {String},
    //ID de la sociedad
    id : {
        Number,
        default: null,
    },
    //icono de la sociedad
    icon : {
        String,
        default: '@/icons/svg/Avatar-svg-icon.svg'
        }
});
</script>

<style scoped>
/* estilos de la targeta principal*/
div.cardsociedad {
    padding: 48px; 
    background: white; 
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25); 
    border-radius: 6px; 
    border: 1px #363855 solid;
    flex-direction: column;
    justify-content: center;
    align-items: flex;
    display: inline-flex;
    width: 220px;
    height: 200px;
    margin: 24px;
}

.cardsociedad-body {
    max-width: 220px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
}

.cardsociedad > h3.cardsociedad-titulo {
    color: black;
    font-size: 24px;
    font-weight: 500;
    line-height: 34px;
    word-wrap: break-word;
    margin: 0;
    height: 34px;
    align-items: center;
}

.cardsociedad-button{
    width: 160px;
    height: 50px;

    background: #1A2771;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    gap: 12px;
    display: inline-flex;

    /* tipografia*/
    color: #F8F8F8;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
    text-decoration:none;
}

.cardsociedad-button:hover {
    background: #1a34b6;
}
img.cardAvatar {
    width: 96px;
    height: 96px;
}

.titulo {
    margin: 0;
}

</style>