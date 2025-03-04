import { useNavigate } from "react-router-dom";

export const useAuthRedirect = () => {
    const navigate = useNavigate();

    const redirectAfterLogin = (isSuccessful: boolean) => {
        if (isSuccessful) {
            navigate("/dinger");
        } else {
            // Optional: Handle login failure
            navigate("/");
        }
    };

    return { redirectAfterLogin };
};
