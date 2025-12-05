<template>
	<view style="width: 100%; height: 146rpx; padding: 0 50rpx; position: fixed;bottom: 0;">
		<view class="bottom-bar flex-center">
			<view style="display: flex;
		justify-content: space-around;
		align-items: center; width: 85%;">
				<view class="tab-item" v-for="(item, index) in tabs" :key="index" :class="{ active: index === currentIndex }"
					@click="changeTab(index)">
					<image  :src="urlName === item.path ? item.selectedIcon : item.icon" class="tab-icon" />
					<text :class="urlName === item.path ?'tab-text-active' : 'tab-text'">{{ item.text }}</text>
				</view>
			</view>
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
						selectedIcon: "/static/tabbar/home_selected.png",
						path: "/"
					},
					{
						text: "生态权益",
						icon: "/static/tabbar/ecology.png",
						selectedIcon: "/static/tabbar/ecology_selected.png",
						path: "/trade"
					},{
						text: "交易大厅",
						icon: "/static/tabbar/trade.png",
						selectedIcon: "/static/tabbar/trade_selected.png",
						path: "/checkInfo"
					},{
						text: "我的",
						icon: "/static/tabbar/mine.png",
						selectedIcon: "/static/tabbar/mine_selected.png",
						path: "/mine"
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
		
		height: 157rpx;
		width: 100%;
		/* margin:0 50rpx 0 50rpx; */
		background: url('/static/public/bottom_bg.png') no-repeat;
		background-size: 100% 100%;
	}

	.tab-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #999;
	}


	.tab-icon {
		width: 68rpx;
		height: 68rpx;
	}

	.tab-text {
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFFCC;
	}
	.tab-text-active {
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>