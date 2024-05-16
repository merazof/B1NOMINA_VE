<template>
    
    <section class="layout-section">
        <slot name="nav">
        
        </slot>
        <div class="contenedor-body">
            <slot name="body">

            </slot>

        </div>   
    </section>
</template>

<style scoped>
section.layout-section {
    height: 100vh;
    display: flex;
    flex-direction: row;
    width: 100vw;
    box-sizing: content-box;
}

div.contenedor-body {
    margin-left: 6rem;
    padding: 0px;
    background: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: scroll;
}
</style>