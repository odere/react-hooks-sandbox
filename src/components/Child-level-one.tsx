import React from 'react';

const ChildLevelOne: React.FC = (props) => {
  const { children } = props;

  return (
    <>
      <header>ChildLevelOne</header>
      <div>{children}</div>
    </>
  );
}

export default ChildLevelOne;
