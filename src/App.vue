<template>
  <div id="app">
    <div class="wrapper">
      <nav id="sidebar">
          <router-link to="/">
            <img src="@/assets/logo.png" alt="logo">
          </router-link>
          <app-loader :loading="loading" :loaderText="'Loading...'"></app-loader>
          <template v-if="!loading">
            <router-link tag="div" class="link" :to="{ name:'Home' }">Home</router-link> |
            <template v-for="(category, index) in getCategories">
                <router-link tag="div" class="link" :to="'/blog/' + category.key" :key="index">
                  {{ category.name }}
                </router-link>
            </template>
          </template>
      </nav>
      <div id="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import loader from '@/components/loader.vue'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    'app-loader': loader
  },
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    this.fetchCategories().then(()=> {
      if (this.$route.params.key && !this.getCategory(this.$route.params.key)) {
        this.$router.push({name: 'notfound'});
      }
      this.loading = false;
    }).catch(err => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions([
      'fetchCategories'
    ])
  },
  computed: {
    ...mapGetters([
      'getCategories',
      'getCategory'
    ])
  }

}
</script>

<style lang="scss">
.wrapper {
  display: flex;
  width: 100%;

  #sidebar {
    width: 300px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 999;
    background: rgb(94,236,177);
    padding: 60px 60px 100px 60px;
    color: #fff;
  }

  #content {
    width: calc(100% - 300px);
    max-width: none;
    margin-left: 300px;
    padding: 60px 60px 100px 60px;
    min-height: 50vh;
    box-sizing: border-box;
  }
}

.link {
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  transition: 0.3s;

  &:hover {
    font-size: 28px;
    color: green;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
