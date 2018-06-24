import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Alert from 'react-s-alert';

import FileExtensions from './FileExtensions.js'; 
const DEFAULT_FILE_TYPE = 'Any';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    const { filename } = this.props.match.params;
    const fileNameArr = filename.split('.');
    const fileExt = fileNameArr[fileNameArr.length-1];
    this.state = { 
      fileExt: FileExtensions.extToName[fileExt] ? fileExt : FileExtensions.extToName[DEFAULT_FILE_TYPE],
      fileFullName: filename || '',
      filename: filename ? filename.split('.')[0] : '',
      text: '',
      tabSize: 2,
      private: false,
    }
    this.setFileExt = this.setFileExt.bind(this);
    this.setFileName = this.setFileName.bind(this);
    this.setTabSize = this.setTabSize.bind(this); 
    this.changeText = this.changeText.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setFileExt(e) {
    this.setState({ fileExt: e.target.value });
  }

  setFileName(e) {
    this.setState({ filename: e.target.value });
  }

  setTabSize(e) {
    this.setState({ tabSize: parseInt(e.target.value)});
  }

  changeText(e) {
    this.setState({ text: e.target.value });
  }

  handleTab(e) {
    if (e.keyCode === 9) {
      e.preventDefault();
      let start = this.textarea.selectionStart;
      let end = this.textarea.selectionEnd;
      let value = e.target.value
      e.target.value = value.substring(0, start) + "\t" + value.substring(end);
      this.textarea.selectionStart = this.textarea.selectionEnd = start+1; 
    }
  }

  onSubmit(e) {
    e.preventDefault(); 
    let { filename, fileExt, text } = this.state;
    filename = filename.trim();
    if (filename === '.'){
      Alert.error('You may not have a period as your file name!');
      return;
    } else if (filename.includes(' ')) {
      Alert.error('You may not have spaces in your file name!');
      return;
    }
    let newDoc = {
      name: filename,
      text: text,
      author: this.props.match.params.user || 'Testy',
      extension: fileExt,
    };
    console.log('Send', newDoc);

    axios.post('/files', newDoc)
    .then((res) => {
      let result = res.data;
      if (result.exists) {
        Alert.warning(`${result.filename} already exists`);
      } else {
        Alert.success(`Saved:  ${result.filename} at ${new Date(result.createdAt).toLocaleString()}`);
      }
    })
    .catch((err) => {
      console.log(err)
      Alert.error('Unable to save file');
    })
  }

  render() {
    console.log(this.state.tabSize)
    return (
    <div>
      <form onSubmit={this.onSubmit}>
        <div>
          <input type="text" value={this.state.filename} 
          placeholder="Name of file" onChange={this.setFileName}/>
          Extension: <select name="extension" onChange={this.setFileExt} 
            defaultValue={this.state.fileExt} size={1}>
            {Object.keys(FileExtensions.nameToExt).map((type) => 
              <option value={FileExtensions.nameToExt[type]}>
                {`${type} ${FileExtensions.nameToExt[type] ? `(${FileExtensions.nameToExt[type]})` : ''}`}
              </option>
            )}
          </select>
          Tab Size: <select name="tab-size" onChange={this.setTabSize} defaultValue={2} size={1}>
            <option value={2}>2</option>
            <option value={4}>4</option>
          </select>
        </div>
        <div> 
          <textarea ref={(textarea) => (this.textarea = textarea)} className="textarea" 
            value={this.state.text} onChange={this.changeText}
            onKeyDown={this.handleTab} style={{tabSize: this.state.tabSize}}rows="30" cols="100"/>
        </div>
        <input type="submit" value="Save"/>
        <Alert position="top-right" effect="slide" timeout={3000}/>
      </form>
    </div>)
  }
}

export default TextEditor;