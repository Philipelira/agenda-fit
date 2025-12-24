const API = 'http://localhost:3000/alunos';

function cadastrarAluno() {
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;

  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, telefone, email })
  })
  .then(() => listarAlunos());
}

function listarAlunos() {
  fetch(API)
    .then(res => res.json())
    .then(alunos => {
      const lista = document.getElementById('lista-alunos');
      lista.innerHTML = '';

      alunos.forEach(a => {
        lista.innerHTML += `<li>${a.nome} - ${a.email}</li>`;
      });
    });
}

// Carrega alunos ao abrir a tela
listarAlunos();
