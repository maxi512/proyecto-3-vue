<template>
    <div>
        <div class="row valign-wrapper">
            <div class="col s4">
                <h2>My Albums</h2>
                <back-button v-on:show-cards="showCards()" v-show="showTable"></back-button>
            </div>
            <div class="col s4">
                <div class="row"></div>
                <div class="row"></div>
                <div class="input-field col s12 flow-text">
                    <input id="last_name" :placeholder="labelInput" v-model="search" type="text" class="validate">
                </div>
                <div class="row"></div>
            </div>
            <div class="col s4">
                <div class="row"></div>
                <div class="row"></div>
                <radio-group @update-search-for="updateSearchFor"></radio-group>
            </div>
        </div>
        <preloader v-bind:loading="loading"></preloader>
        <div class="row">
            <transition-group name="slide-fade">
                <div
                    class="col s12 m4"
                    v-for="album in albums"
                    :key="album.id"
                    v-show="show"
                >
                    <card-album
                        v-bind:album="album"
                        v-on:update-current-album="showTableAlbum"
                    ></card-album>
                </div>
            </transition-group>
            <transition name="slide-fade-table">
                <div v-if="showTable">
                    <table-album v-bind:album="selectedAlbum"></table-album>
                </div>
            </transition>
        </div>
        <paginator
            v-bind:currentAPIPage="currentAPIPage"
            v-bind:lastPage="lastPage"
            v-on:update-page="updatePage"
            v-show="show"
        ></paginator>
    </div>
</template>

<script>
import axios from "axios";
import TableAlbum from "./components/TableAlbum.vue";
import CardAlbum from "./components/CardAlbum.vue";
import BackButton from "./components/BackButton.vue";
import Preloader from "./components/Preloader.vue";
import Paginator from "./components/Paginator.vue";
import RadioGroup from "./components/RadioGroup.vue";

export default {
    name: "App",
    components: {
        TableAlbum,
        CardAlbum,
        BackButton,
        preloader: Preloader,
        paginator: Paginator,
        RadioGroup
    },
    data() {
        return {
            albums: [],
            currentAPIPage: 1,
            lastPage: 1,
            myalbumsAPI: "https://myalbumsiaw.herokuapp.com/api/albums?page=",
            loading: false,
            show: true,
            showTable: false,
            selectedAlbum: null,
            search: "",
            searchFor: "name",
        };
    },
    computed: {
        labelInput: function() {
            return (
                this.searchFor.charAt(0).toUpperCase() + this.searchFor.slice(1)
            );
        },
    },
    methods: {
        getAlbums() {
            this.loading = true;
            this.show = false;
            console.log(this.myalbumsAPI + this.currentAPIPage)
            axios
                .get(this.myalbumsAPI + this.currentAPIPage)
                .then((response) => {
                    this.loading = false;
                    this.albums = response.data.data;
                    this.lastPage = response.data.meta.last_page;
                    this.show = true;
                })
                .catch((e) => console.log(e));
        },
        debounce(func, wait, immediate) {
            self.timeout = self.timeout || null;
            return function() {
                var context = this,
                    args = arguments;
                clearTimeout(self.timeout);
                self.timeout = setTimeout(function() {
                    self.timeout = null;
                    if (!immediate) func.apply(context, args);
                }, wait);
                if (immediate && !self.timeout) func.apply(context, args);
            };
        },
        updateAlbums(val) {
            this.myalbumsAPI =
                val == ""
                    ? "https://myalbumsiaw.herokuapp.com/api/albums?page="
                    : "https://myalbumsiaw.herokuapp.com/api/albums/" +
                      this.searchFor +
                      "/" +
                      this.search +
                      "?page=";
            this.currentAPIPage = 1;
            console.log(this.myalbumsAPI + this.currentAPIPage)
            this.getAlbums();
        },
        showTableAlbum(data) {
            this.show = false;
            this.showTable = true;
            this.selectedAlbum = data;
        },
        showCards() {
            this.show = true;
            this.showTable = false;
        },
        updatePage(apiPage){
            this.currentAPIPage = apiPage
            this.getAlbums()
        },
        updateSearchFor(searchString){
            this.searchFor = searchString
        }
    },
    watch: {
        search: function(val) {
            this.debounce(() => {
                this.updateAlbums(val);
            }, 500)();
        },
    },
    mounted() {
        this.getAlbums();
    },
};
</script>

<style>
.slide-fade-enter-active {
    transition: all 0.4s ease;
    transition-delay: 0.4s;
}
.slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(1, 0.8, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(200px);
    opacity: 0;
}

.slide-fade-table-enter-active {
    transition: all 0.4s ease;
    transition-delay: 0.3s;
}

.slide-fade-table-enter {
    transform: translateX(200px);
    opacity: 0;
}

.row .col {
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
}
</style>
