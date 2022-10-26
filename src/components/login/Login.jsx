import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
// import AuthContext from '../../context/AuthProvider';
// import axios from 'axios';
import axios from '../../api/axios'
const LOGIN_URL = '/api/auth/local';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pdw, setPdw] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  },[])

  useEffect(() => {
    setErrMsg('');
  },[user ,pdw])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user, pdw);

    try {
      const response = await axios.post(LOGIN_URL,
        // JSON.stringify({user, pdw}),
        {
          identifier : user,
          password: pdw,
        }
      );
      console.log(JSON.stringify(response?.data));
      console.log(user, pdw);

      // console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({user, pdw, roles, accessToken});
      // console.log(accessToken)
      setUser('');
      setPdw('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }

  }

  return (
  
    <>
    {success ? (
      <section>
        <h1>Vous êtes connecter !</h1>
        <br />
        <p>
          <a href="#">Accueil</a>
        </p>
      </section>
    ): (
      <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Identifiant:</label>
          <input 
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <label htmlFor="password">password:</label>
          <input 
            type="password"
            id="password"
            onChange={(e) => setPdw(e.target.value)}
            value={pdw}
            required
          />
          <button>Connexion</button>
        </form>
        <p>
          Inscription
          <span className='line'>
          {/*Root link*/}
          <a href="#">Inscription</a>
          </span>
        </p>
      </section>
    )}
    </>

  )
}

export default Login;