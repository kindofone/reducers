import logo from './logo.svg';
import './App.css';

import {useReducer, useState} from 'react';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  MARK_COMPLETE: 'mark-complete',
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          complete: false,
          text: action.payload.text,
        }],
      };

    case ACTIONS.MARK_COMPLETE:
      return {
        ...state,
        todos: state.todos.map(
          todo => todo.id === action.payload.id 
          ? {...todo, complete: true}
          : todo
        ),
      };

    default:
      return state;
  }
}

function App() {
  const [text, setText] = useState('');
  const [state, dispatch] = useReducer(reducer, {
    todos: []
  });
  const {todos} = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.ADD_TODO, 
      payload: {text},
    });
    setText('');
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}></input>
      </form>
      <ul>
        {todos.map(props => <Todo dispatch={dispatch} {...props} />)}
      </ul>
    </div>
  );
}

function Todo({id, complete, text, dispatch}) {
  return (
    <li style={complete ? {'text-decoration': 'line-through'} : {}}>
      <a style={complete ? {'display': 'none'} : {}} href="#" onClick={
        () => dispatch({
          type: ACTIONS.MARK_COMPLETE, 
          payload: {id},
        })
      }>Mark Complete</a> {text}
    </li>
  );
}

export default App;
