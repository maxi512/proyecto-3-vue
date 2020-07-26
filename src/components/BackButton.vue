<template>
    <a  href="#!" @click="showCards()">
        <i class="material-icons cyan-text text-darken-4" style="font-size: 2.5rem;">arrow_back</i>
        </a>
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