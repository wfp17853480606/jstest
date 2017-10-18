<template>
	<div class='header'>
		<div class='content-wrapper'>
			<div class='avatar'>
				<img width="64" height="64" alt='111' :src='seller.avatar'>
			</div>
			<div class="content">
				<div class="title">
					<span class='brand'></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="support" v-if='seller.supports'>
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
      <div class="support-count" v-if="seller.supports" @click="showdetail">
          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
      </div>
		</div>
		<div class='bulletin-wrpper'>
      <span class="bulletin-title" ></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right" @click="showdetail"></i>  
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="无" style="width:100%;height:100%">
    </div>
    <transition name="fade">
    <div class="detail" v-show="detailsShow">
      <div class="detail-wrpper  clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li v-for="item in seller.supports" class="support-item">
            <span :class="classMap[item.type]" style="width:16px;height:16px" class="icon"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
        <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
        </div>
        <div class="bulletin">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        </div>
      </div>
      <div class="detail-close" >
        <i class="icon-close" @click="hidedetail"></i>
      </div>
    </div>
  </transition>
	</div>
</template>

<script>
    import star from '../star/star'
    export default{
        props: {
          seller: {
            type: Object
          }
        },
      data() {
          return {
              detailsShow: false
        }
      },
      methods: {
        showdetail() {
              this.detailsShow = true
        },
        hidedetail() {
              this.detailsShow = false
        }
      },
     created() {
          this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        },
    components: {
          star
      }
    }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../common/scss/mixins";
.header {
        position: relative;
        color: #fff;
        background: rgba(7, 17, 27, 0.5);
        overflow: hidden;
        .content-wrapper {
            position: relative;
            padding: 24px 12px 18px 24px;
            font-size: 0;
            .avatar {
                display: inline-block;
                vertical-align: top;
                img {
                    border-radius: 2px;
                }
            }
          .content {
                display: inline-block;
                margin-left: 16px;
                .title {
                    margin: 2px 0 8px 0;
                    .brand {
                        width: 30px;
                        height: 18px;
                        display: inline-block;
                        @include bg-image('brand');
                        background-size: 30px 18px;
                        background-repeat: no-repeat;
                        vertical-align: top;
                    }
                    .name {
                        margin-left: 6px;
                        font-size: 16px;
                        line-height: 18px;
                        font-weight: bold;
                    }
                }
                .description {
                    margin-bottom: 10px;
                    line-height: 12px;
                    font-size: 12px;
                }
                .support{
                    .icon{
                      vertical-align:top;
                      display:inline-block;
                      width:12px;
                      height:12px;
                      margin-right:4px;
                      background-size:12px 12px;
                      background-repeat:no-repeat;
                        &.decrease {
                            @include bg-image('decrease_1');
                        }
                        &.discount {
                            @include bg-image('discount_1');
                        }
                        &.guarantee {
                            @include bg-image('guarantee_1');
                        }
                        &.invoice {
                            @include bg-image('invoice_1');
                        }
                        &.special {
                            @include bg-image('special_1');
                        }
                    }
                    .text{
                        line-height: 12px;
                        font-size: 10px;
                    }
                }
              }
             .support-count{
                  position:absolute;
                  right:12px;
                  bottom:18px;
                  padding:8px;
                  height:24px;
                  line-height:24px;
                  border-radius:14px;
                  background-color:rgba(0,0,0,0.2);
                  text-align:center;
                  .count{
                    font-size:10px;
                  }
                  .icon-keyboard_arrow_right{
                    font-size:10px
                  }
                }
        }
      .bulletin-wrpper{
        position:relative;
        height:28px;
        line-height:28px;
        padding:0 22px 0 12px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        background:rgba(7,17,27,0.2);
        .bulletin-title{
          display:inline-block;
          width:22px;
          height:12px;
          @include bg-image('bulletin');
          background-size:22px 12px;
          background-repeat:no-repeat;
          vertical-align:top;
          margin-top:9px;
        }
        .bulletin-text{
          font-size:10px;
          margin: 0 2px 0 2px;
        }
        .icon-keyboard_arrow_right{
          position:absolute;
          font-size:10px;
          right:12px;
          top:9px;
        }
        
        }
        .background{
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
          z-index:-1;
          filter:blur(10px);
        }
        .detail{
          position:fixed;
          z-index:100;
          width:100%;
          height:100%;
          top:0;
          left:0;
          overflow:auto;
          background-color:rgba(7,17,27,0.8);
          transition:all 0.5s;
          &.fade-transition{
            opacity:1;
            background-color:rgba(7,17,27,0.8);
          }
          &.fade-enter,&.fade-leave-to{
            opacity:0;
            background-color:rgba(7,17,27,0);
          }
          .detail-wrpper{
            width:100%;
            min-height:100%;
            .detail-main{
              padding-bottom:64px;
              margin-top:64px;
              .name{
                font-size:16px;
                font-weight:350;
                color:rgb(255,255,255);
                line-height:16px;
                text-align:center;
              }
              .star{
                position:relative;
                width:188px;
                margin:16px auto 28px auto
              }
              .title{
                display:flex;
                width:80%;
                margin:0 28px 0 24px;
                margin-bottom:24px;
                .text{
                  padding:0 12px;
                  font-weight:700;
                  font-size:14px;
                }
                .line{
                  flex:1;
                  border-bottom:1px solid rgba(255,255,255,0.2);
                  position:relative;
                  top:-6px;
                }
              }
              .supports{
                width:80%;
                margin:0 auto;
                margin-bottom:28px;
                .support-item{
                  padding:0 12px;
                  margin-bottom:12px;
                  font-size:0;
                  &:last-child{
                    margin-bottom:0;
                  }
                  .icon{
                    display:inline-block;
                    width:16px;
                    height:16px;
                    vertical-align:top;
                    margin-right:6px;
                    background-size:16px 16px;
                    background-repeat:no-repeat;
                    &.decrease {
                        @include bg-image('decrease_1');
                    }
                    &.discount {
                        @include bg-image('discount_1');
                    }
                    &.guarantee {
                        @include bg-image('guarantee_1');
                    }
                    &.invoice {
                         @include bg-image('invoice_1');
                    }
                    &.special {
                        @include bg-image('special_1');
                    }
                  }
                  .text{
                    line-height:16px;
                    font-size:12px;
                  }
                }
                }
                  .bulletin{
                  width:80%;
                  margin:0 auto;
                  .content{
                    padding:0;
                    font-size:12px;
                    line-height:24px;
                  }
                }
                  
              }

            }
          }
          .detail-close{
            position:relative;
            width:32px;
            height:32px;
            margin: -64px auto 0;
            clear:both;
            font-size:32px;

          }
        }
</style>