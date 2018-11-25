import React, { Fragment, useState, useReducer } from 'react';

const initState = []

const todos = (state = initState, action) => {
  switch(action.type){
    case "ADD_TODO":
      return [
        action.data,
        ...state
      ]
    case "REMOVE_TODO":
      return state.filter((item, i) => i !== action.index)
    case "MARK_COMPLETE":
    return state.map((item, i) => {
      if(i === action.index){
        return {
          ...item,
          is_complete: true
        }
      }
      return item
    })
    default:
      return state
  }
}

const App = () => {

  const [todo, setTodo] = useState('')
  const [state, dispatch] = useReducer(todos, initState);

  const onChangeInput = e => {
    setTodo(e.target.value)
  }

  const addTodo = e => {
    e.preventDefault()
    dispatch({
      type: "ADD_TODO",
      data: {
        todo,
        is_complete: false
      }
    }) 
    setTodo('')
  }

  const removeTodo = index => e => {
    e.preventDefault()
    dispatch({
      type: "REMOVE_TODO",
      index
    }) 
  }

  const markComplete = index => e => {
    e.preventDefault()
    dispatch({
      type: "MARK_COMPLETE",
      index
    }) 
  }

  return (
    <div className="container">
      <div className="text-center">{`TODO'S USING REACT HOOKS`}</div>
      <div className="row">
        <div className="col">
          <form onSubmit={addTodo}>
          <label>TODO</label>
          <input
            value={todo}
            onChange={onChangeInput}
            className="form-control"
            type="text"
            />
          </form>
        </div> 
      </div>
      <hr/>
      <h3>TODOS</h3>
      <div className="row">
        <div className="col">
          <ul className="list-group">
            {state.map((item, i) => {
              return (
                <li
                  className={`list-group-item ${i%2 ? `list-group-item-secondary` : ``}`}
                  key={`todo${i}`}>
                  {item.is_complete && <strike>{item.todo}</strike>}
                  {!item.is_complete && item.todo}
                  {!item.is_complete &&
                  <Fragment>
                  <div className="btn-group float-right">
                    <button
                      onClick={markComplete(i)}
                      className="btn btn-xs btn-success">
                        COMPLETE
                      </button>
                    <button
                      onClick={removeTodo(i)}
                      className="btn btn-xs btn-primary">
                        REMOVE
                      </button>
                    </div>
                  </Fragment>}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
