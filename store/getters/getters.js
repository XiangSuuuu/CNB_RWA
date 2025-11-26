export default {
	doneTodos: (state) => {
	 return state.todos.filter(todo => todo.done)
	},
	// 带参数判断返回
	doneTodosNext: (state) => (id) => {
	 return state.todos.filter(todo => todo.id == id)
	}
}