import React from 'react';
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Task from './pages/Task'
import TaskForm from './pages/TaskForm'

const routes = () => {
  return (
      <Routes>
          <Route path='/' element= { <Home /> }/>
          <Route path='/task' element={ <Task /> }/>
          <Route path='/task/add' element={ <TaskForm />} />
      </Routes>
  );
};

export default routes;
