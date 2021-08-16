import React, { useRef, useCallback, useReducer } from 'react'
import TodoTemplate from './TodoTemplate';
import TodoList from './TodoList';
import TodoInsert from './TodoInsert';
import TodoRemoveAll from './TodoRemoveAll';

const INSERT = 'INSERT';
const REMOVE = 'REMOVE';
const TOGGLE = 'TOGGLE';
const REMOVE_ALL = 'REMOVE_ALL';
const EXAM_COUNT = 1;

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= EXAM_COUNT; i++) {
    array.push({
      id: i,
      text: `할 일${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case INSERT: // 새로 추가
      // {type: 'INSERT', todo:{id: 1, text:'todo', checked: false}}
      return todos.concat(action.todo);
    case REMOVE: // 제거
      // {type: 'REMOVE', id: 1}
      return todos.filter(todo => todo.id !== action.id);
    case TOGGLE: // 토글
      // {type:'TOGGLE', id: 1}
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
      );
    case REMOVE_ALL:
      return todos = [];
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(EXAM_COUNT + 1);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch({ type: INSERT, todo })
      nextId.current += 1; // nextId 1씩 더하기 
    },
    []
  )

  const onRemove = useCallback(
    id => {
      dispatch({ type: REMOVE, id })
    },
    []
  );

  const onRemoveAll = useCallback(
    id => {
      dispatch({ type: REMOVE_ALL, id })
    },
    []
  );

  const onToggle = useCallback(
    id => {
      dispatch({ type: TOGGLE, id });
    }, []
  )

  return (
    <>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        <TodoRemoveAll onRemoveAll={onRemoveAll} />
      </TodoTemplate>
    </>
  )
}

export default App;