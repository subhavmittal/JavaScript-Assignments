/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  constructor() {
    this.todos = [];
    this.length = 0;
  }
  add(todo) {
    this.todos.push(todo);
    this.length++;
  }
  remove(indexOfTodo) {
    this.todos.splice(indexOfTodo, 1);
    this.length--;
  }
  update(index, updatedTodo) {
    if (index > (this.length - 1)) {
      return;
    }
    this.todos[index] = updatedTodo;
  }
  getAll() {
    return this.todos;
  }
  get(index) {
    if (index > (this.length - 1)) {
      return null;
    }
    return this.todos[index];
  }
  clear() {
    this.todos = [];
  }
}

const todoList = new Todo();
todoList.add("Task 1");
todoList.add("Task 2");
todoList.add("Task 3");
console.log(todoList.getAll());
todoList.remove(1);
console.log(todoList.getAll());
todoList.remove(0);
console.log(todoList.getAll());
todoList.remove(2);
console.log(todoList.getAll());
todoList.update(1, 'Updated Task 2');
console.log(todoList.get(1));
todoList.update(3, 'Invalid Task')
console.log(todoList.getAll());
module.exports = Todo;
