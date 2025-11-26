<template>
	<view class="pages">
		<view class="head-wrap flex-center">
			<view class="title">
				我的
			</view>
			<image src="/static/public/arrow-left-white.png" @click="returnPage()" mode="widthFix" class="back_img">
			</image>
		</view>
		<view style="position: absolute; top: 0; right: 0;">
			<image src="/static/mine/bg0.png" style="width: 544rpx; height: 430rpx;"></image>
		</view>
		<view class="flex-l" style="width: 100%; height: 100rpx; margin-bottom: 52rpx;">
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
					<view style="width: 18rpx;"></view>
					<view v-if="userInfo.nodeCode>1" class="flex-center"
						style="font-size: 28rpx; font-weight: 600; color: #E1E1E1; width: 160rpx; height: 48rpx; background: url('../../static/mine/superNode.png') no-repeat; background-size: 100% 100%;">
						超级节点
					</view>
				</view>
			</view>
		</view>

		<view class="flex-l">
			<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
			<view style="width: 8rpx;"></view>
			<view style="font-size: 24rpx; font-weight: 400; color: white;">
				我的资产：
			</view>
		</view>
		<view style="width: 100%;" class="flex-lr">
			<view class="asset-box box">
				<!-- 标题 -->
				<view class="asset-header">推荐收益</view>

				<!-- 数值 -->
				<view class="asset-values flex-center">
					<view class="flex-center" style="width: 33%;">{{truncateToFixed((userInfo.uesBalance6/unitNum),2)}}
						<view style="color: #FFFFFFCC; font-size: 24rpx; font-weight: 500;"> USDT</view>
					</view>
				</view>
				<!-- 标签 -->
				<view class="asset-labels flex-center">
					<view @click="gainWithdrawal(userInfo.uesBalance6,6)" class="flex-center" style="width: 33%;">
						<view class="flex-center"
							style="font-size: 24rpx; font-weight: 400; color: #000000; width: 150rpx; height: 44rpx; border-radius: 40rpx; background: linear-gradient(90deg, #FFB92F 0%, #F8FF2F 100%);">
							领取收益</view>
					</view>
				</view>
			</view>
			<view style="width: 20rpx;"></view>
			<view class="asset-box box">
				<!-- 标题 -->
				<view class="asset-header">VE线性释放</view>

				<!-- 数值 -->
				<view class="asset-values flex-center">
					<view class="flex-center" style="width: 33%;">{{truncateToFixed((userInfo.uesBalance8/unitNum),2)}}
						<view style="color: #FFFFFFCC; font-size: 24rpx; font-weight: 500;">VE</view>
					</view>
				</view>
				<!-- 标签 -->
				<view class="asset-labels flex-center">
					<view @click="gainWithdrawal(userInfo.uesBalance8,8)" class="flex-center" style="width: 33%;">
						<view class="flex-center"
							style="font-size: 24rpx; font-weight: 400; color: #000000; width: 150rpx; height: 44rpx; border-radius: 40rpx; background: linear-gradient(90deg, #FFB92F 0%, #F8FF2F 100%);">
							领取收益</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;" class="flex-lr">
			<view class="asset-box box">
				<!-- 标题 -->
				<view class="asset-header">超级节点收益</view>

				<!-- 数值 -->
				<view class="asset-values flex-center">
					<view class="flex-center" style="width: 33%;">{{truncateToFixed((userInfo.uesBalance9/unitNum),2)}}
						<view style="color: #FFFFFFCC; font-size: 24rpx; font-weight: 500;">VBO</view>
					</view>
				</view>
				<!-- 标签 -->
				<view class="asset-labels flex-center">
					<view @click="gainWithdrawal(userInfo.uesBalance9,9)" class="flex-center" style="width: 33%;">
						<view class="flex-center"
							style="font-size: 24rpx; font-weight: 400; color: #000000; width: 150rpx; height: 44rpx; border-radius: 40rpx; background: linear-gradient(90deg, #FFB92F 0%, #F8FF2F 100%);">
							领取收益</view>
					</view>
				</view>
			</view>
			<view style="width: 20rpx;"></view>
			<view class="asset-box box">
				<!-- 标题 -->
				<view class="asset-header">超级节点收益</view>

				<!-- 数值 -->
				<view class="asset-values flex-center">
					<view class="flex-center" style="width: 33%;">{{truncateToFixed((userInfo.uesBalance10/unitNum),2)}}
						<view style="color: #FFFFFFCC; font-size: 24rpx; font-weight: 500;">VE</view>
					</view>
				</view>
				<!-- 标签 -->
				<view class="asset-labels flex-center">
					<view @click="gainWithdrawal(userInfo.uesBalance10,10)" class="flex-center" style="width: 33%;">
						<view class="flex-center"
							style="font-size: 24rpx; font-weight: 400; color: #000000; width: 150rpx; height: 44rpx; border-radius: 40rpx; background: linear-gradient(90deg, #FFB92F 0%, #F8FF2F 100%);">
							领取收益</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;" class="flex-lr">
			<view class="asset-box box">
				<!-- 标题 -->
				<view class="asset-header">V7-V8-V9收益</view>

				<!-- 数值 -->
				<view class="asset-values flex-center">
					<view class="flex-center" style="width: 33%;">{{truncateToFixed((userInfo.uesBalance12/unitNum),2)}}
						<view style="color: #FFFFFFCC; font-size: 24rpx; font-weight: 500;">VE</view>
					</view>
				</view>
				<!-- 标签 -->
				<view class="asset-labels flex-center">
					<view @click="gainWithdrawal(userInfo.uesBalance12,12)" class="flex-center" style="width: 33%;">
						<view class="flex-center"
							style="font-size: 24rpx; font-weight: 400; color: #000000; width: 150rpx; height: 44rpx; border-radius: 40rpx; background: linear-gradient(90deg, #FFB92F 0%, #F8FF2F 100%);">
							领取收益</view>
					</view>
				</view>
			</view>
			<view style="width: 20rpx;"></view>
			<view class="asset-box box">
				<!-- 标题 -->
				<view class="asset-header">V7-V8-V9收益</view>

				<!-- 数值 -->
				<view class="asset-values flex-center">
					<view class="flex-center" style="width: 33%;">{{truncateToFixed((userInfo.uesBalance11/unitNum),2)}}
						<view style="color: #FFFFFFCC; font-size: 24rpx; font-weight: 500;">VBO</view>
					</view>
				</view>
				<!-- 标签 -->
				<view class="asset-labels flex-center">
					<view @click="gainWithdrawal(userInfo.uesBalance11,11)" class="flex-center" style="width: 33%;">
						<view class="flex-center"
							style="font-size: 24rpx; font-weight: 400; color: #000000; width: 150rpx; height: 44rpx; border-radius: 40rpx; background: linear-gradient(90deg, #FFB92F 0%, #F8FF2F 100%);">
							领取收益</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;" class="flex-l">
			<view class="asset-box box">
				<!-- 标题 -->
				<view class="asset-header">LP收益</view>
				<!-- 数值 -->
				<view class="asset-values flex-center">
					<view class="flex-center" style="width: 33%;">0 <view
							style="color: #FFFFFFCC; font-size: 24rpx; font-weight: 500;">VBO</view>
					</view>
				</view>
				<!-- 标签 -->
				<view class="asset-labels flex-center">
					<view class="flex-center" style="width: 33%;">
						<view class="flex-center"
							style="font-size: 24rpx; font-weight: 400; color: #000000; width: 150rpx; height: 44rpx; border-radius: 40rpx; background: linear-gradient(90deg, #FFB92F 0%, #F8FF2F 100%);">
							领取收益</view>
					</view>
				</view>
			</view>
			<view style="width: 20rpx;"></view>
			<view class="asset-box box">
				<!-- 标题 -->
				<view class="asset-header">团队收益</view>
				<!-- 数值 -->
				<view class="asset-values flex-center">
					<view class="flex-center" style="width: 33%;">{{truncateToFixed((userInfo.uesBalance13/unitNum),2)}}
						<view style="color: #FFFFFFCC; font-size: 24rpx; font-weight: 500;">USDT</view>
					</view>
				</view>
				<!-- 标签 -->
				<view class="asset-labels flex-center">
					<view @click="gainWithdrawal(userInfo.uesBalance13,13)" class="flex-center" style="width: 33%;">
						<view class="flex-center"
							style="font-size: 24rpx; font-weight: 400; color: #000000; width: 150rpx; height: 44rpx; border-radius: 40rpx; background: linear-gradient(90deg, #FFB92F 0%, #F8FF2F 100%);">
							领取收益</view>
					</view>
				</view>
			</view>

		</view>
		<view style="height: 36rpx;"></view>
		<view class="flex-l">
			<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
			<view style="width: 8rpx;"></view>
			<view style="font-size: 24rpx; font-weight: 400; color: white;">
				我的资产转入记录：
			</view>
		</view>
		<CollapseBox class="box" title="我的资产转入记录：">
			<!-- 👇 slot内容，自定义展开部分 -->
			<view v-for="(item, index) in assetTransferRecords" :key="index">
				<view style="padding: 20rpx 20rpx">
					<view style="font-size: 24rpx; color: #FFFFFFCC;">{{item.createTime}}</view>
					<view style="height: 12rpx;"></view>
					<view style="font-size: 24rpx; color: #FFFFFF;">您有一笔{{truncateToFixed((item.money/unitNum),2)}} {{approveMap[item.accountType]}}的理财资产，已转入到我的资产</view>
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
				userInfo: null,
				assetTransferRecords: null,
				approveMap: {
					6: "USDT",
					8: "VE",
					9: "VBO",
					10: "VE",
					11: "VBO",
					12: "VE",
					13: "USDT"
				},
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
				this.getUserInfo();
				this.getRecordAccountList()
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
			async gainWithdrawal(amount, type) {
				if (this.loading) return;
				this.loading = true;
			
				// 1️⃣ 匹配授权地址
				const approveMap = {
					6: this.$incometcc,
					8: this.$vereleasetcc,
					9: this.$supernodetcc,
					10: this.$supernodetcc,
					11: this.$v9tcc,
					12: this.$v9tcc,
					13: this.$incometcc
				};
				
				
				
				const approveAddress = approveMap[type];
				if (!approveAddress) {
					console.error("❌ 未匹配到授权地址");
					this.loading = false;
					return;
				}
			
				try {
					// 2️⃣ 获取提现所需手续费
					const feeRes = await this.$Request.post('app/withdrawalGetFee', { number: amount, type });
			
					// 3️⃣ 检查授权情况
					await this.approveMarts(0, approveAddress);
			
					const needApprove = this.toFixedSafe(this.toFixed(feeRes.data) / this.unitNum);
					console.log("授权状态:", this.is_approve, "授权额度:", this.approveNum, "需要授权:", needApprove);
			
					// 4️⃣ 授权不足则重新授权
					if (!this.is_approve || this.approveNum < needApprove) {
						await this.isCoin(1, 1, needApprove, amount, type, approveAddress);
						this.loading = false;
						return;
					}
			
					// 5️⃣ 授权足够则执行提现
					const res = await this.$Request.post('app/withdrawal', { number: amount, type });
					console.log("提现结果:", res);
					
					this.loading = false;
					if (res.code == 200) {
						this.userInfo['uesBalance' + type] = 0;
						const bigNumber = this.toFixed(res.data.amount);
						const bigDeadline = this.toFixed(res.data.deadline);
						const veFee = this.toFixed(res.data.veFee);
						console.log(bigNumber.toString());
						this.$Loading.handlemount();
						if (type == 6) {
							this.$incometcc.withdrawRecommend(
								res.data.toAddress,
								bigNumber.toString(),
								veFee.toString(),
								res.data.nonce,
								bigDeadline.toString(),
								res.data.sign,
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
						} else if (type == 9) {
							console.log(this.$supernodetcc)
							this.$supernodetcc.withdrawToken(
								res.data.toAddress,
								bigNumber.toString(),
								veFee.toString(),
								res.data.nonce,
								bigDeadline.toString(),
								res.data.sign,
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
						} else if (type == 10) {
							this.$supernodetcc.withdrawVE(
								res.data.toAddress,
								bigNumber.toString(),
								veFee.toString(),
								res.data.nonce,
								bigDeadline.toString(),
								res.data.sign,
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
						} else if (type == 11) {
							this.$v9tcc.withdrawToken(
								res.data.toAddress,
								bigNumber.toString(),
								veFee.toString(),
								res.data.nonce,
								bigDeadline.toString(),
								res.data.sign,
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
						} else if (type == 12) {
							this.$v9tcc.withdrawVE(
								res.data.toAddress,
								bigNumber.toString(),
								veFee.toString(),
								res.data.nonce,
								bigDeadline.toString(),
								res.data.sign,
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
						} else if (type == 8) {
							const par = [
								res.data.toAddress,
								bigNumber.toString(),
								res.data.nonce,
								bigDeadline.toString(),
								res.data.sign
							]
							console.log(par)
					
							this.$vereleasetcc.withdrawVE(
								res.data.toAddress,
								bigNumber.toString(),
								veFee.toString(),
								res.data.nonce,
								bigDeadline.toString(),
								res.data.sign,
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
						} else if (type == 13) {
							this.$incometcc.withdrawBase(
								res.data.toAddress,
								bigNumber.toString(),
								veFee.toString(),
								res.data.nonce,
								bigDeadline.toString(),
								res.data.sign,
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
						}
					}
				} catch (err) {
					console.error("❌ 提现流程出错:", err);
					this.$Common.showToast("操作失败，请稍后重试");
				} finally {
					this.loading = false;
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
			getRecordAccountList() {
				this.$Request.get('app/getRecordAccountList2', {
				}).then((res) => {
					if (res.code == 200) {
						this.assetTransferRecords = res.data;
					}
				});
			},
			valueSubstr(value) {
				return value.substr(0, 4) + '******' + value.substring(value.length - 4);
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
			justify-content: space-around;
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