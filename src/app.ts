import * as Express from "express";
import { AppDataSource } from "./AppDataSource";
import professores from "./routes/professores";
import alunos from "./routes/alunos";
import cursoAlunos from "./routes/cursoAlunos";
import cursos from "./routes/cursos";
import { CursoAlunoServices } from "./services/CursoAlunoServices";
import { AlunoServices } from "./services/AlunoServices";
import { AlunoRepository } from "./repositories/AlunoRepository";
import { CursoAlunoRepository } from "./repositories/CursoAlunoRepository";

const app = Express();
const cors = require('cors')

app.use(cors())

app.use(Express.json());

app.use("/professores", professores);

app.use("/alunos", alunos);

app.use("/cursoAlunos", cursoAlunos);

app.use("/cursos", cursos);
AppDataSource.initialize()
  .then(async () => {
    app.listen(3000, async () => {
      console.log("Server started on port 3000");
      
    });
  })
  .catch((error) => console.log(error));
