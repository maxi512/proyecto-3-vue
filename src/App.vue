<template>
    <div class="row">
        <back-button v-on:show-cards="showCards()"></back-button>

        <div class="input-field col s12">
            <input id="finder" type="text" class="validate" v-model="search" />
            <label for="finder" id="labelInput">{{ labelInput }}</label>
        </div>
        <p>
            <label>
                <input
                    type="radio"
                    value="name"
                    @change="onChangeRadioButton($event)"
                    v-model="searchFor"
                />
                <span>Name</span>
            </label>
        </p>
        <p>
            <label>
                <input
                    name="group1"
                    type="radio"
                    value="artist"
                    @change="onChangeRadioButton($event)"
                    v-model="searchFor"
                />
                <span>Artist</span>
            </label>
        </p>
        <p>
            <label>
                <input
                    type="radio"
                    value="year"
                    @change="onChangeRadioButton($event)"
                    v-model="searchFor"
                />
                <span>Year</span>
            </label>
        </p>
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
            page: 1,
            loading: false,
            show: true,
            showTable: false,
            selectedAlbum: null,
            search: "",
            searchFor: "name",
            labelInput: "Name",
        };
    },
    methods: {
        onChangeRadioButton(event) {
            const value = event.target.value;
            this.labelInput = value.charAt(0).toUpperCase() + value.slice(1);
        },
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

        updateAlbums(val){
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
                this.updateAlbums(val)
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
</style>
