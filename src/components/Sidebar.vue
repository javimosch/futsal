<template>

<div>
    <sidevue v-touch:swipe.right="swipeRight" v-touch:swipe.left="swipeLeft" 
close-gap="0px" open-gap="80%" direction="left" sidevue-class="yourCustomClass"> /* Sidebar Content */
    <div :class="$style.sidebar">
    <h2>Side!</h2>    
    </div>
    
    </sidevue>
    
    <div :class="$style.opener+' d-sm-none'" v-show="!isOpen" v-touch:swipe.right="swipeRight">
        
    </div>
    
</div>

</template>
<script>
    import Vue from 'vue'
    import Vue2TouchEvents from 'vue2-touch-events'
    Vue.use(Vue2TouchEvents)
    import { sideVueBus } from 'sidevue';
    export default {
        name: "MySidebar",
        props:['isOpen'],
        data() {
            return {
                sidevueId:''
            };
        },
        watch:{
          isOpen (newVal) {
              this.toggleSidebar(newVal);
          }  
        },
        created() {
            
        },
        methods: {
            toggleSidebar (value) {
                let type = value === true ? 'open' : 'close';
                sideVueBus.$emit(`sidevue-${type}` + this.sidevueId, {});
            },
            swipeLeft() {
                this.$emit('update:isOpen', false);
                this.toggleSidebar(false)
            },
            swipeRight() {
                this.$emit('update:isOpen', true);
                this.toggleSidebar(true)
            }
        }
    }
</script>
<style lang="scss" module>
    .opener {
        background-color: transparent;
        position: absolute;
        width: 70%;
        height: 100%;
        top: 0px;
        left: 0px;
    }

    .sidebar {
        min-height: 100%;
        display: block;
        min-width: 100%;
        padding-top: 50px;
        background-color: #17a2b8!important;
    }
</style>
