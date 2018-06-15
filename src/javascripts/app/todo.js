'use strict';

import { observable, autorun, computed, observer } from 'mobx';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

class TodoStore {
  @observable todos = [];
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
        
      </div>
    );
  }
  onNewTodo= () => {
    this.props.store.addTodo(prompt('Enter a new todo:', 'coffee piz'));
  } 
}

@observer
class TodoView extends Component {
  render() {
    const { todo } = this.props;
    return (
      <li onDoubleClick={this,onRename}>
        <input type="checkbox"  onchecked={todo.completed}  onChange={this.onToggleCompleted} />
        { todo.task }
        { todo.assignee?<small>{ todo }</small>:null } 
        
      <li>
    );
  }
  onRename= () => {
    const todo = this.props.todo;
    todo.tack = prompt('Task name', todo.task) || todo.task;
  }

  onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  }
}

const todoStore = new TodoStore();

ReactDOM.render(
  <TodoList store={ todoStore } />,
  document.getElementById('app')
);





// const todoStore = new TodoStore();

// todoStore.addTodo("read Mobx tutorial");

// todoStore.todos[0].completed = true;

// // console.log(todoStore.report());