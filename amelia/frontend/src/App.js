import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        'authors': []
        }
    }

    componentDidMount() {
        const authors = [
            {
                'first_name': 'Амелия',
                'last_name': 'Сучкова',
                'birthday_year': 2018
            },
            {
                'first_name': 'Варвара',
                'last_name': 'Сучкова',
                'birthday_year': 2021
            },
        ]
        this.setState(
            {
                'authors': authors
            }
        )
    }

    render () {
        return (
            <div>
                <AuthorList authors={this.state.authors} />
            </div>
        )
    }

}
export default App;
