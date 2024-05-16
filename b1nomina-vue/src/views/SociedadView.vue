<!-- Plantilla -->
<template>
    <!-- Contenedor principal de la vista de sociedad -->
    <div class="sociedadView-fondo">
        <!-- Cuerpo de la vista de sociedad con título y texto descriptivo -->
        <div class="sociedadView-fondo-body">
            <h1 class="titulo-sociedadview">Te damos la bienvenida</h1>
            <article>
                <p class="text-sociedadview">
                    Con los perfiles de B1 Nómina, puedes separar todas tus sociedades y configurar tus nóminas, empleados y eventos de forma individual.
                </p>
            </article>
        </div>
        <!-- Lista de sociedades solo visible si el usuario está autorizado -->
        <listaSociedades v-if="autorizado" :sociedades="SociedadesAccesibles"/> 
    </div> 
</template>

<!-- Configuración del script -->
<script>
    // Importa axios para realizar peticiones HTTP
    import axios from 'axios';
    // Importa defineAsyncComponent de Vue para cargar componentes de manera asíncrona
    import { defineAsyncComponent } from 'vue';

    export default {
        // Componentes registrados en el componente
        components:{
            listaSociedades: defineAsyncComponent(()=> new Promise(
                (resolve) => {
                    setTimeout(
                        () => {
                            resolve(import("@/components/listas/Lista-sociedades.vue"))
                        }, 1000//tiempo de carga
                    )
                }
            ))
        },
        // Datos reactivos del componente
        data() {
            return {
                // Data de las sociedades accesibles
                SociedadesAccesibles: [{}],
                // Estado de autorización del usuario
                autorizado: {
                    type: Boolean,
                    default: false
                }
            }
        },
        // Métodos del componente
        methods: {
            // Valida el token del usuario
            async validateToken(TOKEN) {
                await axios.post(`/validate?token=${TOKEN}`)
               .then(respuesta => {
                    // Si el usuario está autorizado, devuelve verdadero
                    if (respuesta.status==201 || respuesta.status==202){
                        return true
                    }
                })
                // Captura el error
               .catch(error => {
                    return false
                })
            },
            // Solicita las sociedades a las que puede acceder el usuario por su ID
            async solicitarSociedad() {
                await axios.get('/list_sociedad')
               .then(res => {
                    this.SociedadesAccesibles = res.data
                })
               .catch(error => {
                    // Recarga la página si la petición falla
                    if (error.status == 403){
                        location.reload();
                    } else {
                        console.log(error + ' peticion de datos');
                    }
                })
            }
        }, 
        // Ciclo de vida del componente
        async mounted() {
            // Verifica el token y si es válido
            if(localStorage.getItem('token')!= null && this.validateToken(`${localStorage.getItem('token')}`)){
                this.autorizado = true;
                this.solicitarSociedad()
            } else {
                // Elimina el token y redirige al usuario a la página de login
                this.autorizado = false;
                this.$router.push("login");
            }
        },
    }
</script>

<!-- Estilos CSS -->
<style scope>
    /* Estilos generales para el fondo de la vista de sociedad */
    div.sociedadView-fondo {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #E3F5FF;
        align-content: center;
        align-items: center;
    }

    /* Estilos para el cuerpo de la vista de sociedad */
    div.sociedadView-fondo.sociedadView-fondo-body {
        align-items: center;
    }

    /* Estilos para el título de la vista de sociedad */
    h1.titulo-sociedadview {
        text-align: center;
        color: #1A245B;
        font-size: 32px;
        font-family: Poppins;
        font-weight: 500;
        word-wrap: break-word;
    }

    /* Estilos para el texto descriptivo de la vista de sociedad */
    article.text-sociedadview {
        text-align: center;
        color: #333333;
        font-size: 18px;
        font-family: Poppins;
        font-weight: 400;
        word-wrap: break-word;
        max-width: 800px;
    }

    /* Estilos para el contenedor de tarjetas de sociedades (no aplicado en el código proporcionado) */
    div.sociedadView-fondo-cards{
        display: flex;
        justify-content: space-between;
    }
</style>
