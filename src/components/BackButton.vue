<template>
    <a class="waves-effect waves-light btn" @click="showCards()">Back</a>
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