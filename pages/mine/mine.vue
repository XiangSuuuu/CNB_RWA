<template>
	<view class="pages">

		<view style="position: absolute; top: 0; left: 0; z-index: -1;">
			<image src="/static/mine/bg0.png" style="width: 780rpx; height: 576rpx;"></image>
		</view>
		<!-- <view class="flex-l" style="width: 100%; height: 100rpx; margin-bottom: 52rpx;">
			<image src="/static/mine/Ellipse 7.png" style="height: 100rpx; width: 100rpx; margin-right: 28rpx;"></image>
			<view>
				<view style="font-size: 28rpx; font-weight: 600; color: #ffffff;">
					{{valueSubstr(userInfo.account)}}
				</view>
				<view style="height: 18rpx;"></view>
				<view class="flex-l">
					<view v-if="userInfo.vipNum!=0" class="flex-center vip-badge" :style="{
								backgroundImage: `url(${getVipBg(userInfo.vipNum)})`
							}">
						V{{ userInfo.vipNum }}
					</view>
				</view>
			</view>
		</view> -->

		<view class="order-sele-wrap flex-center">
			<view class="order-item flex-center" @click="switchTab(0)"
				:class="tabIx == 0 ? 'order-item-in gradient-box' : ''">
				{{$t('index._TEXT124')}}
			</view>
			<view class="order-item flex-center" @click="switchTab(1)"
				:class="tabIx == 1 ? 'order-item-in gradient-box' : ''">
				{{$t('index._TEXT125')}}
			</view>
		</view>
		<view style="width: 100%; height: 2rpx; background-color: #655A8980; position: relative; top: -10rpx;">

		</view>

		<view v-if="tabIx==0">
			<view class="pill-box" style="height: 68rpx;">
				<view style="padding: 0 24rpx; width: 100%; height: 100%;" class="flex-lr">
					<view style="font-size: 24rpx; color: #C07AFF; font-weight: 400;">
						{{$t('index._TEXT127')}}
					</view>
					<view style="font-size: 28rpx; color: #FFFFFF; font-weight: 700;">
						{{ userInfo.vipName }}
					</view>
				</view>
			</view>
			<view class="pill-box" style="height: 68rpx;">
				<view style="padding: 0 24rpx; width: 100%; height: 100%;" class="flex-lr">
					<view style="font-size: 24rpx; color: #C07AFF; font-weight: 400;">
						{{$t('index._TEXT126')}}
					</view>
					<view style="font-size: 28rpx; color: #FFFFFF; font-weight: 700;">
						V{{ userInfo.vipNum }}
					</view>
				</view>
			</view>
			
			<view class="pill-box" style="height: 68rpx;">
				<view style="padding: 0 24rpx; width: 100%; height: 100%;" class="flex-lr">
					<view style="font-size: 24rpx; color: #C07AFF; font-weight: 400;">
						{{$t('index._TEXT128')}}
					</view>
					<view style="font-size: 28rpx; color: #FFFFFF; font-weight: 700;">
						{{ userInfo.count1 }}
					</view>
				</view>
			</view>
			<view class="pill-box" style="height: 68rpx;">
				<view style="padding: 0 24rpx; width: 100%; height: 100%;" class="flex-lr">
					<view style="font-size: 24rpx; color: #C07AFF; font-weight: 400;">
						{{$t('index._TEXT129')}}
					</view>
					<view style="font-size: 28rpx; color: #FFFFFF; font-weight: 700;">
						{{ teamEquityValue }}
					</view>
				</view>
			</view>
			<view style="height: 40rpx;">
			
			</view>
			
			<view class="junior-content-wrap">
				<view class="lists-wrap">
					<view class="lists inp-wrap-two flex-lr">
						<view class="flex-l text">{{$t('index._TEXT130')}}</view>
						<view>{{valueSubstr(userInfo.invitationCode)}}</view>
					</view>
			
					<view class="lists inp-wrap-two flex-lr" style="margin-bottom: 0rpx; cursor: pointer;"
						@click="$Common.copy(inviteAddr)">
						<view class="flex-l text">{{$t('index._TEXT131')}}</view>
						<view class="flex-r">
							{{valueSubstr(inviteAddr)}}
							<image src="/static/mine/copy.png" mode="widthFix" class="copy-icon"></image>
						</view>
					</view>
				</view>
			</view>

			<view style="height: 40rpx;">

			</view>

			<view class="trend-wraps">
				<view class="top-name flex-lr">
					<view class="row">{{$t('index._TEXT132')}}</view>
					<view class="row flex-center">{{$t('index._TEXT133')}}</view>
					<view class="row flex-center">{{$t('index._TEXT134')}}</view>
					<view class="row flex-r">{{$t('index._TEXT135')}}</view>
				</view>

				<view style="width: 100%; height: 2rpx; background-color: #282132;"></view>
				<view class="buy-coin-wrap">
					<view class="shop-item flex-lr" v-for="(item, index) in teamList" :key="index">
						<view class="row">{{valueSubstr(item.account)}}</view>
						<view class="row flex-center">{{item.equityValue}}</view>
						<view class="row flex-center">{{item.teamEquityValue}}</view>
						<view class="row flex-r">Level {{item.vip}}</view>
					</view>
					<None v-if="!teamList || teamList.length == 0"></None>
				</view>
			</view>
		</view>
		<view v-if="tabIx==1">
			<view class="lists2 flex-lr">
				<view class="flex-l">{{$t('index._TEXT136')}}</view>
				<view class="flex-r nums">
					{{truncateToFixed((userInfo.useBalance1/unitNum),2)}}
					<view class="btns flex-center" @click="gainWithdrawal(userInfo.uesBalance1,1)">
						{{$t('index._TEXT137')}}
					</view>
				</view>
			</view>
			<view class="lists2 flex-lr">
				<view class="flex-l">退回权益</view>
				<view class="flex-r nums">
					{{truncateToFixed((userInfo.useBalance5/unitNum),2)}}
					<view class="btns flex-center" @click="gainWithdrawal(userInfo.useBalance5,5)">
						{{$t('index._TEXT137')}}
					</view>
				</view>
			</view>
			
			<view class="lists2 flex-lr">
				<view class="flex-l">{{$t('index._TEXT138')}}</view>
				<view class="flex-r nums">
					{{truncateToFixed((userInfo.useBalance2/unitNum),2)}}
					<view class="btns flex-center" @click="gainWithdrawal(userInfo.uesBalance2,2)">
						{{$t('index._TEXT137')}}
					</view>
				</view>
			</view>
			
			<view class="lists2 flex-lr">
				<view class="flex-l">{{$t('index._TEXT139')}}</view>
				<view class="flex-r nums">
					{{truncateToFixed((userInfo.useBalance3/unitNum),2)}}
					<view class="btns flex-center" @click="gainWithdrawal(userInfo.uesBalance3,3)">
						{{$t('index._TEXT137')}}
					</view>
				</view>
			</view>
			<view class="lists2 flex-lr">
				<view class="flex-l">{{$t('index._TEXT140')}}</view>
				<view class="flex-r nums">
					{{truncateToFixed((userInfo.useBalance4/unitNum),2)}}
					<view class="btns flex-center" @click="gainWithdrawal(userInfo.uesBalance4,4)">
						{{$t('index._TEXT137')}}
					</view>
				</view>
			</view>
			<view style="height: 20rpx;">

			</view>
			<view class="order-sele-wrap flex-center">
				<view class="order-item flex-center" @click="gainTabIx(1)" :class="tabIx2 == 1 ? 'order-item-in' : ''">
					{{$t('index._TEXT141')}}
				</view>
				<!-- <view class="order-item flex-center" @click="gainTabIx(2)" :class="tabIx2 == 2 ? 'order-item-in' : ''">
					{{$t('index._TEXT142')}}
				</view> -->
			</view>
			<view style="width: 100%; height: 2rpx; background-color: #655A8980; position: relative; top: -10rpx;">

			</view>
			<view class="shop-wrap">
				<view class="shop-item" v-for="(item, index) in orderList" :key="index" :style="getItemStyle(item.num)">
					<view class="head-text flex-l">
						<image src="/static/trade/head.png" mode="widthFix" class="head-icon"></image>
						{{ valueSubstr(item.account) }}
					</view>
					<view class="flex-lr lists">
						<view class="flex-l">
							{{$t('index._TEXT143')}}：
							<view class="title-num">{{ item.day }}</view>
							{{$t('index._TEXT25')}}&nbsp;
							{{$t('index._TEXT144')}}&nbsp;
							<view class="title-num">
								{{ calculateRemainingReward(item.totalReward, item.claimedReward) }}
							</view>
						</view>
						<view class="flex-r">
							<view>{{$t('index._TEXT145')}}</view>
							<view class="flex-r">
								<view class="num">{{ Number((item.num).toFixed(4)) }}</view>
								<image src="/static/trade/coin.png" mode="widthFix" class="coins"></image>
							</view>
						</view>
					</view>
					<view class="flex-lr lists">
						<view class="flex-l">
							<view>{{$t('index._TEXT146')}}：</view>
							<view class="flex-r">
								<view class="title-num">{{ item.endTime }}</view>
							</view>
						</view>
						<view>{{ item.createTime }}</view>
					</view>
				</view>
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
	import {
		uniGrid,
		uniGridItem
	} from '@dcloudio/uni-ui'
	export default {
		components: {
			Model,
		},
		data() {
			return {
				loading: false,
				unitNum: 10 ** 18,
				userInfo: null,
				assetTransferRecords: null,
				tabIx: 0,
				tabIx2: 1,
				orderList: [],
				teamList: [],
				teamEquityValue:null,
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
			inviteAddr() {
				if (this.userInfo && this.userInfo.personalInvitationCode) {
					return this.$Common.getShareLink(this.userInfo.personalInvitationCode);
				} else {
					return '';
				}
			
			},
		},
		mounted() {
			this.init();
		},
		methods: {
			...mapActions(['gainUserData']),
			init() {
				this.getUserInfo();
				this.initList();
				this.$Request.get('app/user/teamInfo', {}).then((res) => {
					if (res.code == 200) {
						this.teamList = res.data.inviteUserList;
						this.teamEquityValue = res.data.teamEquityValue;
						// this.teamEquityValue = res.data.teamEquityValue;
					}
				});
			},
			getVipBg(vipNum) {
				// 可根据实际文件数量调整
				switch (vipNum) {
					case 1:
						return '/static/mine/v1.png';
					case 2:
						return '/static/mine/v2.png';
					case 3:
						return '/static/mine/v3.png';
					case 4:
						return '/static/mine/v4.png';
					case 5:
						return '/static/mine/v5.png';
					case 6:
						return '/static/mine/v6.png';
					case 7:
						return '/static/mine/v7.png';
					case 8:
						return '/static/mine/v8.png';
					case 9:
						return '/static/mine/v9.png';
					default:
						return '/static/mine/v0.png'; // 默认等级背景
				}
			},
			getItemStyle(num) {
				const value = Number(num.toFixed(4));
				if (value >= 10000) {
					return {
						background: 'linear-gradient(0deg, #2c2136, #1c1c1c)',
						border: '3rpx solid #CCEAFA'
					};
				} else if (value >= 5000) {
					return {
						background: 'linear-gradient(0deg, #2c2136, #1c1c1c)',
						border: '3rpx solid #F0FACC'
					};
				} else if (value >= 1000) {
					return {
						background: 'linear-gradient(0deg, #2c2136, #1c1c1c)',
						border: '3rpx solid #F9BB92'
					};
				} else if (value >= 500) {
					return {
						background: 'linear-gradient(0deg, #2c2136, #1c1c1c)',
						border: '3rpx solid #F9E992'
					};
				} else if (value >= 100) {
					return {
						background: 'linear-gradient(0deg, #2c2136, #1c1c1c)',
						border: '3rpx solid #DBDBDB'
					};
				} else if (value >= 10) {
					return {
						background: 'linear-gradient(0deg, #2c2136, #1c1c1c)',
						border: '3rpx solid #DBB9F8'
					};
				} else {
					return {}; // 默认样式
				}
			},
			gainTabIx(ix) {
				this.tabIx2 = ix;
				this.initList();
			},
			initList() {
				this.$Request.get('app/getPledgeList', {
					pageNum: 1,
					pageSize: 200,
					stateCode: this.tabIx2,
				}).then((res) => {
					if (res.code == 200) {
						this.orderList = res.rows;
					}
				});
			},
			switchTab(index) {
				this.tabIx = index;

			},
			gainWithdrawal(amount, type) {
				console.log(this.$staketcc)
				console.log(this.$nodepooltcc)
				// if (!Number(amount)) return this.$Common.showToast('暂无领取金额');
				if (this.loading) return;
				this.loading = true;
				this.$Request.post('app/withdrawal', {
					number: amount,
					type: type,
				}).then((res) => {
					this.loading = false;
					if (res.code == 200) {
						this.userInfo['uesBalance' + type] = 0;
						const bigNumber = this.toFixed(res.data.amount);
						const bigKind = this.toFixed(res.data.kind);
						const bigDeadline = this.toFixed(res.data.deadline);
						console.log(bigNumber.toString());
						this.$Loading.handlemount();
						if (type == 1 || type == 2 || type == 3 ||type == 5 ) {
							const par = [
								res.data.toAddress,
								bigNumber.toString(),
								bigKind.toString(),
								res.data.nonce,
								bigDeadline.toString(),
								res.data.sign
							]
							console.log(par)
							this.$staketcc.bnbAmount(

							).then((ret) => {
								this.$staketcc.withdraw(
									res.data.toAddress,
									bigNumber.toString(),
									bigKind.toString(),
									res.data.nonce,
									bigDeadline.toString(),
									res.data.sign, {
										value: ret
									}
								).then((ret) => {
									console.log(ret)
									this.$Loading.handleDestory();
									if (ret) {
										console.log(ret)
										this.$Request.post('app/withdrawalSuccess', {
											nonce: res.data.nonce,
											type: type,
										}).then((val) => {
											if (val.code == 200) {
												this.$Common.showToast(this.$t(
													'index._TEXT53'));
												setTimeout(() => {
													this.init()
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
							}, );


						} else if (type == 4) { //
							console.log([
								res.data.toAddress,
								bigNumber.toString(),
								// bigKind.toString(),
								res.data.nonce,
								bigDeadline.toString(),
								res.data.sign
							])
							console.log(this.$vippooltcc)

							this.$nodepooltcc.bnbAmount(

							).then((ret) => {

								this.$nodepooltcc.withdraw(
									res.data.toAddress,
									bigNumber.toString(),
									// bigKind.toString(),
									res.data.nonce,
									bigDeadline.toString(),
									res.data.sign, {
										value: ret
									}
								).then((ret) => {
									this.$Loading.handleDestory();
									if (ret) {
										console.log(ret)
										this.$Request.post('app/withdrawalSuccess', {
											nonce: res.data.nonce,
											type: type,
										}).then((val) => {
											if (val.code == 200) {
												this.$Common.showToast(this.$t(
													'index._TEXT53'));
												setTimeout(() => {
													this.init()
												}, 1000)
											}
										});
									}
								}, res => {
									this.$Loading.handleDestory();
									this.loading = false;
									const err = JSON.parse(JSON.stringify(res))
									console.log(err)
									this.$Common.errPoint(err)
								});
							});
						}
					}
				});
			},

			calculateRemainingReward(totalReward, claimedReward, decimals = 18) {
				try {
					const total = ethers.BigNumber.from(totalReward);
					const claimed = ethers.BigNumber.from(claimedReward);
					const remaining = total.sub(claimed);

					const formatted = ethers.utils.formatUnits(remaining, decimals); // 转为可读格式

					return Math.floor(Number(formatted)); // 返回整数，向下取整
				} catch (err) {
					console.error("计算剩余奖励出错:", err);
					return 0;
				}
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

			async approveMarts(is = 0, tcc) {

				try {
					const tokenInstance = this.$vetcc;
					const usdtNum = await tokenInstance.allowance(this.myAddress, tcc.address);
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
			async isCoin(is = 0, isSub = 0, value, amount, type, tcc) {
				if (this.coinLoading) return;
				this.coinLoading = true

				const tokenInstance = this.$vetcc;
				const nums = BigNumber(this.unitNum).multipliedBy(value);
				const price = this.toFixedSafe(nums);
				tokenInstance.approve(tcc.address, price).then((
					hash) => {
					this.coinLoading = false
					if (hash) {
						let num = 0
						this.$Loading.setPoint(this.$t('index._TEXT38') + '...', 300000)
						let time = setInterval(() => {
							if (this.is_approve) {
								clearInterval(time)
								this.$Loading.setPoint('', 0)
								this.approveMarts(0, tcc) //请求授权
								if (isSub) { //授权完成 继续请求升级
									this.gainWithdrawal(amount, type);
								}
							} else {
								if (num >= 20) {
									clearInterval(time);
									this.$Loading.setPoint('', 0)
								} else {
									this.approveMarts(is, tcc)
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
			getUserInfo() {
				this.$Request.get('app/user/getUserInfo', {}).then((res) => {
					if (res.code == 200) {
						this.userInfo = res.data;
					}
				}, false, false);
			},
			valueSubstr(value) {
				return value.substr(0, 3) + '****' + value.substring(value.length - 3);
			},
			truncateToFixed(num, fixed) {
				const factor = Math.pow(10, fixed);
				return Math.trunc(num * factor) / factor;
			},
			returnPage() {
				uni.navigateBack({
					delta: 1
				});
				// this.$Router.push({
				// 	path: '/',
				// })
			},
			skipPageUrl(url) {
				window.open(url)
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

		.box {
			background-color: #36343080;
			border-radius: 20rpx;
			border: #FFFFFF33 2rpx solid;
		}
		.copy-icon {
			width: 34rpx;
			height: 34rpx;
			margin-left: 18rpx;
		}

		.custom-btn {
			width: 150rpx;
			height: 60rpx;
			border: 2rpx solid #6205B2;
			border-radius: 16rpx;
			background:
				linear-gradient(180deg, rgba(98, 5, 178, 0.2) 0%, rgba(0, 0, 0, 10) 100%),
				linear-gradient(180deg, rgba(98, 5, 178, 0.35) 0%, rgba(255, 185, 47, 0) 100%);
			display: flex;
			align-items: center;
			/* 垂直居中 */
			justify-content: center;
			/* 水平居中 */
			box-sizing: border-box;
			/* 确保边框不会撑大宽高 */
			color: #FFFFFF;
			/* 假设文字为白色 */
			font-size: 28rpx;
			/* 推荐字号 */
		}
		
		.junior-content-wrap {
			width: 100%;
			margin-top: 46rpx;
			border-radius: 20rpx;
			border: 2rpx solid #655A8980;
			// background-image: linear-gradient(0deg, #1D2D3C, #111C2E);
			padding: 20rpx 20rpx;
			box-sizing: border-box;
			margin-bottom: 42rpx;
		
			.lists-wrap {
				width: 100%;
				// padding: 0 40rpx;
				box-sizing: border-box;
		
				.lists {
					width: 100%;
					height: 64rpx;
					border-radius: 20rpx;
					background: linear-gradient(0deg, #272031, #272031);
					margin-bottom: 20rpx;
					padding: 16rpx 24rpx;
					box-sizing: border-box;
					color: white;
					font-size: 24rpx;
					font-family: 'Open Sans';
					font-weight: 700;
				}
		
				.inp-wrap-two {
					background: linear-gradient(0deg, #272031, #272031);
		
				}
			}
		
			.buy-btn {
				width: 100%;
				height: 80rpx;
				// background: url('../../static/trade/btnBg2.png') no-repeat;
				// background-size: 100% 100%;
				// margin-top: 32rpx;
				color: #ffffff;
				font-size: 24rpx;
				font-family: 'Open Sans';
				font-weight: bold;
				border-radius: 20rpx;
				background-color: #333333;
			}
		}

		.gradient-panel {
			width: 150rpx;
			/* 自由调整 */
			height: 52rpx;
			/* 自由调整 */
			border-radius: 14rpx;
			/* 圆角要大 */
			background: linear-gradient(90deg, #d49aff 0%, #7d28ff 100%);

			/* 亮色外发光 + 底部柔和阴影 */
			box-shadow:
				0 8px 20px rgba(0, 0, 0, 0.3),
				/* 底部阴影 */
				0 0 30px rgba(180, 140, 255, 0.8);
			/* 外发光 */
		}

		.gradient-text {
			font-size: 28rpx;
			font-weight: 600;
			background: linear-gradient(160deg, #DBB1FF, #FFFFFF, #FFFFFF);
			-webkit-background-clip: text;
			color: transparent;
		}


		.pill-box {
			width: 100%;


			margin-top: 40rpx;

			border: 4rpx solid transparent;
			border-radius: 16rpx;

			background-clip: padding-box, border-box;
			background-origin: border-box;

			background-image:
				/* 第一层：内部背景 (保持不变) */
				linear-gradient(180deg, #2C2237 0%, #1C1C20 100%),

				/* 第二层：边框背景 (优化版) */
				/* 解释： */
				/* 起点: #9C7EAF (不透明紫色) */
				/* 终点: rgba(156, 126, 175, 0) (完全透明的同色系紫色) */
				/* 也就是把 50% 处的 transparent 换成了这个 rgba 值 */
				linear-gradient(90deg, #553d68 0%, rgba(156, 126, 175, 0) 60%, transparent 100%);

			box-shadow: 0px 20px 30px -5px rgba(0, 0, 0, 0.6);
		}

		.order-sele-wrap {
			width: 100%;
			// margin-top: 20rpx;
			height: 80rpx;
			// background: #1B2B39;
			border-radius: 96rpx;
			display: flex;
			justify-content: space-between;

			.order-item {
				width: 40%;
				height: 120rpx;
				line-height: 120rpx;
				text-align: center;
				color: #FFFFFF8C;
				font-size: 30rpx;
				font-weight: 400;
				position: relative;
				cursor: pointer;

				&::after {
					content: '';
					position: absolute;
					bottom: 30rpx;
					/* 调整横条位置 */
					left: 25%;
					width: 50%;
					height: 6rpx;
					background-color: transparent;
					border-radius: 4rpx;
					transition: all 0.3s ease;
				}
			}

			.order-item-in {
				font-weight: 600;
				color: #FFFFFF;
				font-size: 30rpx;


				&::after {
					background-color: #BE74FF; // 黄色条
				}
			}
		}

		.vip-badge {
			font-size: 28rpx;
			font-weight: 600;
			color: #74cdd1;
			width: 94rpx;
			height: 48rpx;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.button {
			background: linear-gradient(90deg, #FFB92F 0%, #F8FF2F 100%);
			border-radius: 40rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #000000;
		}

		.asset-box {
			width: 344rpx;
			height: 238rpx;
			margin-top: 24rpx;
		}

		.asset-header {
			font-size: 28rpx;
			font-weight: 500;
			color: #ffb92f;
			padding-left: 40rpx;
			width: 100%;
			height: 72rpx;
			line-height: 72rpx;
			background-color: #ffb92f26;
			border-radius: 20rpx 20rpx 0 0;
		}

		.flex-center {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.asset-values {
			margin-top: 25rpx;
			font-size: 32rpx;
			font-weight: 700;
			color: #ffffff;
		}

		.asset-labels {
			margin-top: 15rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #ffffff99;
		}

		.trend-wraps {
			width: 100%;
			// background-image: linear-gradient(0deg, #1D2D3C, #111C2E);
			border: 2rpx solid #655A8980;
			border-radius: 20rpx;
			margin-bottom: 46rpx;
			min-height: 110rpx;
			overflow: hidden;

			.top-name {
				width: 100%;
				height: 84rpx;
				// background: #25384D;
				padding: 0 32rpx;
				box-sizing: border-box;
				color: white;
				font-size: 28rpx;
				font-weight: 600;

				.row {
					width: 33.33%;
				}
			}

			.buy-coin-wrap {
				width: 100%;
				min-height: 248rpx;
				margin-bottom: 16rpx;
				padding: 36rpx 18rpx;
				box-sizing: border-box;
				background: none;
				flex-wrap: wrap;

				.shop-item {
					width: 100%;
					padding: 32rpx 24rpx;
					margin-bottom: 10rpx;
					box-sizing: border-box;
					background: linear-gradient(0deg, #272031, #272031);
					border-radius: 20rpx;
					color: white;

					.row {
						width: 33.33%;
					}
				}
			}
		}
		.lists2 {
		
			margin-top: 16rpx;
			padding: 0 42rpx;
			padding-right: 0;
			box-sizing: border-box;
			// color: #fff;
			font-size: 28rpx;
			width: 100%;
			height: 64rpx;
			border-radius: 20rpx;
			// border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);
			color: white;
			font-size: 24rpx;
			font-family: 'Open Sans';
			font-weight: 700;
			background: linear-gradient(0deg, #272031, #272031);
		
			// cursor: pointer;
			.nums {
				color: white;
				font-size: 24rpx;
				font-family: 'Open Sans';
				font-weight: 700;
			}
		
			.btns {
				width: 134rpx;
				height: 64rpx;
				// background: url('../../static/info/btnBg0.png') no-repeat;
				// background-size: 100% 100%;
				background-color: #BE74FF;
				border-radius: 0 20rpx 20rpx 0;
				color: white;
				font-size: 24rpx;
				font-family: 'Open Sans';
				font-weight: 700;
				margin-left: 32rpx;
			}
		}

		.shop-wrap {
			width: 100%;

			.shop-item {
				width: 100%;
				padding: 20rpx 20rpx;
				box-sizing: border-box;
				margin-bottom: 32rpx;
				// background: linear-gradient(0deg, #17273F, #132034);
				// box-shadow: 0 0 8rpx 0 #F2F2F2;
				// border: 2rpx solid #F2F2F2;
				border-radius: 20rpx;

				.head-text {
					color: white;
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 8rpx;

					.head-icon {
						width: 48rpx;
						height: 48rpx;
						margin-right: 12rpx;
					}
				}

				.lists {
					width: 100%;
					height: 98rpx;
					border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);
					color: white;
					font-size: 28rpx;

					.num {
						color: #BE74FF;
						font-size: 36rpx;
						font-weight: bold;
						margin-right: 12rpx;
					}

					.coins {
						width: 46rpx;
						height: 46rpx;
					}

					.title-num {
						color: #BE74FF;
						font-size: 28rpx;
						font-weight: bold;
						margin-right: 12rpx;
					}
				}
			}
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