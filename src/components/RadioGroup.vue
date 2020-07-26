<template>
    <div>
        <p class="center-align">
            <label>
                <input type="radio" name="group1" value="name" @click="updateSearchFor" checked/>
                <span>Name</span>
            </label>
        </p>
        <p class="center-align">
            <label>
                <input type="radio" name="group1" value="artist" @click="updateSearchFor" />
                <span>Artist</span>
            </label>
        </p>
        <p class="center-align">
            <label>
                <input type="radio" name="group1" value="year" @click="updateSearchFor" />
                <span>Year</span>
            </label>
        </p>
    </div>
</template>

<script>
export default {
    name: "radio-group",
    props: ["searchFor"],
    methods: {
        updateSearchFor (e) {
            this.$emit('update-search-for', e.currentTarget.getAttribute('value'))
        }
    }
}
</script>

<style></style>
