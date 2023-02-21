import React from 'react'
import {Link} from 'react-router-dom'

const TestItem = ({item, deleteMytest}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td><button onClick={()=> deleteMytest(item.id)} type='button'>Delete Test</button></td>
        </tr>
    )
}

const TestList = ({tests, deleteMytest}) => {
    return (
        <div>
        <table>
            <th>ID</th>
            <th>name</th>
            {tests.map((item) => <TestItem item={item} deleteMytest={deleteMytest} />)}
        </table>
         <Link to='/test/create'>Create Test</Link>
        </div>
    )
}
export default TestList