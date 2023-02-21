import React from 'react'


class MissionForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {id: '', text: '', mark_done: 0, project_name: props.projects[0]?.id, author: props.authors[0]?.id}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.id]: event.target.value,
                [event.target.name]: event.target.value,
                [event.target.mark_done]: event.target.value,
            }
            );
    }

    handleSubmit(event) {
        console.log(this.props)
        this.props.createMission(this.state.id, this.state.text, this.state.mark_done, this.state.project_name, this.state.author)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>

                <div className="form-group">
                    <label htmlFor="id">id</label> <input type="number" className="form-control" name="id" value={this.state.id} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="text">text</label> <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="mark_done">mark_done</label>
                        <input type="number" className="form-control" name="mark_done" value={this.state.mark_done} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="project_name">project_name</label>
                    <select name="project_name" className='form-control' onChange={(event)=>this.handleChange(event)}>{this.props.projects.map((project)=><option value={project.id}>{project.name}</option>)}
                </select>
                </div>
                <div className="form-group">
                    <label htmlFor="author">author</label>
                    <select name="author" className='form-control' onChange={(event)=>this.handleChange(event)}>{this.props.authors.map((item)=><option value={item.id}>{item.username}</option>)}
                </select>
                </div>
            <input type="submit" className="btn btn-primary" value="Save Mission" />
        </form>
        );
    }
    }

export default MissionForm