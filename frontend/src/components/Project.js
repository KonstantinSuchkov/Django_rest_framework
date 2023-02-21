import React from 'react'
import {Link} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.project_link}</td>
            <td>{project.project_staff}</td>
            <td><button onClick={()=> deleteProject(project.id)} type='button'>Delete Project</button></td>
        </tr>
    )
}

const ProjectList = ({my_projects, deleteProject}) => {
    return (
        <div>
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Project_link</th>
                <th>Project_staff</th>
                <th></th>
            </tr>
            {my_projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
        </table>
        <Link to='/projects/create'>Create Project</Link>
        </div>
    )
}
export default ProjectList