<template>
   <div class="card">
    
        <h3>{{ Titulo }}</h3>

        <p>{{Descripcion}}</p>

        <div class="contend-button">
            <router-link class="card-button" :to="{name: RutaName}">
                <div>
                    <EditIcon Stroke="Black"/>
                    <span>Editar</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import EditIcon from '@/components/icons/Edit-icon.vue';

const props = defineProps({
    Titulo: {
        type: String,
        default: "Titulo de la Carta"
    },
    Descripcion: {
        type: String,
        default: "Descripcion de la Carta"
    },
    RutaName: {
        type: String,
        default: " "
    }
});


</script>

<style scoped>
.card {
    width:26rem;
    height: 10rem;
    padding: 24px;
    gap: 14px;
    border-radius: 6px;
    opacity: 0px;
    box-shadow: 0px 0px 10px 0px #00000040;
    display: flex;
    flex-direction: column;
    
}

h3 {
    color: black;
    font-size: 26px;
    font-weight: 500;
    line-height: 34px;
    word-wrap: break-word;
    margin: 0 ;
}

p {
    color: black;
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;
    margin: 0;
}

.contend-button {
    display: flex;
    width: 100%;
    justify-content: end;
}

.card-button {
    width: fit-content;
    text-decoration: none;
}



.card-button > div {
    display: flex;
    gap: 6px;
    padding: 12px 0px;
    align-self: center;
    box-sizing: border-box;    
}

.card-button > div > span {
    
    color: #344054;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    word-wrap: break-word;

}
</style>