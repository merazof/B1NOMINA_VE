<template>
    <span class="mensajeW" aria-live="polite">
       Error con el servidor, Disculpe las molestias
    </span>
</template>

<style scoped>
.mensajeW {
    color: #ffc107;
    font-size: 16px;
    width: 100%;
    text-align: center;
    transition: opacity 0.3s ease-in-out;
}

/* Opcional: Agrega una animación de desvanecimiento */
.mensajeW.appear {
    animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
}
</style>
