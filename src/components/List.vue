<template>
<div class="">
    <div :class="$style.list">
        <h3 v-html="title"></h3>
        <b-list-group>
            <b-list-group-item v-for="item in items" :key="item.id" v-html="options.renderItem(item)">

            </b-list-group-item>
        </b-list-group>
    </div>
</div>
</template>
<script>
    export default {
        name: 'List',
        props: ['items', 'title', 'options'],
        components: {

        }
    };
</script>
<style lang="scss" module>
    
    @import '~$css/variables.scss';
    
    .list {
        display: block;
        min-width: 100%;
        max-width: $max_container_width;
        @media only screen and (min-width: 1200px) {
            min-width: 1200px;
        }
    }
</style>
