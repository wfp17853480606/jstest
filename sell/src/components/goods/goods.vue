<template>
	<div class="goods">
		<div class='menu-wrapper' ref='menuWrapper'>
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="clickfoods(index, $event)">
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref='foodWrapper'>
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="foods in item.foods" class="food-item border-1px" @click="foodSelect(foods,$event)">
							<div class="icon">
								<img :src="foods.icon" alt="图片" style="width:57px;height:57px">
							</div>
							<div class="content">
								<h2 class="name">{{foods.name}}</h2>
								<p class="description">{{foods.description}}</p>
								<div class="extra">
									<span class="count">月售{{foods.sellCount}}份</span><span>好评率{{foods.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{foods.price}}</span><span v-show="foods.oldPrice" class="old">￥{{foods.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<div class="cartcontrol">
										<cartControl :food="foods"></cartControl>	
									</div>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopCart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :foodsCount="sellectFoods"></shopCart>
		<div class="foodWrapper">
			<food :food="foodsCount" ref="food"></food>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import shopCart from '../shopCart/shopCart'
import cartControl from '../cartControl/cartControl'
import food from '../food/food'
const ERR_OK = 0
export default{
	props: {
		seller: {
			type: Object
		}
	},
	components: {
		shopCart,
		cartControl,
		food
	},
	data() {
		return {
			goods: [],
			listHeight: [],
			scrollY: 0,
			foodsCount: {}
		}
	},
	computed: {
		currentIndex() {
			for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i]
                    let height2 = this.listHeight[i + 1]
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i
                    }
                }
                return 0
		},
		sellectFoods() {
			let foods = []
			this.goods.forEach((good) => {
				good.foods.forEach((food) => {
					if (food.count) {
						foods.push(food)
					}
				})
			})
			return foods // 筛选出被选择的foods
		}
	},
	methods: {
		_initScroll() {
			this.meunScroll = new BScroll(this.$refs.menuWrapper, {
				click: true // 加上就不会阻止默认行为了
			})
			this.foodScroll = new BScroll(this.$refs.foodWrapper, {
				click: true, // 这里为了cartcontropl组件的click 行为，因为他的那个click是在这个模版里的
				probeType: 3 // 监听实时滚动的位置
			})
			this.foodScroll.on('scroll', (pos) => {
				this.scrollY = Math.abs(Math.round(pos.y))
			}) // 监听scroll，
		},
		_calculateHeight() {
			let foodlist = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
			let height = 0
			this.listHeight.push(height)
			for (let i = 0; i < foodlist.length; i++) {
				let item = foodlist[i]
				height += item.clientHeight
				this.listHeight.push(height)
			}
		},
		clickfoods(index, event) {
			// better-scroll 可以监听到此事件，浏览器原生不能监听到  防止pc端出现两次点,但是我的pc端点击了什么效果也没有
			if (!event._constructed) {
                    return
                } // 单纯的点击没有效果，betterscroll会阻止一些默认行为，所以我们初始化过程需要传一个属性
                let foodlist = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
                let ref = foodlist[index]
                this.foodScroll.scrollToElement(ref, 300)
		},
		foodSelect(foods, event) {
		if (!event._constructed) {
                    return
                }
        this.foodsCount = foods
        this.$refs.food.show()
	}
	},
	created() {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		this.$http.get('/api/goods/').then((responce) => {
			responce = responce.body
			if (responce.errno === ERR_OK) {
				this.goods = responce.data
				this.$nextTick(() => {
					this._initScroll()
					this._calculateHeight()
				})
			}
		})
	}
}
</script>

<style style="stylesheet/scss" lang="scss" scoped>
@import "../../common/scss/mixins";
.goods{
	display:flex;
	position:absolute;
	top:174px;
	bottom:46px;
	width:100%;
	overflow:hidden;
	.menu-wrapper{
		flex:0 0 80px;
		width:80px;//这里写这个是为了一些安卓会不识别，兼容性
		background:#f3f5f7;
		.menu-item{
			display:table;
			height:54px;
			width:56px;
			line-height:14px;
			padding:0 12px;
			&.current {
                    position: relative;
                    margin-top: -1px;
                    z-index: 10;
                    background: #fff;
                    font-weight: 700;
                    .text {
                        @include border-none();
                    }
                }
			.text{
				display:table-cell;
				vertical-align:middle;
				font-size:12px;
				@include border-1px(rgba(7,17,27,0.1))
				.icon{
				vertical-align:top;
                display:inline-block;
                width:12px;
                height:12px;
                margin-right:2px;
                background-size:12px 12px;
                background-repeat:no-repeat;
                  &.decrease {
                      @include bg-image('decrease_3');
                  }
                  &.discount {
                      @include bg-image('discount_3');
                  }
                  &.guarantee {
                      @include bg-image('guarantee_3');
                  }
                  &.invoice {
                      @include bg-image('invoice_3');
                  }
                  &.special {
                      @include bg-image('special_3');
                  }
			}
			}
		}

	}
	.foods-wrapper{
		flex:1;//剩余部分自适应
		.food-list{
			.title{
				font-size:12px;
				color:rgb(147,153,159);
				height:52px;
				line-height:52px;
				padding-left:14px;
				background-color:#f3f5f7;
				border-left:2px solid #d9dde1;
			}
			.food-item{
				padding:18px;
				display:flex;
				@include border-1px(rgba(7,17,27,0.1));
				&:last-child{
					@include border-none();
					padding-bottom:0;
				}
				.icon{
					flex:0 0 57px;
					margin-right:10px;
				}
				.content{
					flex:1;  
					.name{
						margin:2px 0 8px 0;
						height:14px;
						line-height:14px;
						font-size:14px;
						color:rgb(7,17,27);
					}
					.description{
						margin-bottom:8px;
						line-height:13px;
						font-size:10px;
						color:rgb(147,153,159);
					}
					.extra{
						line-height:10px;
						font-size:10px;
						color:rgb(147,153,159);
						.count{
							margin-right:12px;
						}
					}
					.price{
						font-weight:700;
						line-height:24px;
						.now{
							margin-right:18px;
							font-size:14px;
							color:rgb(240,20,20);
						}
						.old{
							text-decoration:line-through;
							font-size:10px;
							color:rgb(147,153,159);
						}
					}
					.cartcontrol-wrapper{
						position:absolute;
						right:0;
						bottom:12px;
					}
				}

			}
		}

	}
}
</style>