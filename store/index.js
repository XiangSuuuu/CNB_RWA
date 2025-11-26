import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from './state/state.js'
import getters from './getters/getters.js'
import mutations from './mutations/mutations.js'
import actions from './actions/actions.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: defaultState,
	// 函数试计算  getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。
	getters,
	// 重要的原则就是要记住 mutation 必须是同步函数  (同步)
    mutations,
	// 我们可以在 action 内部执行异步操作   （异步）
    actions,
})

export default store

// this.$store.commit('increment');
// this.$store.commit('incrementNext', 4);
// console.log(this.$store.state.count)
// console.log(this.$store.getters.doneTodos)
// console.log(this.$store.getters.doneTodosNext(2))
// console.log(this.doneTodos);
// console.log(this.doneTodos1(2));

// actions
// this.$store.dispatch('increment');
// console.log(this.$store.state.count + 'actions')