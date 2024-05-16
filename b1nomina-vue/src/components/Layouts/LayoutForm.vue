<template>
    <div class="contenedor">
        
        <div class="cabecera">
            <slot name="cabecera">

            </slot>
        </div>
        <div class="formulario">
            <slot name="formulario">
       
            </slot>
        </div>
    </div>
</template>

<style scoped>
div.contenedor{
    gap: 24px;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;

}

div.cabecera {
    display: flex;
    flex-direction: row;
    gap: 36px;
    align-items: center;

    width: 100%; 
    height: 49px; 
    background: #F8F9FA; 
    border-radius: 6px; 
    border: 1px #CDE0F1 solid;
    padding: 0px 24px;
    box-sizing: border-box;
    
}

div.formulario {
    width: 100%;
    
}

</style>