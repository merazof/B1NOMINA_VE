<template>
    <span class="mensajeE" aria-live="polite">
        Usuario o Contraseña inválidos
    </span>
</template>

<style scoped>
.mensajeE {
    color: #DC3545;
    font-size: 16px;
    width: 100%;
    text-align: center;
    transition: opacity 0.3s ease-in-out;
}

/* Opcional: Agrega una animación de desvanecimiento */
.mensajeE.appear {
    animation: fadeIn 0.5s forwards;
}

@keyframes fadeIn {
    from {opacity: 0;}
    to {opacity: 1;}
}
</style>
