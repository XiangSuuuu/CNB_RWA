<template>
	<view class="pages">
		<image src="/static/ecological_rights/bg0.png"
			style="position: absolute; left: 0; top: 0; width: 100%; height: 1100rpx; z-index: 0; object-fit: cover;">
		</image>
		<view style="margin-top: 240rpx; padding: 0 40rpx; width: 100%; position: relative; z-index: 1;">
			<view
				style="padding: 40rpx; width: 100%; height: 244rpx; background: url('../../static/ecological_rights/bg3.png') no-repeat; background-size: 100% 100%;">
				<image :src="cardList[current].image"
					style="width: 440rpx; height: 364rpx; position: absolute; right: 0; top: -100rpx; z-index: 0; object-fit: cover;">
				</image>

				<view class="flex-l">
					<view style="font-size: 32rpx; font-weight: 700; color: #FFFFFF;">
						{{ cardList[current].name }}
					</view>
					<view style="font-size: 24rpx; font-weight: 400;color: #FFFFFF;">
						（共计{{ cardList[current].totalCount }}）
					</view>
				</view>
				<view style="font-size: 48rpx; font-weight: 700;" :style="{ color: cardList[current].color }">
				    {{ cardList[current].price }}
				</view>
			</view>
		</view>
		<view
			style="padding: 60rpx; position: relative; top: -60rpx; z-index: 1; width: 100%; height: 762rpx; background: url('../../static/ecological_rights/bg1.png') no-repeat; background-size: 100% 100%;">
			<view class="flex-lr">
				<view class="flex-l">
					<image src="/static/ecological_rights/icon0.png"
						style="margin-right: 32rpx; width: 48rpx; height: 48rpx;"></image>
					<view style="font-weight: 400; font-size: 28rpx; color: #FFFFFF;">
						每天释放
					</view>
				</view>
				<view class="flex-r" style="font-size: 28rpx; font-weight: 700; color: #FFFFFF;">
					{{ cardList[current].dailyRelease }}
				</view>
			</view>
			<view style="margin: 20rpx 0; width: 100%; height: 4rpx; background-color: #655A8933;"></view>
			<view class="flex-lr">
				<view class="flex-l">
					<image src="/static/ecological_rights/icon1.png"
						style="margin-right: 32rpx; width: 48rpx; height: 48rpx;"></image>
					<view style="font-weight: 400; font-size: 28rpx; color: #FFFFFF;">
						周期
					</view>
				</view>
				<view class="flex-r" style="font-size: 28rpx; font-weight: 700; color: #FFFFFF;">
					{{ cardList[current].cycle }}
				</view>
			</view>
			<view style="margin: 20rpx 0; width: 100%; height: 4rpx; background-color: #655A8933;"></view>
			<view class="flex-lr">
				<view class="flex-l">
					<image src="/static/ecological_rights/icon2.png"
						style="margin-right: 32rpx; width: 48rpx; height: 48rpx;"></image>
					<view style="font-weight: 400; font-size: 28rpx; color: #FFFFFF;">
						购买数量
					</view>
				</view>
				<view class="flex-r" style="font-size: 28rpx; font-weight: 700; color: #FFFFFF;">
					{{ cardList[current].limit }}
				</view>
			</view>
			<view style="margin: 20rpx 0; width: 100%; height: 4rpx; background-color: #655A8933;"></view>
			<view class="flex-lr">
				<view class="flex-l">
					<image src="/static/ecological_rights/icon3.png"
						style="margin-right: 32rpx; width: 48rpx; height: 48rpx;"></image>
					<view style="font-weight: 400; font-size: 28rpx; color: #FFFFFF;">
						复购产品
					</view>
				</view>
				<view class="flex-r" style="font-size: 28rpx; font-weight: 700; color: #FFFFFF;">
					{{ cardList[current].discount }}
				</view>
			</view>
			<view style="margin: 20rpx 0; width: 100%; height: 4rpx; background-color: #655A8933;"></view>

			<view class="flex-center" style="width: 100%; margin-top: 80rpx;">
				<view class="flex-lr" style="width: 358rpx; height: 48rpx;">
					<view @click="gainCurrent(0)" class="flex-center"
						style="font-size: 24rpx; font-weight: 400rpx; color: #FFFFFF; width: 160rpx; height: 48rpx; border-radius: 6rpx; background-color: #FFFFFF38;">
						上一个
					</view>
					<view @click="gainCurrent(1)" class="flex-center"
						style="font-size: 24rpx; font-weight: 400rpx; color: #FFFFFF; width: 160rpx; height: 48rpx; border-radius: 6rpx; background-color: #FFFFFF38;">
						下一个
					</view>
				</view>
			</view>
			<view class="flex-center gradient-panel"
				style="margin-top: 96rpx; font-size: 28rpx; font-weight: 600; color: #FFFFFF;">
				购买规则
			</view>
			<view class="gradient-text" style="margin-top: 10rpx;">
				V0购买500以下权益卡；V1购买1000以下权益卡<br>
				V2购买5000以下权益卡；V3购买10000以下权益卡<br>
				*生态权益每使用90天，释放周期增加6天。
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
				current: 0, // 当前选中的索引

				// 定义卡片数据列表
				cardList: [{
						name: '体验卡', // V1
						totalCount: '30万个',
						price: '10.0000',
						dailyRelease: '0.05枚',
						cycle: '40天',
						limit: '10个',
						discount: '9折',
						// 假设 V1 图片路径如下，请根据实际文件名修改
						image: '/static/ecological_rights/v1.png',
						color: '#DBB9F8'
					},
					{
						name: '白银卡', // 示例 V2
						totalCount: '2万个',
						price: '100.0000',
						dailyRelease: '0.5枚',
						cycle: '40天',
						limit: '6个(权益值1)',
						discount: '8折',
						image: '/static/ecological_rights/v2.png' ,// 替换为你的V2图片
						color: '#DBDBDB'
					},
					{
						name: '黄金卡', // 示例 V3
						totalCount: '2万个',
						price: '500.0000',
						dailyRelease: '3.125枚',
						cycle: '40天',
						limit: '4个(权益值5)',
						discount: '7折',
						image: '/static/ecological_rights/v3.png' ,// 替换为你的V3图片
						color: '#F9E992'
					},
					{
						name: '铂金卡', // 示例 V3
						totalCount: '1千个',
						price: '1000.0000',
						dailyRelease: '7.5枚',
						cycle: '40天',
						limit: '3个(权益值10)',
						discount: '7折',
						image: '/static/ecological_rights/v4.png' ,// 替换为你的V3图片
						color: '#F9BB92'
					},
					{
						name: '黑金卡', // 示例 V3
						totalCount: '200个',
						price: '5000.0000',
						dailyRelease: '43.75枚',
						cycle: '40天',
						limit: '2个(权益值50)',
						discount: '6.5折',
						image: '/static/ecological_rights/v5.png' ,// 替换为你的V3图片
						color: '#F0FACC'
					},
					{
						name: '黑金卡', // 示例 V3
						totalCount: '100个',
						price: '10000.0000',
						dailyRelease: '100枚',
						cycle: '40天',
						limit: '1个(权益值100)',
						discount: '6折',
						image: '/static/ecological_rights/v6.png' ,// 替换为你的V3图片
						color: '#CCEAFA'
					},
					// 可以继续添加更多类型...
				],
				loading: false,
				coinLoading: false,
				unitNum: 10 ** 18,
				current: 0,
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


			gainCurrent(ix) {
				const len = this.cardList.length;
				if (ix) {
					// 下一个
					if (this.current >= (len - 1)) {
						this.current = 0;
					} else {
						this.current += 1;
					}
				} else {
					// 上一个
					if (this.current == 0) {
						this.current = len - 1;
					} else {
						this.current = Number(this.current) - 1;
					}
				}
			},

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
			font-size: 24rpx;
			font-weight: 400;
			background: linear-gradient(160deg, #DBB1FF, #FFFFFF, #FFFFFF);
			-webkit-background-clip: text;
			color: transparent;
		}



	}
</style>