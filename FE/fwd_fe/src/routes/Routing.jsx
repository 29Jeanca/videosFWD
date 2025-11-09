import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from '../auth/pages/LoginPage';


const Routing=()=>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
            </Routes>
        </Router>
    )
}
export default Routing;