<template>
    
    <form class="formulario" id="ActualizarPuesto" @submit.prevent="Enviar">
        <h2 class="titulo-form">Puesto de trabajo</h2>

        <div class="row-form">
            <LayoutInputLineal textLabel="Sede de Trabajo" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="SedeDeTrabajo" 
                        :options="parametros?.sede" 
                        :requerido="RequiereActualizar"
                        :preseleccion="SedeDeTrabajo"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Departamento" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Departamento" 
                        :options="parametros?.departamentos" 
                        :requerido="RequiereActualizar"
                        :preseleccion="Departamento"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <LayoutInputLineal textLabel="Cargo" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Cargo" 
                        :options="parametros?.cargos" 
                        :requerido="RequiereActualizar"
                        :preseleccion="Cargo"
                        optionsSelected="Seleccionar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Grupo" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal  
                        v-model="Grupo" 
                        :options="parametros?.grupos" 
                        :requerido="RequiereActualizar"
                        :preseleccion="Grupo"
                        optionsSelected="Sin Asignar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Modalidad" :requerido="RequiereActualizar">
                <template v-slot>
                    <InterruptorButton 
                        @ValorEstado="verEstado"
                        Objid="Teletrabajo"
                        Texto="Teletrabajo"
                        Tipo="individual"
                        :Estado="(EstatusModalidad)? true :false"
                        :requerido="RequiereActualizar"
                    />
                </template>
            </LayoutInputLineal>
        </div>
    </form>
</template>

<script setup>
    import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
    import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
    import InterruptorButton from '@/components/inputs/Interruptor-button.vue';
   
    
    import {reactive, ref, watch, inject, onMounted, defineEmits} from 'vue';

    import peticiones from '@/peticiones/p_empleado';
    
    const DatosUsuario = reactive(inject('dataEmpleado'))
    const parametros = reactive(inject('parametros'))
    const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));

    const RequiereActualizar = ref(false);

    const SedeDeTrabajo = ref('');
    const Departamento = ref('');
    const Cargo = ref('');
    const Grupo = ref('');
    const Modalidad = ref('');
    const EstatusModalidad = ref(false);


    // payload de las peticiones
    const payload = reactive({
        sede_id: '',
        departamento_id: '',
        cargo_id: '',    
        grupo_id: '',
        modalidad: '',
    });

    // payload de las peticiones
    const payload_old = reactive({
        sede_id: '',
        departamento_id: '',
        cargo_id: '',    
        grupo_id: '',
        modalidad: '',
    });

    const verEstado = (valor) => {
    (valor == true)
        ? Modalidad.value = 1
        : Modalidad.value = 0
}

/**
 * Actualiza el valor de una propiedad específica dentro del objeto 'payload'.
 *
 * @param {string} propiedad - El nombre de la propiedad a actualizar en el objeto 'payload'.
 * @param {any} valor - El nuevo valor que se asignará a la propiedad especificada.
 *
 * @example
 * // 'payload' es un objeto con una estructura predefinida.
 * const payload = {
 *   nombre: '',
 *   edad: 0
 * };
 *
 * // Llamando a ActualizarPayload para cambiar el nombre.
 * ActualizarPayload('nombre', variable);
 *
 * // Ahora, 'payload' se verá así:
 * // {
 * //   nombre: 'Pedro',
 * //   edad: 30
 * // }
 */
 const ActualizarPayload = (propiedad, valor) => {
  // Asigna el nuevo valor a la propiedad especificada dentro del objeto 'payload'.
  payload[propiedad] = valor;
  
  verificarCambios();

};

// Define la función verificarCambios que verifica si hay cambios entre los valores antiguos y nuevos de un payload.
const verificarCambios = () => {
    // Comprueba si todos los campos relevantes en payload_old y payload son iguales.
    // Utiliza Object.keys para obtener las claves de ambos objetos y compara sus valores.
    const camposIguales = Object.keys(payload_old).every( key => payload_old[key] == payload[key]);
    
    
    // Verifica si al menos uno de los valores en el nuevo payload no es una cadena vacía.
    const alMenosUnValorVacio = Object.values(payload).some(value => value == '');

    // Si todos los campos son iguales y al menos uno de los valores no es una cadena vacía,
    // establece RequiereActualizar.value en false, indicando que no se requiere actualización.
    // De lo contrario, establece RequiereActualizar.value en true, indicando que se requiere actualización.
    RequiereActualizar.value = !(camposIguales && alMenosUnValorVacio);
}

    
    watch(SedeDeTrabajo, (nuevoValor) => ActualizarPayload('sede_id', nuevoValor));
    watch(Departamento, (nuevoValor) => ActualizarPayload('departamento_id', nuevoValor));
    watch(Cargo, (nuevoValor) => ActualizarPayload('cargo_id', nuevoValor));
    watch(Grupo, (nuevoValor) => ActualizarPayload('grupo_id', nuevoValor));
    watch(Modalidad, (nuevoValor) => ActualizarPayload('modalidad', nuevoValor));
    
    watch(DatosUsuario, (nuevaInfo) => {
        MostrarValores(nuevaInfo)
    })
    
    const MostrarValores = (DATA) => {
        // Asigna el valor de DATA?.documento a numeroDocumento.value, utilizando '' si DATA?.documento es null.
        RequiereActualizar.value = false;

        SedeDeTrabajo.value = (DATA?.sede_id == null)? '' : Number(DATA?.sede_id);
        payload_old.sede_id = Number(DATA?.sede_id) ?? '';
        payload.sede_id = Number(DATA?.sede_id) ?? '';

        Departamento.value = (DATA?.departamento_id == null)? '' :DATA?.departamento_id;
        payload_old.departamento_id = DATA?.departamento_id ?? '';
        payload.departamento_id = DATA?.departamento_id ?? '';

        Cargo.value = (DATA?.cargo_id == null)? '' :Number(DATA?.cargo_id);
        payload_old.cargo_id = Number(DATA?.cargo_id) ?? '';
        payload.cargo_id = Number(DATA?.cargo_id) ?? '';

        Grupo.value = (DATA?.grupo_id == null)? '' :DATA?.grupo_id;
        payload_old.grupo_id = DATA?.grupo_id ?? '';
        payload.grupo_id = DATA?.grupo_id ?? '';

        Modalidad.value = (DATA?.modalidad == null)? '' : Number(DATA?.modalidad);
        payload_old.modalidad = Number(DATA?.modalidad) ?? '0';
        payload.modalidad = Number(DATA?.modalidad) ?? '0';

        EstatusModalidad.value = (DATA?.modalidad == 0) ? false : true;
    }

    onMounted(() => {
        MostrarValores(DatosUsuario.value);
    })

    const emit = defineEmits([
        'respuestaServidor',
    ]);

/**
 * Funcion emitida al enviar el formulario
 * @params payload Contiene los datos que se pasaran
 * Ejecuta la peticion con axios
 */
 const Enviar = async () => {
  //si ID es nulo crea un usuario
 

  if (RequiereActualizar.value == true) {
    const respuesta = await peticiones.ActualizarPuesto(DatosUsuario.value?.user_id, ID_USERMASTER, payload);
    if(respuesta.success == true){
       emit('respuestaServidor', {'texto':respuesta?.data?.message, 'valor':true})
    } else {
        emit('respuestaServidor', {'texto':respuesta?.error?.message, 'valor':false})
    }

  } else {

    emit('respuestaServidor', {'texto': "No se requiere actualizar", 'valor':true});
  }
};

</script>


<style scoped>
/* Establece el diseño de la fila del formulario, 
usando flexbox para alinear elementos en filas y 
espaciarlos uniformemente */
div.row-form {
    display: flex;
    flex-direction: row;
    gap:24px;
    width:  100%;
    align-items: center;
    justify-content: space-between;
}

/* Define el estilo del formulario, utilizando 
flexbox para organizar los elementos en una 
columna con un espacio de  16px entre ellos */
form.formulario {
    display: flex;
    flex-direction: column;
    gap:  16px
}

/* Contenedor para elementos multimedia, organizados 
en columnas con un espacio de  12px entre ellos */
div.multimedia {
    display: flex;
    flex-direction: column;
    gap:  12px;
}

/* Estilo para el botón de añadir una foto, con bordes 
y un padding específico para un mejor aspecto visual */
div.multimedia div.add-photo{
    border-radius:  6px;
    border:  0.5px #363855 dashed;
    border-width:  5px;
    box-sizing: border-box;
    padding:  12px  48px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:  100%;
    height: fit-content;
}

/* Estilo para el título del formulario, asegurando que el texto sea legible y estéticamente agradable */
h2.titulo-form {
    margin:  0px;
    color: #1A2771;  
    font-size:  22px;  
    font-family: Poppins;  
    font-weight:  500;  
    line-height:  32px;  
    word-wrap: break-word;
}


</style>

