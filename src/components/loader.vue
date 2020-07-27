<template>
  <div class="loader">
      <div class="loader-container" v-if="loading" :style="style">
          <img :src="Loader" alt="loader" height="32px" width="32px">
          <div class="loader-text" v-if="loaderText">
              {{ loaderText }}
          </div>
      </div>
  </div>
</template>

<script>
import Loader from '@/assets/loader-green.svg';

export default {
    name: 'loader',
    data() {
        return {
            style: {},
            Loader: Loader
        }
    },
    props: {
        loaderText: String,
        loading: {
            default: true,
            type: Boolean
        }
    },
    created() {
        this.style = {
            zIndex: '1000',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            height: '100px'
        }
    }
}
</script>

<style lang="scss" scoped>
.loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.loader-text {
    margin-top: 1em;
}
</style>