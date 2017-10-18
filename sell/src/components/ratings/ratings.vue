<template>
	<div class='rating' ref='rating'>
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="scroe">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore" class="star"></star>
						<span class="score">{{ seller.serviceScore }}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品质量</span>
						<star :size="36" :score="seller.score" class="star"></star>
						<span class="score">{{ seller.score }}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="text">送达时间</span>
						<span class="time">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :seletType='seletType' :onlyContent='onlyContent' :ratings='ratings' v-on:ratingType-select='ratingTypeSelect' v-on:toggleContent='contentToggle'></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for='rating in ratings' class='rating-item' v-show="needShow(rating.rateType,rating.text)">
						<div class="avatar">
							<img :src="rating.avatar" alt="头像" width='28' height='28'>
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="36" :score="seller.serviceScore" class="star"></star>
								<span class="text" v-show='rating.deliveryTime'>{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="time">{{rating.rateTime | formatDate}}</p>
							<div class="dec">{{rating.text}}</div>
							<div class="recommend">
								<i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
								<span class="item" v-for="item in rating.recommend">{{item}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import Bscroll from 'better-scroll'
import {formatDate} from '../../common/js/data'
const ERR_OK = 0
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
	export default{
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			star,
			split,
			ratingselect
		},
		data() {
			return {
				ratings: [],
				seletType: ALL,
				onlyContent: true
			}
		},
		methods: {
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
			}
		},
		created() {
			this.$http.get('/api/ratings').then((responce) => {
				responce = responce.body
				if (responce.errno === ERR_OK) {
					this.ratings = responce.data
				}
				this.$nextTick(() => {
					this.scroll = new Bscroll(this.$refs.rating, {
						click: true
					})
				})
			}) // 请求到数据
		},
		filters: {
			formatDate(time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			}
		}
	}
</script>

<style type="stylesheet/scss" lang="scss" scoped>
@import "../../common/scss/mixins";
.rating{
	position: fixed;
        top: 174px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        .ratings-content{
		.overview{
			display:flex;
			.overview-left{
				flex:0 0 137px;
				width:137px; // 再说一遍兼容
				margin:18px 0;
				text-align:center;
				border-right:1px solid rgba(147,153,159,0.1);
				@media only screen and (max-width: 320px){
					flex:0 0 100px;
					width:100px;
				} // 针对于iphon5这种小屏幕
				.scroe{
					margin-bottom:6px;
					font-size:24px;
					color:rgb(255,153,0);
					line-height:28px;
				}
				.title{
					margin-bottom:8px;
					font-size:12px;
					color:rgb(7,17,27);
					line-height:12px;
				}
				.rank{
					margin-bottom:12px;
					font-size:10px;
					color:rgb(147,153,159);
					line-height:10px;
				}
			}
			.overview-right{
				flex:1;
				margin:18px 24px;
				@media only screen and (max-width: 320px) {
                    margin-left: 6px;
                }
				.score-wrapper{
					margin-bottom:8px;
					font-size:0;
					.title{
						font-size:12px;
						color:rgb(7,17,27);
						line-height:18px;
					}
					.star{
						display:inline-block;
						margin:0 12px;
					}
					.score{
						font-size:12px;
						color:rgb(255,153,0);
						line-height:18px;
					}
				}
			}
			.delivery-wrapper{
				.text{
					font-size:12px;
					color:rgb(7,17,27);
					line-height:18px;
					margin-right:12px;
				}
				.time{
					font-size:12px;
					color:rgb(147,153,159);
					line-height:18px;
				}
			}
		}
		.rating-wrapper{
			padding:0 18px;
			.rating-item{
				display: flex;
				padding: 18px 0;
				@include border-1px(rgba(7,17,27,0.1))
				.avatar{
					width:28px;
					flex:0 0 28px;
					margin-right: 12px;
					img{
						border-radius:50%;
					}
				}
				.content{
					flex:1;
					position:relative;
					.name{
						margin-bottom:4px;
						font-size:10px;
						color:rgb(7,17,27);
						line-height:12px;
					}
					.star-wrapper{
						margin-bottom:6px;
						font-size:0;
						.star{
							display: inline-block;
                            vertical-align:middle;
                            font-size: 10px;
                            margin-right: 6px;
						}
						.text{
							display: inline-block;
                            vertical-align:middle;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
						}
					}
					.time{
						position:absolute;
						top:0;
						right:0;
						font-size:10px;
						font-weight:200;
						color:rgb(147,153,159);
						line-height:12px;
					}
					.dec{
						margin-bottom:8px;
						font-size:14px;
						line-height:18px;
						color:rgb(7,17,27);
					}
					.recommend{
						.icon-thumb_up,.item{
							display: inline-block;
                            margin: 0 8px 4px 0;
                            font-size: 9px;
						}
						.icon-thumb_up{
							color: rgb(0, 160, 220);
						}
						.item{
							padding:0 6px;
							border:solid 1px rgba(7,17,27,0.1);
							border-radius: 1px;
                            color: rgb(147, 153, 159);
                            background: #fff;
                            line-height:16px;
						}
					}
				}
			}
		}
	}
}
</style>