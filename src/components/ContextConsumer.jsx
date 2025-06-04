import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';

const ContextConsumer = () => {
  const { value } = useContext(MyContext);

  return (
    <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc' }}>
      <strong>ContextConsumer Component:</strong> Context value is: {value}
    </div>
  );
};

export default ContextConsumer;
