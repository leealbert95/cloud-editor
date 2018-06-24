import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      user: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.user);
  }

  render() {
    return (
      <div id="signin">
        <div className="container">
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="form-box col-sm-6">
              <div className="logo-container">
                <img src="https://s3.amazonaws.com/cloudhost-static/cloud-logo.svg"
                    height="200px" width="200px"
                  />
              </div>
              <div className="title"><h1>Cloud Editor</h1></div>              
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label className="user-label" htmlFor="user">Username:</label>
                  <input type="text" 
                  id="user"
                  className="form-control"
                  placeholder="Enter username here"
                  value={this.state.value} 
                  onChange={this.onChange}/>
                </div>
                <div className="form-group">
                  <input type="submit" 
                  className="btn btn-default"
                  value="Sign In"/>
                </div>
              </form>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;