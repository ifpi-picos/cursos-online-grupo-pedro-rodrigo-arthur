import * as Express from "express";
import { CursoAlunoServices } from "../services/CursoAlunoServices";
import { CursoAlunoRepository } from "../repositories/CursoAlunoRepository";

const router = Express.Router();
const cursoAlunoServices = new CursoAlunoServices(new CursoAlunoRepository());

router.get("/", async (req, res) => {
  const cursosAlunos = await cursoAlunoServices.buscarTodos();
  res.json(cursosAlunos);
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const cursoAluno = await cursoAlunoServices.buscarPorId(id);
    res.json(cursoAluno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

router.post("/", async (req, res) => {
  try {
    const cursoAluno = req.body;
    const cursoAlunoSalvo = await cursoAlunoServices.cadastro(cursoAluno);
    res.json(cursoAlunoSalvo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:idCurso/:idAluno", async (req, res) => {
  try {
    const idCurso = Number(req.params.idCurso);
    const idAluno = Number(req.params.idAluno);
    const cursoAluno = req.body;
    const cursoAlunoAtualizado = await cursoAlunoServices.atualizarCursoAluno(
      { idCurso, idAluno },
      cursoAluno
    );
    res.json(cursoAlunoAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

router.patch("/:idCurso/:idAluno", async (req, res) => {
  try {
    const idCurso = Number(req.params.idCurso);
    const idAluno = Number(req.params.idAluno);
    const desmatricular = await cursoAlunoServices.desmatricular(
      idCurso,
      idAluno
    );
    res.json(desmatricular);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})


export default router;
