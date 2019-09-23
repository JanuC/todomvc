

const vm = new Vue({
	el: "#app",
	data: {
		todos: [
			{id:1,name:'吃饭',completed:false},
			{id:2,name:'喝酒',completed:true},
			{id:3,name:'染发',completed:false}
		],
		todoName: '',
		isChecked: true
	},
	methods: {
		// 添加功能
		addTodo() {
			this.todos.push({
				id: this.todos[this.todos.length - 1].id + 1,
				name: this.todoName,
				completed: false
			})
			// 清空输入框
			this.todoName = ''
		},
		deleteShow() {
			console.log(1);
			
		},
		// 删除功能
		deleteTodo() {

		}
	}
})