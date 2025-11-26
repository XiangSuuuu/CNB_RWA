<template>
	<view class="collapse-box">
		<!-- 标题行 -->
		<view class="flex-lr header" @click="toggleExpand">
			<view class="title-text">{{ title }}</view>
			<view class="flex-r">
				<view class="toggle-text">{{ isExpanded ? '收起' : '展开' }}</view>
				<image src="/static/public/arrow-down.png" class="arrow" :class="{ rotate: isExpanded }"></image>
			</view>
		</view>

		<!-- 内容区（带动画） -->
		<transition name="expand">
			<view v-show="isExpanded" class="expand-content">
				<slot></slot> <!-- 👈 动态插入外部内容 -->
			</view>
		</transition>
	</view>
</template>

<script>
	export default {
		name: "CollapseBox",
		props: {
			title: {
				type: String,
				required: true
			},
			defaultExpand: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				isExpanded: this.defaultExpand
			};
		},
		methods: {
			toggleExpand() {
				this.isExpanded = !this.isExpanded;
				this.$emit("change", this.isExpanded); // 可监听展开状态变化
			}
		}
	};
</script>

<style scoped>
	.collapse-box {
		background: transparent;
		margin-top: 30rpx;
	}

	/* 顶部标题 */
	.header {
		padding: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.title-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #ffffff;
	}

	.toggle-text {
		color: #ffb92f;
		font-size: 24rpx;
		font-weight: 400;
		margin-right: 10rpx;
	}

	.arrow {
		width: 40rpx;
		height: 40rpx;
		transition: transform 0.3s;
	}

	.arrow.rotate {
		transform: rotate(180deg);
	}

	/* 动画 */
	.expand-enter-active,
	.expand-leave-active {
		transition: all 0.3s ease;
		overflow: hidden;
	}

	.expand-enter,
	.expand-leave-to {
		opacity: 0;
		max-height: 0;
	}

	.expand-enter-to,
	.expand-leave {
		opacity: 1;
		max-height: 1000rpx;
	}
</style>