import React from 'react';
import './TodoRemoveAll.scss';

const RemoveAll = ({ onRemoveAll }) => {

  return (

    <button className="TodoRemoveAll" onClick={() => onRemoveAll()}>전체 삭제</button>
  );
}

export default RemoveAll;