<template>
    <header class="header">
        <h2 class="Name-page">{{nombrePagina}}</h2>
    </header>
</template>

<script>
export default {
    name: 'headerPage',
    props: [
        'nombrePagina',
    ]
}
</script>

<style scoped>
header.header {
background: #F8F8F8;
color: #1A2771;
height: 81px;
padding: 20px 30px;
width: 100%;
border-bottom: 2px #CDE0F1 solid;
box-sizing: border-box;
display: flex;
align-items: center;
flex-grow: 1;

}

header.header > h2.Name-page {
    color: #1A2771;
    font-size: 28px;
    font-family: Poppins;
    font-weight: 500;
    word-wrap: break-word;
}
</style>