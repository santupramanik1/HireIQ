import {Route, Routes} from "react-router-dom";
import LayoutPage from "./app/LayoutPage";
import LoginModel from "./components/auth/LoginModel";


export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LayoutPage />} />
            <Route path="/login" element={<LoginModel/>} />
        </Routes>
    );
};
