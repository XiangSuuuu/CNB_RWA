<template>
	<view class="select-timer-wrap flex-lr">
		<picker mode="date" :value="startTime" :end="endTime"  @change="bindDateChange">
		 <view class="timer-inps flex-lr">
		 	<input type="text" v-model="startTime" disabled :placeholder="$t('tabBar.KAISHISHIJIAN')">
		 	<image class="xia-icon" src="/static/shop/xia.png" mode="widthFix"></image>
		 </view>
		</picker>
		
		<view class="timer-heng">-</view>
		<picker mode="date" :value="endTime" :start="startTime" @change="bindDateChange2">
			<view class="timer-inps flex-lr">
				<input type="text" v-model="endTime" disabled :placeholder="$t('tabBar.JIESUSHIJIAN')">
				<image class="xia-icon"  src="/static/shop/xia.png" mode="widthFix"></image>
			</view>
		</picker>
	</view>
</template>

<script>
	import eventBus from './index/eventBus.js';
	export default {
		props:{
			startTime: {
				type: String,
				default: '',
			},
			endTime: {
				type: String,
				default: '',
			},
		},
		data() {
		  // const currentDate = this.getDate({
		  //  format: true
		  // })
		  return {
		  }
		 },
		 computed: {
		  
		 },
		 methods: {
		  // 选择日期
		  bindDateChange(e) {
		   this.$emit('getStartTime',e.target.value);
		  },
		  bindDateChange2(e) {
		   this.$emit('getEndTime',e.target.value);
		  },
		  // 获取当前时间
		  getDate(type) {
		   const date = new Date();
		   let year = date.getFullYear();
		   let month = date.getMonth() + 1;
		   let day = date.getDate();
		  
		   if (type === 'start') {
		    year = year - 60;
		   } else if (type === 'end') {
		    year = year + 2;
		   }
		   month = month > 9 ? month : '0' + month;;
		   day = day > 9 ? day : '0' + day;
		   return `${year}-${month}-${day}`;
		  },
		 }
	}
</script>

<style lang="less">
	.select-timer-wrap {
		.timer-inps {
			width: 108px;
			height: 23px;
			background: #FFFFFF;
			border-radius: 5px;
			border: 1px solid #8593C2;
			cursor: pointer;
			padding: 0 8px;
			box-sizing: border-box;
			input {
				cursor: pointer;
				font-size: 9px;
			}
			.xia-icon {
				width: 7px;
				height: 4px;
			}
		}
		.timer-heng {
			color: #364064;
			font-size: 12px;
			margin: 0 4px;
		}
	}
</style>
