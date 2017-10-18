<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
	</div>
</template>

<script>
import Vue from 'vue'
	export default{
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart() {
				if (!event._constructed) {
                    return
                }
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1) // 因为count原来是不存在的，我们这里使用vued jc set
					this.food.count = 1
				} else {
					this.food.count++
				}
			},
			decreaseCart() {
				if (!event._constructed) {
                    return
                }
				this.food.count--
			}
		}
	}
</script>

<style type="stylesheet/scss" lang="scss" scoped>
	.cartcontrol{
		font-size:0;
		.cart-decrease{
			display:inline-block;
			padding:6px;
			&.move-enter-active,&.move-leave-active{
				opacity:1;
				transform:translate3D(0,0,0);
				transition:all 0.4s linear
			}
			.inner{
				display:inline-block;
				font-size:24px;
				line-height:24px;
				color:rgb(0,160,220);
				transition:all 0.4s linear;
			}
			&.move-enter,&.move-leave-to{
				opacity:0;
				transform:translate3D(24px,0,0);
				.inner{
					transform:rotate(180deg);
				}
			}
		}
		.cart-count{
			display:inline-block;
			vertical-align:top;
			padding-top:6px;
			width:12px;
			font-size:10px;
			text-align:center;
			line-height:24px;
			color:rgb(147,153,159);
		}
		.cart-add{
			display:inline-block;
			padding:6px; // 只是为了单纯的点的区域多一点
			font-size:24px;
			line-height:24px;
			color:rgb(0,160,220)
		}
	}
</style>