import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, BrowserRouter, Route, Switch } from 'react-router-dom';
import TextEditor from './components/TextEditor.jsx';
import Navbar from './components/Navbar.jsx';
import SignIn from './components/SignIn.jsx';
import Home from './components/Home.jsx';
import UserRepo from './components/UserRepo.jsx';
import Users from './components/Users.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
    this.setUsername = this.setUsername.bind(this);
  }

  setUsername(username) {
    this.setState({
      user: username
    })
  }

  render () {
    const { user } = this.state 
    return (
      <div>
        {user ? <Navbar user={user}/> : null}
        <div id="content" className={`${user ? "shift" : null}`}>
          <Switch>
            <Route exact path="/" render={() => 
              user ? <Home user={user}/> : <SignIn onSubmit={this.setUsername}/>}/>
            <Route path="/edit/:user/:filename" render={(props) => <TextEditor {...props} readOnly={false}/>}/>
            <Route path="/read/:user/:filename" render={(props) => <TextEditor {...props} readOnly={true}/>}/>
            <Route exact path="/users" render={() => <Users readOnly={false}/>}/>
            <Route path="/users/:user" render={() => <UserRepo readOnly={false}/>}/>
          </Switch>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter history={browserHistory}>
    <App/>
  </BrowserRouter>, 
  document.getElementById('app')
);