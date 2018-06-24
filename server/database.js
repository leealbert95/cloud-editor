const AWS = require('aws-sdk');
const BPromise = require('bluebird');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const S3 = new AWS.S3();

const writeFileAsync = BPromise.promisify(fs.writeFile);
// const S3UploadAsync = Promise.promisify(S3.upload);
const S3UploadAsync = (params) => {
  return new Promise((resolve, reject) => {
    S3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
}


mongoose.connect('mongodb://localhost/cloud-editor-test');

const Schema = mongoose.Schema;

var fileSchema = new Schema({
  name: String,
  author: String,
  fileUrl: String,
  extension: String,
  createdAt: Date,
})

var File = mongoose.model('File', fileSchema);

const save = (data, cb) => {
  const { name, author, extension, text } = data;
  console.log(data);
  const filename = `${name}${extension}`;
  let createdAt = null;
  var fileUrl = '';
  var tmpFileDir = path.join(__dirname, `/tmp/upload/${author}-${filename}`);
  File.find({ name: name, author: author, extension: extension }).exec()
    .then((files) => {
      if (files.length > 0) {
        let result = {
          filename: filename,
          exists: true
        }
        cb(null, result);
        throw new Error('break'); // Break promise chain
      } else {
        return writeFileAsync(tmpFileDir, text);
      }
    })
    .then(() => {
      let rstream = fs.createReadStream(tmpFileDir);
      let params = { Bucket: 'cloudhost-test', Key: `${author}/${filename}`, Body: rstream }

      rstream.on('error', function(err) {
        console.log(err)
      });
      return S3UploadAsync(params);
    })
    .then((data) => {
      fs.unlink(tmpFileDir);
      let fileUrl = data.Location;
      console.log('uploaded to S3')
      createdAt = new Date();
      let newFile = new File({
        name: name,
        author: author,
        fileUrl: fileUrl,
        extension: extension,
        createdAt: createdAt
      });
      return newFile.save()
    })
    .then(() => {
      cb(null, {
        filename: filename,
        createdAt: createdAt
      })
    })
    .catch((err) => {
      console.log(err)
      err.message === 'break' ? null : cb(err);
    })
};

const fetch = (user, cb) => {
  File.find({author: user}).exec()
    .then((files) => {
      cb(null, files);
    })
    .catch((err) => {
      cb(err, null)
    })
}

const download = () => {
  
}


module.exports = {
  save: save,
  fetch: fetch,
  download: download
}