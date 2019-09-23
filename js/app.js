

const vm = new Vue({
	el: "#app",
	data: {
		todos: [
			{id:1,name:'吃饭',completed:false},
			{id:2,name:'喝酒',completed:true},
			{id:3,name:'染发',completed:false}
		],
		todoName: '',
		isChecked: true,
		editId: -1
	},
	methods: {
		// 添加功能
		addTodo() {
			// 非空校验
			if(this.todoName.trim() === '') {
				return
			}
			// 如果一条数据也没有
			let id = this.todos.length === 0 ? 1 : this.todos[this.todos.lengh -1].id + 1;
			this.todos.push({
				id,
				name: this.todoName,
				completed: false
			})
			// 清空输入框
			this.todoName = ''
		},
		// 删除功能
		deleteTodo(index) {
			this.todos.splice(index,1)
		},
		// 显示编辑框
		showEditStatus(id) {
			this.editId = id;
		},
		// 修改功能
		uadateTodo() {
			// 将 editId 重新置为 -1
			this.editId = -1;
		}
	},
	// 计算属性
	computed: {
		// 当没有任务时，footer不可见
		showFooter() {
			return this.todos.length != 0;
		},
		// 未完成任务数量
		notCompletedTodo() {
			// 过滤出未完成的任务的长度
			return this.todos.filter(item => !item.completed).length
		},
		// 没有任务完成的时候 clear completed按钮隐藏
		showClearCompleted() {
			return this.todos.some(item => item.completed)
		}
	}
})