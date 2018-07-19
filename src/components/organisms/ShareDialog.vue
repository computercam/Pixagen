<template>
  <div>
    <v-dialog v-model="dialog" max-width="290">
        <v-card class="dialog-container">
          <v-btn class="dialog-close" small flat icon @click.native="close">
            <v-icon>close</v-icon>
          </v-btn>
          <v-card-title class="title dialog-title">Share</v-card-title>
          <p class="caption grey--text dialog-caption">This image may be subject to copyright.</p>
          <v-card-text>
            <p>
              <vue-goodshare-facebook 
              :page_url="shareUrl" 
              has_icon 
              ></vue-goodshare-facebook>
              <span @click="triggerShare($event)" class="subheading dialog-social-name">Facebook</span>
            </p>
            <p>
              <vue-goodshare-twitter 
              :page_url="shareUrl" 
              has_icon 
              ></vue-goodshare-twitter>
              <span @click="triggerShare($event)" class="subheading dialog-social-name">Twitter</span>
            </p>
            <p>
              <vue-goodshare-pinterest 
              :page_url="shareUrl" 
              has_icon 
              ></vue-goodshare-pinterest>
              <span @click="triggerShare($event)" class="subheading dialog-social-name">Pinterest</span>
            </p>
            <p>
              <vue-goodshare-tumblr 
              :page_url="shareUrl" 
              has_icon 
              ></vue-goodshare-tumblr>
              <span @click="triggerShare($event)" class="subheading dialog-social-name">Tumblr</span>
            </p>
            <p>
              <vue-goodshare-reddit 
              :page_url="shareUrl" 
              has_icon 
              ></vue-goodshare-reddit>
              <span @click="triggerShare($event)" class="subheading dialog-social-name">Reddit</span>
            </p>
            <p>
              <vue-goodshare-google-plus 
              :page_url="shareUrl" 
              has_icon 
              ></vue-goodshare-google-plus>
              <span @click="triggerShare($event)" class="subheading dialog-social-name">GooglePlus</span>
            </p>
          </v-card-text>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VueGoodshareFacebook from 'vue-goodshare/src/providers/Facebook.vue'
import VueGoodshareGooglePlus from 'vue-goodshare/src/providers/GooglePlus.vue'
import VueGoodsharePinterest from 'vue-goodshare/src/providers/Pinterest.vue'
import VueGoodshareTumblr from 'vue-goodshare/src/providers/Tumblr.vue'
import VueGoodshareReddit from 'vue-goodshare/src/providers/Reddit.vue'
import VueGoodshareTwitter from 'vue-goodshare/src/providers/Twitter.vue'

export default {
  methods: {
    close () {
      this.$store.dispatch('shareDialogClose')
    },
    triggerShare (e) {
      e.preventDefault();
      e.stopPropagation();
      e.target.parentNode.firstChild.click()
    }
  },
  computed: {
    shareUrl () {
      return this.$store.getters.shareDialogUrl
    },
    dialog: {
      get () {
        return this.$store.getters.shareDialogStatus
      },
      set () {
        this.$store.dispatch('shareDialogClose')
      }
    }
  },
  components: {
    VueGoodshareFacebook,
    VueGoodshareGooglePlus,
    VueGoodsharePinterest,
    VueGoodshareTumblr,
    VueGoodshareReddit,
    VueGoodshareTwitter
  }
}
</script>

<style scoped>
.dialog-container {
  padding: 0 8px;
  border-radius: 10px !important;
}
.dialog-close {
  position: absolute !important;
  top: 4px;
  right: 4px;
}
.dialog-caption {
  padding: 0 16px;
}
.dialog-social-name {
  margin-left: 16px;
  cursor: pointer;
}
</style>