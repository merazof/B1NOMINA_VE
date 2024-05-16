<template>
    <div>
        <!--SVG-->
        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_174_1459)">
            <path d="M4.16663 18.4375V12.4583M4.16663 9.04167V3.0625M11 18.4375V10.75M11 7.33333V3.0625M17.8333 18.4375V14.1667M17.8333 10.75V3.0625M1.60413 12.4583H6.72913M8.43746 7.33333H13.5625M15.2708 14.1667H20.3958" :stroke=Stroke stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_174_1459">
                <rect width="20.5" height="20.5" fill="white" transform="translate(0.75 0.5)"/>
            </clipPath>
        </defs>
    </svg>
        <span v-if="text" class="tooltiptext">{{text}}</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    Stroke: {
        type: String,
        default: "white",
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
    cursor:pointer;
}

div > span {
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
div:hover > span {
    visibility: visible;
}
</style>