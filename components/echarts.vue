<template>
	<view class="k-xian">
		<view class="select-kline-wrap flex-lr">
			<view class="select-k-item" :class="timeIx == item.id ? 'select-k-item-in' : ''" v-for="item in timeData" @click="changePeriod(item.id)">
				<view v-text="item.name"></view>
				<view class="heng"></view>
			</view>
		</view>
		<view class="kline-img" id="kline" ref='kline'></view>
	</view>
</template>

<script> 
	import WebFont from '../jscommon/umychart.resource/js/webfont.js'
	import pako from '../jscommon/pako.min.js'
	import $ from '../jscommon/jquery.js'
	import JSChart from '../jscommon/umychart.js'
	
	let klineControl;
	let symbolName = 'btcusdt'
	export default {
		props: {
			symbols: {
				type: String,
				default: 'btcusdt',
			}
		},
		data() {
			return {
				timeIx: 4,
				timeData: [
					{
						name: this.$t('tabBar.FENGSHI'),
						id: 4,
					},
					{
						name: this.$t('tabBar.SHIWUFEN'),
						id: 6,
					},
					{
						name: this.$t('tabBar.YIXIAOSHI'),
						id: 8,
					},
					{
						name: this.$t('tabBar.RIXIAN'),
						id: 0,
					},
					{
						name: this.$t('tabBar.ZHOUXIAN'),
						id: 1,
					},
					{
						name: this.$t('tabBar.YUEXIAN'),
						id: 2,
					},
					{
						name: this.$t('tabBar.NIANXIAN'),
						id: 3,
					},
				],
			}
		},
		mounted(){
			symbolName = this.symbols;
			this.init();
		},
		methods: {
			init(){
				WebFont.load({ custom: { families: ['iconfont'] } });   //预加载下iconfont资源
				klineControl=new this.KLineChart(document.getElementById('kline'));
				klineControl.Create();
			},
			
			//简单的把K线控件封装下
			KLineChart(divKLine) {
				this.DivKLine=divKLine;
				this.Chart=JSChart.Init(divKLine);   //把K线图绑定到一个Div上
				// this.WS='wss://api.huobi.pro/ws'; //外网WS
				this.WS='wss://api.hadax.com/ws'; //数据更新ws
				this.Symbol= symbolName;
				this.Cache=[];
				this.OriginalSymbol = symbolName;
				// this.period = '1day';
				//K线配置信息
				this.Option= {
					Type:'历史K线图',   //创建图形类型
					Windows: //窗口指标
						[
							{Index:"MA", Modify:false,Change:false},
							{Index:"VOL", Modify:false,Change:false},
						],
					IsCorssOnlyDrawKLine:true,
					IsClickShowCorssCursor:true,
					EnableScrollUpDown:true,
					IsAutoUpdate:false,         //是自动更新数据 （使用ws去掉定时器更新)
					AutoUpdateFrequency:5000,   //数据更新频率
					IsShowRightMenu:false,          //右键菜单
					CorssCursorTouchEnd:true,
					IsApiPeriod:true,
					KLine:  //K线设置
						{
							DragMode:1,                 //拖拽模式 0 禁止拖拽 1 数据拖拽 2 区间选择
							Right:0,                    //复权 0 不复权 1 前复权 2 后复权
							Period:4,                   // [30001-32000) 秒周期
														// 0=日线 1=周线 2=月线 3=年线 9=季线  [40001-50000) 自定义日线
														// 4=1分钟 5=5分钟 6=15分钟 7=30分钟 8=60分钟 11=120分钟 12=240分钟 [20001-30000) 自定义分钟
							MaxReqeustDataCount:1000,   //数据个数
							MaxRequestMinuteDayCount:10, //分钟数据取5天
							PageSize:60,                        //一屏显示多少数据
							IsShowTooltip:false,                 //是否显示K线提示信息
							DrawType:0  ,                       //K线类型 0=实心K线柱子 1=收盘价线 2=美国线 3=空心K线柱子 4=收盘价面积图
						},
					KLineTitle: //标题设置
						{
							IsShowName:false,       //不显示股票名称
							IsShowSettingInfo:false //不显示周期/复权
						},
					Border: //边框
						{
							Left:1,         //左边间距
							Right:1,       //右边间距
							Bottom:25,      //底部间距
							Top:30          //顶部间距
						},
					Frame:  //子框架设置
						[
							{SplitCount:3,StringFormat:0, IsShowLeftText:false,Custom: [ { Type:0,Position:'right'} ]},
							{SplitCount:2,StringFormat:0, IsShowLeftText:false},
							{SplitCount:2,StringFormat:0, IsShowLeftText:false}
						],
					ExtendChart:    //扩展图形
						[
							{Name:'KLineTooltip' }  //手机端tooltip
						],
				};
			
				this.Create=function()  //创建图形
				{
					var self=this;
					$(window).resize(function() { self.OnSize(); });    //绑定窗口大小变化事件
					// //设置黑色主题
					// var blackStyle=HQChartStyle.GetStyleConfig(STYLE_TYPE_ID.BLACK_ID); //读取黑色风格配置
					// JSChart.SetStyle(blackStyle);
					// this.DivKLine.style.backgroundColor=blackStyle.BGColor; //设置最外面的div背景
					this.OnSize();  //让K线全屏
					this.Option.Symbol=this.Symbol;
					this.Option.NetworkFilter=(data, callback)=> { this.NetworkFilter(data, callback); }  //绑定网络协议回调
					this.Chart.SetOption(this.Option);  //设置K线配置
				}
				//
				//对外接口
				this.ChangePeriod=function(period)  //周期切换
				{
					//var symbol=this.Symbol;
					this.Chart.ChangePeriod(period);
				}
			
				// ChangeIndex(windowIndex,name) //切换指标  windowIndex=窗口索引, name=指标名字
				// {
				//     this.Chart.ChangeIndex(windowIndex,name);
				// },
			
				this.ChangeSymbol=function(symbol)   //切换股票
				{
					if (this.OriginalSymbol==symbol) return;
					this.OriginalSymbol=symbol;
					this.Symbol=symbol+'.BIT';
					this.Chart.ChangeSymbol(this.Symbol);
				}
			
				this.OnRecvWSRealtimeData=function(data)
				{
					// console.log("[KLineChart::OnRecvWSRealtimeData", data);
					var hqChartData={code:0, data:[], ver:2.0 };
					hqChartData.symbol='btcusdt';
					hqChartData.name='浦发银行';
					for(var i in  data)
					{
						var item=data[i];
						var newItem=[item[0],item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8]];
			
						if(this.Cache.length>0)
						{
							var lastItem=this.Cache[this.Cache.length-1];
							if (lastItem[0]==newItem[0] && lastItem[8]==newItem[8]){
								this.Cache[this.Cache.length-1]=newItem;
							}else{
								this.Cache.push(newItem);
							}
						}else{
							this.Cache.push(newItem);
						}
					}
			
					for(var i in this.Cache){
						hqChartData.data.push(this.Cache[i]);
					}
			
					this.Chart.JSChartContainer.RecvMinuteRealtimeData(hqChartData);
				}
			
				this.TestCount=0;
			
				this.StartWSUpdate=function(symbol) //开始ws更新数据
				{
					var testdata=
						[
							[20200107,12.5,12.49,12.5,12.49,12.49,23767,271661,1105],
							[20200107,12.5,12.49,12.5,12.49,12.49,43767,471661,1105],
							[20200107,12.5,12.49,12.5,12.49,12.49,53767,671661,1105],
							[20200107,12.49,12.49,12.5,12.49,12.49,26413,329960,1106],
							[20200107,12.49,12.5,12.5,12.49,12.5,18140,276586,1107],
							[20200107,12.49,12.5,12.5,12.49,12.49,38140,476586,1107],
							[20200107,12.49,12.49,12.51,12.49,12.51,87064,1088310,1108],
							[20200107,12.51,12.51,12.51,12.5,12.5,10607,132637,1109],
							[20200107,12.5,12.5,12.51,12.5,12.5,25995,325119,1110]
						];
			
					setInterval(()=>
					{
						if (this.TestCount<testdata.length)
						{
							var data=testdata[this.TestCount];
							this.OnRecvWSRealtimeData([data]);
							++this.TestCount;
						}
					}, 1500);
				}
			
				this.StopWSUpdate=function()        //停止ws更新数据
				{
			
				}
			
				this.OnSize=function()  //自适应大小调整
				{
					var height= $(window).height(); 
					var width = $(window).width();
					var widthXian = $('.k-xian').width();
					// console.log(widthXian + 'widthXian');
					this.DivKLine.style.top='px';
					this.DivKLine.style.left='px';
					this.DivKLine.style.width=widthXian+'px';
					this.DivKLine.style.height=300+'px';
					this.Chart.OnSize();
				}
			
				this.NetworkFilter=function(data, callback)
				{
					// console.log('[KLineChart::NetworkFilter] data', data);
					switch(data.Name){
						case 'KLineChartContainer::ReqeustHistoryMinuteData':   //分钟全量数据下载
							this.RequestHistoryMinuteData(data, callback);
							break;
						case 'KLineChartContainer::RequestFlowCapitalData':     //数字货币不会调用
							this.RequestFlowCapitalData(data, callback);
							break;
						case 'KLineChartContainer::RequestHistoryData':         //日线全量数据下载
							this.RequestHistoryData(data,callback);
							break;
					}
				}
				this.RequestFlowCapitalData=function(data, callback)  //请求流通股本
				{
					data.PreventDefault=true;
					var hqChartData={code:0, stock:[]}; //如果没有数据就填空
					callback(hqChartData);
				}
			
				this.RequestWSData=function(data, recvCallback)
				{
					if (!this.Socket){
						this.Socket=  new WebSocket(this.WS); //创建连接
						//第1次创建在onopen里面发数据
						this.Socket.onopen=(event)=>
						{
							// alert(JSON.stringify(event));
							var message=JSON.stringify(data.SendData);
							this.Socket.send(message);
						}
					}else{
						//ws已连接了 直接发送数据
						var message=JSON.stringify(data.SendData);
						this.Socket.send(message);
					}
					//心跳包
					this.SendWSHeartMessage=function()
					{
						if (this.Socket){
							var pong = {'pong': new Date().getTime()};
							this.Socket.send(JSON.stringify(pong));
						}
					}
			
					this.Socket.onmessage=(event)=>
					{
						var reader = new FileReader();
						reader.addEventListener("loadend", (e) =>
						{
							//console.log(e);
							let ploydata = new Uint8Array(e.target.result);
							let msg = pako.inflate(ploydata, {to: 'string'});
							//console.log("[KLineChart::RequestWSData] recv ws data ",msg)
							var recvData=JSON.parse(msg);
							if (recvData.ping){
								this.SendWSHeartMessage();  //回复服务器心跳包
							}else if (recvData.unsubbed){
								//取消订阅成功
							}else if (recvData.subbed){
								//订阅成功
							}else{
								recvCallback(recvData, data);
							}
						});
						reader.readAsArrayBuffer(event.data,"utf-8");
					};
			
					this.Socket.onerror=(evnet)=>
					{
						console.log(event);
					}
				}
				this.GeneratePostData=function(symbol, period)
				{
					var MAP_PERIOD=new Map([
						[4,'1min'],
						[6,"15min"],
						[8,'60min'],
						[0,'1day'],
						[1,'1week'],
						[2,'1mon'],
						[3,'1year'],
					]);
					var strPeriod=MAP_PERIOD.get(period);
					//历史数据请求参数
					var reqData={
						req: `market.${symbol}.kline.${strPeriod}`,
						symbol: symbol,
						period: strPeriod
					};
			
					//最新数据订阅请求参数
					var subData={
						sub: `market.${symbol}.kline.${strPeriod}`,
						symbol: symbol,
						period: strPeriod
					};
					// console.log(reqData,subData)
					return { Req:reqData ,Sub:subData };
				}
			
				this.RequestHistoryMinuteData=function(data, callback)
				{
					data.PreventDefault=true;  //取消hqchart内部数据请求
					var symbol=data.Request.Data.symbol;
					var period=data.Self.Period;    //周期
					//通过代码和周期 生成ws的请求参数
					var postData=this.GeneratePostData(this.OriginalSymbol,period);
					var obj={ SendData:postData.Req , Symbol:symbol, OriginalSymbol:this.OriginalSymbol, Period:period, Callback:callback };
					// console.log(obj)
					this.RequestWSData(obj, (recvData,data)=>{ this.RecvHistoryMinuteData(recvData,data); });
					// data.PreventDefault=true;
					// var symbol=data.Request.Data.symbol;
					// this.StopWSUpdate();
					// setTimeout(() => {
					//     this.RecvHistoryMinuteData(null,callback, data.Self);
					//     this.StartWSUpdate(symbol); //开始启动ws 自动更新
					// }, 200);
				}
				//日K数据下载
				this.RequestHistoryData = function(data,callback)
				{
					data.PreventDefault=true;
					var symbol=data.Request.Data.symbol;
					var period=data.Self.Period;    //周期
					var postData=this.GeneratePostData(this.OriginalSymbol,period);
					var obj={ SendData:postData.Req , Symbol:symbol, OriginalSymbol:this.OriginalSymbol, Period:period, Callback:callback };
					this.RequestWSData(obj, (recvData,data)=>{ this.RecvHistoryData(recvData,data); });
				}
				this.RecvHistoryData=function(recvData,data)  //接收到日线数据 转化成hqchart格式数据
				{
					var hqChartData={code:0, data:[]};
					hqChartData.symbol=data.Symbol;
					hqChartData.name=data.OriginalSymbol;
					if (recvData.data)
					{
						var yClose=null; //前收盘
						for(var i in recvData.data)
						{
							var item=recvData.data[i];
							//时间戳转换
							var dateTime = new Date();
							dateTime.setTime(item.id*1000);
							var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
							var time=dateTime.getHours()*100+dateTime.getMinutes();
			
							var newItem=[ date,yClose, item.open, item.high, item.low, item.close, item.vol, item.amount];
			
							yClose=item.close;
							hqChartData.data.push(newItem);
						}
						data.Callback(hqChartData);   //把数据设置到hqchart里面
						this.SubscribRealtimeData(data);  //最新日线数据订阅
					}
			
				}
				this.SubscribRealtimeData=function(data)
				{
					//订阅最新数据
					var postData=this.GeneratePostData(data.OriginalSymbol,data.Period);
					var obj={SendData:postData.Sub, Symbol:data.Symbol, OriginalSymbol:data.OriginalSymbol, Period:data.Period };
					this.RequestWSData(obj, (recvData,data)=>{ this.RecvRealtimeData(recvData,data); });
				}
			
				this.RecvRealtimeData=function(recvData,data)
				{
					var internalChart=this.Chart.JSChartContainer;
					var period=internalChart.Period;
					var symbol=internalChart.Symbol;
					if (symbol!=data.Symbol || period!=data.Period) return;
			
					var hqChartData={code:0, stock:[]};
					//TODO:把recvData => hqchart内部格式 格式看教程
					//HQChart使用教程30-K线图如何对接第3方数据14-轮询增量更新日K数据
			
					var stock={symbol:data.Symbol, name:data.OriginalSymbol};
					var item=recvData.tick;
					if (item && item.id) {
						var dateTime = new Date();
						dateTime.setTime(item.id*1000);
						var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
						var time=dateTime.getHours()*100+dateTime.getMinutes();
						stock.date=date;
						stock.yclose=null;
						stock.open=item.open;
						stock.high=item.high;
						stock.low=item.low;
						stock.price=item.close;
						stock.vol=item.vol;
						stock.amount=item.amount;
						hqChartData.stock.push(stock);
						internalChart.RecvRealtimeData(hqChartData); //数据更新到hqchart里
					}
				}
			
				this.RecvHistoryMinuteData=function(recvData, data)
				{
					var hqChartData={code:0, data:[]};
					hqChartData.symbol=data.Symbol;
					hqChartData.name=data.OriginalSymbol;
					if (recvData.data)
					{
						var yClose=null; //前收盘
						for(var i in recvData.data){
							var item=recvData.data[i];
							//时间戳转换
							var dateTime = new Date();
							dateTime.setTime(item.id*1000);
							var date=dateTime.getFullYear()*10000+(dateTime.getMonth()+1)*100+dateTime.getDate();
							var time=dateTime.getHours()*100+dateTime.getMinutes();
							var newItem=[ date,yClose, item.open, item.high, item.low, item.close, item.vol, item.amount, time ];
							yClose=item.close;
							hqChartData.data.push(newItem);
						}
						data.Callback(hqChartData);
					}
			
					// this.SubscribeMinuteRealtimeData(data);
				}
			},
		
		    // 控制分时 小时 日线  周线 月线  年线
			changePeriod(id){
				this.timeIx = id;
				klineControl.ChangePeriod(parseInt(id));
			},
			
			// 控制币种切换K线
			changesymbol(symbol){
				console.log(symbol + 'symbolssymbolsymbolsymbol');
				klineControl.ChangeSymbol(symbol);
			},
		},
		watch: {
			symbols(val) {
				symbolName = val;
				this.changesymbol(val);
			}
		}
	}
</script>
<style lang="less">
	.k-xian {
		width: 100% !important;
		height: 272px !important;
		padding: 0 16px;
		box-sizing: border-box;
		.select-kline-wrap {
			width: 100%;
			margin-bottom: 8px;
			.select-k-item {
				height: 41px;
				text-align: center;
				padding-top: 12px;
				color: #797C84;
				font-size: 13px;
				cursor: pointer;
			}
			.select-k-item-in {
				color: #364064;
				.heng {
					width: 21px;
					height: 4px;
					background: #744DFE;
					border-radius: 2px;
					margin: 0 auto;
					margin-top: 6px;
				}
			}
		}
	}
</style>
