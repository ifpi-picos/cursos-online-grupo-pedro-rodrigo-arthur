document.getElementById("loginAluno_form").addEventListener("submit", loginAluno);

function loginAluno(event) {
  event.preventDefault();
  const curso = {
    email: document.getElementById("emailAluno").value,
    senha: document.getElementById("senhaAluno").value,
  };
  console.log(curso);
  fetch("http://localhost:3000/alunos/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(curso),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) alert(res.error);
      if (res.success) {
        localStorage.setItem("usuario", JSON.stringify(res.professor));
        window.location.href =
          "http://localhost:5500/cursos-online-grupo-pedro-rodrigo-arthur/src/screens/%20Rodrigo%20/src/pages/aluno/perfil.html";
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Erro ao Fazer Login!");
    });
}
