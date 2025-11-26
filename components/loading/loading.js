import Loading from './loading.vue';
import Vue from 'vue';
export default()=>{
    let LoadingComponent=Vue.extend(Loading);
    let child=new LoadingComponent({//动态创建挂载点
        el:document.createElement("div"),
        data:{
            flag:false, //loading加载框
			tips: false, //轻提示加载框
			tipsText: '提示', //提示文字
        },
        methods:{
			// loading加载框
            handlemount(){
                this.flag=true;
            },
            handleDestory(){
                this.flag=false;
            },
			// 轻提示加载框
			setPoint(text, time=2000){
				this.tipsText = text;
				this.tips = true;
				setTimeout(() => {
					this.tips = false;
				},time)
			}
        }
    })
    document.body.appendChild(child.$mount().$el)
    return child;
}