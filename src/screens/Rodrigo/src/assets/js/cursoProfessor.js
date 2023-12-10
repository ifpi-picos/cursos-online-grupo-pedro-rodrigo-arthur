const usuario = JSON.parse(localStorage.getItem("usuario"));

fetch(`http://localhost:3000/cursos/professor/${usuario.id}`, {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
})
  .then((res) => res.json())
  .then((res) => {
    let tableBody = document.querySelector(".table tbody");
    tableBody.innerHTML = "";

    res.forEach(curso => {
      let tr = document.createElement("tr");

      let idCell = document.createElement("th");
      idCell.textContent = curso.id;
      tr.appendChild(idCell);

      let nomeCell = document.createElement("td");
      nomeCell.textContent = curso.nome;
      tr.appendChild(nomeCell);

      let cargaHorariaCell = document.createElement("td");
      cargaHorariaCell.textContent = curso.carga_horaria;
      tr.appendChild(cargaHorariaCell);

      let professorCell = document.createElement("td");
      professorCell.textContent = usuario.nome;
      tr.appendChild(professorCell);

      let statusCell = document.createElement("td");
      statusCell.textContent = curso.status == 0 ? "Inativo" : "Ativo";
      tr.appendChild(statusCell);

      tableBody.appendChild(tr);
    });
    if (res.error) alert(res.error);
  })
  .catch((err) => {
    if (err) alert("Erro ao cadastrar Professor!");
  });