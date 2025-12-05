<template>
	<view v-if="urlName =='/' || urlName == '/index'|| urlName == '/mine'|| urlName == '/ecologicalRights' || urlName == '/tradingHall'" style="width: 100%; height: 146rpx; padding: 0 50rpx; position: fixed;bottom: 0; z-index: 999;">
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
			currentIndex: Number,
			// urlName: '',
		},
		data() {
			return {
				urlName: '',
				tabs: [{
						text: this.$t('index._TEXT175'),
						icon: "/static/tabbar/home.png",
						selectedIcon: "/static/tabbar/home_selected.png",
						path: "/"
					},
					{
						text: this.$t('index._TEXT176'),
						icon: "/static/tabbar/ecology.png",
						selectedIcon: "/static/tabbar/ecology_selected.png",
						path: "/ecologicalRights"
					},{
						text: this.$t('index._TEXT177'),
						icon: "/static/tabbar/trade.png",
						selectedIcon: "/static/tabbar/trade_selected.png",
						path: "/tradingHall"
					},{
						text: this.$t('index._TEXT178'),
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