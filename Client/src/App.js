import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'rsuite/dist/rsuite.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.css';
import 'boxicons/css/boxicons.css';
import './App.css';
import './utilities.css';
import 'react-toastify/dist/ReactToastify.css';


import Home from './pages/Home';
import Login from './pages/Login';

import Tags from './pages/Tags/Tags';
import TagsAdd from './pages/Tags/TagsAdd';
import TagsEdit from './pages/Tags/TagsEdit';
import TagsView from './pages/Tags/TagsView';

import Plan from './pages/Plan/Plan';
import PlanAdd from './pages/Plan/PlanAdd';
import PlanEdit from './pages/Plan/PlanEdit';
import PlanView from './pages/Plan/PlanView';

import Exercises from './pages/Exercises/Exercises';
import ExercisesAdd from './pages/Exercises/ExercisesAdd';
import ExercisesEdit from './pages/Exercises/ExercisesEdit';
import ExercisesView from './pages/Exercises/ExercisesView';

import PlanLevels from './pages/PlanLevels/PlanLevels';
import PlanLevelsAdd from './pages/PlanLevels/PlanLevelsAdd';
import PlanLevelsEdit from './pages/PlanLevels/PlanLevelsEdit';
import PlanLevelsView from './pages/PlanLevels/PlanLevelsView';

import Languages from './pages/Languages/Languages';
import LanguagesAdd from './pages/Languages/LanguagesAdd';
import LanguagesEdit from './pages/Languages/LanguagesEdit';
import LanguagesView from './pages/Languages/LanguagesView';

import Configuration from './pages/Configuration/Configuration';

import Categories from './pages/Categories/Categories';
import CategoriesAdd from './pages/Categories/CategoriesAdd';
import CategoriesEdit from './pages/Categories/CategoriesEdit';
import CategoriesView from './pages/Categories/CategoriesView';

import Sounds from './pages/Sounds/Sounds';
import SoundsAdd from './pages/Sounds/SoundsAdd';
import SoundsEdit from './pages/Sounds/SoundsEdit';
import SoundsView from './pages/Sounds/SoundsView';

import PosesLists from './pages/PosesLists/PosesLists';
import PosesListsAdd from './pages/PosesLists/PosesListsAdd';
import PosesListsEdit from './pages/PosesLists/PosesListsEdit';
import PosesListsView from './pages/PosesLists/PosesListsView';

import UserData from './pages/UserData/UserData';
import UserDataView from './pages/UserData/UserDataView';
import Error from './pages/Error/Error';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import ChangePassword from './pages/ChangePassword';
import Success from './pages/Success';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_LINK
  const ProtectedRoute = ({ redirectPath = "/" }) => {
    if (!Cookies.get('jwt-Somiya')) {
      return <Navigate to={redirectPath} replace />
    }
    else {
      axios.defaults.headers.Authorization = `Bearer ${Cookies.get('jwt-Somiya')}`
      return <Outlet />;
    }
  }
  return (
    <>
      <ToastContainer position='bottom-right' autoClose="500" closeOnClick="true" />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>

            <Route path="/Home" element={<Home />} />

            <Route path="/Tags" element={<Tags />} />
            <Route path="/Tags/Add" element={<TagsAdd />} />
            <Route path="/Tags/Edit/:id" element={<TagsEdit />} />
            <Route path="/Tags/View/:id" element={<TagsView />} />

            <Route path="/Plan" element={<Plan />} />
            <Route path="/Plan/Add" element={<PlanAdd />} />
            <Route path="/Plan/Edit/:id" element={<PlanEdit />} />
            <Route path="/Plan/View/:id" element={<PlanView />} />

            <Route path="/Exercises" element={<Exercises />} />
            <Route path="/Exercises/Add" element={<ExercisesAdd />} />
            <Route path="/Exercises/Edit/:id" element={<ExercisesEdit />} />
            <Route path="/Exercises/View/:id" element={<ExercisesView />} />

            <Route path="/PlanLevels" element={<PlanLevels />} />
            <Route path="/PlanLevels/Add" element={<PlanLevelsAdd />} />
            <Route path="/PlanLevels/Edit/:id" element={<PlanLevelsEdit />} />
            <Route path="/PlanLevels/View/:id" element={<PlanLevelsView />} />

            <Route path="/Languages" element={<Languages />} />
            <Route path="/Languages/Add" element={<LanguagesAdd />} />
            <Route path="/Languages/Edit/:id" element={<LanguagesEdit />} />
            <Route path="/Languages/View/:id" element={<LanguagesView />} />

            <Route path="/Configuration" element={<Configuration />} />

            <Route path="/Categories" element={<Categories />} />
            <Route path="/Categories/Add" element={<CategoriesAdd />} />
            <Route path="/Categories/Edit/:id" element={<CategoriesEdit />} />
            <Route path="/Categories/View/:id" element={<CategoriesView />} />

            <Route path="/Sounds" element={<Sounds />} />
            <Route path="/Sounds/Add" element={<SoundsAdd />} />
            <Route path="/Sounds/Edit/:id" element={<SoundsEdit />} />
            <Route path="/Sounds/View/:id" element={<SoundsView />} />

            <Route path="/PosesLists" element={<PosesLists />} />
            <Route path="/PosesLists/Add" element={<PosesListsAdd />} />
            <Route path="/PosesLists/Edit/:id" element={<PosesListsEdit />} />
            <Route path="/PosesLists/View/:id" element={<PosesListsView />} />

            <Route path="/UserData" element={<UserData />} />
            <Route path="/UserData/View/:id" element={<UserDataView />} />


          </Route>

          <Route path='*' element={<Error />} />
          <Route path="/" element={Cookies.get('jwt-Somiya') !== undefined ? <Navigate to="/Home" /> : <Login />} />

          <Route path="/change_password/:id" element={<ChangePassword />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
