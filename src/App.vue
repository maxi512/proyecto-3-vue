<template>
	<div class="row">
		<back-button v-on:show-cards="showCards()"></back-button>

	<div class="input-field col s12">
		<input id="finder" type="text" class="validate" v-model="search" >
		<label for="finder" id="labelInput">{{labelInput}}</label>
		</div>
		<p>
			<label>
				<input type="radio" value="album" @change="onChange($event)" v-model="searchFor"/>
				<span>Album</span>
			</label>
		</p>
		<p>
			<label>
				<input name="group1" type="radio" value="artist" @change="onChange($event)" v-model="searchFor"/>
				<span>Artist</span>
			</label>
		</p>
		<p>
			<label>
				<input type="radio" value="year" @change="onChange($event)" v-model="searchFor"/>
				<span>Year</span>
			</label>
		</p>
		<transition-group name="slide-fade">
				<div class="col s12 m4" v-for="album in filteredAlbums" :key="album.id" v-show="show">
					<card-album v-bind:album="album" v-on:update-current-album="showTableAlbum"  ></card-album>
				</div>
		</transition-group>
		
		<transition name="slide-fade-table">
			<div v-if="showTable">
				<table-album v-bind:album="selectedAlbum"></table-album>
			</div>
		</transition>
	
			
	</div>
</template>

<script>
import axios from 'axios';
import TableAlbum from "./components/TableAlbum.vue";
import CardAlbum from "./components/CardAlbum.vue";
import BackButton from "./components/BackButton.vue";

export default {
	name: "App",
	components: {
		TableAlbum, CardAlbum, BackButton
		
	},
	data() {
		return {
			albums: [],
			show: true,
			showTable: false,
			selectedAlbum: null,
			search: "",
			searchFor: "album",
			labelInput: "Album"
		};
	},
	computed: {
		filteredAlbums() {
			if (this.searchFor == "album") {
				return this.albums.filter(album => {
					return album.name.toLowerCase().includes(this.search.toLowerCase());
				});
			}
			if (this.searchFor == "year") {
				return this.albums.filter(album => {
					return album.year == this.search;
				});
			}
			if (this.searchFor == "artist") {
				var lista = [];
				this.albums.forEach(album => {
					var artist;
					for (artist of album.artists) {
						if (artist.name.toLowerCase().includes(this.search.toLowerCase())) {
							lista.push(album);
							break;
						}
					}
				});
				return lista;
			}
			return []
		}
	},
	mounted() {
		this.getAlbums();
	},
	methods: {
		onChange(event) {
			const value = event.target.value;
			this.labelInput = value.charAt(0).toUpperCase() + value.slice(1);
		},
		getAlbums() {
			axios
				.get("http://127.0.0.1:8000/api/albums")
				.then(response => {
				this.albums = response.data.data;
				})
				.catch(e => console.log(e));
		},
		showTableAlbum(data){
			this.show = false;
			this.showTable = true;
			this.selectedAlbum = data
		},
		showCards(){
			this.show = true
			this.showTable = false
		}
	}
};
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
transition: all .4s ease;
}
.slide-fade-leave-active {
transition: all .4s cubic-bezier(1.0, 0.8, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
transform: translateX(200px);
opacity: 0;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-table-enter-active {
transition: all .4s ease;
transition-delay: .3s;

}

.slide-fade-table-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
transform: translateX(200px);
opacity: 0;
}
</style>