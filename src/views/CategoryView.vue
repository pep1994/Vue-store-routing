<template>
  <div>
      <template v-if="!paramKeyPost">
        <h1>{{category.name}}</h1>
        <h4>{{category.description}}</h4>
        <hr>
        <app-loader :loading="loading" :loaderText="'Loading...'"></app-loader>
        <div v-if="!loading">
            .<div class="row" v-for="(post, index) in getPosts" :key="index">
                 <div class="col-8">
                <div class="card" style="margin-bottom:50px;padding:10px;">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-8">
                        <h5 class="card-title">{{ post.name | truncate(100) }}</h5>
                        <p class="card-text">{{ post.description | truncate(200) }}</p>
                        <router-link tag="a" class="btn btn-primary" :to="{ name : 'post' , params : { keypost : post.key}}" :key="'menu' + index" >
                            View...
                        </router-link>
                      </div>
                      <div class="col-4">
                        <img class="card-img-top" :src="post.img" height="150px;">
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
        </div>
      </template>
      <template v-else>
          <app-loader :loading="loading" :loaderText="'Loading...'"></app-loader>
          <router-view v-if="!loading"></router-view>
      </template>
  </div>
</template>

<script>
import Loader from '@/components/loader.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'categoryview',
    components: {
        'app-loader': Loader
    },
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        this.checkPost();
    },
    watch: {
        category: function(val, old) {
            this.checkPost();
        }
    },
    methods: {
        ...mapActions([
            'fetchPosts'
        ]),
      checkPost() {
          if (this.category) {
              this.loading = true;
              this.fetchPosts({ cat: this.category.id }).then(()=> {
                  if (this.paramKeyPost && !this.getPost(this.paramKeyPost)) {
                    this.$router.push({name: 'notfound'});
                  }
                  this.loading = false;
              }).catch(err=>{
                  this.loading = false;
              })
          }
      }
    },
    computed: {
        paramKey: function() {
            return this.$route.params.key;
        },
        paramKeyPost: function() {
            return this.$route.params.keypost;
        },
        category: function() {
            return this.getCategory(this.paramKey);
        },
        ...mapGetters([
            'getCategory',
            'getPosts',
            'getPost'
        ])
    },
    filters: {
        'truncate' : function(val, length) {
            if (val.length > length) {
                return val.slice(0, length) + '...';
            } else {
                return val;
            }
        }
    }
}
</script>

<style>

</style>