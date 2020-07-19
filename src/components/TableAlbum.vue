<template>
    <table id="table">
        <thead v-if="this.album != null">
            <tr>
                <th>id</th><th>name</th>
            </tr>
        </thead>
        <tbody v-if="this.album != null">
            <tr v-for="song in this.album.songs" :key="song.id">
                <td>{{song.id}}</td>
                <td>{{song.name}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'table-album',
    props: ['album']
}
</script>

<style>

</style>