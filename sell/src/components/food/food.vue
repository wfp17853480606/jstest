<template>
	<transition name="food">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image" alt="图片" class="header-img">
				</div>
				<div class="back" @click="back">
					<span class="icon-arrow_lift"></span>
				</div>
				<div class="content">
				<h1 class='header'>{{food.name}}</h1>
				<div class="detail">
					<span class="sell-count">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price">
					<span class="now">￥{{food.price}}</span>
					<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
				<div class="cart-wrapper">
					<cartcontrol :food='food'></cartcontrol>
				</div>
				<div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
			</div>
			<split></split>
			<div class="info" v-show="food.info">
				<h1 class="title">商品信息</h1>
				<div class="text">{{food.info}}</div>
			</div>
			<split></split>
			<div class="rating">
				<h1 class="title">商品评价</h1>
				<ratingselect :selet-type="seletType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" v-on:ratingType-select='ratingTypeSelect' v-on:toggleContent='contentToggle'></ratingselect>
				<div class="rating-wrappe">
					<ul v-show="food.ratings">
						<li v-for="rating in food.ratings" class='rating-item border-1px' v-show="needShow(rating.rateType,rating.text)">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img :src="rating.avatar" alt="头像" class="avatar" style="width:12px;height:12px;">
							</div>
							<div class="date">{{rating.rateTime | formatDate}}</div>
							<div class="text">
								<i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}" class="icon"></i>
								<span class="text-dec">{{rating.text}}</span>
							</div>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings">暂无评价</div>
				</div>
			</div>
			</div>
		</div>
	</transition>
</template>

<script>
Vue.config.productionTip = false
import BScroll from 'better-scroll'
import cartcontrol from '../cartControl/cartControl'
import Vue from 'vue'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import {formatDate} from '../../common/js/data'
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				seletType: ALL,
				onlyContent: false,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		methods: {
			show() {
				this.showFlag = true
				if (!this.scroll) {
					this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.food, {
						click: true
					})
				})
				} else {
					this.scroll.refresh()
				}
			},
			back() {
				this.showFlag = false
			},
			addFirst(event) {
				if (!event._constructed) {
					return
				}
				Vue.set(this.food, 'count', 1)
			},
			needShow(type, text) {
				if (this.onlyContent && !text) {
					return false // 这里的意思是当点击只显示内容，并且文字是空的，那么这一行就不显示
				}
				if (this.seletType === ALL) {
					return true
				} else {
					return type === this.seletType
				}
			},
			ratingTypeSelect(type) {
				this.seletType = type
				this.$nextTick(() => {
					this.scroll.refresh()
				}) // 这个地方是为了保证DOM及时的变化,如果子元素或者父元素 DOM 结构发生改变的时候，必须重新调用
			},
			contentToggle(text) {
				this.onlyContent = text
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			}
		},
		components: {
			cartcontrol,
			split,
			ratingselect
		},
		filters: {
			formatDate(time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			}
		}
	}
</script>

<style type='stylesheet/scss' lang='scss' scoped>
@import "../../common/scss/mixins";
	.food{
		position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff;
		background-color:#fff;
		 overflow: hidden;
		&.food-enter-active,&.food-leave-active{
			transition:all 0.5s linear;
			transform:translate3D(0,0,0);
		}
		&.food-leave-to,&.food-enter{
			transform:translate3D(100%,0,0);
		}
		.food-content{
			background-color:#fff;
				.image-header{
				position:relative;
				top:0;
				left:0;
				width:100%;
				height:0;
				padding-top:100%;
				.header-img{
					position:absolute;
					left:0;
					top:0;
					width:100%;
					height:100%;
				}
			}
			.back{
				position:absolute;
					top:6px;
					left:0;
				.icon-arrow_lift{
					color:#fff;
					padding:6px;
				}
			}
			.content{
			padding:18px;
			margin-bottom:12px;
			position:relative;
			.header{
				margin-bottom:8px;
				font-size:14px;
				font-weight:700;
				color:rgb(7,17,27);
				line-height:14px;
			}
			.detail{
				margin-bottom:18px;
				font-size:0px;
				color:rgb(147,153,159);
				line-height:10px;
				.sell-count{
					font-size:10px;
					margin-right:12px;
				}
				.rating{
					font-size:10px;
				}
			}
			.price{
				.now{
					font-size:14px;
					font-weight:700;
					color:rgb(240,20,20);
					line-height:24px;
				}
				.old{
					font-size:10px;
					font-weight:700;
					color:rgb(147,153,159);
					line-height:24px;
					text-decoration:line-through;
				}
			}
			.cart-wrapper{
			position:absolute;
			right:12px;
			bottom:12px;
			}
			.buy{
				position:absolute;
				right:18px;
				bottom:18px;
				z-index:60;
				padding:6px 12px 6px 12px;
				font-size:10px;
				color:rgb(255,255,255);
				background-color:rgb(0,160,220);
				line-height:12px;
				border-radius:12px;
			}
		}
			.info{
				padding:18px;
				.title{
					line-height: 14px;
                	margin-bottom: 6px;
               		 font-size: 14px;
                	color: rgb(7, 17, 27);
				}
				.text{
					line-height: 24px;
               	 	padding: 0 8px;
                	font-size: 12px;
                	color: rgb(77, 85, 93);
				}
			}
			.rating{
				padding-top: 18px;
				.title{
					line-height: 14px;
                	margin-left: 18px;
                	font-size: 14px;
                	color: rgb(7, 17, 27);
				}
				.rating-wrappe{
					.rating-item{
						position:relative;
						padding:16px 0 16px 0;
						margin:0 18px 0 18px;
						@include border-1px(rgba(7,17,27,0.1))
						.user{
							position:absolute;
							top:16px;
							right:0;
							.name{
								font-size:10px;
								color:rgb(147,153,159);
								line-height:12px;
								vertical-align:top;
								margin-right:6px;
							}
						}
						.date{
								font-size:10px;
								color:rgb(147,153,159);
								line-height:12px;
								margin-bottom:6px;
						}
						.text{
							.icon{
								display:inline-block;
								font-size:12px;
								line-height:12px;
								margin-right:4px;
								&.icon-thumb_up{
									color:rgb(0,160,220);
								}
								&.icon-thumb_down{
									color:rgb(147,153,159);
								}
							}
							.text-dec{
								display:inline-block;
								font-size:12px;
								color:rgb(7,17,27);
								line-height:16px;
							}
						}
					}
					.no-rating{
						padding:16px 16px;
						font-size:12px;
						color:rgb(147,153,159);
					}
				}
			}
		}
	}
</style>