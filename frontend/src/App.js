import logo from './logo.svg';
import './App.css';
import Dashboard from './pages/dashboard';
import { Routes, Route } from 'react-router-dom';

import CreateWorkout from './components/Workouts/CreateWorkout';
import WorkoutList from './components/Workouts/WorkoutList';
import UpdateWorkout from './components/Workouts/UpdateWorkout';
import DeleteWorkout from './components/Workouts/DeleteWorkout';

import CreateProgress from './components/Progress/CreateProgress';
import ProgressList from './components/Progress/ProgressList';
import UpdateProgress from './components/Progress/UpdateProgress';
import DeleteProgress from './components/Progress/DeleteProgress';

import CreateNutrition from './components/Nutritions/CreateNutrition';
import NutritionList from './components/Nutritions/NutritionList';
import UpdateNutrition from './components/Nutritions/UpdateNutrition';
import DeleteNutrition from './components/Nutritions/DeleteNutrition';

import CreateNotification from './components/Notifications/CreateNotification';
import NotificationList from './components/Notifications/NotificationList';
import UpdateNotification from './components/Notifications/UpdateNotification';
import DeleteNotification from './components/Notifications/DeleteNotification';

import CreateSupport from './components/Support/CreateSupport';
import SupportList from './components/Support/SupportList';
import UpdateSupport from './components/Support/UpdateSupport';
import DeleteSupport from './components/Support/DeleteSupport';

import CreateUser from './components/Users/CreateUser';
import UserList from './components/Users/UserList';
import UpdateUser from './components/Users/UpdateUser';
import DeleteUser from './components/Users/DeleteUser';

import CreatePreference from './components/Preferences/CreatePreference';
import PreferenceList from './components/Preferences/PreferenceList';
import UpdatePreference from './components/Preferences/UpdatePreference';
import DeletePreference from './components/Preferences/DeletePreference';

const Workouts = () => {
  return (
    <Routes>
      <Route path="/" element={<WorkoutList />} />
      <Route path="/create" element={<CreateWorkout />} />
      <Route path="/update/:id" element={<UpdateWorkout />} />
      <Route path="/delete/:id" element={<DeleteWorkout />} />
    </Routes>
  );
};

const Progress = () => {
  return (
    <Routes>
      <Route path="/" element={<ProgressList />} />
      <Route path="/create" element={<CreateProgress />} />
      <Route path="/update/:id" element={<UpdateProgress />} />
      <Route path="/delete/:id" element={<DeleteProgress />} />
    </Routes>
  );
};

const Nutritions = () => {
  return (
    <Routes>
      <Route path="/" element={<NutritionList />} />
      <Route path="/create" element={<CreateNutrition />} />
      <Route path="/update/:id" element={<UpdateNutrition />} />
      <Route path="/delete/:id" element={<DeleteNutrition />} />
    </Routes>
  );
};

const Notifications = () => {
  return (
    <Routes>
      <Route path="/" element={<NotificationList />} />
      <Route path="/create" element={<CreateNotification />} />
      <Route path="/update/:id" element={<UpdateNotification />} />
      <Route path="/delete/:id" element={<DeleteNotification />} />
    </Routes>
  );
};

const Supports = () => {
  return (
    <Routes>
      <Route path="/" element={<SupportList />} />
      <Route path="/create" element={<CreateSupport />} />
      <Route path="/update/:id" element={<UpdateSupport />} />
      <Route path="/delete/:id" element={<DeleteSupport />} />
    </Routes>
  );
};

const Users = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/create" element={<CreateUser />} />
      <Route path="/update/:id" element={<UpdateUser />} />
      <Route path="/delete/:id" element={<DeleteUser />} />
    </Routes>
  );
};

const Preferences = () => {
  return (
    <Routes>
      <Route path="/" element={<PreferenceList />} />
      <Route path="/create" element={<CreatePreference />} />
      <Route path="/update/:id" element={<UpdatePreference />} />
      <Route path="/delete/:id" element={<DeletePreference />} />
    </Routes>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path="/workouts/*" element={<Workouts />} />
        <Route path="/progress/*" element={<Progress />} />
        <Route path="/nutrition/*" element={<Nutritions />} />
        <Route path="/notifications/*" element={<Notifications />} />
        <Route path="/supports/*" element={<Supports />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="/preferences/*" element={<Preferences />} />
      </Routes>
    </>
  );
}

export default App;
