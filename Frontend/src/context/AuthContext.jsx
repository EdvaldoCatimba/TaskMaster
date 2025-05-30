import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
  setLoading(true);
  try {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json(); // <-- Pega o corpo da resposta, com ou sem erro

    if (!response.ok) {
      return { success: false, message: result.message || 'Erro ao fazer login.' };
    }

    setUser(result);
    localStorage.setItem('user', JSON.stringify(result));
    return { success: true, ...result };
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    return { success: false, message: 'Erro ao se conectar com o servidor.' };
  } finally {
    setLoading(false);
  }
};

  const registerUser = async (nome, email, password, confirmarPassword) => {
  setLoading(true);
  
  try {
    const response = await fetch('http://localhost:3001/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, password, confirmarPassword }),
    });

    // Trata resposta com erro
    if (!response.ok) {
      const error = await response.json();
      return { success: false, message: error.message };
    }

    // Usuário cadastrado com sucesso
    const userData = await response.json();
    
    // Faz login automático
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));

    return { success: true };
  } catch (error) {
    return { success: false, message: 'Erro ao se conectar com o servidor.' };
  } finally {
    setLoading(false);
  }
};



  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.dismiss()
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
