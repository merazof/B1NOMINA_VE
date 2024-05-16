<template>
    
    <span class="CantidadNotifiaciones">{{ num }}</span>    
    
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: ['num']
}
</script>

<style scoped>
span.CantidadNotifiaciones {
    padding: 2px 7.8px;
    background: #CDE0F1; 
    border-radius: 4px; 
    flex-direction: column; 
    justify-content: flex-start;
    align-items: flex-start; 
    gap: 8px; 
    display: inline-flex;

    /*estilos tipografia*/
    color: #2C2C2C;
    font-size: 12px;
    font-weight: 600;
    line-height: 14.40px;
    word-wrap: break-word;
}
</style>