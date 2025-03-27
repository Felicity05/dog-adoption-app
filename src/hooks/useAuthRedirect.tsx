import { useNavigate } from "react-router-dom";
import { logOut } from "../api/api";
import { useFiltersStore } from "../store/filtersStore";

export const useAuthRedirect = () => {
    const navigate = useNavigate();
    const { resetFilters } = useFiltersStore();

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
        await logOut();
        localStorage.removeItem("user");
        navigate("/");
        resetFilters();
    };

    return { redirectAfterLogin, handleLogout };
};


