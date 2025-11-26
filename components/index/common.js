import md5Libs from "uview-ui/libs/function/md5";
import '@metamask/legacy-web3';
import CryptoJS from 'crypto-js';
import vpoolabi from '@/components/index/vpool.js';
import poolabi from '@/components/index/pool.js';
import buyabi from '@/components/index/buy.js';
import usdtabi from '@/components/index/usdt.js';
import tokenabi from '@/components/index/token.js';
import apoolabi from '@/components/index/apool.js';
import Vue from 'vue'
const vm = new Vue();
let loading = false;

// 循环 500ms 部分机子不能及时获取web3
let interval;
interval = setInterval(() => {
	vm.$Common.getWebThree();
	// web3获取
	// if (window.web3) {
	// 	clearInterval(interval)
	// 	var web3Provider;
	// 	if (window.ethereum) {
	// 		web3Provider = window.ethereum;
	// 	try {
	// 		// 请求用户授权
	// 		window.ethereum.send('eth_requestAccounts');
	// 	} catch (error) {
	// 		//用户不授权时，这里处理异常情况，同时可以设置重试等机制
	// 		console.log(error)
	// 	}
	// 	} else if (window.web3) {// 老版可以使用 MetaMask Legacy dapp browsers...
	// 		web3Provider = window.web3.currentProvider;
	// 	} else {
	// 		// 这里处理连接在不支持dapp的地方打开的情况
	// 		web3Provider = new Web3.providers.HttpProvider('https://eth-testnet.tokenlon.im');
	// 		console.log("Non-Ethereum browser detected. You should consider trying MetaMask!")
	// 	}
	// 	window.web3 = new Web3(web3Provider);
		
	// 	// ethers获取
	// 	var web3ProviderEthers
	// 	if (!window.web3Ethers) {
	// 		if (!window.ethereum) {
	// 			console.error("there is no web3 provider.");
	// 		} else {
	// 			web3ProviderEthers = new ethers.providers.Web3Provider(window.ethereum, "any");
	// 		}
	// 	}
	// 	window.web3Ethers = web3ProviderEthers;
		
	// 	//注册合约
	// 	// 正式 U'0x55d398326f99059fF775485246999027B3197955' RMT '0x5a87771C0522191eD915Fb669b04470D801Fae1c'
	// 	// 测试 U 0x461cC05c887D7A5cDf03e530C631f4c329F30F91   RMT '0xd62eA892867866B5A258741CfB683Efc5c29414b'
		
	// 	vm.$Request.get('app/getConfig',{}, false).then((res) => {
	// 		if (res.code == 200) {
	// 			const configs = res.data.sysConfigs;
	// 			configs.forEach((item) => {
	// 				if (item.configKey == 'C2C') {
	// 					Vue.prototype.$c2ctcc = new ethers.Contract(item.configValue, c2cabi, web3Ethers.getSigner());
	// 				}
	// 				if (item.configKey == 'VIPPool') {
	// 					Vue.prototype.$vippooltcc = new ethers.Contract(item.configValue, vippoolabi, web3Ethers.getSigner());
	// 				}
	// 				if (item.configKey == 'VVVPool') {
	// 					Vue.prototype.$vvvpooltcc = new ethers.Contract(item.configValue, vippoolabi, web3Ethers.getSigner());
	// 				}
	// 				if (item.configKey == 'EToken') {
	// 					Vue.prototype.$tokentcc = new ethers.Contract(item.configValue, tokenabi, web3Ethers.getSigner());
	// 				}
	// 				if (item.configKey == 'USDT') {
	// 					Vue.prototype.$usdttcc = new ethers.Contract(item.configValue, tokenabi, web3Ethers.getSigner());
	// 				}
	// 				if (item.configKey == 'Stake') {
	// 					Vue.prototype.$staketcc = new ethers.Contract(item.configValue, stakeabi, web3Ethers.getSigner());
	// 				}
	// 			})
	// 		}
	// 	});
	// }
}, 500)

let price = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

uni.getSystemInfo({
	success: (res) => {
		// console.log(res)
		const uniPlatform = res.uniPlatform;
		Vue.prototype.$statusBarHeight = res.statusBarHeight;
		Vue.prototype.$paddingTop = 'padding-top: calc('+ res.statusBarHeight+'px'+');';
	},
});

export default {
	// 接口请求公共参数
	publicParameter(){
		return {
			accessToken: uni.getStorageSync('accessToken') ? uni.getStorageSync('accessToken') : '',
			access_token: vm.$store.state.myAddress ? vm.$Common.addrEncrypt(vm.$store.state.myAddress) : '', //正式 0xD06b5e213D31A8863302a64EB16F653cE3890d10 //测试 0xc6eDD89D6570567514F78d789c01926a4f401c45 
			address: vm.$store.state.myAddress ? vm.$store.state.myAddress : '',
			// sign: vm.$Common.md5Num(),
			// t: Math.round(new Date().getTime()/1000), //时间戳
		};
	},
	// 英文 en-us
	// 俄罗斯-  ru-ru
	//阿拉伯  ar-ae
	//西班牙 es-es
	//葡萄牙  pt-pt
	//法语 fr-fr
	// 德语  de-de
	
	landName () {
		const land = localStorage.getItem('locale');
		console.log(land);
		if (land == 'EN') {
			return 'en_US';
		} else if (land == 'CN') {
			return '';
		} else if (land == 'HK') {
			return 'zh_TW';
		} else {
			return 'en_US';
		}
	},
	
	getWebThree(is=true) {
		// web3获取
		if (typeof web3 !== 'undefined') {
		  web3 = new Web3(web3.currentProvider);
		} else {
		  // 如果没有MetaMask，可以设置其他provider，例如Infura
		  web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_ID'));
		}
		// console.log(web3)
		if (window.web3) {
			clearInterval(interval)
			// web3.setProvider('HTTP://127.0.0.1:7545');
			var web3Provider;
			if (window.ethereum) {
				web3Provider = window.ethereum;
			try {
				// 请求用户授权
				window.ethereum.send('eth_requestAccounts');
			} catch (error) {
				//用户不授权时，这里处理异常情况，同时可以设置重试等机制
				console.log(error)
			}
			} else if (window.web3) {// 老版可以使用 MetaMask Legacy dapp browsers...
				web3Provider = window.web3.currentProvider;
			} else {
				// 这里处理连接在不支持dapp的地方打开的情况
				web3Provider = new Web3.providers.HttpProvider('https://eth-testnet.tokenlon.im');
				console.log("Non-Ethereum browser detected. You should consider trying MetaMask!")
			}
			window.web3 = new Web3(web3Provider);
			
			// ethers获取
			var web3ProviderEthers
			// if (!window.web3Ethers) {
				
			// }
			if (!window.ethereum) {
				console.error("there is no web3 provider.");
			} else {
				web3ProviderEthers = new ethers.providers.Web3Provider(window.ethereum, "any");
			}
			if (web3ProviderEthers) {
				window.web3Ethers = web3ProviderEthers;
			}
			// console.log(window.web3Ethers._network.chainId)
			//注册合约
			if (is) {
				vm.$Request.get('app/getConfig',{}, false).then((res) => {
					if (res.code == 200) {
						const configs = res.data.sysConfigs;
						configs.forEach((item) => {
							if (item.configKey == 'USDTContractAddress') {
								Vue.prototype.$usdttcc = new ethers.Contract(item.configValue, usdtabi, web3Ethers.getSigner());
							}
							if (item.configKey == 'VBOContractAddress') {
								Vue.prototype.$vbotcc = new ethers.Contract(item.configValue, usdtabi, web3Ethers.getSigner());
							}
							if (item.configKey == 'VEContractAddress') {
								Vue.prototype.$vetcc = new ethers.Contract(item.configValue, usdtabi, web3Ethers.getSigner());
							}
							if (item.configKey == 'nodeContractAddress') {
								Vue.prototype.$supernodetcc = new ethers.Contract(item.configValue, poolabi, web3Ethers.getSigner());
							}
							if (item.configKey == 'v9ContractAddress') {
								Vue.prototype.$v9tcc = new ethers.Contract(item.configValue, poolabi, web3Ethers.getSigner());
							}
							if (item.configKey == 'incomeContractAddress') {
								Vue.prototype.$incometcc = new ethers.Contract(item.configValue, vpoolabi, web3Ethers.getSigner());
							}
							if (item.configKey == 'VEReleaseContractAddress') {
								Vue.prototype.$vereleasetcc = new ethers.Contract(item.configValue, apoolabi, web3Ethers.getSigner());
							}
							if (item.configKey == 'buyContractAddress') {
								Vue.prototype.$buytcc = new ethers.Contract(item.configValue, buyabi, web3Ethers.getSigner());
							}
							
							Vue.prototype.$deadtcc = new ethers.Contract('0x000000000000000000000000000000000000dEaD', tokenabi, web3Ethers.getSigner());
						})
					}
				});
			}
		}
	},
	
	//地址加密
	addrEncrypt(address) {
		// console.log(address)
		// 密钥和向量
		var key = CryptoJS.enc.Utf8.parse(vm.$httpSign); // 密钥
		var iv = CryptoJS.enc.Utf8.parse(vm.$httpSign); // 向量
		// 加密数据
		var encrypted = CryptoJS.AES.encrypt(address, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			// padding: CryptoJS.pad.Pkcs7
		});
		// console.log(encrypted.toString());
		// 转换为字符串（Base64编码）
		return encrypted.toString();
	},
	
	// 弹窗提示
	showToast(msg, url, hour=1500) {
		vm.$Loading.setPoint(msg)
		// uni.showToast({
		// 	icon : 'none',
		// 	title: msg,
		// 	duration: 2000,
		// });
		if (url) {
			setTimeout(() => {
				vm.$Router.push({
					path: url,
				})
			}, hour);
		}
	},
	
	// 弹窗提示 确认
	showModal(text = '订单', title = '确定取消该订单?',callback) {
		uni.showModal({
		    title: text,
		    content: title,
			cancelText: '取消',
			confirmText: '确定',
		    success: function (res) {
		        if (res.confirm) {
		            console.log('用户点击确定');
					callback();
		        } else if (res.cancel) {
		            console.log('用户点击取消');
		        }
		    }
		});
	},
	
	// 邮箱判断
	chkEmail(value) {
	    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
	        value
	    )
	},
	
	// 判断图片前缀名  添加
	formatUrl(url){
		if(url){
			if (url.indexOf('blob:')  !== -1) return url;
			var reg = /^https?:\/\/|^http?:\/\//i;
			if(!reg.test(url)){
				url =  vm.$httpsUrl + url
			}
		}
		return url;
	},
	
	//判断是否为10的倍数
	isNumberBy10(ssn) {
		var re = /^[0-9]*[0-9]$/i; //校验是否为数字
		if(re.test(ssn) && ssn%10===0) {
			return true;
		}else {
			return false;
		}
	},
	
	// 签名
	md5Num(add){
		if (add) {
			return md5Libs.md5(add).toUpperCase();
		} else {
			return md5Libs.md5(Math.round(new Date().getTime()/1000) + vm.$httpSign).toUpperCase();
		}
	},
	
	getShareLink(invite) {
			let http = window.location.protocol + "//" + window.location.host + window.location.pathname;
			http = http + "#/?invite_code=" + invite;// + "&time_stamp=" + new Date().getTime();
			return http;
		},
	
	// 复制
	copy(data) {
		console.log(data)
		let url = data;
		let oInput = document.createElement('textarea');
		oInput.value = url;
		document.body.appendChild(oInput);
		oInput.select(); // 选择对象;
		document.execCommand("Copy"); // 执行浏览器复制命令
		// 复制成功提示;
		this.showToast(vm.$t('index._TEXT1'))
		oInput.className = 'oInput'
		oInput.style.display = 'none'
		oInput.remove()
		document.body.removeChild(oInput)
    },
	
	//图片上传
	uploadFile(url, type){
		let data = vm.$Common.publicParameter()
		data.type = type;
		return new Promise((resolve) => {
			uni.uploadFile({
				url: vm.$httpsUrl + 'api/sys_common/uploadImg',//你上传接口
				filePath:url,//上传的文件
				name:"file", //后台接收文件的标识
				formData: data,
				success: (res) => {
					var ret = JSON.parse(res.data);
					resolve(ret.data);
				},
				fail: (err) => {
					resolve();	
				},
			});
		})
	},
	
	// 获取路径后面参数 par路径 ？ 后面对应的名称
	getPar(par){
		//获取当前URL
		var local_url = document.location.href; 
		//获取要取得的get参数位置
		var get = local_url.indexOf(par +"=");
		if(get == -1){
			return false;   
		}   
		//截取字符串
		var get_par = local_url.slice(par.length + get + 1);    
		//判断截取后的字符串是否还有其他get参数
		var nextPar = get_par.indexOf("&");
		if(nextPar != -1){
			get_par = get_par.slice(0, nextPar);
		}
		return get_par;
	},
	
	// 保留小数位  以W为单位 显示逗号
	numberRetainLength (price) {
	    if (price) {
	        var t = '';
	        if(price>10*10000*10000){
	            price = price/10000/10000
	            t = vm.$t('tabBar.YIYI');
	            return Number(price).toFixed(4)+t;
	        }else if(price>10*10000){
				if (localStorage.getItem('locale') === 'EN') {
					price = price/1000000;
				} else {
					price = price/10000;
				}
	            t = vm.$t('tabBar.WANGWANG');
	            return Number(price).toFixed(0)+ ' ' + t;
	        } else {
	            var numNext = price.toString().split("");
	            for(var i = (numNext.length-1); i >= 0; i--) {
	                if (i == 0) return numNext.join('');
	                if (numNext.indexOf('.') == -1) return numNext.join('');
	                if (numNext[i] != 0) {
	                    if (numNext[i] == '.') {
	                        numNext.splice(i, 1);
	                        return numNext.join('');
	                    }
	    
	                    if (numNext.length >= 8) {
	                        return Number(price).toFixed(4);
	                    } else {
	                        return numNext.join('');
	                    }
	                }
	                if (numNext[i] == 0 && i != 0) {
	                    numNext.splice(i, 1);
	                }
	            }
	        }
	    } else {
	        return price
	    }
	},
	
	// 判断图片是否加载完成
	// 第一个参数为所有图片路径的数组。
	// 第二个参数为所有图片加载完成后的回调函数。
	// 第三个参数为所有图片的前置路径，如果已经是完整路径，则不需要传此参数。
	// loadImgEnd(imgArr,()=>{this.isLoading = false;})
	loadImageEnd(list, callback, basePath) {
	    if (!list || list.length === 0) return;
	    if (basePath) list = list.map(item => basePath + item);
	    let img = new Image();
	    img.data = {
	        list: list,
	        callback: callback,
	        resultList: [],
	        num: 0
	    }
	    img.addEventListener("load", vm.$Common.loadImgHandler);
	    img.addEventListener("error", vm.$Common.loadImgHandler);
	    img.src = list[img.data.num];
	},
	
	loadImgHandler(e) {
	    let data = e.currentTarget.data;
	    if (e.type !== 'error') {
	        data.resultList.push(e.currentTarget.cloneNode(false));
	    }
	    data.num++;
	    if (data.num > data.list.length - 1) {
	        e.currentTarget.removeEventListener("load", vm.$Common.loadImgHandler);
	        if (data.callback) {
	            data.callback(data.resultList);
	        }
	        data = null;
	        return;
	    }
	    e.currentTarget.src = data.list[data.num];
	},
	
	// 判断是否在不同浏览器
	myBrowser() {
		//取得浏览器的userAgent字符串
		let userAgent = window.navigator.userAgent;  //window可以省略
		let isOpera = userAgent.indexOf("Opera") > -1;
		//判断是否Opera浏览器
		if (isOpera) {
			 // alert("Opera浏览器");
			return 'Opera';
		};
		//判断是否IE浏览器
		if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
			// alert("IE浏览器");
			return 'IE';
		};
		//判断是否Safari浏览器
		if (userAgent.indexOf("Safari") > -1) {
			// alert("Safari浏览器");
			return 'Safari';
		}
		//判断是否Firefox浏览器
		if (userAgent.indexOf("Firefox") > -1) {
			// alert("Firefox浏览器");
			return 'Firefox';
		}
		//判断是否Chrome浏览器
		if (userAgent.indexOf("Chrome") > -1){
			// alert("Chrome浏览器");
			return 'Chrome';
		}
	},
	
	// 链接MetaMask钱包 获取地址
	metaMaskAccount() {
		return new Promise((resolve) => {
			if (web3 && web3.eth) {
				try{
					if (typeof window.okxwallet !== 'undefined') {
						console.log('OKX is installed!');
						console.log(window.okxwallet.selectedAddress);
						resolve(window.okxwallet.selectedAddress);
						
					} else if (web3.eth && web3.eth.accounts && web3.eth.accounts.length === 0) { //未授权钱包
						// window.ethereum.enable()
						window.ethereum
						    .request({ method: 'eth_requestAccounts' })
							.then((accounts) => {
								console.log('获取地址')
								console.log(accounts)
								// 判断是否连接以太
								if (accounts) {
									resolve(accounts[0])
								} else {
									resolve(false)
								}
							}).catch((reason) => {
								//如果用户拒绝了登录请求
								if (reason === "User rejected provider access") {
									// 用户拒绝登录后执行语句；
								} else {
									// 本不该执行到这里，但是真到这里了，说明发生了意外
									// vm.$Common.showToast('发生了意外');
								}
								resolve(false);
							});
					} else { //已授权钱包
						// console.log('web3.eth.accounts[2]' + web3.eth.accounts[0])
						if (web3.eth.accounts[0]) {
							resolve(web3.eth.accounts[0])
						} else {
							resolve(false);
						}
					}
				}catch(e){
					// 获取账户
					// resolve('1232')
					resolve(false);
					vm.$Common.getWebThree();
				}
			} else {
				console.log('no web3')
				vm.$Common.showToast(vm.$t('tabBar.QINGDAKAIMETAMART'));
				resolve(false);
			}   
		})
	},
	
	errPoint(err) {
		console.log(err)
		if (err.message == 'MetaMask Tx Signature: User denied transaction signature.') {
			vm.$Common.showToast('MetaMask Tx Signature: User denied transaction signature', '', 3000);
		} else if (err.data && err.data.message) {
			vm.$Common.showToast(err.data.message, '', 3000);
		} else if (err.message) {
			vm.$Common.showToast(err.message, '', 3000);
		} else if (err && err.reason) {
			vm.$Common.showToast(err.reason, '', 3000);
		} else if (err && err.message) {
			vm.$Common.showToast(err.message, '', 3000);
		} else if (err && err.error && err.error.message) {
			vm.$Common.showToast(err.error.message, '', 3000);
		} else if (err && err.error && err.error.reason) {
			vm.$Common.showToast(err.error.reason, '', 3000);
		} else if (err.data && err.data.message && err.data.message == 'execution reverted: EE: recommender not exists ') {
			vm.$Common.showToast('execution reverted: EE: recommender not exists ', '', 3000);
		} else if (err && err.data && err.data.message) {
			vm.$Common.showToast(err.data.message, '', 3000);
		} else {
			vm.$Common.showToast(err, '', 3000);
		}
	},
	
	async webSign() {
		try {
			if (loading) return;
			loading = true;
	
			setTimeout(() => {
				loading = false;
			}, 10000);
	
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			console.log(provider + ' add app'); // 获取provider
	
			let signature = null; // 提前定义签名变量
	
			if (typeof window.okxwallet !== 'undefined') {
				// OKX 钱包签名逻辑
				await window.okxwallet.bitcoin.requestAccounts();
				const signStr = 'VBO';
				signature = await window.okxwallet.fractalBitcoin.signMessage(signStr, 'ecdsa');
			} else {
				// MetaMask 签名逻辑
				await provider.send("eth_requestAccounts", []);
				const signer = provider.getSigner();
				signature = await signer.signMessage("VBO");
			}
	
			// 判断签名结果
			if (signature) {
				loading = false;
				vm.$store.commit('setSignature', true);
				vm.$Router.push({ path: '/' });
			} else {
				console.warn('未获取到签名，正在刷新页面...');
				vm.$Router.push({ path: '/' }); // 未签名则刷新页面
			}
		} catch (error) {
			console.error('签名过程出错：', error);
			// 捕获异常时也刷新
			vm.$Router.push({ path: '/' });
		}
	}

}