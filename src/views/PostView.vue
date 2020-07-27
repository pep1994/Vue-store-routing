<template>
  <div>
      <h1>Post</h1>
      <div v-if="post"></div>
      <div class="card mb-3">
          <div class="card-body">
              <h5 class="card-title">{{post.name}}</h5>
              <p class="card-text">{{post.description}}</p>
              <p class="card-text"><small class="text-muted">{{post.time}}</small></p>
          </div>
          <img class="card-img-top" :src="post.img" alt="img">
      </div>
  </div>
</template>

<script>
import Loader from '@/components/loader.vue'
import {mapGetters} from 'vuex'

export default {
    name: 'post',
    computed: {
        paramKeyPost: function() {
            return this.$route.params.keypost;
        },
        post: function() {
          return this.getPost(this.paramKeyPost);
        },
        ...mapGetters([
            'getPost'
        ])
    }
}
</script>

<style>

</style>