<template>
    <div class="row">
        <div class="col s4 offset-s4 center-align">
            <ul class="pagination">
                <li class="waves-effect">
                    <a href="#!" @click="prevPage" v-show="currentAPIPage > 1">
                        <i class="material-icons">chevron_left</i>
                    </a>
                </li>
                <li class="active">
                    <a>{{ currentAPIPage }}</a>
                </li>
                <li class="waves-effect">
                    <a href="#!" @click="nextPage" v-show="currentAPIPage < lastPage">
                        <i class="material-icons">chevron_right</i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "paginator",
    props: ["currentAPIPage", "lastPage"],
    methods: {
        prevPage() {
            let apiPage = this.currentAPIPage - 1;
            this.loading = true;
            this.$emit("update-page", apiPage);
        },
        nextPage() {
            let apiPage = this.currentAPIPage + 1;
            this.loading = true;
            this.$emit("update-page", apiPage);
        },
    },
};
</script>

<style></style>
