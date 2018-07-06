<template>
  <v-container v-resize="onResize" fluid class="background">
    <v-layout class="fill" column justify-center align-center>
      <v-layout class="logo-container" column justify-end align-center>
        <h1 class="logo-text font-weight-black">PIXAGEN</h1>
        <app-logo class="logo-home logo-big"></app-logo>
      </v-layout>
      <v-layout class="button-container" row justify-center align-start>
        <v-layout row wrap justify-center align-center>
          <v-flex xs6>
            <v-btn depressed round color='primary' class="action-btn" @click.native="generate()">Generate Pix</v-btn>
          </v-flex>
          <v-flex xs6>
            <v-btn outline round color='primary' @click.native="nav('h0')" class="action-btn">Show me how</v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-layout>
    <v-layout class="attribution-container" row wrap justify-end>
      <v-flex xs129>
        <div class="attribution">{{ version }}</div>
      </v-flex>
      <v-flex xs12>
        <div class="attribution">{{ copyright }}</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import Logo from '../atoms/Logo'
  import { routerHelpers } from '../../router/routerHelpers.js'
  export default {
    mixins: [routerHelpers],
    components: {
      'app-logo': Logo
    },
    methods: {
      skip () {
        if (typeof window.localStorage.history !== 'undefined') {
          this.nav('b0')
        }
      },
      generate () {
        this.$store.dispatch('generateNew', { option: 0 })
      },
      onResize () {
        let btns = document.querySelectorAll('.action-btn')
        let logo = document.querySelector('.logo-home')
        if (window.innerWidth < 420) {
          logo.classList.remove('logo-big')
          logo.classList.add('logo-small')
          btns.forEach(el => {
            el.classList.remove('v-btn--large')
          })
        } else {
          logo.classList.add('logo-big')
          logo.classList.remove('logo-small')
          btns.forEach(el => {
            el.classList.add('v-btn--large')
          })
        }
      }
    },
    computed: {
      copyright () {
        return this.$store.getters.copyright
      },
      version () {
        return this.$store.getters.version
      }
    },
    mounted () {
      this.skip()
    }
  }
</script>
<style scoped>
  .logo-container {
    margin-bottom: 10vh;
  }
  .fill {
    height: 90vh;
  }
  .logo-text {
    color: #7b7594;
    margin-bottom: 10vh;
    letter-spacing: 10px;
    font-size: 30pt;
    margin-left: 12px;
  }
  .logo-big {
    width: 80% !important;
  }
  .logo-small{
    width: 70% !important;
  } 
  .logo-home {
    margin-top: 0 !important;
  }
  .attribution-container {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .attribution {
    float: right;
    color: #9692a2;
    text-transform: lowercase;
  }
  .background {
    height: 100%;
    background-color: #ffffff;
    background-repeat: repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='126' height='84' viewBox='0 0 126 84'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23c4c1cf' fill-opacity='0.35'%3E%3Cpath d='M126 83v1H0v-2h40V42H0v-2h40V0h2v40h40V0h2v40h40V0h2v83zm-2-1V42H84v40h40zM82 42H42v40h40V42zm-50-6a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm96 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm-42 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm30-12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM20 54a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm12 24a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM8 54a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm24 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM8 78a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm12 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm54 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM50 54a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm24 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM50 78a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm54-12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm12 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM92 54a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm24 0a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM92 78a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm24-42a4 4 0 1 1 0-8 4 4 0 0 1 0 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
</style>
