<template>
    <div>
        <h4>{{album.name}}</h4>
        <h5>By 
            <span v-for="(item,index) in album.artists" v-bind:key="item.id">
				<span v-if="index == album.artists.length - 1">
				{{item.name}}.
				</span>
                <span v-else> {{item.name}},</span>
			</span>
        </h5>
        <br>
        <table id="table" class="striped centered responsive-table">
        <thead v-if="this.album != null">
            <tr>
                <th>id</th><th>name</th><th>duration</th>
            </tr>
        </thead>
        <tbody v-if="this.album != null">
            <tr v-for="song in this.album.songs" :key="song.id" class="hoverable">
                <td>{{song.id}}</td>
                <td>{{song.name}}</td>
                <td>{{song.duration}}</td>
            </tr>
        </tbody>
    </table>
    </div>
    
</template>

<script>
export default {
    name: 'table-album',
    props: ['album']
}
</script>

<style>

</style>