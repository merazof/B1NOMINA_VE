<template>
    <router-link :to="{name: direccion}">
        <!--Icono-->
        <slot name="default">

        </slot>
        <!--Icono-->
        {{ text }}
    </router-link>
</template>

<script>
export default {
    name: 'Not-Fount',
    props: [
        'text',
        'direccion',
    ]
}
</script>

<style scoped>
a { 
    width: 187px;
    height: 39px;


    background: white;
    box-shadow: 0px 0.9615941643714905px 1.923188328742981px rgba(16, 24, 40, 0.05);
    border-radius: 6px;
    overflow: hidden;
    border: 1px #002E99 solid;
    justify-content: center;
    align-items: center;
    gap: 7.69px; 
    display: inline-flex;

    /*estilos de fuente */
    color: #002E99;
    font-size: 13.46px;
    font-family: poppins;
    font-weight: 500;
    line-height: 19.23px;
    word-wrap: break-word;
}
</style>