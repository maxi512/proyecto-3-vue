<template>
    <div>
        <div class="row valign-wrapper">
                <div class="col s4">
                    <h2>My Albums</h2>
                    <back-button v-on:show-cards="showCards()"></back-button>
                </div>
                <div class="col s4">
                    <div class="row"></div>
                    <div class="row"></div>
                    <div class="input-field col s12 flow-text">
                            <input
                                id="finder"
                                type="text"
                                class="validate"
                                v-model="search"
                            />
                            <label for="finder" id="labelInput">{{
                                labelInput
                            }}</label>
                        </div>
                    <div class="row"></div>     
                </div>
                <div class="col s4">
                     <div class="row"></div>  
                                          <div class="row"></div>    
  
                    <p class="center-align">
                        <label>
                            <input
                                type="radio"
                                value="name"
                                v-model="searchFor"
                            />
                            <span>Name</span>
                        </label>
                    </p>
                    <p class="center-align">
                        <label>
                            <input
                                type="radio"
                                value="artist"
                                v-model="searchFor"
                            />
                            <span>Artist</span>
                        </label>
                    </p>
                    <p class="center-align">
                        <label>
                            <input
                                type="radio"
                                value="year"
                                v-model="searchFor"
                            />
                            <span>Year</span>
                        </label>
                    </p>
                </div>
        </div>

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
            <ul class="pagination">
                <li class="waves-effect">
                    <a href="#!" @click="prevPage">
                        <i class="material-icons">chevron_left</i>
                    </a>
                </li>
                <li class="active">
                    <a>{{ currentAPIPage }}</a>
                </li>
                <li class="waves-effect">
                    <a href="#!" @click="nextPage">
                        <i class="material-icons">chevron_right</i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import TableAlbum from "./components/TableAlbum.vue";
import CardAlbum from "./components/CardAlbum.vue";
import BackButton from "./components/BackButton.vue";

export default {
    name: "App",
    components: {
        TableAlbum,
        CardAlbum,
        BackButton,
    },
    data() {
        return {
            albums: [],
            currentAPIPage: 1,
            myalbumsAPI: "http://127.0.0.1:8000/api/albums?page=",
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
            axios
                .get(this.myalbumsAPI + this.currentAPIPage)
                .then((response) => {
                    this.albums = response.data.data;
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
            if (val == "") {
                this.currentAPIPage = 1;
                this.myalbumsAPI = "http://127.0.0.1:8000/api/albums?page=";
            } else {
                this.currentAPIPage = 1;
                this.myalbumsAPI =
                    "http://127.0.0.1:8000/api/albums/" +
                    this.searchFor +
                    "/" +
                    this.search +
                    "?page=";
            }
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
        prevPage() {
            this.loading = true;
            this.currentAPIPage--;
            this.getAlbums();
        },
        nextPage() {
            this.loading = true;
            this.currentAPIPage++;
            this.getAlbums();
        },
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
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
    transition: all 0.4s ease;
    transition-delay: 0.4s;
}
.slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(1, 0.8, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(200px);
    opacity: 0;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-table-enter-active {
    transition: all 0.4s ease;
    transition-delay: 0.3s;
}

.slide-fade-table-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(200px);
    opacity: 0;
}

.row .col{
margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
}
</style>
