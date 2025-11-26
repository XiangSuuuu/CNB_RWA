<template>
	<view class="pages">
		<view class="head-wrap flex-center">
			<view class="title">
				VeriBridge One 协议申购
			</view>
			<image src="/static/public/arrow-left-white.png" @click="returnPage()" mode="widthFix" class="back_img">
			</image>
		</view>
		<view class="flex-l">
			<view style="width: 6rpx; height: 40rpx; background-color: #FFB92F; margin-bottom: 60rpx;">

			</view>
			<view class="box" style="width: 100%; height: 170rpx; padding: 30rpx;">
				<view class="flex-lr">
					<view class="flex-l" style="font-size: 30rpx; font-weight: 500;">
						参与金额
					</view>
					<view class="flex-r" style="font-size: 24rpx; font-weight: 400;">
						余额：{{USDTBalance}} USDT
					</view>
				</view>
				

				<view style="height: 20rpx;"></view>

				<view class="flex-lr">
					<view class="inp-wrap flex-lr">
						<input style="color: #FFFFFF;" type="text" v-model="selectedAmount" placeholder="请输入100的倍数">
						<view style="color: #FFFFFF;">USDT</view>
					</view>
				</view>
			</view>
		</view>

		<view class="flex-l" style="margin-top: 40rpx;">
			<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
			<view style="width: 8rpx;"></view>
			<view style="font-size: 24rpx; font-weight: 400; color: white;">
				配置规则：
			</view>
		</view>
		<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFB2; margin-top: 10rpx;">
			按1000USDT举例，协议申购成功，自动分成两部分:</br>
			·50% →500USDT自动购买VBO矿机，不可赎回。</br>
			·50% →500USDT参与理财去复利，理财资产可随时赎回。
		</view>
		
		<CollapseBox class="box" title="申购记录">
			<view v-for="(item, index) in depositRecords" :key="index">
				<view class="flex-lr" style="padding: 20rpx 20rpx">
					<view style="font-size: 24rpx; color: #FFFFFFCC;">{{item.createTime}}</view>
					<view  style="font-size: 24rpx; color: #FFFFFFCC;">
						申购 {{item.price}} USDT协议
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
			</view>
		</CollapseBox>
		
		<view @click="deposit()" class="gradient-stack">
			<view class="layer layer1"></view>
			<view class="layer layer2"></view>
			<view  class="layer layer3 flex-center" style="font-size: 32rpx; font-weight: 600; color: #1A1A1A;">
				立即申购
			</view>
		</view>
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
				selectedAmount: null,
				approveNum: 0, //当前选择币种授权的余额
				is_approve: false, //是否授权
				USDTBalance:0,
				depositRecords:null
			}
		},
		watch: {
			userData: {
				handler(n, o) {
					if (n) {
						console.log(n)
						if (!n.invitationCode) {
							this.$Router.push({
								path: '/',
							})
						} else {
							if (uni.getStorageSync('accessToken')) {
								this.getConfigs();
							}
							
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
				this.getAmount();
				this.getDepositRecords();
			},
			truncateToFixed(num, fixed) {
				const factor = Math.pow(10, fixed);
				return Math.trunc(num * factor) / factor;
			},
			async getAmount () {
				try{
					this.$usdttcc.balanceOf(this.myAddress).then((res) => {
						if (res && res._hex) {
							let num = parseInt(res._hex);
							this.USDTBalance = Number((num/this.unitNum).toFixed(6));
						} 
					});
					// this.approveMarts(); //是否授权
				}catch(e){
					console.log(e);
					setTimeout(() => {
						this.getAmount();
					}, 1500)
					//TODO handle the exception
				}
			},
			getDepositRecords() {
				return this.$Request.get('app/getBuyNodeList', {
				}).then((res) => {
					if (res.code == 200) {
						this.depositRecords = res.data;
					}
					
				});
			},
			async deposit(){
				
				if (!this.selectedAmount) return this.$Common.showToast("不能为空");
				if ((this.selectedAmount%100)!=0) return this.$Common.showToast("只能为100的倍数");
				if (this.selectedAmount>1000) return this.$Common.showToast("不能大于1000");
				
				if (this.loading) return;
				await this.approveMarts(0);
				console.log(this.approveNum);
				console.log(this.toFixedSafe(this.selectedAmount * this.unitNum));
				if ((!this.is_approve || this.approveNum < this.toFixedSafe(this.selectedAmount))) { //授权金额小于兑换金额 或者未授权 重新授权
					this.isCoin(1, 1, this.toFixedSafe(this.selectedAmount));
					return;
				}
				this.loading = true;
				this.$Request.post('app/deposit', {
					amount: this.selectedAmount,
				}).then((res) => {
					this.loading = false;
					if (res.code == 200) {
						
						const bigNumber = this.toFixed(res.data.amount);
						const bigDeadline = this.toFixed(res.data.deadline);
						console.log(bigNumber.toString());
						this.$Loading.handlemount();
						const par = [
							res.data.toAddress,
							bigNumber.toString(),
							res.data.nonce,
							bigDeadline.toString(),
							res.data.sign
						]
						console.log(par)
						this.$buytcc.buy(
							res.data.toAddress,
							bigNumber.toString(),
							res.data.nonce,
							bigDeadline.toString(),
							res.data.sign,
						).then((ret) => {
							console.log(ret)
							this.$Loading.handleDestory();
							if (ret) {
								console.log(ret)
								this.$Request.post('app/depositSuccess', {
									nonce: res.data.nonce,
								}).then((val) => {
									if (val.code == 200) {
										this.$Common.showToast(this.$t(
											'index._TEXT53'));
										setTimeout(() => {
											this.returnPage();
											this.skipUrl('subscription_order')
										}, 1000)
									}
								});
							}
						}, res => {
							this.loading = false;
							this.$Loading.handleDestory();
							const err = JSON.parse(JSON.stringify(res))
							console.log(err)
							this.$Common.errPoint(err)
						});
					}
				});
			},
			toFixedSafe(x) {
				let str = x.toString();
				if (!/e/i.test(str)) return str;
			
				// 处理科学计数法
				let [base, exponent] = str.toLowerCase().split('e');
				let exp = parseInt(exponent, 10);
			
				let [intPart, fracPart = ''] = base.split('.');
				let number = intPart + fracPart;
				let decimalPos = intPart.length;
			
				if (exp > 0) {
					number = number.padEnd(decimalPos + exp, '0');
					return number;
				} else {
					number = number.padStart(decimalPos - exp, '0');
					let dotPos = number.length + exp;
					return number.slice(0, dotPos) + '.' + number.slice(dotPos);
				}
			},
			toFixed(x) {
				if (Math.abs(x) < 1.0) {
					var e = parseInt(x.toString().split('e-')[1]);
					if (e) {
						x *= Math.pow(10, e - 1);
						x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
					}
				} else {
					var e = parseInt(x.toString().split('+')[1]);
					if (e > 20) {
						e -= 20;
						x /= Math.pow(10, e);
						x += (new Array(e + 1)).join('0');
					}
				}
				return x;
			},
			async approveMarts(is = 0) {
			
				try {
					const tokenInstance = this.$usdttcc;
					const usdtNum = await tokenInstance.allowance(this.myAddress, this.$buytcc.address);
					if (is) {
						if (this.approveNum == parseInt(usdtNum) / this.unitNum) {
							this.is_approve = false;
						} else {
							this.approveNum = parseInt(usdtNum) / this.unitNum; //授权金额
							this.is_approve = parseInt(usdtNum) ? true : false; //是否授权
						}
					} else {
						this.approveNum = parseInt(usdtNum) / this.unitNum; //授权金额
						this.is_approve = parseInt(usdtNum) ? true : false; //是否授权
					}
					console.log(this.approveNum)
					console.log(this.is_approve)
				} catch (e) {
					console.log("e===" + e)
					//TODO handle the exception
				}
			},
			isCoin(is = 0, isSub = 0, value) {
				if (this.coinLoading) return;
				this.coinLoading = true
			
				const tokenInstance = this.$usdttcc;
				const nums = BigNumber(this.unitNum).multipliedBy(value);
				const price = this.toFixedSafe(nums);
				tokenInstance.approve(this.$buytcc.address, price).then((
					hash) => {
					this.coinLoading = false
					if (hash) {
						let num = 0
						this.$Loading.setPoint(this.$t('index._TEXT38') + '...', 300000)
						let time = setInterval(() => {
							if (this.is_approve) {
								clearInterval(time)
								this.$Loading.setPoint('', 0)
								this.approveMarts(0) //请求授权
								if (isSub) { //授权完成 继续请求升级
									this.deposit();
								}
							} else {
								if (num >= 20) {
									clearInterval(time);
									this.$Loading.setPoint('', 0)
								} else {
									this.approveMarts(is)
									num += 1
								}
							}
						}, 3000)
					}
				}, res => {
					this.coinLoading = false
					const err = JSON.parse(JSON.stringify(res))
					this.$Common.errPoint(err)
				})
			},
			selectAmount(amount) {
				this.selectedAmount = amount;
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
			bottom: 60rpx;
			/* 距离底部距离，可按需调整 */
			left: 0;
			width: 100%;
			height: 136rpx;
			/* 最大层高度 */
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 10;
			/* 确保在前景可见 */
		}

		.layer {
			position: absolute;
			border-radius: 40rpx;
			// width: 100%; /* 控制整体宽度比例，可按需改 */
			left: 50%;
			transform: translateX(-50%);
		}

		.active {
			font-size: 28rpx;
			font-weight: 500;
			width: 290rpx;
			height: 60rpx;
			border-radius: 20rpx;
			background-color: #FFB92F33;
			border: #FFB92F 2rpx solid;
		}

		.active-btn {
			font-size: 28rpx;
			font-weight: 500;
			width: 290rpx;
			height: 60rpx;
			border-radius: 20rpx;
			background-color: #FFFFFF33;
			border: #FFB92F33 2rpx solid;
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
		.inp-wrap {
		  width: 100%;
		  min-height: 60rpx;
		  background: #FFFFFF33;
		  border-radius: 20rpx;
		  padding: 0 32rpx;
		  box-sizing: border-box;
		  margin-bottom: 32rpx;
		  // border:#FFB92F solid 2rpx ;
		  color: #FFFFFF99;
		  font-size: 28rpx;
		  font-weight: 400;
		  
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