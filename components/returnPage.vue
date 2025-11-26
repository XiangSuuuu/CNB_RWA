<template>
	<view class="return-pages flex-center">
		<view class="rows" @click="returnPage()" style="position: absolute; left: 0;">
			<image src="/static/index/lts.png" mode="widthFix" style="width: 40rpx;cursor: pointer;" class="re-icon">
			</image>
		</view>
		<view style="color: #333333; font-weight: 700; font-family:'Microsoft YaHei' ; font-size: 30rpx;"
			class="rows rows-text flex-center">{{text}}</view>
		<view style="position: absolute; right: 0; color: #333333; font-weight: 500; font-family:'Microsoft YaHei' ; font-size: 25rpx;" class="rows" @click="confirm()">
			{{recordText}}
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: '',
			},
			recordText: {
				type: String,
				default: '',
			},
		},
		data() {
			return {};
		},
		created() {},
		methods: {
			// 确认
			confirm() {
				this.$emit('onConfirm')
			},

			returnPage() {
				uni.navigateBack({
					delta: 1
				});
			},
		},
	}
</script>

<style lang="less">
	.return-content-wrap {
		width: 100%;
		height: 88rpx;
		box-sizing: border-box;
		position: sticky;
		top: 120rpx;
	}

	.return-pages {
		position: sticky;
		top: 120rpx;
		z-index: 98;
		
	}

	.row {
		width: 20%;
	}

	.re-icon {
		cursor: pointer;
	}

	.row-text {
		width: 472rpx;
	}

	.re-text {
		color: #35FFAB;
		cursor: pointer;
	}
</style>