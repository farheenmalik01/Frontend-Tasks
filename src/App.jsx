import React, { useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const App = () => {
  const [count, setCount] = useState(0);
  const prevCountRef = React.useRef();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [effectRuns, setEffectRuns] = React.useState(0);

  const expensiveCalculation = useMemo(() => {
    console.log('Calculating expensive value...');
    return count * 2;
  }, [count]);

  const memoizedCallback = useCallback(() => {
    alert(`Count is ${count}`);
  }, [count]);

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  useEffect(() => {
    console.log('useEffect triggered: updating document title');
    document.title = `Count: ${count}`;
    setEffectRuns(prev => prev + 1);
    return () => {
      console.log('useEffect cleanup if needed');
    };
  }, [count]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>React Hooks Demo</h1>
      <div>
        <strong>useState:</strong> Count is {count}
        <button onClick={() => setCount(count + 1)} style={{ marginLeft: '10px' }}>Increment</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <strong>useEffect:</strong> Document title updates with count (Effect run count: {effectRuns})
      </div>
      <div style={{ marginTop: '20px' }}>
        <strong>useRef:</strong> Previous count value is: {prevCountRef.current}
      </div>
      <div style={{ marginTop: '20px' }}>
        <strong>useMemo:</strong> Expensive calculation result: {expensiveCalculation}
      </div>
      <div style={{ marginTop: '20px' }}>
        <strong>useCallback:</strong> <button onClick={memoizedCallback}>Show Count Alert</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <strong>useReducer:</strong> Count: {state.count}
        <button onClick={() => dispatch({ type: 'increment' })} style={{ marginLeft: '10px' }}>Increment</button>
        <button onClick={() => dispatch({ type: 'decrement' })} style={{ marginLeft: '10px' }}>Decrement</button>
      </div>
    </div>
  );
};

export default App;
