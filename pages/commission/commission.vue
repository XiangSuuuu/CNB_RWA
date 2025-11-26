<template>
	<view class="pages">
		<image src="/static/commission/bg.png"
			style="position: absolute; left: 0; top: 0rpx; width: 100%; height: 1100rpx; object-fit: cover;">
		</image>
		<view class="head-wrap flex-center">
			<view class="title">
				我的佣金
			</view>
			<image src="/static/public/arrow-left-white.png" @click="returnPage()" mode="widthFix" class="back_img">
			</image>
		</view>
		<view class="flex-center"
			style="width: 100%; position: relative; z-index: 999; width: 658rpx; height: 123rpx; background: url('../static/commission/bg0.png') no-repeat;background-size: 100% auto;">
			<view style="font-family: Alimama_ShuHeiTi_Bold; font-size: 52rpx; font-weight: 700; background: linear-gradient(180deg, #FFC759, #C38100);
	             -webkit-background-clip: text; -webkit-text-fill-color: transparent;">邀请好友 赢奖励</view>
		</view>
		<view style="width: 100%;" class="flex-center">
			<view class="flex-center"
				style="position: relative; width: 440rpx; height: 46rpx; background: linear-gradient(90deg, rgba(255, 185, 47, 0) 0%, rgba(255, 185, 47, 0.5) 50%, rgba(255, 185, 47, 0) 100%);">
				邀请奖励无上限
			</view>
		</view>
		<view
			style="padding: 0 20rpx; margin-top: 100rpx; position: relative; width: 100%; height: 800rpx;background: url('../static/commission/bg2.png') no-repeat;background-size: 100% auto; ">
			<view style="width: 100%;" class="flex-center">
				<view class="flex-center"
					style="position: absolute; top: -25rpx; font-size: 24rpx; font-weight: 500; color:#080808 ; width: 200rpx; height: 52rpx;background: url('../static/commission/bg1.png') no-repeat;background-size: 100% auto; ">
					邀请奖励
				</view>
			</view>
			<view class="flex-lr" style="width: 100%; margin-top: 50rpx;">
				<view
					style="padding: 30rpx; border-radius: 20rpx; width: 306rpx; height: 140rpx; background-color: #FFB92F26; border:#FFB92F59 2rpx solid ;">
					<view  class="flex-center" style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						累计获得奖励
					</view>
					<view class="flex-center"
						style=" margin-top: 10rpx;width: 100%; font-size: 32rpx; font-weight: 700;">
						{{truncateToFixed((userInfo.count6),2)}}
					</view>
				</view>
				<view
					style="padding: 30rpx; border-radius: 20rpx; width: 306rpx; height: 140rpx; background-color: #FFB92F26; border:#FFB92F59 2rpx solid ;">
					<view  class="flex-center" style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						累计邀请人数
					</view>
					<view class="flex-center"
						style="margin-top: 10rpx; width: 100%; font-size: 32rpx; font-weight: 700;">
						{{userInfo.invitationNumAllDown}}
					</view>
				</view>
				
			</view>
			
			<view class="flex-lr" style="width: 100%; margin-top: 20rpx;">
				
				<view
					style="padding: 30rpx; border-radius: 20rpx; width: 306rpx; height: 140rpx; background-color: #FFB92F26; border:#FFB92F59 2rpx solid ;">
					<view  class="flex-center" style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						今日收益
					</view>
					<view class="flex-center"
						style="margin-top: 10rpx; width: 100%; font-size: 32rpx; font-weight: 700;">
						{{truncateToFixed((userInfo.count11),2)}}
					</view>
				</view>
				<view  
					style="padding: 30rpx; border-radius: 20rpx; width: 306rpx; height: 140rpx; background-color: #FFB92F26; border:#FFB92F59 2rpx solid ;">
					<view class="flex-center" style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						直推人数
					</view>
					<view  class="flex-center"
						style="margin-top: 10rpx; width: 100%; font-size: 32rpx; font-weight: 700;">
						{{userInfo.invitationNum}}
					</view>
				</view>
			</view>

			<view class="flex-l" style="margin-top: 30rpx;">
				<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
				<view style="width: 8rpx;"></view>
				<view style="font-size: 24rpx; font-weight: 400; color: white;">
					邀请奖励记录：
				</view>
			</view>
			<scroll-view scroll-y="true" style="margin-top: 20rpx; height: 280rpx; overflow-y: scroll;">
				<view v-for="(item, index) in referralRewardRecord" :key="index">
					<view class="flex-lr" style="padding: 20rpx 20rpx">
						<view style="font-size: 24rpx; color: #FFFFFFCC;">{{item.createTime}}</view>
						<view style="font-size: 24rpx; color: #FFFFFFCC;">奖励{{truncateToFixed((item.money/unitNum),2)}}USDT，已转入到资产</view>
					</view>
					<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				</view>
			</scroll-view>
		</view>

		<view
			style="padding: 0 20rpx; margin-top: 40rpx; position: relative; width: 100%; height: 800rpx;background: url('../static/commission/bg2.png') no-repeat;background-size: 100% auto; ">
			<view style="width: 100%;" class="flex-center">
				<view class="flex-center"
					style="position: absolute; top: -25rpx; font-size: 24rpx; font-weight: 500; color:#080808 ; width: 200rpx; height: 52rpx;background: url('../static/commission/bg1.png') no-repeat;background-size: 100% auto; ">
					级别奖励
				</view>
			</view>
			<view class="flex-lr" style="width: 100%; margin-top: 50rpx;">
				<view
					style="padding: 30rpx; border-radius: 20rpx; width: 306rpx; height: 140rpx; background-color: #FFB92F26; border:#FFB92F59 2rpx solid ;">
					<view  style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						级别
					</view>
					<view class="flex-center"
						style=" margin-top: 10rpx;width: 100%; font-size: 32rpx; font-weight: 700;">
						V{{userInfo.vipNum}}
					</view>
				</view>
				<view
					style="padding: 30rpx; border-radius: 20rpx;  width: 306rpx; height: 140rpx; background-color: #FFB92F26; border:#FFB92F59 2rpx solid ;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						累计小区业绩
					</view>
					<view class="flex-center"
						style="margin-top: 10rpx; width: 100%; font-size: 32rpx; font-weight: 700;">
						{{truncateToFixed((userInfo.frozenBalance7),2)}} USDT
					</view>
				</view>

			</view>
			<view class="flex-lr" style="width: 100%; margin-top: 20rpx;">
				<view
					style="padding: 30rpx; border-radius: 20rpx;  width: 306rpx; height: 140rpx; background-color: #FFB92F26; border:#FFB92F59 2rpx solid ;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						累计级别奖励
					</view>
					<view  class="flex-center"
						style="margin-top: 10rpx; width: 100%; font-size: 32rpx; font-weight: 700;">
						{{truncateToFixed((userInfo.count5),2)}} USDT
					</view>
				</view>
				<view
					style="padding: 30rpx; border-radius: 20rpx;  width: 306rpx; height: 140rpx; background-color: #FFB92F26; border:#FFB92F59 2rpx solid ;">
					<view  style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						累计总业绩
					</view>
					<view  class="flex-center"
						style="margin-top: 10rpx; width: 100%; font-size: 32rpx; font-weight: 700;">
						{{truncateToFixed((userInfo.count10),2)}} USDT
					</view>
				</view>
			</view>

			<view class="flex-l" style="margin-top: 30rpx;">
				<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
				<view style="width: 8rpx;"></view>
				<view style="font-size: 24rpx; font-weight: 400; color: white;">
					级别业绩奖励记录：
				</view>


			</view>
			<scroll-view scroll-y="true" style="margin-top: 20rpx; height: 280rpx; overflow-y: scroll;">
				<view v-for="(item, index) in performanceBonusRecords" :key="index">
					<view class="flex-lr" style="padding: 20rpx 20rpx">
						<view style="font-size: 24rpx; color: #FFFFFFCC;">{{item.createTime}}</view>
						<view style="font-size: 24rpx; color: #FFFFFFCC;">奖励{{truncateToFixed((item.money/unitNum),2)}}USDT，已转入到资产</view>
					</view>
					<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				</view>
			</scroll-view>
		</view>

		<view
			style="padding: 0 40rpx; margin-top: 40rpx; position: relative; width: 100%; height: 452rpx;background: url('../static/commission/bg3.png') no-repeat;background-size: 100% auto; ">
			<view style="width: 100%; " class="flex-center">
				<view class="flex-center"
					style="position: absolute; top: -25rpx; font-size: 24rpx; font-weight: 500; color:#080808 ; width: 200rpx; height: 52rpx;background: url('../static/commission/bg1.png') no-repeat;background-size: 100% auto; ">
					超级节点
				</view>
			</view>

			<view class="flex-l" style="margin-top: 50rpx;">
				<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
				<view style="width: 8rpx;"></view>
				<view style="font-size: 24rpx; font-weight: 400; color: white;">
					超级节点奖励记录：
				</view>


			</view>
			<scroll-view scroll-y="true" style="margin-top: 20rpx; height: 280rpx; overflow-y: scroll;">
				<view v-for="(item, index) in nodeBonusRecords" :key="index">
					<view style="padding: 20rpx 20rpx">
						<view style="font-size: 24rpx; color: #FFFFFFCC;">{{item.createTime}}</view>
						<view style="font-size: 24rpx; color: #FFFFFFCC;">今日分红:{{truncateToFixed((item.money/unitNum),2)}} {{item.accountType==9?"VEO":"VE"}} 已转入到资产</view>
					</view>
					<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				</view>
			</scroll-view>
		</view>
		<view
			style="padding: 0 40rpx; margin-top: 40rpx; position: relative; width: 100%; height: 410rpx;background: url('../static/commission/bg4.png') no-repeat;background-size: 100% auto; ">
			<view style="width: 100%; " class="flex-center">
				<view class="flex-center"
					style="position: absolute; top: -25rpx; font-size: 24rpx; font-weight: 500; color:#080808 ; width: 200rpx; height: 52rpx;background: url('../static/commission/bg1.png') no-repeat;background-size: 100% auto; ">
					邀请好友
				</view>
			</view>
			<view
				style="padding: 30rpx; margin-top: 66rpx; width: 100%; height: 140rpx; background: url('../static/commission/invite.png') no-repeat;background-size: 100% auto;">
				<view class="flex-center" style=" font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
					我的邀请码
				</view>
				<view class="flex-center">
					<view style="font-size: 32rpx; font-weight: 700; color: #FFFFFF;">
						{{valueSubstr(userInfo.personalInvitationCode)}}
					</view>
					<image @click="$Common.copy(userInfo.personalInvitationCode)" src="/static/commission/copy.png" style="margin-left: 5rpx; width: 24rpx; height: 24rpx;">
					</image>
				</view>

			</view>

			<view
				style="padding: 30rpx; margin-top: 20rpx; width: 100%; height: 140rpx; background: url('../static/commission/invite.png') no-repeat;background-size: 100% auto;">
				<view class="flex-center" style=" font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
					我的邀请链接
				</view>
				<view class="flex-center">
					<view style="font-size: 32rpx; font-weight: 700; color: #FFFFFF;">
						{{valueSubstr(inviteAddr)}}
					</view>
					<image @click="$Common.copy(inviteAddr)" src="/static/commission/copy.png" style="margin-left: 5rpx; width: 24rpx; height: 24rpx;">
					</image>
				</view>

			</view>
		</view>

		<view
			style="padding: 0 40rpx; margin-top: 40rpx; position: relative; width: 100%; height: 1680rpx;background: url('../static/commission/bg5.png') no-repeat;background-size: 100% auto; ">
			<view style="width: 100%; " class="flex-center">
				<view class="flex-center"
					style="position: absolute; top: -25rpx; font-size: 24rpx; font-weight: 500; color:#080808 ; width: 200rpx; height: 52rpx;background: url('../static/commission/bg1.png') no-repeat;background-size: 100% auto; ">
					佣金规则
				</view>
			</view>
			<view class="flex-l" style="margin-top: 50rpx;">
				<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
				<view style="width: 8rpx;"></view>
				<view style="font-size: 24rpx; font-weight: 400; color: white;">
					邀请奖励动态机制：
				</view>
			</view>
			<view style="margin-top: 20rpx; width: 100%; height: 122rpx; border-radius: 16rpx; border:#D9D9D933 2rpx solid ;">
				<view style=" display: flex;align-items: center !important;justify-content: space-around;width: 100%; height: 60rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						推1
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						推2
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						推3
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						推4
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						推5
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				<view style=" display: flex;align-items: center !important;justify-content: space-around;width: 100%; height: 60rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						拿3层
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						拿6层
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						拿9层
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						拿12层
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						拿15层
					</view>
				</view>
			</view>
			<view style="margin-top: 20rpx; width: 100%; height: 122rpx; border-radius: 16rpx; border:#D9D9D933 2rpx solid ;">
				<view style=" display: flex;align-items: center !important;justify-content: space-around;width: 100%; height: 60rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						1-5层
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						6-10层
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						11-15层
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				<view style=" display: flex;align-items: center !important;justify-content: space-around;width: 100%; height: 60rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						3%
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						4%
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						5%
					</view>
				</view>
			</view>
			<view class="flex-l" style="margin-top: 50rpx;">
				<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
				<view style="width: 8rpx;"></view>
				<view style="font-size: 24rpx; font-weight: 400; color: white;">
					级别业绩奖励：
				</view>
			</view>
			
			<view style="margin-top: 20rpx; width: 100%; height: 550rpx; border-radius: 16rpx; border:#D9D9D933 2rpx solid ;">
				<view style="padding: 0 60rpx; display: flex;align-items: center !important;justify-content: space-between;width: 100%; height: 60rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						V1 1+5(1000USDT)
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						10%
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				<view style="padding: 0 60rpx; display: flex;align-items: center !important;justify-content: space-between;width: 100%; height: 60rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						V2 小区累计业绩10,000USDT
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						20%
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				<view style="padding: 0 60rpx; display: flex;align-items: center !important;justify-content: space-between;width: 100%; height: 60rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						V3 小区累计业绩30,000USDT
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						30%
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				<view style="padding: 0 60rpx; display: flex;align-items: center !important;justify-content: space-between;width: 100%; height: 60rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						V4 小区累计业绩100,000USDT
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						40%
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				<view style="padding: 0 60rpx; display: flex;align-items: center !important;justify-content: space-between;width: 100%; height: 60rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						V5 小区累计业绩300,000USDT
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						50%
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				<view style="padding: 0 60rpx; display: flex;align-items: center !important;justify-content: space-between;width: 100%; height: 60rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						V6 小区累计业绩1,000,000USDT
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						55%
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				<view style="padding: 0 60rpx; display: flex;align-items: center !important;justify-content: space-between;width: 100%; height: 60rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						V7 小区累计业绩2,000,000USDT
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						60%
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				<view style="padding: 0 60rpx; display: flex;align-items: center !important;justify-content: space-between;width: 100%; height: 60rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						V8 小区累计业绩5,000,000USDT
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						65%
					</view>
				</view>
				<view style="width: 100%; height: 2rpx; background-color: #FFFFFF26;"></view>
				<view style="padding: 0 60rpx; display: flex;align-items: center !important;justify-content: space-between;width: 100%; height: 60rpx;">
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						V9 小区累计业绩10,000,000USDT
					</view>
					<view style="font-size: 24rpx; font-weight: 400; color: #FFFFFFCC;">
						70%
					</view>
				</view>
			</view>
			<view style="font-size: 22rpx; font-weight: 400; color:#FFFFFF80 ; margin-top: 20rpx;">
				※达到V5平级奖10%</br>
				例: 达到V7，v8，V9级别后可以享受交易手续费点数30%的加权平均分配，提现手续费点数30%的加权平均分配，奖励只计算理财板块的收益</br>
				V7 10%加权平均分配</br>
				V8 10%加权平均分配</br>
				V9 10%加权平均分配</br>
			</view>
			<view class="flex-l" style="margin-top: 20rpx;">
				<image src="/static/public/arrow-up.png" style="height: 20rpx; width: 20rpx;"></image>
				<view style="width: 8rpx;"></view>
				<view style="font-size: 24rpx; font-weight: 400; color: white;">
					超级节点权益：
				</view>
			</view>
			<view style="font-size: 24rpx; font-weight: 400; color:#FFFFFF80 ; margin-top: 20rpx;">
				(1)获赠价值1000USDT的VE代币，每日0.2%线性释放。</br>
				(2)提现手续费点数的30%分红、卖出税收的30%分红</br>
				(3)再直推5个1000USDT，可额外每月获赠价值200USDT的VE代币一次性发放，累计上限为1000USDT本金的3倍。正式上线后享15代邀请奖励和V1级别业绩奖励。</br>

			</view>
			<view style="font-size: 22rpx; font-weight: 400; color:#FFFFFF80 ; margin-top: 20rpx;">
				例:超级节点入金的1000USDT也同步参与生态建设，分成两部分:
				400USDT   VBO矿机
				600USDT   VBO理财</br>
				理财本金赎回，超级节点权益全部取消，但邀请层级和级别收益不变。</br>
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
				userInfo: null,
				referralRewardRecord:null,
				performanceBonusRecords:null,
				nodeBonusRecords:[],
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
			inviteAddr () {
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
				this.getUserInfo()
				this.getNodeBonusRecords();
				this.getPerformanceBonusRecords();
				this.getReferralRewardRecord();
				this.getNodeBonusRecords2();
			},
			getRecordAccountList(accountType) {
				return this.$Request.get('app/getRecordAccountList', {
					accountType:accountType,
					recordStatus:0,
				}).then((res) => {
					if (res.code == 200) {
						return res.data;
					}
					return null;
				});
			},
			getReferralRewardRecord() {
				this.getRecordAccountList(6).then((data) => {
					this.referralRewardRecord = data;
				});
			},
			getPerformanceBonusRecords() {
				this.getRecordAccountList(13).then((data) => {
					this.performanceBonusRecords = data;
				});
			},
			getNodeBonusRecords() {
				this.getRecordAccountList(9).then((data) => {
					this.nodeBonusRecords.push(...data);
				});
			},
			getNodeBonusRecords2() {
				this.getRecordAccountList(10).then((data) => {
					this.nodeBonusRecords.push(...data);
				});
			},
			truncateToFixed(num, fixed) {
				const factor = Math.pow(10, fixed);
				return Math.trunc(num * factor) / factor;
			},
			getUserInfo() {
				this.$Request.get('app/user/getUserInfo', {}).then((res) => {
					if (res.code == 200) {
						this.userInfo = res.data;
						this.targetDate = res.data.pledgeNextSendTime;
					}
				}, false, false);
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
			valueSubstr(value) {
				return value.substr(0, 4) + '******' +value.substring(value.length-4);
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