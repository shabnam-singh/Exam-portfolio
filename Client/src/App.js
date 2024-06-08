import './App.css';
import Adminlogin from './component/Adminlogin';
import Home from './component/Home';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Userlogin from './component/Userlogin';
import Adash from './component/Adash';
import Udash from './component/Udash';
import Subjects from './component/Subjects';
import Aupdates from './component/Aupdates';
import Studentlist from './component/Studentlist';
import Questions from './component/Questions'
import AddUser from './component/AddUser';
import AssignTest from './component/AssignTest'
import Result from './component/Result';
import ExamScreen from './component/ExamScreen';


function App() {
  return (
    <>
     <Router>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="adminlogin" element={<Adminlogin/>}></Route>
        <Route path="userlogin" element={<Userlogin/>}></Route>  
        <Route path="adash" element={<Adash/>}></Route>  
        <Route path="udash" element={<Udash/>}></Route>
        <Route path="/subjects" element={<Subjects/>}></Route>
        <Route path="/aupdates" element={<Aupdates/>}></Route>
        <Route path="/studentlist" element={<Studentlist/>}></Route>
        <Route path="/Questions" element={<Questions/>}></Route>

        <Route path="/add-user" element={<AddUser />} />
        <Route path="/assign-test" element={<AssignTest />} />
        <Route path="/result" element={<Result />} />

        <Route path="/exam-screen" element={<ExamScreen />} />







      </Routes>
      
     </Router>
    </>
  );
}

export default App;
