import { getMorty } from "../../services";
import  { useDispatch } from "react-redux";
import { createUser } from "../../redux/states/user";



function Login() {
  const dispatch = useDispatch();
  const login = async () => {
    try {
      const result = await getMorty();
      dispatch(createUser(result));
    } catch (error) {
      console.error("Error fetching Morty:", error);
    }
  };

  return (
    <div>
      <h2>Hola este es nuestro Login</h2>
      <button onClick={login}>Login</button>
    </div>
  );

}
export default Login;
