import React from 'react';
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Task from './pages/Task'
import TaskForm from './pages/TaskForm'
import Detail from './pages/Detail'
import Login from './pages/Login';

const routes = () => {
  return (
      <Routes>
          <Route path='/' element= { <Home /> }/>
          <Route path='/task' element={ <Task /> }/>
          <Route path='/task/add' element={ <TaskForm />} />
          <Route path='/task/edit/:id' element={ <TaskForm />} />
          <Route path='/task/:id' element={ <Detail />} />
          <Route path='/login' element={ <Login />} />
      </Routes>
  );
};

export default routes;
