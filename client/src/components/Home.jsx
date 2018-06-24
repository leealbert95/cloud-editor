import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import FileCard from './FileCard.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    }
  }

  componentDidMount() {
    axios.get(`/repos/${this.props.user}`)
      .then((res) => {
        this.setState({
          files: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  render() {
    console.log(this.state.files);
    return ( 
      <div id="home">
        {this.state.files.map((file) => 
          <FileCard {...file}/>
        )}
      </div>
    )
  }
}

export default Home;