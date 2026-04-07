import {Route, Routes} from "react-router-dom";
import LayoutPage from "./app/LayoutPage";
import AuthDemoFlow from "./components/AuthDemoFlow";

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LayoutPage />} />
            <Route path="/login" element={<AuthDemoFlow/>} />
        </Routes>
    );
};
