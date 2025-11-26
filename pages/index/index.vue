<template>
	<view class="pages">
		<image src="/static/index/bg0.png"
			style="position: absolute; left: 0; top: 80rpx; width: 100%; height: 1100rpx; z-index: 0; object-fit: cover;">
		</image>

		<image src="/static/index/bg3.png"
			style="position: absolute; left: 0; top: 1000rpx; width: 100%; height: 652rpx; z-index: 0; object-fit: cover;">
		</image>

		<view class="content" style="position: relative; z-index: 1;">
			<view class="flex-center" style="margin-top: 212rpx; font-size: 60rpx; font-weight: 400; font-family: RubikGlitch-Regular;
	             background: linear-gradient(180deg, #FFFFFF, #FFB92F);
	             -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
				VERIBRIDGE ONE
			</view>
			<view class="flex-center" style="margin-top: 42rpx;">
				<view class="flex-lr"
					style="padding:4rpx 10rpx ; border-radius: 24rpx; width: 428rpx; height: 52rpx; backdrop-filter: 8rpx; background-color: #FFFFFF38;">
					<view class="flex-center"
						style="color: #060503; font-size:29rpx ; font-weight: 400; font-family: UnboundedSans-Regular;  width: 100rpx; height: 42rpx;border-radius: 20rpx; background-color: #FFB92F;">
						VBO
					</view>
					<view style="font-size: 26rpx; font-weight: 400; ">
						VeroEx平台原生功能性代币
					</view>
				</view>
			</view>
			<view class="flex-lr" style="margin-top: 334rpx;">
				<view
					style="padding: 25rpx 25rpx; width:342rpx; height: 142rpx; background: url('../../static/index/bg1.png') no-repeat; background-size: 100% 100%;">
					<view style="color: #FFFFFFCC; font-size: 24rpx; font-weight: 400;" class="flex-center">
						所属公链
					</view>
					<view style=" color: #FFFFFFCC; font-size: 28rpx; font-weight: 400;" class="flex-center">
						VeroEx Mainnet
					</view>
				</view>
				<view
					style="padding: 25rpx 25rpx; width:342rpx; height: 142rpx; background: url('../../static/index/bg1.png') no-repeat; background-size: 100% 100%;">
					<view style="color: #FFFFFFCC;  font-size: 24rpx; font-weight: 400;" class="flex-center">
						代币总量
					</view>
					<view style="font-size: 28rpx; font-weight: 400;" class="flex-center">
						10亿枚VBO
					</view>
				</view>
			</view>
			<view class="flex-lr" style="margin-top: 8rpx;">
				<view
					style="padding: 25rpx 25rpx; width:342rpx; height: 142rpx; background: url('../../static/index/bg1.png') no-repeat; background-size: 100% 100%;">
					<view style="color: #FFFFFFCC;  font-size: 24rpx; font-weight: 400;" class="flex-center">
						极致通缩
					</view>
					<view style="font-size: 28rpx; font-weight: 400;" class="flex-center">
						1000倍
					</view>
				</view>
				<view
					style="padding: 25rpx 25rpx; width:342rpx; height: 142rpx; background: url('../../static/index/bg1.png') no-repeat; background-size: 100% 100%;">
					<view style="color: #FFFFFFCC;  font-size: 24rpx; font-weight: 400;" class="flex-center">
						最终流通总量
					</view>
					<view style="font-size: 28rpx; font-weight: 400;" class="flex-center">
						100万枚VBO
					</view>
				</view>
			</view>
			<view style="width: 100%; margin-top: 80rpx;" class="flex-center">
				<image style="width: 36rpx; height: 86rpx; " src="/static/index/bg4.png"></image>
			</view>
			<view style="width: 100%; margin-top: 86rpx;" class="flex-center">
				<view class="flex-center"
					style="font-size: 26rpx; font-weight: 600; width: 264rpx; height: 56rpx; background: url('../../static/index/bg2.png') no-repeat; background-size: 100% 100%;">
					VBO代币分配机制
				</view>
			</view>
			<view class="card flex-l" style="padding: 40rpx 40rpx; width: 100%; height: 152rpx; margin-top: 68rpx;">
				<image src="/static/index/icon0.png" style="width: 72rpx; height: 72rpx; margin-right: 24rpx;"></image>
				<view >
					<view class="flex-l">
						<view style="font-size: 28rpx; font-weight: 400; margin-right: 12rpx;">
							挖矿
						</view>
						<view class="flex-center" style="margin-right: 12rpx; color: #FFB92F; font-size: 24rpx; font-weight: 400; padding: 6rpx; background-color: #FFB92F33; border: #FFB92F 1rpx solid; border-radius: 26rpx;">
							占比:99%
						</view>
						<view class="flex-center" style="color: #FFB92F; font-size: 24rpx; font-weight: 400; padding: 6rpx; background-color: #FFB92F33; border: #FFB92F 1rpx solid; border-radius: 26rpx;">
							数量:990,000,000VBO
						</view>
					</view>
					<view style="height: 16rpx;"></view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						99%通过POB挖矿产出
					</view>
				</view>
			</view>
			<view class="card flex-l" style="padding: 40rpx 40rpx; width: 100%; height: 180rpx; margin-top: 48rpx;">
			<image src="/static/index/icon1.png" style="width: 72rpx; height: 72rpx; margin-right: 24rpx;"></image>
			<view style="width: 85%;">
				<view class="flex-l">
					<view style="font-size: 28rpx; font-weight: 400; margin-right: 12rpx;">
						创世流动性
					</view>
					<view class="flex-center" style="margin-right: 12rpx; color: #FFB92F; font-size: 24rpx; font-weight: 400; padding: 6rpx; background-color: #FFB92F33; border: #FFB92F 1rpx solid; border-radius: 26rpx;">
						占比:1%
					</view>
					<view class="flex-center" style="color: #FFB92F; font-size: 24rpx; font-weight: 400; padding: 6rpx; background-color: #FFB92F33; border: #FFB92F 1rpx solid; border-radius: 26rpx;">
						数量:10,000,000VBO
					</view>
				</view>
				<view style="height: 16rpx;"></view>
				<view style=" font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
					10,000,000VBO将用于创世流动性建设
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
			Model
		},
		data() {
			return {
				gridItem: [{
						text: this.$t('index._TEXT8'),
						url: 'dashboard',
						icon: "/static/index/dashboard.png"
					},
					{
						text: this.$t('index._TEXT9'),
						url: 'notice',
						icon: "/static/index/notice.png"
					},
					{
						text: this.$t('index._TEXT114'),
						url: 'info',
						icon: "/static/index/customer service.png"
					},
				],
				loading: false,
				coinLoading: false,
				setPws: false,
				loginPws: false,
				unitNum: 10 ** 18,
				current: 0,
				activeModel: false,
				inviteCode: '',
				targetDate: 300000000, //剩余时间
				timer: null, // 用于存储定时器的ID
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
				configData: null,
				totalIssuance: 0, //发行总量
				xyNum: 0,
				xyNum1: 0,
				pledgeWrap: null,
				pledgeData: [],
				zBalance: 0, //代币合约地址
				deadBalance: 0, //dead合约地址
				approveNum: 0, //当前选择币种授权的余额
				is_approve: false, //是否授权
				sqAddress: '', //授权地址
				password: '',
				password1: '',
				servicerErrorModel: false,
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
			xhNum() {
				if (this.totalIssuance && this.xyNum) {
					console.log('totalIssuance：' + this.totalIssuance)
					return Number((Number(this.totalIssuance) - Number(this.xyNum)).toFixed(4))
				} else {
					return 0;
				}
			},
		},
		mounted() {
			this.init();
		},
		methods: {
			...mapActions(['gainUserData']),
			init() {
				if (this.$Common.getPar('invite_code') || uni.getStorageSync('inviteCode')) { //邀请地址
					this.inviteCode = this.$Common.getPar('invite_code') || uni.getStorageSync('inviteCode');
					uni.setStorageSync('inviteCode', this.inviteCode)
				}
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
			onSwiperChange(e) {
				// 通过 e.detail.current 获取当前所在的 swiper-item 索引
				console.log('当前索引:', e.detail.current);
				this.current = e.detail.current;
			},

			gainCurrent(ix) {
				if (ix) {
					if (this.current >= (this.pledgeData.length - 1)) {
						this.current = 0
					} else {
						this.current += 1;
					}
				} else {
					if (this.current == 0) {
						this.current = (this.pledgeData.length - 1)
					} else {
						this.current = Number(this.current) - 1;
					}
				}
			},

			//设置邀请码
			setInvite() {
				if (!this.inviteCode) return this.$Common.showToast(this.$t('index._TEXT10'));
				if (!uni.getStorageSync('accessToken')) return;
				if (this.loading) return;
				this.loading = true;
				this.$Request.post('app/user/setInviteCode', {
					inviteCode: this.$Common.addrEncrypt(this.inviteCode)
				}).then((res) => {
					this.loading = false;
					if (res.code == 200) {
						uni.setStorageSync('inviteCode', null);
						this.activeModel = false
						this.gainUserData();
					}
				});
			},

			//获取配置信息
			getConfigs() {
				// this.$Request.get('app/pledgeType', {}).then((res) => {
				// 	if (res.code == 200) {
				// 		this.pledgeWrap = res.data;
				// 		this.pledgeData = res.data.list;
				// 		this.targetDate = res.data.nextTime;
				// 		this.xyNum1 = res.data.existingNum;
				// 		if (this.targetDate) {
				// 			clearInterval(this.timer);
				// 			this.startCountdown();
				// 		}
				// 	}
				// });
				this.$Request.get('app/getConfig', {}).then((res) => {
					console.log(res)
					if (res.code == 200) {
						this.configData = res.data.sysConfigs;
						this.configData.forEach((item) => {
							if (item.configKey == 'totalIssuance') {
								this.totalIssuance = item.configValue;
							}
							if (item.configKey == 'Stake') {
								this.sqAddress = item.configValue;
							}
						})
						// this.getAmount(); //获取余额
					} else {
						this.servicerErrorModel = !this.servicerErrorModel;
					}
				});
			},

			// 获取币数量
			// async getAmount() {
			// 	try {
			// 		console.log("this.$deadtcc" + this.$deadtcc)
			// 		this.$deadtcc.balanceOf(this.myAddress).then((res) => {
			// 			if (res && res._hex) {
			// 				let num = parseInt(res._hex);
			// 				this.deadBalance = Number((num / this.unitNum).toFixed(6));
			// 			}
			// 		});
			// 		this.$tokentcc.balanceOf(this.myAddress).then((res) => {
			// 			if (res && res._hex) {
			// 				let num = parseInt(res._hex);
			// 				this.zBalance = Number((num / this.unitNum).toFixed(6));
			// 			}
			// 		});
			// 		this.$tokentcc.totalSupply().then((res) => {
			// 			if (res && res._hex) {
			// 				let num = parseInt(res._hex);
			// 				this.xyNum = num / this.unitNum;
			// 				console.log('现有：' + this.xyNum)

			// 			}
			// 		});
			// 		this.approveMarts(); //是否授权
			// 	} catch (e) {
			// 		console.log(e);
			// 		setTimeout(() => {
			// 			this.getAmount();
			// 		}, 1500)
			// 		//TODO handle the exception
			// 	}
			// },

			//是否授权
			async approveMarts(is = 0) {
				try {
					const usdtNumRaw = await this.$tokentcc.allowance(this.myAddress, this.sqAddress);
					const usdtNum = ethers.BigNumber.from(usdtNumRaw);
					const decimals = 18; // USDT 可能是 6，根据你的 token 设置
					const unit = ethers.BigNumber.from(10).pow(decimals);

					// 精度保留为字符串小数
					const approveNum = ethers.utils.formatUnits(usdtNum, decimals);

					if (is) {
						if (this.approveNum === approveNum) {
							this.is_approve = false;
						} else {
							this.approveNum = approveNum;
							this.is_approve = !usdtNum.isZero();
						}
					} else {
						this.approveNum = approveNum;
						this.is_approve = !usdtNum.isZero();
					}

					console.log(this.approveNum);
					console.log(this.is_approve);
				} catch (e) {
					console.error('approveMarts error:', e);
				}
			},

			// 授权币种
			isCoin(is = 0, isSub = 0) {
				if (this.coinLoading) return;
				this.coinLoading = true
				// const price = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
				const nums = this.unitNum * Number(this.pledgeData[this.current].pledgePrice);
				const price = this.toFixedSafe(nums);
				this.$tokentcc.approve(this.sqAddress, price).then((hash) => {
					this.coinLoading = false
					if (hash) {
						let num = 0
						this.$Loading.setPoint(this.$t('index._TEXT38') + '...', 300000)
						let time = setInterval(() => {
							if (this.is_approve) {
								clearInterval(time)
								this.$Loading.setPoint('', 0)
								this.approveMarts() //请求授权
								if (isSub) { //授权完成 继续请求升级
									this.sumbit();
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

			//质押
			async sumbit() {
				console.log(this.$c2ctcc)
				if (this.pledgeData[this.current].pledgePrice > this.zBalance) return this.$Common.showToast(this.$t(
					'index._TEXT39'));
				await this.approveMarts();
				console.log("!this.is_approve===" + !this.is_approve);
				console.log("this.approveNum" + this.approveNum);
				console.log(" Number(this.pledgeData[this.current].pledgePrice))===" + Number(this.pledgeData[this
					.current].pledgePrice));
				console.log("结果===" + (this.approveNum < Number(this.pledgeData[this.current].pledgePrice)));
				if ((!this.is_approve || this.approveNum < Number(this.pledgeData[this.current]
						.pledgePrice))) { //授权金额小于兑换金额 或者未授权 重新授权
					this.isCoin(1, 1);
					return;
				}
				if (this.loading) return;
				this.loading = true;
				this.$Request.post('app/pledge', {
					num: this.pledgeData[this.current].pledgePrice
				}).then((res) => {
					this.loading = false;
					if (res.code == 200) {
						this.$Loading.handlemount();
						// this.toFixed(res.data.amount)
						const bigNumber = this.toFixedSafe(res.data.amount);
						const bigInvest = this.toFixedSafe(res.data.invest);
						const bigDeadline = this.toFixedSafe(res.data.deadline);
						this.$staketcc.stake(
							res.data.toAddress,
							bigNumber.toString(),
							bigInvest.toString(),
							res.data.nonce,
							bigDeadline.toString(),
							res.data.sign
						).then((ret) => {
							if (ret) {
								this.$Loading.handleDestory();
								this.$Request.post('app/pledgeSuccess', {
									nonce: res.data.nonce
								}).then((val) => {
									if (val.code == 200) {
										this.$Common.showToast(this.$t('index._TEXT40'));
										// setTimeout(() => {
										// 	this.getAmount()
										// }, 12000)
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

			//倒计时
			startCountdown() {
				this.timer = setInterval(() => {
					this.targetDate = Number(this.targetDate) - 1000
					const distance = this.targetDate; // 计算时间差

					// 如果时间已经过去，则清除定时器并停止倒计时
					if (distance < 0) {
						clearInterval(this.timer);
						this.days = 0;
						this.hours = 0;
						this.minutes = 0;
						this.seconds = 0;
						this.getConfigs();
						return;
					}

					// 计算天、小时、分钟和秒
					this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
					this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
					this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
				}, 1000); // 每秒更新一次倒计时
			},

			// 设置密码
			autoRegister() {
				if (!this.password) return this.$Common.showToast(this.$t('index._TEXT33'));
				if (this.password != this.password1) return this.$Common.showToast(this.$t('index._TEXT41'));
				if (this.loading) return;
				this.loading = true;
				this.$Request.post('app/user/update/password', {
					password: this.$Common.md5Num(this.password),
				}).then((res) => {
					this.loading = false;
					this.setPws = false;
					if (res.code == 200) {
						// uni.setStorageSync('loginData', res.token);
						// uni.setStorageSync('accessToken', res.token);
						this.getConfigs();
					}
				});
			},

			//登录
			autoLogin() {
				if (!this.password) return this.$Common.showToast('请输入登录密码');
				if (this.loading) return;
				this.loading = true;
				this.$Request.post('app/login', {
					addressAES: this.$Common.addrEncrypt(this.myAddress),
					// password: this.password ? this.$Common.md5Num(this.password) : '',
				}).then((res) => {
					this.loading = false;
					if (res.code == 200) {
						uni.setStorageSync('accessToken', res.token);
						uni.setStorageSync('loginData', res.token);
						this.loginPws = false;
						this.gainUserData();
						this.getConfigs();
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
		padding: 0 0;

		.content {
			padding: 0 40rpx;
		}
		.card {
		  
		  border-radius: 20px;
		  background: linear-gradient(
		      180deg,
		      // #544528 0%,     /* 顶部柔金亮点 */
		      #4f4022 0%,    /* 过渡色——偏暗棕 */
		      #1b1b1b 100%    /* 底部深灰 */
		    );
		  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.15);
		}
	}
</style>