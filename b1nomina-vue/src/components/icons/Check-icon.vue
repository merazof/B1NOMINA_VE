<template>
<div>
    <!--SVG-->
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.73706 6.75174L4.74447 9.75914L12.263 2.24063"  :stroke=Stroke stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span v-if="text" class="tooltiptext">{{text}}</span>
</div>
</template>

<script>
import {
    defineProps
} from 'vue';

const props = defineProps({
    Stroke: {
        type: String,
        default: "#2F1570",
    },
    text: {
        String
    }
});
</script>

<style scoped>
div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

svg {
    cursor: pointer;
}

div>span {
    visibility: hidden;
    width: fit-content;
    height: 20px;
    background-color: #fffFFF;
    color: #1A245B;
    text-align: center;
    padding: 10px 12px;
    margin-top: 24px;
    border-radius: 6px;
    border: solid 2px #1A245B;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
div:hover>span {
    visibility: visible;
}
</style>
