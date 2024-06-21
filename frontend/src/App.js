import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import myDashboard from './components/Dashboard';

import CreateWorkout from './components/Workouts/CreateWorkout';
import CalendarWorkouts from './components/Workouts/CalendarWorkouts';
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
import Login from './components/Auth/Login';
import AuthRoute from './components/Auth/AuthRoute';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import NewPassword from './components/Auth/NewPassword';
import InternalServerError from './components/Extra/InternalServerError';
import PageNotFound from './components/Extra/PageNotFound';
import modalAndAlerts from './components/Extra/modalAndAlerts';
import UserDetail from './components/Users/UserDetail';
import Calendar from './components/Calendar';
import { UserProvider } from './contexts/UserContext';
import ContactUs from './components/ContactUs';
import Profile from './components/Profile';
import UpdateBasicInfo from './components/Users/BasicInfo';
import ProfilePage from './components/ProfilePage';
import MyDashboard from './components/Dashboard';
import SearchPage from './components/search';
import GalleryComponent from './components/gallery';
import ProfileAll from './components/ProfileAll';

const Workouts = () => {
  return (
    <Routes>
      <Route path="/" element={<WorkoutList />} />
      <Route path="/create" element={<CreateWorkout />} />
      <Route path="/CalendarWorkouts" element={<CalendarWorkouts />} />
      <Route path="/update/:id" element={<UpdateWorkout />} />
      <Route path="/delete/:id" element={<DeleteWorkout />} />
      <Route path="*" element={<PageNotFound />} />
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
      <Route path="*" element={<PageNotFound />} />
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
      <Route path="*" element={<PageNotFound />} />
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
      <Route path="*" element={<PageNotFound />} />
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
      <Route path="*" element={<PageNotFound />} />
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
      <Route path="/:userId" component={UserDetail} />
      <Route path='/basic-info' element={<UpdateBasicInfo />}></Route>
      <Route path="*" element={<PageNotFound />} />
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
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

const Auth = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <>
    <UserProvider>
        <Routes>
          <Route path='/' element={<AuthRoute />}></Route>
          <Route path='/gallery' element={<GalleryComponent />}></Route>
          <Route path='/search' element={<SearchPage />}></Route>
          <Route path='/MyDashboard' element={<MyDashboard />}></Route>
          <Route path='/Calendar' element={<Calendar />}></Route>
          <Route path='/ProfilePage' element={<ProfilePage />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path="/profile/:userId" element={<ProfileAll />} />
          <Route path='/contact' element={<ContactUs />}></Route>
          <Route path='/modalAndAlerts' element={<modalAndAlerts />}></Route>
          <Route path='/500' element={<InternalServerError />}></Route>
          <Route path='/404' element={<PageNotFound />}></Route>
          <Route path='/auth/*' element={<Auth />}></Route>
          <Route path="/dashboard" element={<myDashboard />} />
          <Route path="/workouts/*" element={<Workouts />} />
          <Route path="/progress/*" element={<Progress />} />
          <Route path="/nutrition/*" element={<Nutritions />} />
          <Route path="/notifications/*" element={<Notifications />} />
          <Route path="/supports/*" element={<Supports />} />
          <Route path="/users/*" element={<Users />} />
          <Route path="/preferences/*" element={<Preferences />} />
          {/* 404 Route */}
        <Route path="*" element={<PageNotFound />} />
        </Routes>
        </UserProvider>
    </>
  );
}

export default App;
