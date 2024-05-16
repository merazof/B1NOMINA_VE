<template>
    <form class="formulario">
        <h4>Usuario Master - B1 Nomina</h4>
        <p>
            El usuario master es el principal editor de B1 Nomina, posee todos los privilegios de edición de la plataforma incluyendo el de crear nuevos usuarios. 
        </p>

        <div class="row">
            <InputBorderDescripcion
                Placeholder="Ingresar Nombre de Usuario"
                Titulo="Nombre de Usuario"
                name="Nombre"
                v-model="NombreEmpresa"
                @update:modelValue="NombreEmpresa = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
        
            <InputBorderDescripcion
                Placeholder="Ingresar Rut"
                Titulo="RUT"
                name="Documento"
                v-model="numeroDocumento"
                @update:modelValue="numeroDocumento = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="3"
                :maximo-caracteres="100"
            />
            
            <InputBorderDescripcion
                Placeholder="Ingresar Correo Electrónico "
                Titulo="Correo Electronico"
                v-model="correoEmpresa"
                @update:modelValue="correoEmpresa = $event"
                Tipo="email"
                :requerido="RequiereActualizar"
                name="CorreoElectronico"
            />
        </div>

        <div class="row">
            <InputBorderDescripcion 
                Placeholder="Ingresar Contraseña"
                Titulo="Contraseña"
                name="Contraseña"
                style="width: 33%;"
                -tipo="password"
                v-model="password"
                @update:modelValue="password = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="8"
                :maximo-caracteres="100"
                
            />

            <InputBorderDescripcion 
                Placeholder="Confirmar Contraseña"
                Titulo="Confirmar Contraseña"
                name="confirmarPassword"
                style="width: 33%;"
                -tipo="password"
                v-model="confirmarPassword"
                @update:modelValue="confirmarPassword = $event"
                :requerido="RequiereActualizar"
                :minimo-caracteres="8"
                :maximo-caracteres="100"
            />
        </div>
        <div class="espacioBoto" v-if="RequiereActualizar">
            <TemplateButton text="Actualizar"/>
        </div>
    </form>
</template>

<script setup>
import InputBorderDescripcion from '@/components/inputs/Input-Border-descripcion.vue';
import TemplateButton from '@/components/botones/Template-button.vue';
</script>

<style scoped>

form.formulario {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px
}

h4 {
font-size: 22px;
font-weight: 500;
line-height: 30px;
text-align: left;
margin: 0;
}

div.row {
    display: flex;
    justify-content: flex-start;
    gap:12px;
    box-sizing: border-box;
    height: auto;
}

div.espacioBoto {
    width: 100%;
}

p {
font-size: 16px;
font-weight: 400;
line-height: 26px;
text-align: left;
margin: 0;

}

</style>