<template>
	<div class="card">
		<div class="card-image">
			<img :src="`data:image/jpg;base64,${album.image}`" width="300" height="300"/>
			<a class="btn-floating halfway-fab waves-effect waves-light red" @click="hideCards()">
			<i class="material-icons">info</i>
			</a>
		</div>
		<div class="card-content">
			<p>{{album.name}}</p>
			<p v-for="artist in album.artists" v-bind:key="artist.id">{{artist.name}}</p>
			<p>{{album.year}}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "card-album",
	props: ["album"],
	methods: {
		hideCards() {
			this.$emit("update-current-album", this.album);
		}
	}
};
</script>


<style>
</style>


