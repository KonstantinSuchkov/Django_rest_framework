import React from 'react'
import {Link} from 'react-router-dom'

const MissionItem = ({mission, deleteMission}) => {
    return (
        <tr>
            <td>{mission.id}</td>
            <td>{mission.text}</td>
            <td>{mission.mark_done}</td>
            <td>{mission.project_name}</td>
            <td>{mission.author}</td>
            <td><button onClick={()=> deleteMission(mission.id)} type='button'>Delete Mission</button></td>
        </tr>
    )
}

const MissionList = ({missions, deleteMission}) => {
    return (
        <div>
        <table>
            <tr>
                <th>ID</th>
                <th>Text</th>
                <th>Done</th>
                <th>Project</th>
                <th>Author</th>
                <th></th>
            </tr>
            {missions.map((mission) => <MissionItem mission={mission} deleteMission={deleteMission} />)}
        </table>
        <Link to='/missions/create'>Create Mission</Link>
        </div>
    )
}
export default MissionList