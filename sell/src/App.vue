<template>
  <div id='app'>
    <v-header :seller='seller'></v-header>  
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
  </div>
  <router-view :seller='seller'></router-view>
</div>
</template>

<script>
import header from './components/head/header'
const Errok = 0
export default{
data() {
  return {
    seller: {}
}
},
created() { // 在请求的时候连id一起发送过去
    this.$http.get('/api/seller').then((response) => {
       response = response.body
       if (response.errno === Errok) {
           this.seller = response.data
       }
  })
},
components: {
    'v-header': header
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>

    @import "common/scss/mixins";

    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        @include border-1px(rgba(7, 17, 27, 0.1));

        .tab-item {
            flex: 1;
            text-align: center;

            & > a {
                display: block;
                font-size: 14px;
                color: rgb(77, 85, 93);

                &.router-link-active {
                    color: rgb(240, 20, 20)
                }
            }
        }
    }
</style>
