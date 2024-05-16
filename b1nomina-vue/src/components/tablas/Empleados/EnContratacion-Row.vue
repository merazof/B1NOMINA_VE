<template>
    <tr class="rowTabla cuerpo">
        <!--Nombre y apelidos-->
        <td class="rowNombre">
            <span>
                <slot name="Prospecto"></slot>
            </span>                    
        </td>
        <!--Rut-->
        <td class="">
            <span>
                <slot name="rut"></slot>
            </span>
        </td>
        <!--CV hoja de vida-->
        <td class="">
            <div>
                <slot name="CV"></slot>
            </div>
        </td>
        <!--Contrato-->
        <td class="contrato">
            <div>
                <slot name="Contrato"></slot>
            </div>
        </td>
        <!--Estado-->
        <td class="Estado">
            <div>
                <slot name="Completado"></slot>
            </div>                    
        </td>
        <!--Acciones-->
        <td class="acciones">
            <div>
                <slot name="accionButton"></slot>
            </div>
        </td>
    </tr>
</template>

<style scoped>

td {
 word-break: break-word;
 white-space: nowrap;
}

/**
 * Estilos para el cuerpo de la tabla
 * Define la altura de las filas y utiliza Flexbox para organizar el contenido
 */

 tr.cuerpo {
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-self: end;
}

/**
 * Estilo general para las filas de la tabla
 * Define la altura y el ancho de las filas
 */

tr.rowTabla {
    width: 100%;
    box-sizing: content-box;
    height: 48px;
    display: table-row;
}

/* 
* Estilos para cada celda de la tabla 
*/

tr.cuerpo > td {
    width: auto; /* Ancho automático basado en el contenido */
    height: 48px;
    background: none; /* Sin fondo para una apariencia limpia */
    box-sizing: border-box; /* Para incluir padding y borde en el ancho total */
    padding: 12px; /* Espacio interno para mejorar la legibilidad */
    border:#FCFCFD; /* Borde superior para separar las filas */
    border-bottom: 0.96px #EAECF0 solid;
    align-self: center; /* Centrado verticalmente */
    align-items: center; /* Centrado horizontalmente */
    text-align: center; /* Alineación del texto al centro */
    margin: auto; /* Margen automático para centrar el contenido */
}

/**
 * Estilos para las cajas dentro de los td
 * Alinea el texto al centro el ancho máximo para evitar desbordamientos
 */
td > div {
    text-align: center;
    display: flex;
    justify-content: center;
    max-width: 100%;
}

td.rowNombre > span {
    width: 100%;
    display: flex;
    text-align: start;
}
/* Estilos para la columna de acciones (iconos) */
.acciones > div {
    display: flex;
    gap: 12px; /* Espacio entre iconos */
    justify-content: center; /* Centrado de iconos */
    white-space: nowrap; /* Evita el salto de línea para iconos */
    align-items: center;
}



</style>