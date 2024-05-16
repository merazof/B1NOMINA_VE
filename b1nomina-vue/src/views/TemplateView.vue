<template>
    <!--Componente de acomodo de datos-->
    <LayoutCore>
        <template #nav>
            <NavegadorVue />                 
        </template>
        <!--Componente que contiene la pagina que se muestra segun la ruta navegada-->
        <template #body>
            <RouterView />
        </template>
        <!--Mantiene el navegador del lado derecho de la vista principal de la ruta-->
        
    </LayoutCore>
</template>

<script>
//importar componentes
import NavegadorVue from '@/components/Navegador.vue';
import LayoutCore from '@/components/Layouts/LayoutCore.vue';
import axios from 'axios';

export default {
    //componentes utilizados
    components: {
        NavegadorVue,
        LayoutCore,
    },
    //al montar el componente
    async mounted() {
        //si el token existe y la validacion en TRUE
        ((localStorage.getItem('token') != null) && (this.validateToken(`${localStorage.getItem('token')}`))) ? this.$router.isReady : this.$router.push("/login")
         //eliminar el token generado y enviar al login

    },
    //metodos
    methods: {
        // funcion para realizar peticion y valiodar el token  optenido
        async validateToken(TOKEN) {
            await axios.post(`/validate?token=${TOKEN}`)
            .then(respuesta => {
                //si es authorizado devuelve verdadero
                if (respuesta.status==201 || respuesta.status==202){
                    return true
                }
            })
            //captura el error
            .catch( error => {
                console.log(error + " error de validacion")
                return false
                
            })
        }
    }, 
}
</script>
