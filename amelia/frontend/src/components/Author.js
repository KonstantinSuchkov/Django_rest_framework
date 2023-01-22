import React from 'react'

const AuthorItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.username}</td>
            <td>{item.email}</td>
        </tr>
    )
}

const AuthorList = ({test}) => {
    return (
        <table>
            <th>ID</th>
            <th>first_name</th>
            <th>last_name</th>
            <th>username</th>
            <th>email</th>
            {test.map((item) => <AuthorItem item={item} />)}
        </table>
    )
}
export default AuthorList
