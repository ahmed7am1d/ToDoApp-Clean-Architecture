import ToDoAPI from "../api/ToDoAPI";
import useAuth from "./useAuth";
import ApiConstants from "../constants/ApiConstants";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await ToDoAPI.post(ApiConstants.REFRESHTOKEN_ENDPOINT, {
      withCredentials: true,
    });
    setAuth((prev) => {
        /*
        - here we defined the function of setAuth by ourself to be able to save
          all previous data but only overriding the accessToken with the new one
       */
      return { ...prev, accessToken: response.data.token };
    });
    return response.data.token;
  };
  return refresh;
};
export default useRefreshToken;
