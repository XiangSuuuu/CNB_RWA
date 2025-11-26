<template>
	<view>
		<!-- //利用v-if操控插件的显示与消失  loading -->
		<view class="loader" v-if="flag">
			<!-- <view class="loader-inner">
				<view class="loader-line-wrap">
					<view class="loader-line"></view>
				</view>
			</view> -->
			<view class="ui-loading">
				<view class="ui-loading-mask"></view>
			</view>
		</view>
	    <!-- 轻提示 -->
		<view class="light-tips flex-center" v-if="tips">
			<view class="light-tips-title flex-center" v-if="tipsText" v-text="tipsText"></view>
		</view>
	</view>
</template>

<script>
export default {
    name:"Movie"
}
</script>

<style lang="less">
	// Loading加载动画
.loader {
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999999999;
  .loader-inner {
    bottom: 0;
    height: 60px;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
  }
  .loader-line-wrap {
    animation: spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
    box-sizing: border-box;
    height: 50px;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    transform-origin: 50% 100%;
    width: 100px;
    &:nth-child(1) {
      animation-delay: -50ms;
      .loader-line {
        border-color: #1FA5FF;
        height: 62px;
        width: 62px;
        top: 21px;
      }
    }
    &:nth-child(2) {
      animation-delay: -100ms;
      .loader-line {
        border-color: hsl(60, 80%, 60%);
        height: 76px;
        width: 76px;
        top: 14px;
      }
    }
    &:nth-child(3) {
      animation-delay: -150ms;
      .loader-line {
        border-color: hsl(120, 80%, 60%);
        height: 62px;
        width: 62px;
        top: 21px;
      }
    }
    &:nth-child(4) {
      animation-delay: -200ms;
      .loader-line {
        border-color: hsl(180, 80%, 60%);
        height: 48px;
        width: 48px;
        top: 28px;
      }
    }
    &:nth-child(5) {
      animation-delay: -250ms;
      .loader-line {
        border-color: hsl(240, 80%, 60%);
        height: 34px;
        width: 34px;
        top: 35px;
      }
    }
  }
  .loader-line {
    border: 4px solid transparent;
    border-radius: 50%;
    box-sizing: border-box;
    height: 100px;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
  }
  
  @keyframes spin {
      0%, 15% {
          transform: rotate(0);
      }
      100% {
          transform: rotate(360deg);
      }
  }
  
}

/*
 *    loading加载动画样式
 */
.ui-loading{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
    background-color: rgba(0,0,0,.4);
}
.ui-loading-mask{
    width: 6px;
    height: 6px;
    border-radius: 50%;
    -webkit-animation: typing 1s linear infinite alternate;
       -moz-animation: Typing 1s linear infinite alternate;
            animation: typing 1s linear infinite alternate;
    margin: 80% auto 0; /* Not necessary- its only for layouting*/  
    position: relative;
    left: -12px;
}
@-webkit-keyframes typing{
    0%{
        background-color: rgba(255,255,255, 1);
        box-shadow: 12px 0px 0px 0px rgba(255,255,255,0.2), 
                    24px 0px 0px 0px rgba(255,255,255,0.2);
      }
    25%{ 
        background-color: rgba(255,255,255, 0.4);
        box-shadow: 12px 0px 0px 0px rgba(255,255,255,2), 
                    24px 0px 0px 0px rgba(255,255,255,0.2);
    }
    75%{ background-color: rgba(255,255,255, 0.4);
        box-shadow: 12px 0px 0px 0px rgba(255,255,255,0.2), 
                    24px 0px 0px 0px rgba(255,255,255,1);
      }
}

@-moz-keyframes typing{
   0%{
        background-color: rgba(255,255,255, 1);
        box-shadow: 12px 0px 0px 0px rgba(255,255,255,0.2), 
                    24px 0px 0px 0px rgba(255,255,255,0.2);
      }
    25%{ 
        background-color: rgba(255,255,255, 0.4);
        box-shadow: 12px 0px 0px 0px rgba(255,255,255,2), 
                    24px 0px 0px 0px rgba(255,255,255,0.2);
    }
    75%{ background-color: rgba(255,255,255, 0.4);
        box-shadow: 12px 0px 0px 0px rgba(255,255,255,0.2), 
                    24px 0px 0px 0px rgba(255,255,255,1);
      }
}

@keyframes typing{
   0%{
        background-color: rgba(255,255,255, 1);
        box-shadow: 12px 0px 0px 0px rgba(255,255,255,0.2), 
                    24px 0px 0px 0px rgba(255,255,255,0.2);
      }
    25%{ 
        background-color: rgba(255,255,255, 0.6);
        box-shadow: 12px 0px 0px 0px rgba(255,255,255,2), 
                    24px 0px 0px 0px rgba(255,255,255,0.2);
    }
    75%{ background-color: rgba(255,255,255, 0.4);
        box-shadow: 12px 0px 0px 0px rgba(255,255,255,0.2), 
                    24px 0px 0px 0px rgba(255,255,255,1);
      }
      100%{ background-color: rgba(255,255,255, 0.1);
        box-shadow: 12px 0px 0px 0px rgba(255,255,255,0.2), 
                    24px 0px 0px 0px rgba(255,255,255,1);
      }
}
 
   // 轻提示
   .light-tips {
	   position: fixed;
	   width: 100%;
	   top: 0;
	   left: 0;
	   height: 100vh;
	   z-index: 999999999;
	   .light-tips-title {
		    display: inline-block;
		    min-height: 30px;
		    line-height: 30px;
		    white-space: normal;
		    max-width: 80%;
		    border-radius: 4px;
		    background: rgba(0, 0, 0, 0.5);
		    color: #FFFFFF;
		    font-size: 16px;
		    padding: 0 10px;
	   }
   }
</style>