<template>
    <LayoutPanel>
        <template #cabecera>
            <Headervue nombrePagina="No Encontrado" />
        </template>
        <template #panel>
            <div class="contenedor-NotFound">
                <div class="Contenedor-imagen">
                    <img src="../components/icons/svg/404-pages 1.svg">
                </div>
                <div class="contenedor-text">
                    <h2>LO SENTIMOS, PÁGINA NO ENCONTRADA</h2>
                    <p>La página que está buscando se movió, quitó, renombró o podría no existir nunca</p>

                    <RedirecButton  text="Volver al Dasboard" direccion="dashboard">
                        <template #default>
                            <CuboIcon />
                        </template>
                    </RedirecButton>

                </div>
            </div>
        </template>
    </LayoutPanel>

    

</template>

<script setup>
import RedirecButton from '@/components/botones/Redirec-button.vue'
import CuboIcon from './icons/Cubo-icon.vue';

import Headervue from '@/components/Header.vue';
import LayoutPanel from '@/components/Layouts/LayoutPanel.vue';
</script>

<style scoped>
div.contenedor-NotFound {
    width: 100%;
    height: 100%;
    padding: 24px;
    background: #EDF6FF;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    justify-content: center;
    align-items: center;
    gap: 12px;
    display: flex;
    
}
div.contenedor-text {
    display: flex;
    flex-direction: column;
    
}

</style>