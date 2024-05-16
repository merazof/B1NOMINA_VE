<template>
    <div class="contend">
        <slot name="imagen">

        </slot>
        <div class="contenido">
            <slot name="contenido">

            </slot>
        </div>
    </div>
</template>

<style scoped>
div.contend {
    width: Fixed (1,277px)px;
    height: Fixed (305px)px;
    padding: 60px 24px;
    gap: 24px;
    opacity: 0px;
    background: #EDF6FF;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px 0px #00000040;
    display: flex;
    justify-content: center;
    border-radius: 6px;
}
div.contenido {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    gap: 24px ;
    align-self: center;
}
</style>