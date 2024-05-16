<template>
    <div class="cardsociedad">
        <div class="cardsociedad-body">
            <h2>Cargando...</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cargarSociedad',
    
}
</script>

<style scope>
div.cardsociedad {
    padding: 48px; 
    background: white; 
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25); 
    border-radius: 6px; 
    border: 1px #363855 solid;
    flex-direction: column;
    justify-content: center;
    align-items: flex;
    gap: 12px;
    display: inline-flex;
    width: 220px;
    height: 200px;
    margin: 24px;
}

.cardsociedad-body {
    max-width: 220px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>