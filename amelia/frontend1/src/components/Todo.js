import React from 'react'
import {Link} from 'react-router-dom'

const TodoItem = ({todos, deleteTodo}) => {
    return (
        <tr>
            <td>{todos.id}</td>
            <td>{todos.text}</td>
            <td>{todos.created_at}</td>
            <td>{todos.updated_at}</td>
            <td>{todos.mark_done}</td>
            <td>{todos.project_name}</td>
            <td>{todos.author}</td>
            <td><button onClick={()=> deleteTodo(todos.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const TodoList = ({my_todo, deleteTodo}) => {
    return (
        <div>
        <table>
            <tr>
                <th>ID</th>
                <th>text</th>
                <th>created_at</th>
                <th>updated_at</th>
                <th>mark_done</th>
                <th>project_name</th>
                <th>author</th>
                <th></th>
            </tr>
            {my_todo.map((todos) => <TodoItem todos={todos} deleteTodo={deleteTodo} />)}
        </table>
        <Link to='/todo/create'>Create todo</Link>
        </div>
    )
}
export default TodoList