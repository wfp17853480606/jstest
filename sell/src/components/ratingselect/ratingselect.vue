<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span class="block positive" :class="{'active':seletType2===2}" @click='selet(2,$event)'>{{desc.all}} <span class="count">{{ratings.length}}</span>
		</span>
			<span class="block positive" :class="{'active':seletType2===0}" @click='selet(0,$event)'>{{desc.positive}}<span class="count">{{positives.length}}</span>
		</span>
			<span class="block negative" :class="{'active':seletType2===1}" @click='selet(1,$event)'>{{desc.negative}}<span class="count">{{negatives.length}}</span>
		</span>
		</div>
		<div class="switch" :class="{'on':onlyContent2}" @click="toggleContent($event)">
			<i class="icon-check_circle"></i>
            <span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
	export default{
		props: {
			ratings: {
				type: Array,
				default() {
					return []
				}
			}, // 这个应该是管理评论数量的
			seletType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			}, // 控制是否显示只看内容
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			} // 定义一个描述的对象,为了那三个span中的文字
		},
		data() {
			return {
				seletType2: this.seletType,
				onlyContent2: this.onlyContent
			}
		},
		methods: {
			selet(type, event) {
				if (!event._constructed) {
					return
				}
				this.seletType2 = type
				this.$emit('ratingType-select', type) // 子组件动态的把值改变了，父组件是没有变的，设定一个事件，把type的值传出去,然后父组件监听事件
			},
			toggleContent(event) {
				if (!event._constructed) {
					return
				}
				this.onlyContent2 = !this.onlyContent2
				this.$emit('toggleContent', this.onlyContent2)
			}
		},
		computed: { // 使用过滤
			negatives() {
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE
                })
            },
            positives() {
            return this.ratings.filter((rating) => {
            return rating.rateType === POSITIVE
            })
			} // 不知道为什么，filter不会用，待会看看，传入的rating到底是什么
		}
	}
</script>

 <style type="stylesheet/scss" lang='scss' scoped>
 @import "../../common/scss/mixins";
 	.ratingselect{
 		@include border-1px(rgba(7,17,27,0.1));
 		.rating-type{
 			margin: 0 18px 0 18px;
 			padding:18px 0 18px 0;
 			font-size: 0px;
 			@include border-1px(rgba(7,17,27,0.1));
 			.block{
 				display:inline-block;
 				font-size:12px;
 				padding:8px 12px 8px 12px;
 				margin-right:8px;
 				text-align:center;
 				line-height:16px;
 				color:rgb(77,85,93);
 				border-radius:2px;
 				&.active{
 					color:#fff;
 				}
 				&.positive{
 					background-color:rgba(0,160,220,0.2);
 					&.active{
 						background-color:rgb(0,160,220)
 					}
 				}
 				&.negative{
 					background-color:rgba(77,85,93,0.2);
 					&.active{
 						background-color:rgb(77,85,93)
 					}
 				}
 			}	
 		}
 		.switch{
 			margin: 0 18px 0 18px;
 			padding:12px 0 12px 0;
 			color:rgb(147,153,159);
 			font-size:0;
 			&.on{
 				.icon-check_circle{
 					color:#004850;
 				}
 			}
 			.icon-check_circle{
 				display: inline-block;
 				vertical-align:top;
 				margin-right:4px;
 				font-size:24px;
 				line-height:24px;
 			}
 			.text{
 				display: inline-block;
 				vertical-align:top;
 				font-size:12px;
 				line-height:24px;
 			}
 		}
 	}
 </style>