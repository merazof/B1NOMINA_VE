<template>
    <!--Contenedor General-->
    <div class="actions-fondo">
        <div class="actions-box">
            <!--espacio para el logo-->
            <div class="box-contend-logo">
                <Logo />
            </div>

            <!--texto frontal-->
            <div class="box-contend-text">
                <h1>Inicio de sesión</h1>
                <span>Es un gusto tenerte de vuelta</span>
            </div>
            <!--Componente con validacion de input-->
            <div>
                <FormularioLogin />
            </div>

            <!--Texto Posterior-->
            <div class="box-contend-footer">
                <p>¿No tienes cuenta?<a href="">Solicita una prueba</a></p>
                <!--Componente con link a pagina oficial-->
                <Copyright />
            </div>
        </div>
    </div>
</template>

<script setup>
//Componentes
import Copyright from '@/components/CopyRight.vue';
import Logo from '@/components/logos/Logo-box.vue';
import FormularioLogin from '@/components/formularios/Form-login.vue';

</script>

<style scoped>
.actions-fondo {
    background-color: rgb(255, 255, 255);
    height: 100%;
    min-width: auto;
    
    display: flex;
    justify-content: center;
    align-self: center;
    align-items: center;

}

.actions-fondo .actions-box{
    width: 70%;
}

div.actions-box {
    background-color:none;
    height: fit-content;
    max-width: 480px;
}

.actions-box .box-contend-text > h1 {
    color: black;
    font-size: 40px;
    font-family: "Poppins-Bold",Helvetica;
    font-weight: 500;
    word-wrap: break-word;
    margin-bottom: 24px;
}

.actions-box .box-contend-text > span {
    color: #333333;
    font-size: 22px;
    font-family: "Poppins-Bold",Helvetica;
    font-weight: 400;
    word-wrap: break-word
}

.actions-box .box-contend-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}

.actions-box .box-contend-logo {
    display: flex;
    justify-content: center;
    padding: 0 5px;
    margin-bottom: 48px;
}
</style>