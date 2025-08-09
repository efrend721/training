import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes, Roles } from '../../models';
import { createUser, resetUser, UserKey } from '../../redux/states/user';
import { getMorty } from '../../services';
import { clearLocalStorage } from '../../utilities';
import { useAsyncState } from '../../hooks/useAsyncState';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, executeAsync } = useAsyncState({
    errorMessage: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.'
  });

  useEffect(() => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  }, [dispatch, navigate]);

  const login = async () => {
    const result = await executeAsync(
      () => getMorty(),
      'Inicio de sesión exitoso'
    );
    
    if (result) {
      dispatch(createUser({ ...result, rol: Roles.USER }));
      navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
    }
  };

  return (
    <div>
      <h2>HOLA ESTE ES EL LOGIN</h2>
      <button 
        onClick={login} 
        disabled={loading}
        aria-label={loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      >
        {loading ? 'Cargando...' : 'LOGIN'}
      </button>
    </div>
  );
}

export default Login;