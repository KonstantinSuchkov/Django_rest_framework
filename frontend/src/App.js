import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'
import TestList from './components/Test.js'
import TestForm from './components/TestForm.js'
import ProjectList from './components/Project.js'
import ProjectForm from './components/ProjectForm.js'
import MissionForm from './components/MissionForm.js'
import MissionList from './components/Mission.js'
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
            'missions': [],
            'tests': [],
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
        console.log('LOGOUT!!!!!!!!!!!!')
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

    deleteMytest(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/test/${id}`, {headers})
            .then(response => {
                this.setState({tests: this.state.tests.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((project)=>project.id !== id)})
            }).catch(error => console.log(error))
    }

    deleteMission(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers})
            .then(response => {
                this.setState({missions: this.state.missions.filter((mission)=>mission.id !== id)})
            }).catch(error => console.log(error))
    }

    createTest(name) {
        const headers = this.get_headers()
        const data = {name: name}
        axios.post('http://127.0.0.1:8000/api/test/', data, {headers})
            .then(response => {
                let new_test = response.data
                const name = this.state.authors.filter((item) => item.id === new_test.name)
                new_test.name = name
                this.setState({tests: [...this.state.tests, new_test]})
            }).catch(error => console.log(error))
    }

    createMission(id, text, mark_done, project_name, author) {
        const headers = this.get_headers()
        const data = {id: id, text: text, mark_done: mark_done, project_name: project_name, author: author}
        axios.post('http://127.0.0.1:8000/api/todo/', data, {headers, headers})
            .then(response => {
                let new_mission = response.data
                console.log(new_mission)
                const author = this.state.authors.filter((item) => item.id === new_mission.author)[0]
                new_mission.author = author
                this.setState({missions: [...this.state.missions, new_mission]})
            }).catch(error => console.log(error))
    }

    createProject(name, project_link, project_staff) {
        const headers = this.get_headers()
        const data = {name: name, project_link: project_link, project_staff: project_staff}
        axios.post('http://127.0.0.1:8000/api/projects/', data, {headers, headers})
            .then(response => {
                let new_project = response.data
                console.log(new_project)
                const project_staff = this.state.authors.filter((item) => item.id === new_project.project_staff)[0]
                new_project.project_staff = project_staff
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
    }


    load_data() {
        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/test/', {headers})
            .then(response => {
                    this.setState({'tests': response.data}
            )
            }).catch(error => {
                console.log(error)
                this.setState({tests: []})
            })

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                    this.setState({'projects': response.data}
            )
            console.log(response.data)
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
            })

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                    this.setState({'missions': response.data}
            )
            console.log(response.data)
            }).catch(error => {
                console.log(error)
                this.setState({missions: []})
            })

        axios.get('http://127.0.0.1:8000/api/authors/', {headers})
            .then(response => {
                    this.setState({'authors': response.data}
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
                Hello {hello_name}! {this.is_authenticated() ? <button onClick={()=>this.logout()}>Выйти/login</button> : <Link to='/login'>Войти/login</Link>}
                </div>
                <li>
                <Link to='/test'>test</Link>
                </li>
                <li>
                <Link to='/'>Authors</Link>
                </li>
                <li>
                <Link to='/projects'>projects</Link>
                </li>
                <li>
                <Link to='/missions'>missions</Link>
                </li>
                </ul>
                </nav>
                <Switch>
                    <Route exact path='/' component={() => <AuthorList authors={this.state.authors} />} />
                    <Route exact path='/test' component={() => <TestList tests={this.state.tests} deleteMytest={(id)=>this.deleteMytest(id)}/>} />
                    <Route exact path='/test/create' component={() => <TestForm createTest={(name) => this.createTest(name)}/>}/>
                    <Route exact path='/projects/create' component={() => <ProjectForm authors={this.state.authors} createProject={(name, project_link, project_staff) => this.createProject(name, project_link, project_staff)}/>}/>
                    <Route exact path='/projects' component={() => <ProjectList my_projects={this.state.projects} deleteProject={(id)=>this.deleteProject(id)} />} />
                    <Route exact path='/missions/create' component={() => <MissionForm authors={this.state.authors} projects={this.state.projects} createMission={(id, text, mark_done, project_name, author) => this.createMission(id, text, mark_done, project_name, author)}/>}/>
                    <Route exact path='/missions' component={() => <MissionList missions={this.state.missions} deleteMission={(id)=>this.deleteMission(id)} />} />
                    <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                    <Route path="/authors/:id">
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


