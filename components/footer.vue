<template>
	<view class="footer-wrap flex-lr">
		<view 
			class="rows"
			:class="tabIn == index ? 'rowsIn' : ''"
			v-for="(item , index) in tabData" 
			@click="skipUrl(item.url, '', index)"
			:key="index">
			<image 
			:src="tabIn == index ? '/static/tabr/'+item.iconIn+'.png' : '/static/tabr/'+item.icon+'.png'" 
			mode="widthFix" 
			class="icon"
			:class="index==0?'iconOne':''"
			></image>
			<view>{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters, mapMutations, mapState} from 'vuex';
	export default {
		props:{
			text: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				tabData: [
					{
						text: this.$t('index._TEXT3'),
						icon: 'home',
						iconIn: 'homeIn',
						url: '/',
					},
					{
						text: this.$t('index._TEXT4'),
						icon: 'pledge',
						iconIn: 'pledgeIn',
						url: '/pledge',
					},
					{
						text: this.$t('index._TEXT5'),
						icon: 'flash',
						iconIn: 'flashIn',
						url: '/flash',
					},
					{
						text: this.$t('index._TEXT6'),
						icon: 'nft',
						iconIn: 'nftIn',
						url: '/nft',
					},
					{
						text: this.$t('index._TEXT7'),
						icon: 'mine',
						iconIn: 'mineIn',
						url: '/mine',
					}
				],
				tabIn: 0,
				dataName: ''
			};
		},
		watch: {
			myRelation: {
				handler(n, o) {
					setTimeout(() => {
						this.tabIn = 0;
						this.init();
					}, 1000)
				},
				immediate: true,
				deep: true // 表示开启深度监听
			},
			$route: {
				handler(newVal) {
					this.init();
				},
				immediate: true,
				deep: true // 表示开启深度监听
			},
		},
		created() {
			this.init();
			console.log(this.$router.history)
		},
		computed: {
			...mapState(['myRelation', 'myAddress']),
			langText () {
				return localStorage.getItem('locale')  || 'EN';
			},
		},
		methods:{
			init () {
				if (this.$router.history && this.$router.history.current) {
					const data = this.$router.history.current.name;
					this.dataName = data;
					this.tabIn = 0
					if (data == 'pledge') {
						this.tabIn = 1
					}
					if (data == 'flash') {
						this.tabIn = 2
					}
					if (data == 'nft') {
						this.tabIn = 3
					}
					if (data == 'mine') {
						this.tabIn = 4
					}
				}
			},
			skipUrl(url, params, index) {
				if ('/'+this.dataName == url) {
					this.$emit('onConfirm')
					return;
				}
				this.$Router.push({
					path: url,
					query: params
				})
			}
		},
	}
</script>

<style lang="less">
	.footer-wrap {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 160rpx;
		background: #161515;
		box-shadow: 0rpx -20rpx 23rpx 0rpx rgba(4,248,248,0.21);
		padding: 0 32rpx;
		box-sizing: border-box;
		text-align: center;
		color: rgba(255, 255, 255, 0.5);
		font-size: 26rpx;
		z-index: 99;
		.rows {
			flex: 1;
		}
		.rowsIn {
			color: #04F8F8;
		}
		.icon {
			width: 48rpx;
			height: 48rpx;
			text-align: center;
			margin-bottom: 12rpx;
		}
		.iconOne {
			// width: 70rpx;
			// height: 70rpx;
			// margin-bottom: -4rpx;
			// margin-top: -12rpx;
		}
	}
</style>
