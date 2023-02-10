import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {id: props.todo, text: 'text', mark_done: '', project_name: props.projects[0]?.name, author: props.authors[0]?.id}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.id]: event.target.value,
                [event.target.text]: event.target.value,
                [event.target.mark_done]: event.target.value
            }
            );
    }

    handleSubmit(event) {
        console.log(this.state.id)
        console.log(this.state.text)
        console.log(this.state.mark_done)
        console.log(this.state.project_name)
        console.log(this.state.author)
        this.props.createTodo(this.state.id, this.state.text, this.state.mark_done, this.state.project_name, this.state.author)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="text">text</label>
                        <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="name">id</label>
                        <input type="number" className="form-control" name="id" value={this.state.id} onChange={(event)=>this.handleChange(event)} />
                </div>
            <input type="submit" className="btn btn-primary" value="Save Test" />
            </form>
            );
        }
    }

export default TodoForm