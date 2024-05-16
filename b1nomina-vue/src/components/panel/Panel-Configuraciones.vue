<template>
    <div class="panel-config">
        <CardLink 
            Titulo="Datos de la Empresa"
            -descripcion="Acá puedes editar la información básica de la empresa."
            -ruta-name="datos-de-la-empresa"
        />
        <CardLink 
            Titulo="Datos Previsionales"
            -descripcion="Edita la configuración de todos los cálculos previsionales de tu empresa."
            -ruta-name="datos-previsionales"
        />
        <CardLink 
            Titulo="Periodos"
            -descripcion="Crea y habilita los periodos en los que manejaras los eventos en B1 Nómina."
            -ruta-name="periodos"
        />
        <CardLink 
            Titulo="Centralización"
            -descripcion="Configura aquí los conceptos contables de tu centro de costos y otras propiedades."
            -ruta-name="centralizacion"
        />
        <CardLink 
            Titulo="Gestión de Usuarios"
            -descripcion="Administra el perfil de los usuarios que hacen vida en B1 Nómina."
            -ruta-name="gestion-usuarios"
        />
        <CardLink 
            Titulo="Parámetros de conexión"
            -descripcion="Edita las distintas rutas y parámetros de conexión con la plataforma. "
            -ruta-name="parametros-conexion"
        />
        <CardLink 
            Titulo="Base de Eventos"
            -descripcion="Añade y modifica los distintos parámetros bases para eventos previsionales. "
            -ruta-name="base-eventos"
        />
        <CardLink 
            Titulo="Historial de Acciones"
            -descripcion="Ver los cambios y operaciones que se han realizado en tu empresa."
            -ruta-name="historial-acciones"
        />
        <CardLink 
            Titulo="Alertas"
            -descripcion="Configura una alerta global para hacer énfasis en ciertos eventos"
            -ruta-name="alertas"
        />
    </div>
</template>

<script setup>
    import CardLink from '@/components/elementos/Card-Link.vue'
    import { inject } from 'vue';

    // Accede a la función proporcionada por el componente padre
const CambiarNombreRuta = inject('CambiarNombreRuta');
// Llama a la función para enviar información al componente padre
CambiarNombreRuta('');

</script>

<style scoped>
/* 
 Contenedor principal del formulario de empleados, configurado para ocupar todo el espacio disponible
 y organizar sus elementos en una columna. El uso de 'display: flex' y 'flex-direction: column' permite
 una disposición flexible y ordenada de los elementos del formulario.
*/
div.panel-config {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    gap:24px; /* Espaciado entre los elementos del formulario para mejorar la legibilidad */
    flex-wrap: wrap;
    align-self: center;
    justify-content: space-evenly;
}
</style>