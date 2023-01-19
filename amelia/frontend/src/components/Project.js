import React from 'react'

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.project_link}</td>
            <td>{project.project_staff}</td>
        </tr>
    )
}

const ProjectList = ({my_projects}) => {
    return (
        <table>
            <th>ID</th>
            <th>Name</th>
            <th>Project_link</th>
            <th>Project_staff</th>
            {my_projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}
export default ProjectList