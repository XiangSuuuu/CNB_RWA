<template>
	<view class="pages">
		<view class="flex-center">
			<view class="tab-btn" @click="changeTab(0)"
				:style="{ backgroundImage: `url(${currentIndex === 0 ? selectedImg : normalImg})` }">

				<view class="flex-center" style="width: 100%; height: 53rpx;">
					{{$t('index._TEXT153')}}
				</view>
			</view>

			<view style="width: 32rpx;"></view>

			<view class="tab-btn" @click="changeTab(1)"
				:style="{ backgroundImage: `url(${currentIndex === 1 ? selectedImg : normalImg})` }">
				<view class="flex-center" style="width: 100%; height: 53rpx;">
					{{$t('index._TEXT154')}}
				</view>
			</view>
			<view @click="skipUrl('/tradeOrder')" class="flex-center" style="position: absolute; right: 20rpx; color: #BE74FF; font-size: 24rpx; font-family: 400;">
				{{$t('index._TEXT155')}} <image src="/static/index/arrow_right.png" style="width: 32rpx; height: 32rpx;"></image>
			</view>
		</view>

		<view style="margin-top: 30rpx;" v-show="currentIndex===0">
			
			<view class="trend-wrapss gradient-box">
				<view class="flex-lr">
					<view class="top-name flex-l">{{$t('index._TEXT179')}}</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #B8B8B8; width: 50%; margin-right: 30rpx;" class="flex-r">
					{{$t('index._TEXT156')}}： {{this.userSellOrderNum.suggestedPrice}}</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color:#655A89">
					
				</view>
				<view class="buy-coin-wrap">
					<view class="charts-box" id="main"></view>
				</view>
			</view>
			
			<view v-for="(item, index) in orderList" :key="index"
				style="margin-top: 20rpx; width: 100%; height: 425rpx; padding:30rpx 0 ; border-radius: 24rpx; background: linear-gradient(180deg, #181818 0%, #302c3aff 100%);">
				<view class="flex-l" style="width: 100%; padding:0rpx 40rpx ;">
					<image src="/static/trading_hall/icon0.png" style="width: 48rpx; height: 48rpx;"></image>
					<view style="width: 10rpx;"></view>
					<view style="font-size: 28rpx; font-weight: 700; color: #FFFFFF;">
						{{gainUsername(item.account)}}
					</view>
				</view>
				<view class="flex-lr" style="margin-top: 40rpx; width: 100%; padding:0rpx 40rpx ;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFF;">
						{{$t('index._TEXT157')}}
					</view>
					<view class="flex-r">
						<view style="font-size: 32rpx; font-weight: 700; color: #BE74FF;">
							{{Number((item.sellingPrice/unitNum).toFixed(6))}}
						</view>
						<view style="width: 28rpx;"></view>
						<view style="font-size: 28rpx; font-weight: 400; color: #FFFFFFCC;">
							USDT
						</view>
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #655A8980;margin: 30rpx 0; "></view>
				<view class="flex-lr" style=" width: 100%; padding:0rpx 40rpx ;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFF;">
						{{$t('index._TEXT152')}}
					</view>
					<view style="font-size: 32rpx; font-weight: 700; color: #FFFFFF;">
						{{(item.nowQuantity/unitNum).toFixed(1)}}
					</view>
				</view>

				<view style="width: 100%; height: 2rpx; background-color: #655A8980;margin: 30rpx 0; "></view>

				<view style="padding:0rpx 40rpx">
					<view @click="activeModelFun(item)"
						style="width: 100%; height: 80rpx; background: url('/static/trading_hall/button.png') no-repeat;background-size: 100% 100%;">
						<view class="flex-center"
							style="height: 60rpx; width: 100%; font-size: 28rpx; font-weight: 700;color: #FFFFFF;">
							{{$t('index._TEXT158')}}
						</view>
					</view>
				</view>

			</view>
		</view>

		<view v-if="currentIndex==1">

			<view class="trend-wraps gradient-box">
				<view class="top-names flex-lr">
					<view style="font-weight: 700; font-family: Microsoft YaHei; font-size: 28rpx;">
						{{$t('index._TEXT159')}} CNE
					</view>
					<view style="font-weight: 400; font-family: Microsoft YaHei; font-size: 24rpx;" class="flex-r">
						{{$t('index._TEXT156')}}：{{ this.userSellOrderNum.suggestedPrice}} <image src="/static/public/USDT.png" mode="widthFix" class="u-icon ml10"></image>
					</view>
				</view>
				<view style="margin-left: 10rpx; width: 97.5%; height: 2rpx; background-color:#655A89 ;">

				</view>
				<view class="buy-box">

					<view class="inp-wrap gradient-box flex-l" style="margin-bottom: 20rpx; ">
						<view style="width: 80rpx; font-weight: 700; font-size: 24rpx; color: #FFFFFF;">{{$t('index._TEXT157')}}</view>
						<input style="width: 78%; color: #FFFFFF;"
							placeholder-style="font-size: 24rpx;color: #99999980;font-family: 'Open Sans';font-weight: 400;"
							type="digit" v-model="amount" :placeholder="$t('index._TEXT167')" />
							<image src="/static/public/USDT.png" mode="widthFix" class="u-icon ml10"></image>
					</view>

					<view class="inp-wrap gradient-box flex-l" style="margin-bottom: 20rpx;">
						<view style="width: 80rpx; font-weight: 700; font-size: 24rpx; color: #FFFFFF;">{{$t('index._TEXT152')}}</view>
						<input style="width: 78%; color: #FFFFFF;" type="number" v-model="num"
							:placeholder="$t('index._TEXT168')"
							placeholder-style="font-size: 24rpx;color: #99999980;font-family: 'Open Sans';font-weight: 400;" />
							
					</view>
					
					<view class="inp-wrap gradient-box flex-l" style="margin-bottom: 20rpx;">
						<view style="width: 80rpx; font-weight: 700; font-size: 24rpx; color: #FFFFFF;">地址</view>
						<input style="width: 78%; color: #FFFFFF;" type="text" v-model="receivingAddress"
							placeholder="接收地址"
							placeholder-style="font-size: 24rpx;color: #99999980;font-family: 'Open Sans';font-weight: 400;" />
							
					</view>
					<view class="flex-lr" style=" border-radius: 20rpx; padding: 0 24rpx; width: 100%; height: 64rpx;">
						<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFF;">
							{{$t('index._TEXT159')}} CNE
						</view>
						<view style="font-size: 24rpx; font-weight: 700; color: #C07AFF;">
							余额： {{cneBalance}}
						</view>
					</view>
					<view class="flex-lr" style=" border-radius: 20rpx; padding: 0 24rpx; width: 100%; height: 64rpx;">
						<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFF;">
							{{$t('index._TEXT161')}}
						</view>
						<view style="font-size: 24rpx; font-weight: 700; color: #C07AFF;">
							{{cneNum}} CNE
						</view>
					</view>
					
					<view class="flex-lr" style=" border-radius: 20rpx; padding: 0 24rpx; width: 100%; height: 64rpx;">
						<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFF;">
							{{$t('index._TEXT162')}} CNB
						</view>
						<view style="font-size: 24rpx; font-weight: 700; color: #C07AFF;">
							 余额： {{cnbBalance}}
						</view>
					</view>
					
					<view class="flex-lr" style=" border-radius: 20rpx; padding: 0 24rpx; width: 100%; height: 64rpx;">
						<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFF;">
							需{{$t('index._TEXT162')}}
						</view>
						<view style="font-size: 24rpx; font-weight: 700; color: #C07AFF;">
							{{num}} CNB
						</view>
					</view>
					
					<view class="buy-btn flex-center" @click="sellSumbit()">出售
					</view>
				</view>
			</view>
		</view>
		<Model :visible.sync="activeModel">
			
			<view
				style="padding: 25rpx; width: 100%; height: 720rpx; background: url('../static/trading_hall/bg2.png') no-repeat;background-size: 100% 100%;">
				<view class="junior-content-wrap">
					<view class="lists-wrap">
						<view class="lists inp-wrap-two flex-lr">
							<view class="flex-l text">单价</view>
							<view> {{currentOrder!==null?Number((currentOrder.sellingPrice/unitNum).toFixed(6)):0}} USDT</view>
						</view>
				
						<view class="lists inp-wrap-two flex-lr" style="margin-bottom: 0rpx; cursor: pointer;"
							>
							<view class="flex-l text">数量</view>
							<view class="flex-r">
								 {{currentOrder!==null?(currentOrder.nowQuantity/unitNum).toFixed(1):0}}
							</view>
						</view>
					</view>
				</view>
				
				<view class="flex-lr" style="margin-top: 20rpx;">
					<view style="font-size: 28rpx; font-weight: 600;color: white;">卖出CNE</view>
					<view class="flex-r">
						<view style="font-size: 24rpx; font-weight: 500;">余额：</view>
						<view  style=" font-size: 24rpx; font-weight: 500; color: #82c6af;">{{usdtBalance}} USDT</view>
					</view>
				</view>
				<view class="flex-lr" style="width: 574rpx; margin-top: 20rpx;">
					<view class="inp-wrap flex-lr" style="border:2rpx solid  #FFFFFF4D;">
						<input style="color: #FFFFFF;" type="text" v-model="buyAmount" placeholder="请输入数量">
						
					</view>
					<view @click="allAmount()"  class="flex-center" style="margin-left: 10rpx; border-radius: 20rpx; width: 180rpx; height: 70rpx; background-color: #000000;">
						全部
					</view>
				</view>
				
				

				<view class="flex-lr"
					style="margin-top: 10rpx; border-radius: 20rpx; padding: 0 24rpx; width: 100%; height: 64rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFF;">
						{{$t('index._TEXT163')}}
					</view>
					<view class="flex-r">
						<view style="font-size: 24rpx; font-weight: 700; color: #FFFFFF;">
							无限制
						</view>
					</view>
				</view>


				<view class="flex-lr"
					style="margin-top: 10rpx; border-radius: 20rpx; padding: 0 24rpx; width: 100%; height: 64rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFF;">
						{{$t('index._TEXT161')}}
					</view>
					<view style="font-size: 24rpx; font-weight: 700; color: #FFFFFF;">
						{{zcNum}}
					</view>
				</view>

				<view class="flex-center bind_button" @click="buySellOrderSumbit()" style="width: 574rpx;
				height: 60rpx;
				background: #C889FF;
				border-radius: 200rpx 200rpx 200rpx 200rpx;
				font-family: PingFang SC, PingFang SC;
				font-weight: 500;
				font-size: 24rpx;
				color: #000000;
				margin-top:40rpx ;
				">
					{{$t('index._TEXT158')}}
				</view>
				<view class="flex-center" style="width: 100%;">
					<view style="background: url('/static/public/model_bg.png') no-repeat;
				background-size: 100% 100%; position: absolute; top: -25rpx;  width: 244rpx ; height: 85rpx;">
						<view class="flex-center"
							style="height: 70rpx; color: #FFFFFF; font-size: 30rpx; font-weight: 600;">
							{{$t('index._TEXT185')}}
						</view>
					</view>
				</view>
			</view>
		</Model>
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
	import MyGrid from '@/components/grid-view.vue';
	import Decimal from 'decimal.js';
	import * as echarts from 'echarts';
	export default {
		components: {
			Model,
			MyGrid,

		},
		data() {
			return {
				loading: false,
				unitNum: 10 ** 18,
				approveNum: 0, //当前选择币种授权的余额
				is_approve: false, //是否授权
				// 0: 左边选中, 1: 右边选中
				currentIndex: 0,
				// 把图片路径定义在 data 里，方便管理，防止写错
				selectedImg: '/static/trading_hall/selected.png',
				normalImg: '/static/trading_hall/select.png',
				activeModel: false,
				buyAmount: null,
				orderList: [],
				amount: '',
				num: null,
				cneBalance: 0,
				cnbBalance: 0,
				usdtBalance: 0,
				// address: '',
				limitNum: '0',
				currentOrder: null,
				userSellOrderNum:null,
				myChart:null,
				receivingAddress:null,
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
								// this.getConfigs();
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

			cneNum() {
				return Decimal.mul(
					(!isNaN(Number(this.num)) && this.num !== "") ? Number(this.num) : 0,
					1.3
				).toNumber();
			},
			zcNum() {
				if (this.currentOrder && this.buyAmount) {

					console.log("this.items.sellingPrice===" + this.currentOrder.sellingPrice)
					console.log("this.unitNum===" + this.unitNum)
					console.log("this.num===" + this.buyAmount)

					const price = new Decimal(this.currentOrder.sellingPrice);
					const unit = new Decimal(this.unitNum);
					const num = new Decimal(this.buyAmount);

					const result = price.div(unit).mul(num).toNumber();
					return result;
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
				this.sellInit();
				this.getAmount();
				this.getUserSellOrderNum();
				setTimeout(this.initchart,1500);
				this.receivingAddress = this.myAddress;
			},
			allAmount(){
				this.buyAmount = (this.currentOrder.nowQuantity/this.unitNum).toFixed(1);
			},
			initchart(){
				this.$Request.get('app/getTokenPriceGraph', {}).then((res) => {
					if (res.code == 200) {
						this.myChart = echarts.init(document.getElementById('main'));
						const thit = this;
						setTimeout(() => {
							let data = [];
							let base = +new Date(1988, 9, 3);
							// let oneDay = 24 * 3600 * 1000;
				
							// for (let i = 1; i < 200; i++) {
							//   let now = new Date((base += oneDay));
							//   data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
							// }
							// console.log(data)
							res.data[0].forEach((item, index) => {
								const time = res.data[1][index]
								data.push([time, item])
							})
							// console.log(data)
							// 绘制图表
							this.myChart.setOption({
								xAxis: {
									type: 'time',
									boundaryGap: false,
									axisLine: {
										show: false
									},
									axisLabel: {
										show: true,
										color: '#FFFFFF',
										fontSize: '16rpx',
									},
									axisTick: {
										show: false
									},
								},
								yAxis: {
									type: 'value',
									boundaryGap: [0, '100%'],
									min: function(value) {
										return value.min
									},
									max: function(value) {
										return value.max
									},
									axisLabel: {
										show: true,
										color: '#FFFFFF',
										fontSize: '16rpx',
									},
									axisLine: {
										// show: true
									},
									splitLine: {
										lineStyle: {
											// 设置背景横线
											color: "#655A89",
											type: "solid"
										},
									},
								},
								dataZoom: [{
									type: 'slider',
									show: true,
									fillerColor: '#A88BFF66', // 拖动块填充颜色
									borderColor: '#F5F5F5',
									// backgroundColor: '#ffffff',
									handleSize: '100%',
									handleStyle: {
										color: '#A88BFF', // 拖拽柄颜色
										borderColor: '#A88BFF'
									},
									moveHandleStyle: {
										color: '#A88BFF',
									},
									dataBackground: {
										lineStyle: {
											color: '#FFFFFF'
										},
										areaStyle: {
											color: '#A88BFF4D',
											opacity: 1
										}
									},
									selectedDataBackground: {
										lineStyle: {
											color: '#A88BFF',
											width: 2,
										},
										areaStyle: {
											color: '#A88BFF4D',
											opacity: 1
										}
									}
								}],
								series: [{
									name: 'Fake Data',
									type: 'line',
									smooth: true,
									symbol: 'none',
									areaStyle: {},
									data: data,
									lineStyle: {
										color: new echarts.graphic.LinearGradient(0, 0,
											0, 1, [{
												offset:1 ,
												color: '#A88BFF'
											}, {
												offset: 1,
												color: '#F8C93400'
											}]), //线条渐变色 
									},
									areaStyle: {
										color: new echarts.graphic.LinearGradient(0, 0,
											0, 1, [{
												offset: 0,
												color: '#A88BFF80'
											}, {
												offset: 1,
												color: '#F8C93400'
											}]),
									}
								}]
							});
						}, 300)
					}
				});
			},
			activeModelFun(selected) {
				this.activeModel = true;
				this.currentOrder = selected;
			},
			sellInit() {
				this.$Request.get('app/sellOrderList', {
					pageNum: 1,
					pageSize: 200,
				}).then((res) => {
					if (res.code == 200) {
						this.orderList = res.rows;
					}
				});
			},
			async getUserSellOrderNum() {
				this.$Request.get('app/getUserSellOrderNum', {
				}).then((res) => {
					if (res.code == 200) {
						this.userSellOrderNum = res.data;
					}
				});
			},
			// 获取币数量
			async getAmount() {
				try {
					console.log("$cnetokentcc" + this.$cnetokentcc)
					console.log("$cnbtokentcc" + this.$cnbtokentcc)
					this.$cnetokentcc.balanceOf(this.myAddress).then((res) => {
						if (res && res._hex) {
							let num = parseInt(res._hex);
							this.cneBalance = Number((num / this.unitNum).toFixed(6));
						}
					});
					this.$cnbtokentcc.balanceOf(this.myAddress).then((res) => {
						if (res && res._hex) {
							let num = parseInt(res._hex);
							this.cnbBalance = Number((num / this.unitNum).toFixed(6));
						}
					});
					this.$usdttcc.balanceOf(this.myAddress).then((res) => {
						if (res && res._hex) {
							let num = parseInt(res._hex);
							this.usdtBalance = Number((num / this.unitNum).toFixed(6));
						}
					});
					console.log("this.cneBalance" + this.cneBalance)
					console.log("this.cnbBalance" + this.cnbBalance)
				} catch (e) {
					console.log(e);
					setTimeout(() => {
						this.getAmount();
					}, 1500)
					//TODO handle the exception
				}
			},
			truncateToFixed(num, fixed) {
				const factor = Math.pow(10, fixed);
				return Math.trunc(num * factor) / factor;
			},
			changeTab(index) {
				// 如果点击的是当前已经选中的，直接返回（可选）
				if (this.currentIndex === index) return;

				this.currentIndex = index;
				if(this.currentIndex==0){
					this.initchart();
				}else{
					this.myChart.dispose();
				}

				// 在这里处理你的业务逻辑，比如请求数据
				console.log('当前选中了:', index === 0 ? '左边' : '右边');
			},

			// getDepositRecords() {
			// 	return this.$Request.get('app/getBuyNodeList', {
			// 	}).then((res) => {
			// 		if (res.code == 200) {
			// 			this.depositRecords = res.data;
			// 		}

			// 	});
			// },
			gainUsername(address) {
				let name = '';
				if (!!address) {
					name = address.substr(0, 4) + '******' + address.substring(address.length - 4)
				}
				return name;
			},
			checkPriceWithDecimal() {
			  const guidePrice = new Decimal(this.userSellOrderNum.suggestedPrice);
			  const price = new Decimal(this.amount);
			
			  const minPrice = guidePrice.mul(0.9);
			  const maxPrice = guidePrice.mul(1.1);
			
			  if (price.lt(minPrice) || price.gt(maxPrice)) {
			    uni.showToast({
			      title: this.$t('index._TEXT165'),
			    });
			    return false;
			  }
			
			  return true;
			},
			async sellSumbit() {
				console.log(this.$c2ctcc)
				await this.getUserSellOrderNum();
				// if (this.amount < 0.5) return this.$Common.showToast(this.$t('index._TEXT105'));
				if (!this.receivingAddress) return this.$Common.showToast("地址不能为空");

				if (!this.amount) return this.$Common.showToast(this.$t('index._TEXT167'));
				if (!this.num) return this.$Common.showToast(this.$t('index._TEXT168'));
				// if (!this.address) return this.$Common.showToast(this.$t('index._TEXT92'));
				if (!this.limitNum) return this.$Common.showToast(this.$t('index._TEXT169'));
				if (String(this.num).includes('.')) {
					return this.$Common.showToast(this.$t('index._TEXT172'));
				}
				if (!/^\d+(\.\d{1,3})?$/.test(this.amount)) {
					return this.$Common.showToast(this.$t('index._TEXT173')); // 自定义一个提示语：'最多支持3位小数'
				}
				// if (this.num < 100) return this.$Common.showToast(this.$t('index._TEXT170'));
				// if (this.limitNum > this.num) return this.$Common.showToast(this.$t('index._TEXT171'));
				if (this.num > this.zBalance) return this.$Common.showToast(this.$t('index._TEXT39'));
				if (this.num % 10 !== 0) return this.$Common.showToast(this.$t('index._TEXT174'));
				if (!this.checkPriceWithDecimal()) return;
				if (!this.userSellOrderNum.timeBuy) return this.$Common.showToast(this.$t('index._TEXT166'));

				console.log("Decimal" + Decimal.mul(this.num ?? 0, 1.3).toNumber())

				await this.approveMarts(this.$cnetokentcc, this.$c2ctcc.address, 0);
				if ((!this.is_approve || this.approveNum < Decimal.mul(this.num ?? 0, 1.3))) { //授权金额小于兑换金额 或者未授权 重新授权
					this.isCoin(this.$cnetokentcc, this.$c2ctcc.address, Decimal.mul(this.num ?? 0, 1.3).toNumber(),
						this.sellSumbit);
					return;
				}
				await this.approveMarts(this.$cnbtokentcc, this.$c2ctcc.address, 0);
				if ((!this.is_approve || this.approveNum < this.num)) { //授权金额小于兑换金额 或者未授权 重新授权
					this.isCoin(this.$cnbtokentcc, this.$c2ctcc.address, this.num, this.sellSumbit);
					return;
				}
				if (this.loading) return;
				this.loading = true;
				const amount = new Decimal(this.amount).times(this.unitNum).toString();
				const num = this.toFixedSafe(this.num * this.unitNum);
				const limitNum = this.toFixedSafe(this.limitNum * this.unitNum);
				// const bigLimitNum = new BigNumber(limitNum);
				// console.log(this.toFixed(num))
				console.log([
					amount.toString(),
					num.toString(),
					this.receivingAddress,
					limitNum.toString(),
				])
				this.$c2ctcc.placeSell(
					amount.toString(),
					num.toString(),
					this.receivingAddress,
					limitNum.toString(),
				).then((ret) => {
					if (ret) {
						console.log(ret)
						setTimeout(() => {
							this.sellInit();
							this.getAmount();
							this.amount = null;
							this.num = null;
							this.currentIndex = 0;
							this.gainSellId()
						}, 2500)
					}
				}, res => {
					this.loading = false;
					const err = JSON.parse(JSON.stringify(res))
					console.log(err)
					this.$Common.errPoint(err)
				});

			},
			gainSellId() {
				this.$c2ctcc.sellId().then((val) => {
					if (Number(val._hex)) {
						this.$Request.post('app/sellOrder', {
							contractId: Number(val._hex)
						}).then((val) => {
							this.loading = false;
							if (val.code == 200) {
								this.$Common.showToast(this.$t('index._TEXT180'));
								this.amount = '';
								this.num = '';
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									});
								}, 1000)
							}
						}, res => {
							this.loading = false;
							const err = JSON.parse(JSON.stringify(res))
							console.log(err)
							this.$Common.errPoint(err)
						});
					} else {
						this.gainSellId();
					}
				});
			},
			async buySellOrderSumbit() {
				// if (this.num > this.syLimit&&this.syLimit!=0) return this.$Common.showToast(this.$t('index._TEXT76')+'：' +this.syLimit);

				if (this.buyAmount != Number(this.currentOrder.nowQuantity / this.unitNum)) {
					if (this.buyAmount % 10 !== 0) return this.$Common.showToast(this.$t('index._TEXT181'));
				}
				if (!this.buyAmount) return this.$Common.showToast(this.$t('index._TEXT182'));
				if (String(this.buyAmount).includes('.')) {
					return this.$Common.showToast(this.$t('index._TEXT183'));
				}

				if (this.buyAmount > Number(this.currentOrder.nowQuantity / this.unitNum)) return this.$Common
					.showToast(this.$t('index._TEXT184'));
				if ((this.currentOrder.sellingPrice / this.unitNum * this.buyAmount) > this.zBalance) return this
					.$Common.showToast(this.$t('index._TEXT39'));
				await this.approveMarts(this.$usdttcc, this.$c2ctcc.address, 0);
				console.log("Number(this.zcNum)++" + Number(this.zcNum));
				if ((!this.is_approve || this.approveNum < Number(this.zcNum))) { //授权金额小于兑换金额 或者未授权 重新授权
					this.isCoin(this.$usdttcc, this.$c2ctcc.address, this.zcNum, this.buySellOrderSumbit, 1);
					return;
				}
				if (this.loading) return;
				this.loading = true;
				const num = this.toFixed(this.buyAmount * this.unitNum);
				console.log("num===" + num);
				this.$c2ctcc.buy(
					this.currentOrder.contractId,
					num.toString(),
				).then((res) => {
					this.loading = false;
					if (res) {
						this.$Request.post('app/sellOrder', {
							contractId: this.currentOrder.contractId
						}).then((val) => {
							this.loading = false;
							if (val.code == 200) {
								this.$Common.showToast(this.$t('index._TEXT180'));
								this.buyAmount = '';
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									});
								}, 1000)
							}
						});
					}
				}, res => {
					this.loading = false;
					const err = JSON.parse(JSON.stringify(res))
					console.log(err)
					this.$Common.errPoint(err)
				})
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
			/**
			 * 查询授权额度
			 * @param {Object} tokenContract - 代币合约实例 (例如 this.$usdttcc)
			 * @param {String} spenderAddress - 被授权的合约地址 (例如 this.$buytcc.address)
			 * @param {Number} is - 逻辑控制标识 (0=强制更新, 1=对比更新)
			 */
			async approveMarts(tokenContract, spenderAddress, is = 0) {
				try {
					// 使用传入的 tokenContract，不再写死 this.$usdttcc
					const usdtNum = await tokenContract.allowance(this.myAddress, spenderAddress);

					if (is) {
						if (this.approveNum == parseInt(usdtNum) / this.unitNum) {
							this.is_approve = false;
						} else {
							this.approveNum = parseInt(usdtNum) / this.unitNum;
							this.is_approve = parseInt(usdtNum) ? true : false;
						}
					} else {
						this.approveNum = parseInt(usdtNum) / this.unitNum;
						this.is_approve = parseInt(usdtNum) ? true : false;
					}

					console.log("当前代币授权金额:", this.approveNum);
					console.log("状态:", this.is_approve);
				} catch (e) {
					console.log("approveMarts error:", e);
				}
			},

			/**
			 * 发起授权交易
			 */
			isCoin(tokenContract, spenderAddress, value, successCallback, is = 0) {
				if (this.coinLoading) return;
				this.coinLoading = true;

				const nums = BigNumber(this.unitNum).multipliedBy(value);
				const price = this.toFixedSafe(nums);

				// 1. 调用传入的代币合约发起 approve
				tokenContract.approve(spenderAddress, price).then((hash) => {
					this.coinLoading = false;

					if (hash) {
						let num = 0;
						this.$Loading.setPoint(this.$t('index._TEXT38') + '...', 300000);

						// 2. 轮询检查
						let time = setInterval(async () => {
							// 轮询检查当前状态
							await this.approveMarts(tokenContract, spenderAddress, is);

							if (this.is_approve) {
								// --- 监测到授权成功 ---
								clearInterval(time);
								this.$Loading.setPoint('', 0);

								// 【关键修改】
								// 加上 await，强制等待这次查询完全结束、this.approveNum 等变量更新完毕
								// 这里的 0 表示强制更新模式
								await this.approveMarts(tokenContract, spenderAddress, 0);

								// 只有上面那行执行完了，才会执行下面的回调
								if (typeof successCallback === 'function') {
									successCallback();
								}
							} else {
								// --- 继续等待 ---
								if (num >= 20) {
									clearInterval(time);
									this.$Loading.setPoint('', 0);
								} else {
									num += 1;
								}
							}
						}, 3000);
					}
				}, res => {
					this.coinLoading = false;
					const err = JSON.parse(JSON.stringify(res));
					this.$Common.errPoint(err);
				});
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

		.tab-btn {
			width: 164rpx;
			height: 65rpx;

			/* 关键点：在这里设置 size 和 repeat，不要在行内样式里被覆盖 */
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-position: center;

			/* 可选：为了让切换更平滑，可以加个过渡 */
			transition: background-image 0.2s;
		}
		
		.u-icon {
			width: 42rpx;
			height: 42rpx;
		}

		.junior-content-wrap {
			width: 100%;
			margin-top: 46rpx;
			border-radius: 20rpx;
			border: 2rpx solid #655A8980;
			// background-image: linear-gradient(0deg, #1D2D3C, #111C2E);
			padding: 20rpx 20rpx;
			box-sizing: border-box;
			// margin-bottom: 42rpx;
		
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

		.inp-wrap {
			width: 100%;
			min-height: 80rpx;
			background-color: #38353cff;
			font-size: 28rpx;
			font-weight: 400;
			margin-bottom: 0;
		}
		
		.trend-wrapss {
			width: 100%;
			// background-image: linear-gradient(0deg, #1D2D3C, #111C2E);
			// background-color: ;
			border: 2rpx solid #655A89;
			// box-shadow: 0 0 10rpx 6rpx rgba(255,255,255,0.2);
			border-radius: 20rpx;
			margin-bottom: 46rpx;
			min-height: 110rpx;
			overflow: hidden;
			
			// border: #F2F2F2 2rpx solid ;
		
			.top-name {
				width: 50%;
				height: 84rpx;
				// background: #25384D;
				padding: 0 40rpx;
				box-sizing: border-box;
				color: white;
				font-size: 32rpx;
				font-weight: bold;
		
				.sx-item {
					color: #333333;
					font-size: 24rpx;
					font-weight: 400;
					cursor: pointer;
					font-family: 'Microsoft YaHei';
		
					.up-icon {
						width: 30rpx;
						height: 30rpx;
						margin-left: 10rpx;
					}
				}
		
				.sx-item-shus {
					margin-left: 16rpx;
					padding-left: 16rpx;
				}
			}
		
			.buy-coin-wrap {
				width: 100%;
				min-height: 200rpx;
				margin-bottom: 16rpx;
				padding: 36rpx 28rpx;
				padding-bottom: 52rpx;
				margin-top: 0;
				box-sizing: border-box;
				background: none;
				flex-wrap: wrap;
		
				.charts-box {
					width: 114%;
					margin-left: -6%;
					margin-top: -70rpx;
					margin-bottom: -10rpx;
					height: 600rpx;
				}
		
				.shop-item {
					width: 100%;
					padding: 36rpx 36rpx 8rpx 36rpx;
					box-sizing: border-box;
					margin-bottom: 32rpx;
					// background: linear-gradient(0deg, #17273F, #132034);
					// box-shadow: 0 0 8rpx 0 rgba(11, 253, 169, 0.3);
					background-color: #F7F7F5;
					border-radius: 20rpx;
					border:2rpx solid #FFFFFF4D ;
		
					.head-text {
						color: #333333;
						font-size: 28rpx;
						font-weight: 700;
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
						color: rgba(255, 255, 255, 0.8);
						font-size: 28rpx;
		
						.num {
							color: #F8C934;
							font-size: 32rpx;
							font-weight: 700;
							margin-right: 28rpx;
							font-family: 'Open Sans';
						}
		
						.coins {
							width: 36rpx;
							height: 36rpx;
						}
		
						.title-num {
							color: #333333;
							font-size: 28rpx;
							font-weight: 400;
							// margin-right: 28rpx;
							font-family: 'Open Sans';
							
						}
					}
		
					.buy-btn {
						width: 160rpx;
						height: 54rpx;
						// background: url('../../static/trade/btnBg0.png') no-repeat;
						// background-size: 100% 100%;
						// margin-top: 32rpx;
						color: #FFFFFF;
						font-size: 28rpx;
						font-weight: 700;
						font-family: 'Open Sans';
						cursor: pointer;
						background-color: #33BA88;
						border-radius: 20rpx;
					}
				}
			}
		}

		.trend-wraps {
			width: 100%;
			// background-image: linear-gradient(0deg, #1D2D3C, #111C2E);
			// border: 2rpx solid #F2F2F2;
			border-radius: 20rpx;
			// margin-bottom: 46rpx;
			min-height: 404rpx;
			overflow: hidden;
			margin-top: 26rpx;
			background: url('/static/trading_hall/bg1.png') no-repeat;
			background-size: 100% 100%;

			.top-names {
				width: 100%;
				height: 84rpx;
				// background: #25384D;
				padding: 0 24rpx;
				box-sizing: border-box;
				color: white;

				.coins {
					width: 54rpx;
					height: 54rpx;
					margin-left: 12rpx;
				}
			}

			.buy-box {
				width: 100%;
				min-height: 248rpx;
				margin-bottom: 16rpx;
				padding: 36rpx 28rpx;
				padding-bottom: 30rpx;
				margin-top: 0;
				box-sizing: border-box;

				.inp-wrap-two {
					background: transparent;
				}

				.buy-btn {
					width: 100%;
					height: 80rpx;
					// background: url('../../static/trade/btnBg2.png') no-repeat;
					// background-size: 100% 100%;
					background-color: #FFFFFF29;
					// margin-top: 32rpx;
					color: #FFFFFF;
					font-size: 28rpx;
					font-weight: 700;
					font-family: 'Open Sans';
					cursor: pointer;
					border-radius: 20rpx;
				}
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