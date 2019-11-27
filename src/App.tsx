import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { makeStore } from './store/index';
import { EmployeeContainerConnected } from './employees/EmployeeContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={makeStore()}>
      <EmployeeContainerConnected />
      </Provider>
    </div>
  );
}

export default App;
