import { useNavigate } from "react-router-dom";
import { logOut } from "../api/api";

export const useAuthRedirect = () => {
    const navigate = useNavigate();

    const redirectAfterLogin = (isSuccessful: boolean) => {
        if (isSuccessful) {
            navigate("/search");
        } else {
            // Optional: Handle login failure
            navigate("/");
        }
    };

    // Handle logout: clear user session and redirect to login page
    const handleLogout = async () => {
        const response = await logOut();
        console.log(response);
        localStorage.removeItem("user");
        navigate("/");
    };

    return { redirectAfterLogin, handleLogout };
};


