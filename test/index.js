const axios = require('axios');
const MAX = 1000;
const API_URL = 'http://localhost:3000/api/users/';

// Função para gerar um nome aleatório
function generateRandomName() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let name = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    name += characters.charAt(randomIndex);
  }

  return name;
}

// Função para gerar um email aleatório
function generateRandomEmail() {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
  const name = generateRandomName();
  const domainIndex = Math.floor(Math.random() * domains.length);
  const domain = domains[domainIndex];

  return `${name}@${domain}`;
}

// Função para gerar uma senha aleatória
function generateRandomPassword() {
  return Math.random().toString(36).substring(2);
}

// Função para criar um usuário
async function createUser(name, email, password) {
  const data = {
    name: name,
    email: email,
    password: password
  };

  const startTime = new Date();
  await axios.post(API_URL, data);
  const endTime = new Date();

  const duration = endTime - startTime;
  console.log(`Usuário criado em ${duration}ms`);
  return duration;
}

// Função para atualizar um usuário
async function updateUser(userId, newData) {
  const startTime = new Date();
  await axios.put(`${API_URL}${userId}`, newData);
  const endTime = new Date();

  const duration = endTime - startTime;
  console.log(`Usuário atualizado em ${duration}ms`);
  return duration;
}

// Função para consultar um usuário
async function getUsers() {
  const startTime = new Date();
  const response = await axios.get(API_URL);
  const endTime = new Date();

  const duration = endTime - startTime;
  console.log(`Usuários consultado em ${duration}ms`);
  return response.data;
}

// Função para remover um usuário
async function deleteUser(userId) {
  const startTime = new Date();
  await axios.delete(`${API_URL}${userId}`);
  const endTime = new Date();

  const duration = endTime - startTime;
  console.log(`Usuário removido em ${duration}ms`);
  return duration;
}

// Função principal
async function main() {
  let createUserTotalTime = 0;
  let updateUserTotalTime = 0;
  let deleteUserTotalTime = 0;

  // Criação dos usuários
  console.log('Iniciando a criação dos usuários...');
  const createUserStartTime = new Date();

  for (let i = 0; i < MAX; i++) {
    const name = generateRandomName();
    const email = generateRandomEmail();
    const password = generateRandomPassword();

    createUserTotalTime += await createUser(name, email, password);
  }

  const createUserEndTime = new Date();
  const createUserTotalDuration = createUserEndTime - createUserStartTime;
  console.log(`Criação de usuários concluída. Tempo total: ${createUserTotalDuration}ms`);

  // Consulta dos usuários
  console.log('Iniciando a consulta dos usuários...');
  const getUserStartTime = new Date();

  const users = await getUsers();
  const getUserEndTime = new Date();
  const getUserTotalDuration = getUserEndTime - getUserStartTime;

  console.log(`Consulta de usuários concluída. Tempo total: ${getUserTotalDuration}ms`);

  // Atualização dos usuários
  console.log('Iniciando a atualização dos usuários...');
  const updateUserStartTime = new Date();
  
  for (let i = 0; i < MAX; i++) {
    const userId = users.data[i].user_id;
    const newData = {
      name: generateRandomName(),
      email: generateRandomEmail(),
      password: generateRandomPassword()
    };

    updateUserTotalTime += await updateUser(userId, newData);
  }

  const updateUserEndTime = new Date();
  const updateUserTotalDuration = updateUserEndTime - updateUserStartTime;
  console.log(`Atualização de usuários concluída. Tempo total: ${updateUserTotalDuration}ms`);

  // Remoção dos usuários
  console.log('Iniciando a remoção dos usuários...');
  const deleteUserStartTime = new Date();

  for (let i = 0; i < MAX; i++) {
    const userId = users.data[i].user_id;
    deleteUserTotalTime += await deleteUser(userId);
  }

  const deleteUserEndTime = new Date();
  const deleteUserTotalDuration = deleteUserEndTime - deleteUserStartTime;
  console.log(`Remoção de usuários concluída. Tempo total: ${deleteUserTotalDuration}ms`);

  // Exibição dos resultados
  console.log('Resultados:');
  console.log(`Tempo total de criação de usuários: ${createUserTotalTime}ms`);
  console.log(`Tempo total de atualização de usuários: ${updateUserTotalTime}ms`);
  console.log(`Tempo total de consulta de usuários: ${getUserTotalDuration}ms`);
  console.log(`Tempo total de remoção de usuários: ${deleteUserTotalTime}ms`);

  const totalDuration = createUserTotalDuration + updateUserTotalDuration + getUserTotalDuration + deleteUserTotalDuration;

  console.log(`Tempo total de execução: ${totalDuration}ms`);
}
  
main();