<template>
	<view class="bottom-bar">
		<view class="tab-item" v-for="(item, index) in tabs" :key="index" :class="{ active: index === currentIndex }"
			@click="changeTab(index)">
			<image  :src="urlName === item.path ? item.selectedIcon : item.icon" class="tab-icon" />
			<text class="tab-text">{{ item.text }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			currentIndex: Number
		},
		data() {
			return {
				urlName: '',
				tabs: [{
						text: "首页",
						icon: "/static/tabbar/home.png",
						selectedIcon: "/static/tabbar/home_in.png",
						path: "/"
					},
					{
						text: "交易",
						icon: "/static/tabbar/transt.png",
						selectedIcon: "/static/tabbar/transt_in.png",
						path: "/trade"
					},{
						text: "收益",
						icon: "/static/tabbar/income.png",
						selectedIcon: "/static/tabbar/income_in.png",
						path: "/checkInfo"
					}
				]
			};
		},
		methods: {
			changeTab(index) {
				uni.switchTab({
					url: this.tabs[index].path
				});
			}
		},
		watch:{
			$route: {
				handler(newVal) {
					// this.routerInit();
					console.log(newVal)
					this.urlName = newVal.path;
				},
				immediate: true,
				deep: true // 表示开启深度监听
			},
		}
	};
</script>

<style scoped>
	.bottom-bar {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100rpx;
		border-top: 1px solid #eee;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.tab-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #999;
	}

	.tab-item.active {
		color: #007aff;
	}

	.tab-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.tab-text {
		font-size: 20rpx;
	}
</style>