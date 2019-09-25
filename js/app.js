

const todoHeader = {
	template: `
		<header class="header">
		<h1>todos</h1>
		<input class="new-todo" placeholder="What needs to be done?" autofocus v-model="todoName"
		@keyup.enter="addTodo">
		</header>
	`,
	data() {
		return {
			todoName: ''
		}
	},
	methods: {
		addTodo() {
			// 1. 非空校验
			if(this.todoName.trim() === '' ) {
				return
			}
			// 2. 将todoName 传递给父组件，让父组件添加到todos中
			this.$emit('add',this.todoName);
			// 3. 清空输入框
			this.todoName = ''
		}
	}
}

const todoList = {
	template: `
	<section class="main">
	<input id="toggle-all" class="toggle-all" type="checkbox">
	<label for="toggle-all">Mark all as complete</label>
	<ul class="todo-list">
		<li :class="{completed:item.completed, editing: editId === item.id}"  v-for="(item,index) in todos" :key="item.id"
			>
			<div class="view">
				<input class="toggle" type="checkbox" v-model="item.completed">
				<label @dblclick="showUpdateStatus(item.id)">{{ item.name }}</label>
				<button class="destroy" @click="delTodo(item.id)"></button>
			</div>
			<input class="edit" v-model="item.name" @keyup.enter="updateTodo">
		</li>
	</ul>
</section>
	`,
	props: ['todos'],
	data() {
		return {
			editId: -1
		}
	},
	methods: {
		// 删除功能
		delTodo(id) {
			this.$emit('del',id)
		},
		// 显示编辑框
		showUpdateStatus(id) {
			this.editId = id
		},
		// 修改完成隐藏编辑框
		updateTodo() {
			this.editId = -1
		}
	}
}

const todoFooter = {
	template:`
		<footer class="footer" v-show = "showfooter">
			<span class="todo-count"><strong v-text="notcompleted"></strong> item left</span>
			<ul class="filters">
				<li>
					<a class="selected" href="#/">All</a>
				</li>
				<li>
					<a href="#/active">Active</a>
				</li>
				<li>
					<a href="#/completed">Completed</a>
				</li>
			</ul>
			<button class="clear-completed" v-show="showcomleted">Clear completed</button>
		</footer>
	`,
	props: ['showfooter','notcompleted','showcomleted']
}


const vm = new Vue({
	el: "#app",
	data:{
		todos: [
				{id:1,name:'吃饭',completed:false},
				{id:2,name:'喝酒',completed:true},
				{id:3,name:'染发',completed:false}
				]
	},
	components: {
		'todo-header': todoHeader,
		'todo-list': todoList,
		'todo-footer': todoFooter
	},
	methods: {
		// 添加功能
		addTodoName(data) {
			// 1. 判断todos的长度是否为0
			let id = this.todos.length === 0 ? 1 : this.todos[this.todos.length - 1].id + 1;
			// 2. 进行添加
			this.todos.push({
				id,
				name: data,
				completed: false
			})
		},
		// 删除功能
		delList(id) {
			
			this.todos.splice(this.todos.filter(item => {item.id === id}),1)
		},
		isCheckedList(id) {
			return !this.todos.filter(item=>item.id===id).completed
		}
	},
	computed: {
		// 是否显示footer
		showFooter() {
			return this.todos.filter(item=>{item.completed === true})
		},
		// 过滤未完成项目
		notCompletedTodo() {
			return this.todos.filter(item => !item.completed).length
		},
		showClearCompleted() {
			return this.todos.some(item => item.completed);
		}	
	}
})







// const vm = new Vue({
// 	el: "#app",
// 	data: {
// 		todos: [
// 			{id:1,name:'吃饭',completed:false},
// 			{id:2,name:'喝酒',completed:true},
// 			{id:3,name:'染发',completed:false}
// 		],
// 		todoName: '',
// 		isChecked: true,
// 		editId: -1
// 	},
// 	methods: {
// 		// 添加功能
// 		addTodo() {
// 			// 非空校验
// 			if(this.todoName.trim() === '') {
// 				return
// 			}
// 			// 如果一条数据也没有
// 			let id = this.todos.length === 0 ? 1 : this.todos[this.todos.lengh -1].id + 1;
// 			this.todos.push({
// 				id,
// 				name: this.todoName,
// 				completed: false
// 			})
// 			// 清空输入框
// 			this.todoName = ''
// 		},
// 		// 删除功能
// 		deleteTodo(index) {
// 			this.todos.splice(index,1)
// 		},
// 		// 显示编辑框
// 		showEditStatus(id) {
// 			this.editId = id;
// 		},
// 		// 修改功能
// 		uadateTodo() {
// 			// 将 editId 重新置为 -1
// 			this.editId = -1;
// 		}
// 	},
// 	// 计算属性
// 	computed: {
// 		// 当没有任务时，footer不可见
// 		showFooter() {
// 			return this.todos.length != 0;
// 		},
// 		// 未完成任务数量
// 		notCompletedTodo() {
// 			// 过滤出未完成的任务的长度
// 			return this.todos.filter(item => !item.completed).length
// 		},
// 		// 没有任务完成的时候 clear completed按钮隐藏
// 		showClearCompleted() {
// 			return this.todos.some(item => item.completed)
// 		}
// 	}
// })