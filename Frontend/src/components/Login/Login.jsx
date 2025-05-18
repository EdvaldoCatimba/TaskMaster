import { useState, useEffect } from "react";
import { LoginStyled } from "./LoginStyled";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import Logo from "../../assets/logo-transparent.png";
import { lightTheme, darkTheme } from "../../Themes/Theme";
import { toast } from "react-toastify";

import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const { login, loading, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const selectedTheme = theme === "dark" ? darkTheme : lightTheme;

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      toast.success("Login feito com sucesso!", {
        position: "top-right", // outras opções: top-left, bottom-right, bottom-left
        autoClose: 3000, // tempo em milissegundos (3 segundos)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", // ou "light", "dark"
        style: {
          backgroundColor: "#4caf50", // verde
          color: "#fff",
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "10px",
        },
      });

      if (result.tipo === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      toast.error(result.message || "Erro ao cadastrar.", {
        position: "bottom-left",
        autoClose: 3000, // milissegundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored", // "light" | "dark" | "colored"
      });
    }
  };

  useEffect(() => {
    toast.dismiss();
  }, []);
  /*
useEffect(() => {
    logout();
  }, []);*/
  return (
    <LoginStyled >
      <div className="logo">
        <img src={Logo} alt="logotipo" />
        <p>Organize sua vida, maximize sua produtividade.</p>
      </div>
      {/* 
     <button onClick={toggleTheme} >
        Modo: {theme === 'dark' ? 'Escuro' : 'Claro'}
      </button>*/}

      <div className="content-form">
        <p>Acesse sua Conta</p>
        <form onSubmit={handleLogin} className="form">
          <div className="control">
            <label htmlFor="email">E-mail</label>
            <div className="cont-email">
              <MdEmail />
              <input
                type="email"
                name="email"
                placeholder="seu@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="control">
            <label htmlFor="senha">Senha</label>
            <div className="cont-senha">
              <RiLockPasswordFill />
              <input
                type="password"
                name="senha"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="btn-entrar" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <span className="link">
          Não tens uma conta? <a href="/register">Criar</a>
        </span>
      </div>
    </LoginStyled>
  );
};

export default Login;
