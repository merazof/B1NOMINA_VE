<template>
    <transition name="fade">
        <div class="box-conted">
            <slot name="opcion1">

            </slot>
            <slot name="opcion2">

            </slot>
            <slot name="opcion3">

            </slot>
            <slot name="opcion4">

            </slot>
            <slot name="opcion5">

            </slot>
        </div>
    </transition>

</template>

<script>
export default {
    name: "ListaOpciones"
}
</script>

<style scoped>
div.box-conted {
  position: absolute; /* O puedes usar 'absolute' si es un elemento hijo posicionado de manera absoluta */
  top:  15rem; /* Ajusta el valor de 'top' según sea necesario */
  right:  1.25rem; /* Ajusta el valor de 'right' según sea necesario */
  height: fit-content;
  max-height:  700px;
  max-width:  535px;
  min-width:  535px;
  box-sizing: border-box;
  background: #ffffff;
  padding:  24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index:  100; /* Asegúrate de que este valor sea mayor que el de otros elementos para que se muestre por encima */
  box-shadow:  0px  0px  10px  0px rgba(0,  0,  0,  0.25);
  border-radius:  6px;
  gap:  12px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity  0.3s;
}
.fade-enter, .fade-leave-to {
  opacity:  0;
}
</style>