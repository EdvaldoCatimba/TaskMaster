const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // para aceitar JSON no corpo da requisição

const users = [
  { id: 1, email: 'teste@email.com', password: '123456', nome: 'João Silva',tipo:'user'},
  { id: 2, email: 'user@teste.com', password: 'senha123', nome: 'Maria Ntangu',tipo:'user' },
  { id: 3, email: 'edvaldo@gmail.com', password: '1234', nome: 'Edvaldo Catimba',tipo:'admin' },
];

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log(users)
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  // Retorna os dados sem a senha
  const { password: _, ...userData } = user;
  return res.status(200).json(userData);
});

app.get('/api/login', (req, res) => {
  
  const user = users

  if (!user) {
    return res.status(401).json({ message: 'Não existe nenhum user' });
  }

  // Retorna os dados sem a senha
  const { password: _, ...userData } = user;
  return res.status(200).json(userData);
})

// Registro
app.post('/api/register', (req, res) => {
  const { nome, email, password, confirmarPassword } = req.body;

  
  if (!nome || !email || !password || !confirmarPassword) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
  }

  // Verifica se email já existe
  const emailExists = users.some(u => u.email === email);
  if (emailExists) {
    return res.status(409).json({ message: 'Email já cadastrado.' });
  }
  if (password !== confirmarPassword) {
    return res.status(409).json({ message: 'Senhas diferentes.' });
  }

  // Cria novo usuário com id incremental
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    nome,
    email,
    password
  };

  users.push(newUser);

  // Retorna os dados sem a senha
  const { password: _, ...userData } = newUser;
  res.status(201).json(userData);
  console.log(users)
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
