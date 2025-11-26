<!-- 分页器 -->
<template>
	<view class="page-list flex-center">
		<!-- <view class="list-page flex-center" @click="homeNextPage(0)" v-text="$t('public.SHOUYE')">首页</view> -->
		<view class="list-page sum flex-center" @click="backNextPage(0)"> {{'<'}} </view>
		<view class="list-page sum flex-center" @click="pages = item" :class="item == pages ? 'list-page-on' : ''" v-for="item in totalNums[pageNum]">{{item}}</view>
		<view class="list-page sum flex-center" @click="backNextPage(1)"> {{'>'}} </view>
		<!-- <view class="list-page flex-center" @click="homeNextPage(1)" v-text="$t('public.WEIYE')">尾页</view> -->
	</view>
</template>

<script>
	export default {
		model:{
			prop: 'page',
			event: 'changePage',//事件名称
		},
		props:{
			totalNum:{
				type:[Number,String],
				default: 0,
			}, //总页数
			page:{
				type: [Number,String],
				default: 1, //当前页数
			}
		},
		data() {
			return {
				nums: 5, //每条页数
				pages: 1, //当前页数
				pageNum: 0, //当前第几条的页数
				totalNums: [], //总页数
			};
		},
		created() {
			this.init();
		},
		methods:{
			init(){
				this.pages = Number(this.page); //获取当前页面
				let num = 0;
				this.totalNums = []; //先清空 防止再次出发时叠加数组
				this.totalNums.push([]); //默认添加当前第一个数组
				for(var i=1;i<=this.totalNum;i++) {
					this.totalNums[num].push(i);
					if (i%this.nums == 0) { //每遍历 this.nums 个增加一个数组
						if (i >= Number(this.totalNum)) return; //最后一个时 return 
						num += 1;
						this.totalNums.push([]);
					}
				}
			},
			// 上一页 下一页
			backNextPage(is){
				if (is) { //下一页
				    if (this.pages >= Number(this.totalNum)) return;
					this.pages += 1;
					this.countPage(1); //计算下一页
				} else {  //上一页 
					if (this.pages <= 1) return;
					this.pages -= 1;
					this.countPage(0); //计算上一页
				}
				console.log(this.pages)
			},
			
			// 计算
			countPage(is){
				if (is) { //计算下一页
					if ((this.pages - 1)%this.nums == 0) {
						this.pageNum += 1;
					}
				} else { //计算上一页
					if ((this.pages)%this.nums == 0) {
						this.pageNum -= 1;
					}
				}
			},
			
			// 跳转首页和尾页
			homeNextPage(is){
				if (is) { //尾页
					this.pages = this.totalNum;
					this.pageNum = this.totalNums.length - 1;
				} else { //首页
					this.pages = 1;
					this.pageNum = 0;
				}
			},
		},
		// 监听
		watch: {
			pages(val, onVal){
				// console.log(val + 'watch');
				this.$emit('changePage', val);
			},
			page(val, onVal){
				// console.log(val + 'watch page');
				this.pages = val;
			},
			totalNum(val){
				this.init();
			},
		},
	}
</script>

<style lang="less">
	.page-list{
		margin-bottom: 28rpx;
		width: 100%;
		.list-page{
			margin: 0 7rpx;
			min-width: 58rpx;
			height: 58rpx;
			border-radius: 4rpx;
			border: 2rpx solid #fff;
			font-size: 22rpx;
			font-weight: 400;
			color: #fff;
			line-height: 22rpx;
			cursor: pointer;
		}
		.sum{
			color: #fff;
		}
		.list-page-on{
			background: linear-gradient(270deg, #B0A2F8 0%, #ABF9FB 9%, #F9FAEC 19%, #F6C8F8 30%, #D4DDFA 45%, #EFEBFA 63%, #F4D6FA 76%, #6D73FF 100%);
			// border-radius: 20rpx;
			// border: 2rpx solid #FFFFFF;
			// background: #37B0FE;
			color: #181924;
		}
	} 
</style>
