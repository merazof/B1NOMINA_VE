<template>
    <section class="layoutpanel">
        <slot name="cabecera">

        </slot>

        <div class="body-panel">
            <slot name="panel">
            
            </slot>
        </div>
    </section>
</template>

<style scoped>
section.layoutpanel {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}

div.body-panel {
    padding: 24px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}

</style>