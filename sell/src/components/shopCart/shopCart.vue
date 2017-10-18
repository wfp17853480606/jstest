<template>
	<div class="shopCart">
		<div class="content" @click="toggleList">
			<div class="left">
			<div class="shopWarpper">
				<div class="shopicon" :class="{'highlight':totalCount>0}">
					<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
				</div>
				<div class="num" v-show="totalCount>0">{{totalCount}}</div>
			</div>
			<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
			<div class="dec">另需配送费￥{{deliveryPrice}}元</div>
		</div>
		<div class="right" :class="{'highlight':totalPrice>=minPrice}" @click.stop.prevent="pay">
			<div class="rcontent" :class="{'highlight':totalPrice>=minPrice}">{{payDesc}}</div>
		</div>
		</div>
		<transition name="fold">
		<div class="cart-fold" v-show="listshow">
			<div class="header">
				<h1 class="title">购物车</h1>
				<span class="empty" @click="empty">清空</span>
			</div>
			<div class="bt-content" ref="listContent">
				<ul>
					<li class="content-wrapper" v-for="food in foodsCount">
						<span class="name">{{food.name}}</span>
						<div class="price">￥{{food.price}}</div>
						<cartcontrol :food='food' class="cartcontrol"></cartcontrol>
					</li>
				</ul>
			</div>
		</div>
		</transition>
		<transition name="bg">
		<div class="bg" v-show="listshow" @click="hide"></div>
		</transition>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartControl/cartControl'
	export default{
		props: {
			foodsCount: {
				type: Array,
				default() {
					return []
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				fold: true
			}
		},
		methods: {
			toggleList() {
				if (!this.totalCount) {
					return
				}
				this.fold = !this.fold
			},
			empty() {
				this.foodsCount.forEach((food) => {
					food.count = 0
				})
			},
			hide() {
				this.fold = true
			},
			pay() {
				if (this.totalPrice < this.minPrice) {
					return
				}
				window.alert('You should pay for $' + this.totalPrice)
			}
		},
		components: {
			cartcontrol
		},
		computed: {
			totalPrice() {
				let total = 0
				this.foodsCount.forEach((food) => {
					total += food.price * food.count
				})
				return total
			}, // 计算的是总价格
			totalCount() {
				let count = 0
				this.foodsCount.forEach((food) => {
				count += food.count
				})
				return count
			}, // 计算出总的数量，为了购物车上边那个小标志的数
			payDesc() {
				// 第一种如果说是0元什么都没买的话，那就差minPrice个价格
				let decPrice = 0
				if (this.totalPrice === 0) {
					decPrice = '￥' + this.minPrice + '起送'
				} else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
					decPrice = '还差￥' + (this.minPrice - this.totalPrice) + '起送'
				} else {
					decPrice = '去结算'
				}
				return decPrice
			},
			listshow() {
				if (!this.totalCount) {
					this.fold = true
					return false
				}
				let show = !this.fold
				if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new BScroll(this.$refs.listContent, {
                                click: true
                            })
                        } else {
                            // 重新计算better-scroll高度
                            this.scroll.refresh()
                        }
                    })
                }
				return show
			}

		}
	}
</script>

<style type="stylesheet/scss" lang="scss" scoped>
@import "../../common/scss/mixins";
	.shopCart{
		position:fixed;
		left:0;
		bottom:0;
		width:100%;
		z-index:50;
		.content{
			position:relative;
			display: flex;
            background: #141d27;
            font-size: 0;
            color: rgba(255, 255, 255, .4);
			.left{
				flex:1;
				.shopWarpper{
					vertical-align: top;
					display:inline-block;
					position:relative;
					margin-top:-10px;
					width:56px;
					height:56px;
					padding:6px;
				margin-left:12px;
					margin-right:12px;
					box-sizing:border-box;
					background-color:#141d27;
					border-radius:50%;
					text-align:center;
					.shopicon{
						width:100%;
						height:100%;
						border-radius:50%;
						background-color:#2b343c;
						&.highlight{
							background-color:rgb(0,160,220);
						}
					}
					.icon-shopping_cart{
						font-size:24px;
						line-height:44px;
						&.highlight{
							color:#fff;
						}
					}
					.num{
						position:absolute;
						top:0;
						right:0;
						width:24px;
						height:16px;
						line-height:16px;
						background-color:rgb(240,20,20);
						color:rgb(255,255,255);
						border-radius:16px;
						font-size:9px;
						font-weight:700;
						box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
					}
				}
				.price{
					display:inline-block;
					vertical-align:top;
					 margin-top:12px;
					 padding-right:12px;
				 	font-size:16px;
				 color:rgba(255,255,255,0.4);
				 	font-weight:700;
				 	line-height:24px;
				 	box-sizing: border-box;
				 	border-right:1px solid rgba(255,255,255,0.1);
				 	&.highlight{
				 		color:#fff;
				 	}
				}
				.dec{
					display:inline-block;
					vertical-align:top;
					margin:12px 0 0 12px;
					box-sizing:border-box;
					font-size: 10px;
					color:rgba(255,255,255,0.4);
					font-weight:700px;
					line-height:24px;
				}	
				}
			.right{
				flex:0 0 105px;
				width:105px; //兼容
				padding:0 8px;
				background-color:#2b343c;
				box-sizing:border-box;
				margin-left:12px;
				display:flex;
				justify-content:center;
				align-items:center;
				@media only screen and (max-width:320px) {
					flex:0 0 80px;
				width:80px;
				}
				&.highlight{
						background-color:#00b43c;
					}
				.rcontent{
					font-size:12px;
					color:rgba(255,255,255,0.4);
					font-weight:700;
					&.highlight{
						color:#fff;
					}
				}
			}
		}
		.cart-fold{
			position:absolute;
			bottom:0;
			left:0;
			padding-bottom:46px;
			width:100%;
			z-index:-1;
			background-color:#fff;
            &.fold-enter-active, &.fold-leave-active {
                transition: all .5s;
                transform:translateY(0)
            }
            &.fold-enter, &.fold-leave-to {
            	transform:translateY(100%)
            }
			.header{
				height:40px;
				line-height:40px;
				padding:0 18px 0 18px;
				background-color:#f3f5f7;
				border-bottom:2px solid rgba(7,17,27,0.1);
				.title{
					font-size:14px;
					color:rgb(7,17,27);
					float:left;
				}
				.empty{
					font-size:12px;
					color:rgb(0,160,220);
					float:right;
				}

			}
			.bt-content{
				max-height:217px;
				width:100%;
				overflow:hidden;
				.content-wrapper{
					position:relative;
					height:48px;
					padding:0 18px 0 18px;
					background-color:#fff;
					@include border-1px(rgba(7,17,27,0.1));
					.name{
						font-size:14px;
						color:rgb(7,17,27);
						line-height:48px;
					}
					.price{
						position:absolute;
						top:17px;
						right:90px;
						font-size:14px;
						color:rgb(240,20,20);
					}
					.cartcontrol{
						position:absolute;
						top:6px;
						right:0;

					}
				}
			}
		}
		.bg{
			position:fixed;
			top:0;
			left:0;
			width:100%;
			height:100%;
			background-color:rgba(7,17,27,0.6);
			font-size:0;
			z-index:-2;
			&.bg-enter-active, &.bg-leave-active {
                transition: all .5s;
                opacity:1

            }
            &.bg-enter, &.bg-leave-to {
            	opacity:0
            }
		}
	}
</style>