<template>
	<div class='seller' ref='seller'>
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size='36' :score='seller.score'></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<div class="remark">
					<div class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="num">{{seller.minPrice}}</span>元
						</div>
					</div>
					<div class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="num">{{seller.deliveryPrice}}</span>元
						</div>
					</div>
					<div class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class ="num">{{seller.deliveryTime}}</span>元
						</div>
					</div>
				</div>
				<div class="favorite">
					<i class="icon-favorite" :class="{'active': favorite}" @click='toggleFavorite'></i>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">活动与公告</h1>
				<div class="dec">{{seller.bulletin}}</div>
			</div>
			<div class="supports">
				<ul v-show="seller.supports" class="support">
					<li v-for='support in seller.supports'class='support-item'>
						<i :class="classMap[support.type]" class='icon'></i>
						<span class="desc border-1px">{{support.description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="picture" ref='picWrapper'>
					<ul ref='picList'>
						<li v-for="pic in seller.pics" class="pic-item">
							<img :src="pic" alt="商家实景" width='120' height='90'>
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title border-1px">商家信息</h1>
				<div class="infos">
					<ul v-show=" seller.infos">
						<li v-for="info in seller.infos" class="info-item border-1px">{{info}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import star from '../star/star'
import split from '../split/split'
import Bscroll from 'better-scroll'
	export default{
		props: {
			seller: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				favorite: false
			}
		},
		methods: {
			toggleFavorite(event) {
				if (!event._constructed) {
                    return
                }
				this.favorite = !this.favorite
			}
		},
		computed: {
			favoriteText() {
				return this.favorite ? '已收藏' : '收藏'
			}
		},
		created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        },
        mounted() {
        this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.seller, {
						click: true
					})
				})
         // 实现横向滚动
         if (this.seller.pics) {
         let picWidth = 120
         let margin = 6
         let width1 = (picWidth + margin) * this.seller.pics.length - margin
         this.$refs.picList.style.width = width1 + 'px' // 由于这里子元素的宽度与父元素是一样的，所以我们要自己计算出子元素的宽度
         this.$nextTick(() => {
         this.scroll = new Bscroll((this.$refs.picWrapper), {
         scrollX: true, // 横向滚动
         eventPassthrough: 'vertical' // 忽略竖向滚动
         })
         })
         }
        },
		components: {
			star,
			split
		}
	}
</script>

<style type="stylesheet/scss" lang="scss" scoped>
@import "../../common/scss/mixins";
	.seller{
		position:fixed;
		top:174px;
		bottom:0;
		width:100%;
		overflow:hidden;
		.seller-content{
			.overview{
				margin:18px 18px;
				position:relative;
				.title{
					margin-bottom:8px;
					font-size:14px;
					line-height:14px;
					color:rgb(7,17,27);
				}
				.desc{
					padding-bottom:18px;
					@include border-1px(rgba(7,17,27,0.1));
					font-size:0px;
					&:last-child {
                    		@include border-none();
               			}
					.star{
						vertical-align:top;
						display:inline-block;
						margin-right:8px;
					}
					.text{
						display:inline-block;
						vertical-align:top;
						margin-right:12px;
						font-size:10px;
						color:rgb(77,85,93);
						line-height:18px;
					}
				}
				.remark{
					display:flex;
					.block{
						flex:1;
						margin-top:18px;
						border-right:solid 1px rgba(7,17,27,0.1);
						text-align:center;
						&:last-child{
							border-right:none;
						}
						h2{
							font-size:10px;
							color:rgb(147,153,159);
							line-height:10px;
						}
						.content{
							margin-top:4px;
							font-size:10px;
							color:rgb(147,153,159);
							line-height:10px;
							.num{
								font-size:24px;
								color:rgb(7,17,27);
								line-height:24px;
								fnt-weight:200;
							}
						}
					}
				}
				.favorite{
					position:absolute;
					width:40px;
					top:0;
					right:0;
					text-align:center;
					.icon-favorite{
						font-size:24px;
						line-height:24px;
						color:#d4d6d9;
						&.active{
							color:rgb(240,20,20);
						}
					}
					.text{
						display:block;
						margin-top:4px;
						font-size:10px;
						line-height:10px;
						color:rgb(77,85,93);
					}
				}
			}
			.bulletin{
				margin:18px 18px 0 18px;
				.title{
					margin-bottom:8px;
					font-size:14px;
					line-height:14px;
					color:rgb(7,17,27);
				}
				.dec{
					padding:0 12px 26px 12px;
					font-size:12px;
					line-height:24px;
					color:rgb(240,20,20);
					@include border-1px(rgba(7,17,27,0.1));
				}
			}
			.supports{
				margin:0 18px 0 18px;
				.support{
					.support-item{
						@include border-1px(rgba(7,17,27,0.1));
						padding:16px 12px;
						font-size:0;
						.icon{
							margin-right:6px;
							display:inline-block;
							vertical-align:top;
							width:16px;
							height:16px;
							background-size: 16px 16px;
							background-repeat:no-repeat;
							&.decrease {
                            	@include bg-image('decrease_4');
                       		 }
                        	&.discount {
                            	@include bg-image('discount_4');
                        	}
                        	&.guarantee {
                            	@include bg-image('guarantee_4');
                        	}
                        	&.invoice {
                            	@include bg-image('invoice_4');
                       	 	}
                        	&.special {
                            	@include bg-image('special_4');
                        	}
						}
						.desc{
							display:inline-block;
							vertical-align:top;
							font-size:12px;
							color:rgb(7,17,27);
							line-height:16px;
						}
					}
				}
			}
			.pics{
				margin:18px 0 18px 18px;
				.title{
					margin-bottom:12px;
					font-size:14px;
					line-height:14px;
					color:rgb(7,17,27);
				}
				.picture{
					width:100%;
					overflow:hidden;
					white-space:nowrap;
					.pic-item{
						display:inline-block;
						width:120px;
						height:90px;
						margin-right:6px;
						img{
							width:120px;
							height:90px;
						}
					}
				}
			}
			.info{
				padding: 18px 18px 0 18px;
				.title{
					padding-bottom:12px;
					font-size:14px;
					line-height:14px;
					color:rgb(7,17,27);
					@include border-1px(rgba(7,17,27,0.1));
				}
				.infos{
					.info-item{
						padding:16px 12px;
						@include border-1px(rgba(7,17,27,0.1));
						font-size:12px;
						font-weight:200px;
						color:rgb(7,17,27);
						line-height:16px;
						&:last-child {
                    		@include border-none();
               			}
					}
				}
			}
		}
	}
</style>