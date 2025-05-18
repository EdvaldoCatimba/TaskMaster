import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterStyled } from "./RegisterStyled";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { lightTheme, darkTheme } from "../../Themes/Theme";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Logo from "../../assets/logo-transparent.png";

const Register = () => {
  const { theme } = useTheme();
  const selectedTheme = theme === "dark" ? darkTheme : lightTheme;
  const navigate = useNavigate();
  const { registerUser, loading, logout } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await registerUser(nome, email, password, confirmarPassword);
    if (result.success) {
      setTimeout(() => {
        navigate("/dashboard"); // redireciona após 2 segundos
        toast.success("Sucesso no cadastro!", {
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
      }, 2000);
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
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  useEffect(() => {
    logout();
  }, []);

  return (
    <RegisterStyled theme={selectedTheme}>
      <div className="logo">
        <img src={Logo} alt="logotipo" />
        <p>Organize sua vida, maximize sua produtividade.</p>
      </div>
      <div className="content-form">
        <p>Crie sua Conta</p>
        <form className="form" onSubmit={handleRegister}>
          <div className="control">
            <label>Nome</label>
            <div className="cont-email">
              <FaUser />
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="control">
            <label>Email</label>
            <div className="cont-email">
              <MdEmail />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="control">
            <label>Senha</label>
            <div className="cont-senha">
              <RiLockPasswordFill />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="control">
            <label>Confirmar Senha</label>
            <div className="cont-senha">
              <RiLockPasswordFill />
              <input
                type="password"
                nome="confirmarPassword"
                value={confirmarPassword}
                onChange={(e) => setConfirmarPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && (
            <p className="sms" style={{ color: "red" }}>
              {error}
            </p>
          )}
          {success && (
            <p className="sms" style={{ color: "green" }}>
              {success}
            </p>
          )}
          <button className="btn-entrar" type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
        <span className="link">
          Já tens uma conta? <a href="/">Entrar</a>
        </span>
      </div>
    </RegisterStyled>
  );
};

export default Register;
