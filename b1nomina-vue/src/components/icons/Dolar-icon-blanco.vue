<template>
    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_174_1388)">
            <path d="M11 1.35417V20.1458" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15.2708 4.77083H8.86458C8.0717 4.77083 7.31128 5.0858 6.75063 5.64646C6.18997 6.20711 5.875 6.96752 5.875 7.76041C5.875 8.5533 6.18997 9.31371 6.75063 9.87437C7.31128 10.435 8.0717 10.75 8.86458 10.75H13.1354C13.9283 10.75 14.6887 11.065 15.2494 11.6256C15.81 12.1863 16.125 12.9467 16.125 13.7396C16.125 14.5325 15.81 15.2929 15.2494 15.8535C14.6887 16.4142 13.9283 16.7292 13.1354 16.7292H5.875" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <defs>
            <clipPath id="clip0_174_1388">
                <rect width="20.5" height="20.5" fill="white" transform="translate(0.75 0.5)"/>
            </clipPath>
        </defs>
    </svg>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({
    color: {
        String,
        default: "#F8F8F8"
    }
})
</script>