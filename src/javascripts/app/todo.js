'use strict';

import { observable, autorun, computed } from 'mobx';

import DevTools from 'mobx-react-devtools';

import { observer } from 'mobx-react';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

class TodoStore {
  @observable todos = [{task: "task1", completed: false, assignee: null}, {task: "task2", completed: false, assignee: null}];
  @observable pendingRequests = 0;
  constructor() {
    autorun(() => console.log(this.report));
  }
  @computed get completedTodoCount () {
    return this.todos.filter(todo => todo.completed === true).length;
  }
  @computed get report() {
    if(this.todos.length === 0)
      return "<none>";
    return `Next todo: "${this.todos[0].task}" .` + `Progress: ${this.completedTodoCount}/${this.todos.length}`;
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}



@observer
class TodoList extends Component {
  onNewTodo= () => {
    this.props.store.addTodo(prompt('Enter a new todo:', 'coffee piz'));
  } 
  render(){
    const {store} = this.props;
    return (
      <div>
        {  store.report }
        <ul>
          {
            store.todos.map((todo, idx)=> <TodoView todo={ todo } key={ idx }/>)
          }
        </ul>
        { store.pendingRequests > 0 ? <marquee>Loading</marquee> : null}
        <button onClick={this.onNewTodo}>New Todo</button>
        <small> (double-click a todo to edit) </small>
        <DevTools />
      </div>
    );
  }
  
}

@observer
class TodoView extends Component {
  onRename= () => {
    const todo = this.props.todo;
    todo.task = prompt('Task name', todo.task) || todo.task;
  }
  onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  }
  render() {
    const { todo } = this.props;
    return (
      <li onDoubleClick={this.onRename}>
        <input type="checkbox"  checked={todo.completed}  onChange={this.onToggleCompleted} />
        { todo.task }
        { todo.assignee?<small>{ todo.assignee.name }</small>:null } 
      </li>
    );
  }
}

const todoStore = new TodoStore();

ReactDOM.render(<TodoList store={ todoStore } />, document.getElementById('app'));


var peopleStore = observable([
  { name: "Michel" },
  { name: "Me" }
]);

todoStore.todos[0].assignee = peopleStore[0];
todoStore.todos[1].assignee = peopleStore[1];
peopleStore[0].name = "Michel Weststrate";

todoStore.pendingRequests++;
setTimeout(function(){
  todoStore.addTodo('Random todo:'+Math.random());
  todoStore.pendingRequests--;
}, 2000);


// const todoStore = new TodoStore();

// todoStore.addTodo("read Mobx tutorial");

// todoStore.todos[0].completed = true;

// // console.log(todoStore.report());