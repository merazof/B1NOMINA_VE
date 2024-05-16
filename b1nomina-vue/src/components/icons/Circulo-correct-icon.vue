<template>
    <div>
        <!--SVG-->
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Iconos" clip-path="url(#clip0_1779_5951)">
                <path id="Vector" d="M14.6668 7.38674V8.00007C14.666 9.43769 14.2005 10.8365 13.3397 11.988C12.4789 13.1394 11.269 13.9817 9.8904 14.3893C8.51178 14.797 7.03834 14.748 5.68981 14.2498C4.34128 13.7516 3.18993 12.8308 2.40747 11.6248C1.62501 10.4188 1.25336 8.99212 1.34795 7.55762C1.44254 6.12312 1.9983 4.75762 2.93235 3.66479C3.8664 2.57195 5.12869 1.81033 6.53096 1.4935C7.93323 1.17668 9.40034 1.32163 10.7135 1.90674" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="Vector_2" d="M14.6667 2.6665L8 9.33984L6 7.33984" :stroke="Stroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
                <clipPath id="clip0_1779_5951">
                    <rect width="16" height="16" fill="white"/>
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
        default: "#1A245B",
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
    align-self: center;
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