<template>
	<view>
		<Head></Head>
		<router-view></router-view>
		<!-- <Footer v-if="isShow"></Footer> -->
		<view style='height: 100rpx;'>
			
		</view>
		<bottom-bar :current="0" />
	</view>
</template>
<script>
	import Head from '@/components/head.vue';
	import BottomBar from '@/components/BottomBar.vue'
	import {mapGetters, mapMutations} from 'vuex';
	let pageNum = 0;
	let timer;
	let tronTimer;
	export default {
		components: {
			Head,
			BottomBar
		},
		data() {
			return {
				isShow: true,
				urlName: '',
			}
		},
		created () {
		    //在页面加载时读取sessionStorage里的状态信息
		    if (sessionStorage.getItem("store") ) { //PC端存储
		        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
		    } else if (uni.getStorageSync('store')) { //移动端存储
				this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(uni.getStorageSync('store'))))
			 }
		
		    //在页面刷新时将vuex里的信息保存到sessionStorage里
		    window.addEventListener("beforeunload",()=>{
		        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
		    })
			// 判断当前metamask的账号是否切换
			this.accountschangeds();
			this.$store.commit('setSignature', false); //重置签名
		},
		computed: {
			monitor () {
				return this.$store.state
			}
		},
		methods: {
			...mapMutations(['setMyAddress', 'setTokenData', 'setRelation', 'setUserData']),
			accountschangeds() {
				if (window.ethereum) {
					console.log("监听accountschanged") 
					//连接钱包账户切换后触发的事件 accountsChanged
					// 切换网络监听事件  chainChanged
					//断开连接监听事件 disconnect
					window.ethereum.on('accountsChanged', (accounts)=>{
						let ysAddress = this.$store.state.myAddress;
						this.$Common.metaMaskAccount().then((address) => {
							let ysAddress = this.$store.state.myAddress
							if (ysAddress !== address) {
								console.log("切换地址："+ address) 
								this.setMyAddress(''); //token等登陆后多个信息
								this.setTokenData(false); //token等登陆后多个信息
								this.$store.commit('setTokenData', false);
								this.setUserData(''); //清空上个号数据
								localStorage.setItem('tokenData','');
								uni.setStorageSync('accessToken', '');
								uni.setStorageSync('loginData', '');
								this.setRelation(false);
								localStorage.setItem('locale','EN');
								this.$Router.push({
									path: '/',
								})
								setTimeout(() => {
									location.reload();
									
								}, 100)
							}
						})
					});
				} else {
					setTimeout(() => {
						this.accountschangeds()
					}, 3000)
				}
			},
			routerInit() {
				if (this.$router.history && this.$router.history.current) {
					const data = this.$router.history.current.name;
					this.urlName = data;
					console.log(this.urlName)
					if (data == 'pledge' || data == '' || data == 'flash' || data == 'nft' || data == 'mine') {
						this.isShow = true;
					} else {
						this.isShow = false;
					}
				} else {
					this.isShow = true;
				}
			},
		},
		watch: {
			monitor: {
				handler(newVal) {
					// 移动端存储
					if (pageNum) {
						uni.setStorage({
							key: 'store',
							data: JSON.stringify(newVal)
						})
					} else {
						pageNum += 1;
					}
				},
				immediate: true,
				deep: true // 表示开启深度监听
			},
			$route: {
				handler(newVal) {
					this.routerInit();
				},
				immediate: true,
				deep: true // 表示开启深度监听
			},
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import "uview-ui/theme.scss";
	@import url('./main.css');
	@import "./css/common.css";
	@import './css/uni.css';
</style>
