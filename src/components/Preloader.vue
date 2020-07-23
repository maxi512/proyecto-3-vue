<template>
  <div class="row">
            <div class="col s4 offset-s4 center-align">
                <div v-show="loading">
                    <div class="preloader-wrapper big active">
                        <div class="spinner-layer spinner-blue-only">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
	name: "preloader",
	props: ["loading"]
};
</script>

<style>

</style>