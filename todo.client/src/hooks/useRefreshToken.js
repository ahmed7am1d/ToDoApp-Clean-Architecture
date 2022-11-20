import ToDoAPI from "../api/ToDoAPI";
import useAuth from "./useAuth";
import ApiConstants from "../constants/ApiConstants";

const useRefreshToken = () => {
  const { setAuth } = useAuth({});

  const refresh = async () => {
    const response = await ToDoAPI.post(ApiConstants.REFRESHTOKEN_ENDPOINT, {
      withCredentials: true,
    });

    const userObject = response?.data;
    const accessToken = response?.data?.token;
    setAuth({ userObject, accessToken });
    return response.data.accessToken;
  };

  return refresh;
};
export default useRefreshToken;
