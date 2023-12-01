import * as Express from "express";
import { ProfessorServices } from "../services/ProfessorServices";

const router = Express.Router();
const professorServices = new ProfessorServices();

router.get("/buscarTodos", async (req, res) => {
  const professores = await professorServices.buscarTodos();
  res.json(professores);
});

router.get("/buscarPorId/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const professor = await professorServices.buscarPorId(id);
    res.json(professor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/cadastro", async (req, res) => {
  try {
    const {nome,email,telefone,senha} = req.body;
    
    const professor = await professorServices.cadastrar({
      nome, email, telefone, senha
    });
    res.json(professor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/deletarPorId/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const professorDeletado = await professorServices.deletar(id);
    res.json(professorDeletado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/atualizar/:id", async (req, res) => {
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

router.get("/buscarPorEmail/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const professor = await professorServices.buscarPorEmail(email);
    res.json(professor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const professor = await professorServices.autenticar(email, senha);

    if (!professor) throw new Error("Professor não encontrado");
    if(professor.senha != senha) throw new Error("Senha incorreta");

    if(professor.senha == senha && professor.email == email){
    res.json({success: true, message: "Login realizado com sucesso"});
    }
  } catch (error) {
    res.status(401).json({success: false , message : "Login não realizado" });
  }
})

export default router;
