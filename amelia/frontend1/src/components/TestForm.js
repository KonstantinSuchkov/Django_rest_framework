import React from 'react'


class TestForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: ''}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value,
            }
            );
    }

    handleSubmit(event) {
        this.props.createTest(this.state.name)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                <label for="name">name</label>
                <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
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

export default TestForm