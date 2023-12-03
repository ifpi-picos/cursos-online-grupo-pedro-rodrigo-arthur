document.getElementById("loginPro_form").addEventListener("submit", loginPro);

function loginPro(event) {
  event.preventDefault();
  const curso = {
    email: document.getElementById("emailProfessor").value,
    senha: document.getElementById("senhaProfessor").value,
  };
  console.log(curso);
  fetch("http://localhost:3000/professores/login", {
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
          "http://localhost:5500/cursos-online-grupo-pedro-rodrigo-arthur/src/screens/%20Rodrigo%20/src/pages/professor/perfil.html";
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Erro ao Fazer Login!");
    });
}
