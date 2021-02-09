import React, { useState, useEffect } from 'react';
import ReactJson from 'react-json-view';

function RJV_2(props) {
  const onEdit = edit => props.setData(edit.updated_src);
  const onAdd = add => props.setData(add.updated_src);
  const onDelete = del => props.etData(del.updated_src);
  return (
    <ReactJson
      src={props.data}
      name={props.rootName}
      theme={props.theme}
      collapsed={props.Component}
      onEdit={onEdit}
      onAdd={onAdd}
      onDelete={onDelete}
      style={{ margin: '8px', padding: '8px' }}
    />
  );
}

function withRJV_2HOC(Component) {
  return ({ src, rootName, theme = 'monokai', collapsed = 2, ...props }) => {
    const [data, setData] = useState(src);

    useEffect(() => {
      setData(src);
    }, [src]);

    const newProps = { ...props, rootName, theme, collapsed, data, setData };

    return <Component {...newProps} />;
  };
}

export default withRJV_2HOC(RJV_2);
