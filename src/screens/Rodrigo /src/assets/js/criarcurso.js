document.getElementById("curso_form").addEventListener("submit", criarCurso);

function criarCurso(event) {
  event.preventDefault();
  const curso = {
    nome: document.getElementById("nomeCurso").value,
    carga_horaria: document.getElementById("cargaHoraria").value,
    status: document.getElementById("statusCurso").value,
    id_professor: 1,
  };

  fetch("http://localhost:3000/cursos/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(curso),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        alert("Curso criado com sucesso!");
        window.history.back();
      }
    })
    .catch((err) => {
      alert("Erro ao criar Curso!");
    });
}
