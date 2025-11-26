<!-- 自定义组件 v-model 实现原理 -->
<template>
	<view class="input-inp-wrap flex-lr">
		<input type="text" class="inps" :value="totalNum" placeholder="请填写正确的字母" @input="changeInp"/>
		<view class="verification-content flex-center" @click="init">
			<view class="price num" v-text="num"></view>
			<view class="price jia">+</view>
			<view class="price num1" v-text="num1"></view>
			<view class="price deng">=</view>
			<view class="price deng">?</view>
		</view>
	</view>
</template>

<script>
	export default {
		model: {
			prop: 'totalNum',//指向props的参数名
			event: 'change',//事件名称
		},
		props:{
			totalNum: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				num: 0,
				num1: 0,
			};
		},
		created() {
			console.log('随机')
			this.init();
		},
		methods:{
			// 随机获取
			init(){
				this.num = this.random(1, 100);
				this.num1 = this.random(1, 100);
			},
			
			// 获取随机1-100
			random(min, max) {
			  return Math.floor(Math.random() * (max - min)) + min;
			},
			
			changeInp(even){
				this.$emit('change', even.target.value);
				// const number = Number(this.num) + Number(this.num1);
				this.$emit('getNum', (Number(this.num) + Number(this.num1)));
			},
		},
		watch:{
		},
	}
</script>

<style lang="less">
	.input-inp-wrap {
		margin-bottom: 0;
		padding-right: 0;
		overflow: hidden;
		.inps {
			width: 300rpx;
		}
	}
	.verification-content {
		width: 220rpx;
		height: 88rpx;
		background: #d5d5d5;
		font-weight: bold;
		.price {
			font-size: 35rpx;
			color: #333333;
		}
		.num {
			color: #02330e;
		}
		.num1 {
			color: #330b32;
		}
		.deng {
			color: #062133;
		}
	}
</style>
