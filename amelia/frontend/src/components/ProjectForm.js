import React from 'react'


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', project_link: '', project_staff: props.authors[0]?.id}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value,
                [event.target.project_link]: event.target.value
            }
            );
    }

    handleSubmit(event) {
        console.log(this.state.project_staff)
        this.state.project_staff = [this.state.project_staff]
        console.log(this.state.project_staff)
        this.props.createProject(this.state.name, this.state.project_link, this.state.project_staff)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>

                <div className="form-group">
                    <label htmlFor="name">name</label>
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="project_link">project_link</label>
                        <input type="text" className="form-control" name="project_link" value={this.state.project_link} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="project_staff">project_staff</label>
                    <select name="project_staff" className='form-control' onChange={(event)=>this.handleChange(event)}>{this.props.authors.map((item)=><option value={item.id}>{item.username}</option>)}
                    </select>
                </div>
            <input type="submit" className="btn btn-primary" value="Save Project" />
        </form>
        );
    }
    }

export default ProjectForm
