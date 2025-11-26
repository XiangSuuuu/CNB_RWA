<template>
	<view class="pages">
		<view class="head-wrap flex-center">
			<view class="title">
				VeriBridge One 协议订单
			</view>
			<image src="/static/public/arrow-left-white.png" @click="returnPage()" mode="widthFix" class="back_img">
			</image>
		</view>
		<view class="flex-lr">
			<view class="flex-l">
				<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
				<view style="width: 8rpx;"></view>
				<view style="font-size: 24rpx; font-weight: 400; color: white;">
					VBO矿机：
				</view>
			</view>
			<view class="flex-r">
				<view class="flex-center time-wraps" v-if="targetDate">
					<!-- 时 -->
					<view class="time flex-center">{{ hours[0] }}</view>
					<view class="time flex-center">{{ hours[1] }}</view>
					<view class="time flex-center">{{ hours[2] }}</view>
					<view style="margin: 0 7rpx;">:</view>

					<!-- 分 -->
					<view class="time flex-center">{{ minutes[0] }}</view>
					<view class="time flex-center">{{ minutes[1] }}</view>
					<view style="margin: 0 7rpx;">:</view>

					<!-- 秒 -->
					<view class="time flex-center">{{ seconds[0] }}</view>
					<view class="time flex-center">{{ seconds[1] }}</view>

				</view>
			</view>
		</view>
		<view class="box" style=" width: 100%; height: 168rpx; margin-top: 30rpx;">
			<view style="display: flex;
  align-items: center !important; justify-content: space-around; width: 100%; height: 50%;">
				<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
					初始算力
				</view>
				<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
					累计算力
				</view>
				<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
					新增算力
				</view>
			</view>
			<view style="height: 2rpx; width: 100%; background-color: #FFFFFF26;">

			</view>
			<view style="display: flex;
			align-items: center !important; justify-content: space-around; width: 100%; height: 50%;">
				<view class="flex-center" style="width: 33%; font-size: 28rpx; font-weight: 600; color: #FFFFFF;">
					{{truncateToFixed((userInfo.count8/unitNum),2)}} T
				</view>
				<view class="flex-center" style="width: 33%; font-size: 28rpx; font-weight: 600; color: #FFFFFF;">
					{{truncateToFixed((userInfo.uesBalance1/unitNum),2)}} T
				</view>
				<view class="flex-center" style="width: 33%; font-size: 28rpx; font-weight: 600; color: #FFFFFF;">
					{{truncateToFixed((userInfo.count7/unitNum),2)}} T
				</view>
			</view>
		</view>
		<view class="box flex-lr" style="padding:0 24rpx ; width: 100%; height: 96rpx; margin-top: 24rpx;">
			<view class="flex-l">
				<image src="/static/agreement/icon0.png"
					style="position: relative; top: 10rpx; width: 72rpx; height: 72rpx;"></image>
				<!-- <view style="width: 8rpx;"></view> -->
				<view style="font-size:24rpx ; font-weight: 400; color:#FFFFFFCC ;">产出收益：</view>
				<view style="font-size:24rpx ; font-weight: 600; color:#FFFFFF ;">
					{{truncateToFixed((userInfo.uesBalance3/unitNum),2)}} VBO
				</view>
			</view>
			<view @click="gainWithdrawal(userInfo.uesBalance3,3)" class="flex-center button" style="width: 164rpx; height: 56rpx;">
				领取收益
			</view>
		</view>

		<CollapseBox class="box" title="VBO矿机记录">
			<!-- 👇 slot内容，自定义展开部分 -->
			<view v-for="(item, index) in miningMachineRecords" :key="index">
				<view class="flex-lr" style="padding: 20rpx 20rpx">
					<view style="font-size: 24rpx; color: #FFFFFFCC;">{{item.createTime}}</view>
					<view v-if="item.recordStatus==1 && item.accountType ==3" style="font-size: 24rpx; color: #FFFFFFCC;">本周产出
						{{truncateToFixed((item.money/unitNum),2)}} VBO，请领取
					</view>
					<view v-if="item.recordStatus==-1 && item.accountType ==3" style="font-size: 24rpx; color: #FFFFFFCC;">领取的
						{{truncateToFixed((item.money/unitNum),2)}} VBO已转入进我的资产
					</view>
					<view v-if="item.recordStatus==-1 && item.accountType ==2" style="font-size: 24rpx; color: #FFFFFFCC;">我的资产理财资产赎回，VBO矿机算力从下周开始减半产出
					</view>
					<view v-if="item.recordStatus==1 && item.accountType ==1" style="font-size: 24rpx; color: #FFFFFFCC;">新增算力
						{{truncateToFixed((item.money/unitNum),2)}} T
					</view>
					
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
			</view>
		</CollapseBox>
		<view style="margin-top: 60rpx;">
			<view class="flex-l">
				<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
				<view style="width: 8rpx;"></view>
				<view style="font-size: 24rpx; font-weight: 400; color: white;">
					VBO理财：
				</view>
			</view>
			<view style="height: 30rpx;"></view>
			<view class="box" style="width: 100%; height: 282rpx;">
				<view style="display: flex;
			align-items: center !important; justify-content: space-around; padding:26rpx 0 ;">
					<view style="font-size: 24rpx; height: 400; color: #FFFFFFCC;">
						理财资产
					</view>
					<view style="font-size: 24rpx; height: 400; color: #FFFFFFCC;">
						理财收益
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				<view>
					<view style="display: flex;
			align-items: center !important; justify-content: space-around; padding: 20rpx 0;">
						<view class="flex-center"
							style="width: 50%; font-size: 28rpx; font-weight: 600; color: #FFFFFF;">
							{{truncateToFixed((userInfo.uesBalance2/unitNum),2)}} USDT
						</view>
						<view class="flex-center"
							style="width: 50%; font-size: 28rpx; font-weight: 600; color: #FFFFFF;">
							{{truncateToFixed((userInfo.uesBalance5/unitNum),2)}} USDT
						</view>
					</view>
					<view class="flex-center" style="padding: 20rpx 0;">
						<view @click="gainWithdrawal(userInfo.uesBalance2,2)" class="flex-center gradient-border-btn" style="width: 216rpx; height: 60rpx;">
							赎回理财资产
						</view>

						<view style="width: 60rpx;"></view>
						<view @click="gainWithdrawal(userInfo.uesBalance5,5)" class="flex-center button" style="width: 216rpx; height: 60rpx;">
							领取收益
						</view>
					</view>
				</view>

			</view>
		</view>

		<CollapseBox class="box" title="理财记录">
			<!-- 👇 slot内容，自定义展开部分 -->
			<view v-for="(item, index) in financialRecords" :key="index">
				<view class="flex-lr" style="padding: 20rpx 20rpx">
					<view style="font-size: 24rpx; color: #FFFFFFCC;">{{item.createTime}}</view>
					<view v-if="item.recordStatus==1 && item.accountType ==5" style="font-size: 24rpx; color: #FFFFFFCC;">今天理财收益
						{{truncateToFixed((item.money/unitNum),2)}} USDT
					</view>
					<view v-if="item.recordStatus==-1 && item.accountType ==5" style="font-size: 24rpx; color: #FFFFFFCC;">领取的
						{{truncateToFixed((item.money/unitNum),2)}} USDT理财收益已转入
					</view>
					<view v-if="item.recordStatus==1 && item.accountType ==2" style="font-size: 24rpx; color: #FFFFFFCC;">理财账户增加
						{{truncateToFixed((item.money/unitNum),2)}} USDT
					</view>
					<view v-if="item.recordStatus==-1 && item.accountType ==2" style="font-size: 24rpx; color: #FFFFFFCC;">你的理财资产已赎回
						{{truncateToFixed((item.money/unitNum),2)}} USDT
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
			</view>
		</CollapseBox>

		<view style="margin-top: 30rpx;">
			<view class="flex-l">
				<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
				<view style="width: 8rpx;"></view>
				<view style="font-size: 24rpx; font-weight: 400; color: white;">
					相关规则：
				</view>
			</view>
			<CollapseBox class="box" title="协议规则">
				<!-- 👇 slot内容，自定义展开部分 -->
				<view style="padding: 20rpx 20rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFF99;">
						按1000USDT举例，协议申购成功，自动分成两部分：
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFF99;">
						·50%→500USDT自动购买VBO矿机，不可赎回。
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFF99;">
						·50%→500USDT参与理财去复利，理财资产可随时赎回。
					</view>
				</view>
			</CollapseBox>
			<CollapseBox class="box" title="VBO矿机规则">
				<!-- 👇 slot内容，自定义展开部分 -->
				<view style="padding: 20rpx 20rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFF99;">
						USDT等于1T算力，新增算力当周不产出VBO，下周进入累计算力后，开始产出VBO。按照金本位计算，一周产出5%等值的VBO
						例如:当VBO币价为0.1USDT时，一周产出200枚VBO，当币价为0.001USDT时，一周产出2000枚VBO
					</view>

				</view>
			</CollapseBox>
			<CollapseBox class="box" title="VBO理财规则">
				<!-- 👇 slot内容，自定义展开部分 -->
				<view style="padding: 20rpx 20rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFF99;">
						本金随进随出，每天按1%复利。领取理财收益时，收益的20%自动流入矿机成为新增算力，80%自动转入到我的资产
					</view>
				</view>
			</CollapseBox>
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
				targetDate: 300000000, //剩余时间
				timer: null, // 用于存储定时器的ID
				hours: '000',
				minutes: '00',
				seconds: '00',
				servicerErrorModel: false,
				isExpanded: false,
				userInfo: null,
				miningMachineRecords: null,
				financialRecords: null,
				approveNum: 0, //当前选择币种授权的余额
				is_approve: false, //是否授权
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
				this.getMiningMachineRecords();
				this.getFinancialRecords();
				this.startCountdown()
			},

			gainTransfer(amount, type) {
				this.$Request.post('app/transfer', {
					number: amount,
					type: type,
				}).then((res) => {
					this.loading = false;
					if (res.code == 200) {
						this.getUserInfo();
						this.$Common.showToast(this.$t(
							'index._TEXT53'));
					}
				});
			},
			async gainWithdrawal(amount, type) {
				// if (!Number(amount)) return this.$Common.showToast('暂无领取金额');
				
				// ✅ 等待接口返回
				const res = await this.$Request.post('app/withdrawalGetFee', {
					number: amount,
					type: type,
				});
				
				// ✅ 等待授权检查
				await this.approveMarts(0);
				
				console.log(this.is_approve);
				console.log(this.approveNum);
				console.log(this.toFixedSafe(this.toFixed(res.data) / this.unitNum));
				
				// ✅ 判断授权是否足够
				if ((!this.is_approve || this.approveNum < this.toFixedSafe(this.toFixed(res.data) / this
					.unitNum))) {
					// 授权不足则重新授权
					await this.isCoin(1, 1, this.toFixedSafe(this.toFixed(res.data) / this.unitNum), amount, type);
					return;
				}
				
				if (this.loading) return;
				this.loading = true;
				this.$Request.post('app/withdrawal', {
					number: amount,
					type: type,
				}).then(async (res) => {
					this.loading = false;
					if (res.code == 200) {
						this.userInfo['uesBalance' + type] = 0;
						const bigNumber = this.toFixed(res.data.amount);
						const bigDeadline = this.toFixed(res.data.deadline);
						const veFee = this.toFixed(res.data.veFee);
						console.log(bigNumber.toString());
						this.$Loading.handlemount();
						if (type == 3) {
							
							const par = [
								res.data.toAddress,
								bigNumber.toString(),
								res.data.nonce,
								bigDeadline.toString(),
								res.data.sign
							]
							console.log(par)
							this.$incometcc.withdrawMinerProfit(
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
						}else if (type == 2) {
							
							const par = [
								res.data.toAddress,
								bigNumber.toString(),
								res.data.nonce,
								bigDeadline.toString(),
								res.data.sign
							]
							console.log(par)
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
						}else if (type == 5) {
							
							const par = [
								res.data.toAddress,
								bigNumber.toString(),
								res.data.nonce,
								bigDeadline.toString(),
								res.data.sign
							]
							console.log(par)
							this.$incometcc.withdrawProfit(
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
				});
			},
			
			async approveMarts(is = 0) {
			
				try {
					const tokenInstance = this.$vetcc;
					const usdtNum = await tokenInstance.allowance(this.myAddress, this.$incometcc.address);
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
			isCoin(is = 0, isSub = 0, value,amount, type) {
				if (this.coinLoading) return;
				this.coinLoading = true
			
				const tokenInstance = this.$vetcc;
				const nums = BigNumber(this.unitNum).multipliedBy(value);
				const price = this.toFixedSafe(nums);
				tokenInstance.approve(this.$incometcc.address, price).then((
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
									this.gainWithdrawal(amount, type);
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
						this.targetDate = res.data.pledgeNextSendTime;
					}
				}, false, false);
			},
			getRecordAccountList(accountType, recordStatus) {
				return this.$Request.get('app/getRecordAccountList', {
					accountType,
					recordStatus
				}).then((res) => {
					if (res.code == 200) {
						return res.data;
					}
					return null;
				});
			},
			getMiningMachineRecords() {
				return this.$Request.get('app/getRecordAccountListZy', {

				}).then((res) => {
					if (res.code == 200) {
						this.miningMachineRecords = res.data;
					}
				});
			},
			getFinancialRecords() {
				return this.$Request.get('app/getRecordAccountListLc', {
					
				}).then((res) => {
					if (res.code == 200) {
						this.financialRecords = res.data;
					}
				});
			},
			skipPageUrl(url) {
				window.open(url)
			},
			toggleExpand() {
				this.isExpanded = !this.isExpanded;
			},
			truncateToFixed(num, fixed) {
				const factor = Math.pow(10, fixed);
				return Math.trunc(num * factor) / factor;
			},
			//倒计时
			startCountdown() {
				if (this.timer) clearInterval(this.timer);
			
				this.timer = setInterval(() => {
					const now = Date.now(); // 当前时间戳（毫秒）
					const distance = this.targetDate - now; // 剩余时间
			
					if (distance <= 0) {
						clearInterval(this.timer);
						this.hours = '000';
						this.minutes = '00';
						this.seconds = '00';
						return;
					}
			
					const totalSeconds = Math.floor(distance / 1000);
					const hours = Math.floor(totalSeconds / 3600);
					const minutes = Math.floor((totalSeconds % 3600) / 60);
					const seconds = totalSeconds % 60;
			
					this.hours = this.pad(hours, 3);   // 三位补零
					this.minutes = this.pad(minutes, 2);
					this.seconds = this.pad(seconds, 2);
				}, 1000);
			},
			pad(num, length = 2) {
				return num.toString().padStart(length, '0');
			},
			//登录
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

			skipUrl(name, params) {
				if (this.activeModel) return this.$Common.showToast(this.$t('index._TEXT10'));
				this.$Router.push({
					path: name,
					query: params
				})
			},
			returnPage() {
				uni.navigateBack({
					delta: 1
				});
				// this.$Router.push({
				// 	path: '/',
				// })
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
			background-color: #FFFFFF33;
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

		.gradient-border-btn {
			position: relative;
			color: #FFB92F;
			font-size: 26rpx;
			font-weight: 500;
			border-radius: 100rpx;
			background: transparent;
			overflow: hidden;
		}

		/* 外层伪元素做渐变边框 */
		.gradient-border-btn::before {
			content: "";
			position: absolute;
			inset: 0;
			border-radius: inherit;
			padding: 2rpx;
			/* 边框宽度 */
			background: linear-gradient(90deg, #ffb92f, #ff6f2f);
			-webkit-mask:
				linear-gradient(#fff 0 0) content-box,
				linear-gradient(#fff 0 0);
			-webkit-mask-composite: xor;
			mask-composite: exclude;
			pointer-events: none;
		}

		/* 点击时可加轻微透明效果 */
		.gradient-border-btn:active {
			opacity: 0.8;
		}

		.arrow.rotate {
			transform: rotate(180deg);
		}

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
			/* 足够容纳内容 */
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

		.time-wraps {
			width: 100%;
			// margin-top: 44rpx;
			color: #FFFFFF;
			font-size: 24rpx;
			font-weight: 600;
			font-family: 'Microsoft YaHei';


			.time {
				width: 32rpx;
				height: 32rpx;
				// background: url('../../static/index/bg3.png') no-repeat;
				// background-size: 100% 100%;
				background-color: #FFB92F;
				border-radius: 8rpx;
				color: #333333;
				font-size: 22rpx;
				margin: 0 2rpx;
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