<template>
    <a  href="#!" class="material-icons  cyan-text text-darken-4 large" style="font-size: 2.5rem" @click="showCards()">arrow_back</a>
</template>

<script>
export default {
    name: 'back-button',
    methods:{
        showCards(){
            this.$emit('show-cards')
        }
    }
}
</script>

<style>

</style>