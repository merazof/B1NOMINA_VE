<!-- Plantilla -->
<template>
    <!-- Sección principal de la página -->
    <main>
        <!-- Sección de inicio de sesión con dos áreas principales: información y acciones -->
        <section class="login-section">
            <!-- Área para mostrar información de inicio de sesión -->
            <div class="login-box info">
                <!-- Componente InfoLogin para mostrar detalles de inicio de sesión -->
                <InfoLogin />
            </div>

            <!-- Área para contener acciones de inicio de sesión -->
            <div class="contend-actionsLogin">
                <!-- Área para mostrar acciones de inicio de sesión -->
                <div class="login-box">
                    <!-- Componente ActionsLogin para mostrar opciones de acción durante el inicio de sesión -->
                    <ActionsLogin/>
                </div> 
            </div>
        </section>
    </main>
</template>

<!-- Configuración del script -->
<script setup>
    // Importa el componente InfoLogin para mostrar detalles de inicio de sesión
    import InfoLogin from '@/components/InfoLogin.vue';
    // Importa el componente ActionsLogin para mostrar opciones de acción durante el inicio de sesión
    import ActionsLogin from '@/components/ActionsLogin.vue'
</script>

<!-- Estilos CSS -->
<style scoped>
    /* Estilo para la sección de inicio de sesión, dispone los elementos en fila y centra verticalmente */
   .login-section {
        display: flex;
        flex-direction: row;
        height: 100vh;
        width: auto;
        align-items: center;
    }

    /* Estilo para el contenedor de acciones de inicio de sesión, centra su contenido y ocupa todo el ancho */
    div.contend-actionsLogin {
        width: 100%;
        justify-content: center;
        display: flex;
    }

    /* Estilo para los boxes de inicio de sesión, centra su contenido y tiene un ancho específico */
   .login-box {
        justify-content: center;
        width: 70%;
        height: 100vh;
    }

    /* Media query para adaptar el diseño en pantallas pequeñas */
    @media (max-width: 960px) {
        /* Oculta el box de información en pantallas pequeñas */
       .info {
            display: none;
        }

        /* Ajusta el ancho del contenedor de acciones de inicio de sesión y hace que el box de inicio de sesión tenga un ancho máximo */
       .contend-actionsLogin {
            width: 100%;
        }
       .login-box {
            max-width: 430px;
        }
    }

    /* Repetición de media query para asegurar la consistencia en el diseño */
    @media (max-width: 960px) {
        /* Oculta el box de información en pantallas pequeñas */
       .info {
            display: none;
        }

        /* Ajusta el ancho del contenedor de acciones de inicio de sesión y hace que el box de inicio de sesión ocupe todo el ancho */
       .contend-actionsLogin {
            width: 100%;
        }
       .login-box {
            width: 100%;
        }
    }
</style>
