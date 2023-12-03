document
  .getElementById("professor_form")
  .addEventListener("submit", cadastrarProfessor);

function cadastrarProfessor(event) {
  event.preventDefault();
  const professor = {
    nome: document.getElementById("nomeProfessor").value,
    email: document.getElementById("emailProfessor").value,
    senha: document.getElementById("senhaProfessor").value,
    telefone: document.getElementById("telefoneProfessor").value,
  };

  fetch("http://localhost:3000/alunos/cadastro", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(professor),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        alert("Professor cadastrado com sucesso!");
        window.history.back();
      }
    })
    .catch((err) => {
      alert("Erro ao cadastrar Professor!");
    });
}
