import * as Express from "express";
import { ProfessorServices } from "../services/ProfessorServices";

const router = Express.Router();
const professorServices = new ProfessorServices();

router.get("/", async (req, res) => {
  const professores = await professorServices.buscarTodos();
  res.json(professores);
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const professor = await professorServices.buscarPorId(id);
    res.json(professor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const professor = req.body;
    const professorSalvo = await professorServices.cadastrar(professor);
    res.json(professorSalvo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const professorDeletado = await professorServices.deletar(id);
    res.json(professorDeletado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const professor = req.body;
    const professorAtualizado = await professorServices.atualizar(
      id,
      professor
    );
    res.json(professorAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const professor = await professorServices.buscarPorEmail(email);
    res.json(professor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
