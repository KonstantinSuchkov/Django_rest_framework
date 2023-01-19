import React from 'react'

const TodoItem = ({todos}) => {
    return (
        <tr>
            <td>{todos.id}</td>
            <td>{todos.text}</td>
            <td>{todos.created_at}</td>
            <td>{todos.updated_at}</td>
            <td>{todos.mark_done}</td>
            <td>{todos.project_name}</td>
            <td>{todos.author}</td>


        </tr>
    )
}

const TodoList = ({my_todo}) => {
    return (
        <table>
            <th>ID</th>
            <th>text</th>
            <th>created_at</th>
            <th>updated_at</th>
            <th>mark_done</th>
            <th>project_name</th>
            <th>author</th>
            {my_todo.map((todos) => <TodoItem todos={todos} />)}
        </table>
    )
}
export default TodoList