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
                <th>ID</th><th>Name</th><th>Artists</th><th>Duration</th>
            </tr>
        </thead>
        <tbody v-if="this.album != null">
            <tr v-for="song in this.album.songs" :key="song.id" class="hoverable">
                <td>{{song.id}}</td>
                <td><a :href="song.youtube_link">{{song.name}}</a></td>
                <td>
                    <span v-for="(item,index) in song.artists" v-bind:key="item.id">
                        <span v-if="index == song.artists.length - 1">
                        {{item.name}}.
                        </span>
                        <span v-else> {{item.name}},</span>
                    </span>
                </td>
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