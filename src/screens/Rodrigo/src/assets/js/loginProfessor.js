document.getElementById("loginPro_form").addEventListener("submit", loginPro);

function loginPro(event) {
  event.preventDefault();
  const curso = {
    email: document.getElementById("emailProfessor").value,
    senha: document.getElementById("senhaProfessor").value,
  };

  const tipo = document.getElementById("tipoUsuario").value;
  let url = "";

  if (tipo === "1") {
    url = "alunos";
  } else {
    url = "professores";
  }

  fetch(`http://localhost:3000/${url}/login`, {
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
        localStorage.setItem("usuario", JSON.stringify(res.usuario));
        console.log("file: loginProfessor.js:25 - .then - tipo:", tipo);
        if (tipo === "1") {
          window.location.href =
            "http://localhost:5500/cursos-online-grupo-pedro-rodrigo-arthur/src/screens/Rodrigo/src/pages/aluno/inicio.html";
        } else {
          window.location.href =
            "http://localhost:5500/cursos-online-grupo-pedro-rodrigo-arthur/src/screens/Rodrigo/src/pages/professor/inicio.html";
        }
      }
    })
    .catch((err) => {
      alert("Erro ao Fazer Login!");
    });
}
