<template>
    <tr class="rowTabla cuerpo">
        <!--Fecha y Hora-->
        <td class="time">
            <span>
                <slot name="FechaHora"></slot>
            </span>                    
        </td>
        <!--Nombre Usuario-->
        <td class="nombreUsuario">
            <span>
                <slot name="NombreUsuario"></slot>
            </span>
        </td>
        <!--ROL-->
        <td class="rol">
            <span class="cargo">
                <slot name="cargo"></slot>
            </span>
        </td>
        <!--Detalle-->
        <td class="detalle">
            <span>
                <slot name="Detalle"></slot>
            </span>
        </td>
        <!--Valor-->
        <td class="monto">
            <span class="monto">
                <slot name="monto"></slot>
            </span>                    
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

/* Estilos para cada celda de la tabla */
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
    text-align: center;
}



</style>