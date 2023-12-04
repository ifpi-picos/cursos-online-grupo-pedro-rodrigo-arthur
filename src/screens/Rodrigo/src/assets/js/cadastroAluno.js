document
  .getElementById("aluno_form")
  .addEventListener("submit", cadastrarAluno);

function cadastrarAluno(event) {
  event.preventDefault();

  const nome = document.getElementById("nomeAluno").value;
  const email = document.getElementById("emailAluno").value;
  const senha = document.getElementById("senhaAluno").value;
  const telefone = document.getElementById("telefoneAluno").value;
  const status = document.getElementById("statusAluno").value;

  const aluno = {
    nome: nome,
    email: email,
    senha: senha,
    telefone: telefone,
    status: status,
  };

  fetch("http://localhost:3000/alunos/cadastro", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(aluno),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        alert("Aluno cadastrado com sucesso!");
        window.history.back();
      }
    })
    .catch((err) => {
      alert("Erro ao cadastrar aluno!");
    });
}
