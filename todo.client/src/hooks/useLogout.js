import ToDoApi from "../api/ToDoAPI";
import useAuth from "../hooks/useAuth";
import ApiConstants from "../constants/ApiConstants";

const useLogout = () => {
  const { setAuth } = useAuth();
  //- We will return from this hook a function that will logout
  const logout = async () => {
    setAuth({});
    try {
      const response = await ToDoApi.post(ApiConstants.LOGOUT_ENDPOINT, {
        //we want to send the secure cookie with the request
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return logout;

};
export default useLogout;
