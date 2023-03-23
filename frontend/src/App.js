import { Login } from "@mui/icons-material";
import { BrowserRouter,
  Navigate,
  Routes, Route
} from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import SignUpPage from "./scenes/signUpPage";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="App">
      <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route exact path="/" element={<LoginPage/>}></Route>
            <Route exact path="/signup" element={<SignUpPage/>}></Route>
            <Route path="/home" element={isAuth ? <HomePage/> : <Navigate to="/"/>}></Route>


          </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
