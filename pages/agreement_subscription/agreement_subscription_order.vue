<template>
	<view class="pages">
		
		<view class="head-wrap flex-center">
			<view class="title">
				VeriBridge One 协议申购
			</view>
			<image src="/static/public/arrow-left-white.png" @click="returnPage()" mode="widthFix" class="back_img">
			</image>
		</view>
		
		<view style="width: 100%;" class="flex-center">
			<view style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
			  <image src="/static/public/ok.png" style="width: 96rpx; height: 96rpx;"></image>
			  <view style="font-size: 30rpx; font-weight: 500; margin-top: 24rpx;">
			    购买成功
			  </view>
			</view>
		</view>
		<view style="width: 100%; height: 2rpx; background-color:#FFFFFF26 ; margin-top: 48rpx;"></view>
		<view class="flex-l" style="margin-top: 40rpx;">
			<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
			<view style="width: 8rpx;"></view>
			<view style="font-size: 24rpx; font-weight: 400; color: white;">
				申购记录
			</view>
		</view>
		<CollapseBox class="box" title="申购记录">
			<view v-for="(item, index) in depositRecords" :key="index">
				<view class="flex-lr" style="padding: 20rpx 20rpx">
					<view style="font-size: 24rpx; color: #FFFFFFCC;">{{item.createTime}}</view>
					<view  style="font-size: 24rpx; color: #FFFFFFCC;">
						申购{{truncateToFixed((item.money/unitNum),2)}} USDT协议
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
			</view>
		</CollapseBox>
	</view>
	
</template>

<script>
	const BigNumber = require('bignumber.js');
	import {
		mapGetters,
		mapMutations,
		mapState,
		mapActions
	} from 'vuex';
	import Model from '@/components/model.vue';
	import CollapseBox from "@/pages/agreement_order/components/CollapseBox.vue";
	import {
		uniGrid,
		uniGridItem
	} from '@dcloudio/uni-ui'
	export default {
		components: {
			Model,
			CollapseBox
		},
		data() {
			return {
				loading: false,
				unitNum: 10 ** 18,
				depositRecords:null
			}
		},
		watch: {
			userData: {
				handler(n, o) {
					if (n) {
						console.log(n)
						if (!n.invitationCode) {
							this.activeModel = true;
							if (this.$Common.getPar('invite_code') || uni.getStorageSync('inviteCode')) { //邀请地址
								this.inviteCode = this.$Common.getPar('invite_code') || uni.getStorageSync('inviteCode');
								uni.setStorageSync('inviteCode', this.inviteCode)
								this.setInvite();
							}
						} else {
							if (uni.getStorageSync('accessToken')) {
								this.getConfigs();
							}
							this.activeModel = false;
						}
					}
				},
				immediate: true,
				deep: true // 表示开启深度监听
			},
			myAddress: {
				handler(n, o) {
					if (n) {
						this.gainUserData();
						// this.autoLogin();
					}
				},
				immediate: true,
				deep: true // 表示开启深度监听
			},
		},
		computed: {
			...mapState(['myAddress', 'myRelation', 'tokenData', 'signature', 'userData', 'totalContract']),
		},
		mounted() {
			this.init();
		},
		methods: {
			...mapActions(['gainUserData']),
			init() {
				this.getDepositRecords()
			},
			getDepositRecords() {
				return this.$Request.get('app/getBuyNodeList', {
				}).then((res) => {
					if (res.code == 200) {
						this.depositRecords = res.data;
					}
					
				});
			},
			skipPageUrl(url) {
				window.open(url)
			},
			returnPage() {
				uni.navigateBack({
					delta: 1
				});
				// this.$Router.push({
				// 	path: '/',
				// })
			},
			skipUrl(name, params) {
				if (this.activeModel) return this.$Common.showToast(this.$t('index._TEXT10'));
				this.$Router.push({
					path: name,
					query: params
				})
			},
		},
		beforeDestroy() {
			clearInterval(this.timer); // 在组件销毁前清除定时器，防止内存泄漏
		}
	}
</script>

<style lang="less">
	.pages {

		.gradient-stack {
		  position: fixed;
		  bottom: 60rpx; /* 距离底部距离，可按需调整 */
		  left: 0;
		  width: 100%;
		  height: 136rpx; /* 最大层高度 */
		  display: flex;
		  justify-content: center;
		  align-items: center;
		  z-index: 10; /* 确保在前景可见 */
		}
		
		.layer {
		  position: absolute;
		  border-radius: 40rpx;
		  // width: 100%; /* 控制整体宽度比例，可按需改 */
		  left: 50%;
		  transform: translateX(-50%);
		}
		
		.layer1 {
		  height: 136rpx;
		  width: 700rpx;
		  background: linear-gradient(45deg, #ffb92f20 0%, #F8FF2F20 100%);
		}
		
		.layer2 {
		  height: 116rpx;
		  width: 676rpx;
		  background: linear-gradient(45deg, #ffb92f50 0%, #F8FF2F50 100%);
		}
		
		.layer3 {
		  height: 92rpx;
		  width: 652rpx;
		  background: linear-gradient(45deg, #ffb92f 0%, #F8FF2F 100%);
		}


		.box {
			background-color: #36343080;
			border-radius: 20rpx;
			border: #FFFFFF33 2rpx solid;
		}

		.button {
			background: linear-gradient(90deg, #FFB92F 0%, #F8FF2F 100%);
			border-radius: 40rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #000000;
		}

		.head-wrap {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			padding: 0 40rpx;
			height: 120rpx;
			// background: #171717;
			box-sizing: border-box;
			z-index: 100;

			.title {
				font-family: 'PingFang SC';
				font-size: 30rpx;
				font-weight: 500;
				color: white;
			}

			.back_img {
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				left: 0;
				margin-left: 24rpx;
			}

		}
	}

	@media screen and (min-width:826px) {
		.head-wrap {
			width: 720px;
			left: calc(50% - 360px);
			margin: 0 auto;
		}
	}
</style>