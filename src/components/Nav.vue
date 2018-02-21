<template><div id="nav">


    <my-sidebar :isOpen.sync="sidebarIsOpen"></my-sidebar>

    <b-navbar toggleable="md" type="dark" variant="info">



        <button @click="toggleNav()" type="button" aria-label="Toggle navigation" aria-controls="nav_collapse" aria-expanded="false" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>

        <div class="d-none">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        </div>

        <b-navbar-brand href="#">Fulbito</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item href="#">Create match</b-nav-item>
                <b-nav-item href="#" disabled>Play a match</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-form>
                    <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" />
                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                </b-nav-form>

                <b-nav-item-dropdown text="Lang" right>
                    <b-dropdown-item href="#">EN</b-dropdown-item>
                    <b-dropdown-item href="#">ES</b-dropdown-item>
                    <b-dropdown-item href="#">FR</b-dropdown-item>
                </b-nav-item-dropdown>
                
                <b-button size="sm" class="my-2 my-sm-0"
                v-if="!authenticated" @click="login()">
                    SignIn
                </b-button>

                <b-nav-item-dropdown right v-if="authenticated">
                    <!-- Using button-content slot -->
                    <template slot="button-content">
          <em>User</em>
        </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#" 
                     @click="logout()"
                    >Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>

    
</div>
</template>
<script>
import MySidebar from './Sidebar'
    export default {
        props: ['authenticated'],
        components: {
            MySidebar
        },
        name: "Nav",
        data () {
            return {
                sidebarIsOpen: false
            }  
        },
        methods: {
            toggleNav(){
                this.sidebarIsOpen = !this.sidebarIsOpen;
            },
            login() {
                this.$emit('login')
            },
            logout() {
                this.$emit('logout')
            }
        }
    }
</script>
