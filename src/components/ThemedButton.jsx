import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const ThemedButton = () => {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Theme: {theme}</button>;
};

export default ThemedButton;
