<template>
    <div class="notificatioButton-contend">
        <slot name="direccion">

        </slot>
    </div>
</template>

<script>
export default {
    name: 'Notification-button'
}
</script>

<style>

/* Estilos para el contenedor de notificación */
div.notificatioButton-contend {
    display: flex;     /* Uso de flexbox para alinear elementos horizontalmente */
    align-items: center; /* Alineación vertical de los elementos en el centro */
    padding: 14px; /* Espaciado interno alrededor del contenido */
    cursor: pointer; /* Cambia el cursor a puntero al pasar sobre el elemento */
    margin-bottom: 1px; /* Espaciado externo en la parte inferior */
    font-size: 1.1rem; /* Tamaño de fuente para el texto */
    font-size: 16px; /* Asegurando el tamaño de fuente específico */
    gap: 6px; /* Espaciado entre elementos flexibles */
    justify-content: space-between; /* Distribuye el espacio entre los elementos */
}

/* Cambio de color de fondo al pasar el cursor sobre los elementos dentro de .options */
.options div:hover {
    background-color: #1A2771; /* Color de fondo al pasar el cursor */
    transition: all 0.3s ease-in-out; /* Suaviza la transición del cambio de color */
}

/* Estilos para los enlaces dentro del contenedor de notificación */
.notificatioButton-contend > a {
    width: 100%; /* Ancho completo del contenedor padre */
    display: flex; /* Uso de flexbox para alinear elementos */
    gap: 8px; /* Espaciado entre elementos flexibles */

    /* Asegurando que los elementos se alineen en el centro y ocupen el 100% de la altura */
    align-items: center;
    height: 100%;
}

/* Estilos para los elementos span dentro de los enlaces */
.notificatioButton-contend > a > span {
    display: none; /* Oculta el elemento span */
    align-items: center; /* Alineación vertical de los elementos */
    justify-content: space-between; /* Distribuye el espacio entre los elementos */
    width: 100%; /* Ancho completo del contenedor padre */
}

</style>
