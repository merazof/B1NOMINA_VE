<template>    
    <form class="formulario" id="ActualizarContacto" @submit.prevent="Enviar">
        <h2 class="titulo-form">Datos de Contacto</h2>
        <div class="row-form">
            <InputLinealDescripcion
                Placeholder="Ejemplo@gmail.com"
                Titulo="Correo electrónico"
                v-model="email"
                @update:modelValue="email = $event"
                Tipo="email"
                :requerido="true"
                name="CorreoElectronico"
            />
        </div>

        <div class="row-form">

            <InputLinealDescripcion 
                Placeholder="Ingresar Número" 
                Titulo="Teléfono Celular" 
                v-model="telefonoCelular"
                @update:modelValue="telefonoCelular = $event"
                :minimo-caracteres="8"
                :maximo-caracteres="12"
                :requerido="RequiereActualizar"
            />

            <InputLinealDescripcion 
                Placeholder="Ingresar Número" 
                Titulo="Teléfono Local" 
                v-model="telefonoLocal"
                @update:modelValue="telefonoLocal = $event"
                :requerido="RequiereActualizar"
            />
        </div>

        <h4 class="titulo-form">Dirección</h4>
        <div class="row-form">
            <LayoutInputLineal textLabel="Region" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal 
                        v-model="region_id" 
                        :options="parametros.regiones" 
                        :preseleccion="region_id" 
                        optionsSelected="Seleccionar"
                        :requerido="RequiereActualizar"
                    />
                </template>
            </LayoutInputLineal>

            <LayoutInputLineal textLabel="Localidad" :requerido="RequiereActualizar">
                <template v-slot>
                    <ListaTemplateLineal 
                        v-model="comuna_id" 
                        :options="ListaLocalidad" 
                        :preseleccion="comuna_id"
                        optionsSelected="Seleccionar"
                        :requerido="RequiereActualizar"
                    />
                </template>
            </LayoutInputLineal>
        </div>

        <div class="row-form">
            <InputLinealDescripcion 
                Placeholder="Ingresar dirección" 
                Titulo="Direccion" 
                v-model="direccion"
                @update:modelValue="direccion = $event"
                :requerido="RequiereActualizar"
            />
        </div>

        
    </form>
</template>

<script setup>
    import ListaTemplateLineal from '@/components/listas/Lista-template-lineal.vue';
    import LayoutInputLineal from '@/components/Layouts/LayoutInputLineal.vue';
    import InputLinealDescripcion from '@/components/inputs/Input-Lineal-descripcion.vue';

    import {reactive, ref, watch, inject, onMounted, defineEmits} from 'vue';

    import peticiones from '@/peticiones/p_empleado';

    const DatosUsuario = reactive(inject('dataEmpleado'))
    const parametros = reactive(inject('parametros'))
    const ID_USERMASTER = JSON.parse(localStorage.getItem("userId"));


    const RequiereActualizar = ref(false)


const payload = reactive({
    email: "",
    region_id: "",
    comuna_id: "",
    direccion: "",
    movil: "",
    fijo: '',
});

const payload_old = reactive({
    email: "",
    region_id: "",
    comuna_id: "",
    direccion: "",
    movil: "",
    fijo: '',
});




    const ListaLocalidad = ref(''); //Los datos se asignan segun el idRegion

    const email = ref("");
    const region_id = ref('');
    const comuna_id = ref('');
    const direccion = ref('');
    const telefonoCelular = ref('');
    const telefonoLocal = ref('');
    
    watch(email, (nuevoValor) => ActualizarPayload("email", nuevoValor?.toLowerCase()));
    watch(region_id, (nuevoValor) => {
            filtroRegion(nuevoValor);
            ActualizarPayload('region_id', nuevoValor);
        }
    );
    watch(comuna_id, (nuevoValor) => ActualizarPayload('comuna_id', nuevoValor));
    watch(direccion, (nuevoValor) => ActualizarPayload('direccion', nuevoValor));
    watch(telefonoCelular, (nuevoValor) => ActualizarPayload('movil', nuevoValor));
    watch(telefonoLocal, (nuevoValor) => ActualizarPayload('fijo', nuevoValor));

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
    RequiereActualizar.value = !(camposIguales && !alMenosUnValorVacio);
}

const MostrarValores = (DATA) => {

    RequiereActualizar.value = false;
        // Asigna el valor de DATA?.documento a numeroDocumento.value, utilizando '' si DATA?.documento es null.
        email.value = (DATA?.email == null)? '' :DATA?.email;
        payload_old.email = DATA?.email ?? '';
        payload.email = DATA?.email ?? '';

        region_id.value = (DATA?.region_id == null)? '' :DATA?.region_id;
        payload_old.region_id = DATA?.region_id ?? '';
        payload.region_id = DATA?.region_id ?? '';

        comuna_id.value = (DATA?.comuna_id == null)? '' :DATA?.comuna_id;
        payload_old.comuna_id = DATA?.comuna_id ?? '';
        payload.comuna_id = DATA?.comuna_id ?? '';

        direccion.value = (DATA?.direccion == null)? '' :DATA?.direccion;
        payload_old.direccion = DATA?.direccion ?? '';
        payload.direccion = DATA?.direccion ?? '';

        telefonoCelular.value = (DATA?.movil == null)? '' :DATA?.movil;
        payload_old.movil = DATA?.movil ?? '';
        payload.movil = DATA?.movil ?? '';

        telefonoLocal.value = (DATA?.fijo == null)? '' :DATA?.fijo;
        payload_old.fijo = DATA?.fijo ?? '';
        payload.fijo = DATA?.fijo ?? '';

}

    onMounted(() => {
        MostrarValores(DatosUsuario.value)
    })
    
    const emit = defineEmits([
        'respuestaServidor',
    ]);

    //filtra la lista de regiones segun el id
    const filtroRegion = (id) => {
        ListaLocalidad.value = parametros.value?.localidad.filter(item => item.idregion == id)
    };

    const Enviar = async () => {
  //si ID es nulo crea un usuario
 
  if (RequiereActualizar.value == true) {
    const respuesta = await peticiones.ActualizarContacto(DatosUsuario.value?.user_id, ID_USERMASTER, payload);
    if(respuesta.success == true){
       emit('respuestaServidor', {'texto':respuesta?.data?.message, 'valor':true})
    } else {
        console.error(respuesta?.error)
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

h4.titulo-form {
    margin:  0px;
    color: #1A2771;  
    font-size: 18px;
    font-weight: 500;
    line-height: 40px;
    word-wrap: break-word
}


</style>
