fetch("http://localhost:3000/professores/", {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
})
  .then((res) => res.json())
  .then((res) => {
    if (res.error) {
      alert(res.error);
    } else {
      let select = document.getElementById("listaProfessores");
      select.innerHTML = "";
      res.forEach(professor => {
        let option = document.createElement("option");
        option.value = professor.id;
        option.text = professor.nome;
        select.appendChild(option);
      });
    }
  })
  .catch((err) => {
    if (err) alert("Erro ao criar Curso!");
  });

document.getElementById("curso_form").addEventListener("submit", criarCurso);

function criarCurso(event) {
  event.preventDefault();
  const curso = {
    nome: document.getElementById("nomeCurso").value,
    carga_horaria: document.getElementById("cargaHoraria").value,
    status: document.getElementById("statusCurso").value,
    id_professor: document.getElementById("listaProfessores").value,
  };

  console.log('file: criarcurso.js:36 - criarCurso - curso:', curso)

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
