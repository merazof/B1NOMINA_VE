<template>
    <!-- Define el contenedor principal del componente Vue. -->
    <div class="contend">
        <!-- Utiliza un slot para permitir la inserción de contenido personalizado desde el componente padre. -->
        <slot></slot>
    </div>
</template>

<style scoped>
/* Define estilos para el div que contiene el slot. */
div.contend {
    /* Establece el ancho del div al 100% del contenedor padre. */
    width: 100%;
    /* Ajusta la altura del div al contenido que contiene. */
    height: fit-content;
    /* Aplica un padding de 24px alrededor del contenido del div. */
    padding: 24px;
    /* Asegura que el padding se incluya en el ancho y altura del div. */
    box-sizing: border-box;
    /* Habilita el diseño flexbox para el div, permitiendo un control flexible del layout de sus hijos. */
    display: flex;
    /* Define un espacio de 12px entre los elementos flexibles dentro del div. */
    gap:12px;
    /* Aplica un borde redondeado de 6px al div. */
    border-radius: 6px;
    /* Establece la opacidad del div a 0, lo que hace que sea completamente transparente. */
    opacity: 0px;
    /* Define el color de fondo del div como blanco. */
    background: #FFFFFF;
    /* Aplica un borde sólido de 1px con el color #1A245B al div. */
    border: 2px solid #1A245B;
    /* Alinea los elementos flexibles dentro del div al centro. */
    justify-content: center;
}
</style>
