<template>

<div class="contend-button">
    <button  class="submit-button">
        {{Text}}
    </button >
</div>
    
</template>

<script>
export default {
    name: 'SubmitButton',
    props:[
        'Text',
    ],
}
</script>

<style scoped>

div.contend-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
}


/*estilos del boton*/
button.submit-button {
    width: 100%; 
    height: 100%; 
    padding-top: 13px; 
    padding-bottom: 13px; 
    background: #002E99; 
    box-shadow: 0px 4px 26px rgba(0, 0, 0, 0.25); 
    border-radius: 3px; 
    justify-content: center; 
    align-items: center; 
    gap: 10px; 
    display: inline-flex;
    margin: 0px 6px;
    box-sizing: border-box;

    /*Estilo del texto*/
    color: white;
    font-size: 17px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: "break-word";
    cursor: pointer;
}
</style>