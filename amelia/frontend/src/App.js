import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import axios from 'axios'
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/Auth.js'
import Cookies from 'universal-cookie';


const hello_name = localStorage.getItem('name_for_greeting')

const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'projects': [],
            'authors': [],
            'todos': [],
            'token': '',
            'greeting': '',
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        localStorage.clear()
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
        .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
            let headers = {
                'Content-Type': 'application/json'
            }
        if (this.is_authenticated())
            {
                headers['Authorization'] = 'Token ' + this.state.token
            }
            return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                console.log('response.data PROJECTS')
                console.log(response.data)
                    this.setState({'projects': response.data.results}
            )
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
            })

        axios.get('http://127.0.0.1:8000/api/authors/', {headers})
            .then(response => {
                console.log('response.data AUTHORS')
                console.log(response.data)
                    this.setState({'authors': response.data.results}
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                console.log('response.data TODO')
                console.log(response.data)
                    this.setState({'todos': response.data.results}
            )
        }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render () {
        return (
            <div className="App">
                <BrowserRouter>
                <nav>
                <ul>
                <div>
                Hello {hello_name}! {this.is_authenticated() ? <button onClick={()=>this.logout()}>Выйти</button> : <Link to='/login'>Войти</Link>}
                </div>
                <div>

                                </div>
                <li>
                <Link to='/'>Authors</Link>
                </li>
                <li>
                <Link to='/projects'>projects</Link>
                </li>
                <li>
                <Link to='/todo'>todo</Link>
                </li>
                <li>
                {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                </li>
                </ul>
                </nav>
                <Switch>
                        <Route exact path='/' component={() => <AuthorList test={this.state.authors} />} />
                        <Route exact path='/projects' component={() => <ProjectList my_projects={this.state.projects} />} />
                        <Route exact path='/todo' component={() => <TodoList my_todo={this.state.todos} />} />
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                      <Route path="/author/:id">
                        <ProjectList items={this.state.project_staff} />
                    </Route>
                    <Redirect from='/authors' to='/' />
                    <Route component={NotFound404} />
                </Switch>
                </BrowserRouter>
            </div>

        )
    }

}

export default App


