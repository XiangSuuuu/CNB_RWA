<template>
	<transition name="el-fade-in-linear">
		<view class="model-type flex-center" v-if="visible" @click="cancel()">
			<view class="wraps" @click.stop :style="'width:'+width+'%'">
				<image src="/static/public/close.png?1" v-if="close" @click="cancel()" mode="widthFix" class="close-img"></image>
				<view class="head-tops flex-center">{{text}}</view>
				<view class="contents">
					<slot></slot>
				</view>
			</view>
		</view>
	</transition>
</template>

<script>
	export default {
		props:{
			visible: {
			  type: Boolean,
			  default: false
			},
			close: {
			  type: Boolean,
			  default: true
			},
			text: {
				type: String,
				default: ''
			},
			width: {
				type: [String, Number],
				default: '90'
			},
		},
		data() {
			return {
				
			};
		},
		created() {
		},
		methods:{
			// 取消
			cancel(){
				if (this.close) {
					this.$emit('update:visible', false)
				}
			},
			
			// 确认
			confirm(){
				this.$emit('onConfirm')
			}
		},
	}
</script>

<style lang="less">
	.wraps {
		width: 90%;
		position: relative;
		// background: #FFFFFF;
		background-size: 100% 100%;
		border-radius: 12rpx;
	}
	.close-img {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		top: 28rpx;
		right: 24rpx;
		z-index: 10;
	}
	.head-tops {
		width: 100%;
		height: 98rpx;
		color: #333333;
		font-size: 30rpx;
		text-align: center;
		position: relative;
		z-index: 1;
	}
	.img-hengs {
		width: 100%;
	}
	.contents {
		width: 100%;
		min-height: 215rpx;
		padding: 20rpx 26rpx;
		padding-top: 14rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 1;
	}
</style>
