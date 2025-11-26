<template>
	<view class="none-content-wrap">
		<image src="/static/public/none.png" mode="widthFix" class="none-img"></image>
		<!-- <view class="none-img flex-center mt20" v-text="text || $t('index._TEXT19')"></view> -->
	</view>
</template>

<script>
	export default {
		props:{
			text: {
				type: String,
				default: '',
			},
		},
		data() {
			return {};
		},
		created() {
		},
		methods:{
		},
	}
</script>

<style lang="less">
	.none-content-wrap {
		width: 100%;
		text-align: center;
		border-radius: 8px;
		padding:27px;
		box-sizing: border-box;
		position: relative;
		z-index: 10;
		margin-top: 40rpx;
		.none-img {
			width: 300rpx;
			height: 490rpx;
			// background: url('../static/public/none.png') no-repeat;
			// background-size: 100% auto;
			text-align: center;
			color: #F9D326;
			font-size: 32rpx;
			// padding-top: 40rpx;
			box-sizing: border-box;
		}
	}
</style>
