<template>
  <div>
    <app-navbar :title="'About'" color="primary" :logo="false" :menu="false"></app-navbar>
    <v-container class="about-container">
      <v-layout class="logo-container" column justify-end align-center>
        <h1 class="logo-text font-weight-black">PIXAGEN</h1>
        <p class="caption">{{ version }}</p>
        <app-logo class="logo-about"></app-logo>
      </v-layout>
      <v-flex xs12>
          <section class="bio">
            <p class="body-1">Pixagen is a digital image exploration utility & creative inspiration catalyst.</p>
            <p class="body-1">Pixagen was an idea born out of the desire to assist in brainstorming and creative thinking. The original concept was based Osbourne's creative checklist.<span class="checklist">Substitute, Combine, Adapt, Modify / Magnify, Purpose, Eliminate / Minify, Rearrange/ Reverse.</span></p>
          </section>
          <!-- <section class="credits">
            <strong>Credits:</strong>     
            <ul class="caption">
              <li>My Wife - Everything support</li>
              <li>Alex Osborn - Concept inspiration</li>
              <li>Bob Eberle - Concept inspiration</li>
              <li>Evan You - Vuejs is awesome</li>
              <li>Vuetify - Vuetify makes vue awesomer</li>
            </ul>
          </section> -->
          <section class="feeback">
            <strong>Feedback</strong>
            <ul class="caption">
              <li>twitter: <a href="https://twitter.com/limit_unknown">@limit_unknown</a></li>
              <li>git: <a href="https://gitlab.com/abstracted1/Pixagen">gitlab</a></li>
            </ul>
          </section>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import Logo from '../atoms/Logo'

import Navbar from '../organisms/Navbar'

export default {
  components: {
    'app-navbar': Navbar,
    'app-logo': Logo
  },
  computed: {
    version () {
      return this.$store.getters.version
    }
  }
}
</script>

<style scoped>
  .caption {
    color: #9692a2;
    text-transform: lowercase;
  }
  .bio, .credits {
    margin-bottom: 20px;
  }
  .checklist {
    font-style: italic;
  }
  .about-container {
    margin-top: 60px;
    max-width: 500px;
  }
  .logo-container {
    margin-bottom: 5vh;
  }
  .logo-text {
    color: #7b7594;
    letter-spacing: 10px;
    font-size: 100%;
  }

  .logo-about {
    width: 100px !important;
    margin-top: 0 !important;
  }
</style>
