<script setup>
const props = defineProps({
    msg: "",
})
</script>
<template>
    <div class="group relative">
        <slot></slot>
        <span
            class="absolute hidden group-hover:block left-1/2 bottom-[105%] px-2 py-1 rounded-full text-nowrap bg-kikyou-50 dark:bg-kikyou-900 text-kikyou-900 dark:text-kikyou-50 text-center text-sm shadow-xl"
            style="transform: translateX(-50%)">{{
                props.msg || "" }}</span>
    </div>
</template>