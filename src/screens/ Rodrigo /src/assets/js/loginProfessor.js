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
      console.log(res);
      if (res.error) {
        alert(res.error);
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Erro ao Fazer Login!");
    });
}
