import LangCn from './zh.js'
import LangHk from './hk.js'
import LangEn from './en.js'

import Vue from 'vue'
import VueI18n from './vue-i18n'
Vue.use(VueI18n)
// 英语，俄语，西班牙，葡萄牙，阿拉伯，德语，法语 印尼
const i18n = new VueI18n({
	locale: localStorage.getItem('locale') || 'EN',  // 默认选择的语言
	messages: {
		'CN': LangCn, //中文
		'EN': LangEn, //英文
		'HK': LangHk,
	}
})
export default i18n