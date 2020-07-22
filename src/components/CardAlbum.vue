<template>
	<div class="card hoverable">
		<div class="card-image">
			<img :src="`data:image/jpg;base64,${album.image}`" width="300" height="300"/>
			<a class="btn-floating halfway-fab waves-effect waves-light red" @click="hideCards()">
			<i class="material-icons">music_note</i>
			</a>
		</div>
		<div class="card-content ">
			<span class="card-title text-collapse">{{album.name}}</span>
			<span v-for="(item,index) in album.artists" v-bind:key="item.id">
				<span v-if="index == album.artists.length - 1">
				{{item.name}}.
				</span>
			</span>
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
.text-collapse {
    display:inline-block;
    width:100%;
    white-space: nowrap;
    overflow:hidden !important;
    text-overflow: ellipsis;
}
</style>


