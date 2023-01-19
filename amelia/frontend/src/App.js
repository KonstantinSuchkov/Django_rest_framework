import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import axios from 'axios'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'



class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'projects': [],
            'authors': [],
            'todos': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results
                console.log('response.data PROJECTS')
                console.log(response.data)
                    this.setState(
                    {
                        'projects': projects
                    }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/authors/')
            .then(response => {
                const authors = response.data.results
                console.log('response.data AUTHORS')
                console.log(response.data)
                    this.setState(
                    {
                        'authors': authors
                    }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todo = response.data.results
                console.log('response.data TODO')
                console.log(response.data)
                    this.setState(
                    {
                        'todos': todo
                    }
            )
        }).catch(error => console.log(error))
}

    render () {
        return (
            <div className="App">
                <BrowserRouter>
                        <Route exact path='/' component={() => <AuthorList test={this.state.authors} />} />
                        <Route exact path='/projects' component={() => <ProjectList my_projects={this.state.projects} />} />
                        <Route exact path='/todo' component={() => <TodoList my_todo={this.state.todos} />} />
                </BrowserRouter>
            </div>

        )
    }

}


export default App


