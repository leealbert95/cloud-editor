import React from 'react';

const FileCard = (props) => (
  <div>
    {`${props.name}${props.extension}`}
  </div>
);

export default FileCard;