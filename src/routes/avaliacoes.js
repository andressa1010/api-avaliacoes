import express from "express"
import prisma from "../prisma/cliente.js"


const router = express.Router()

router.post("/", async (req, res) => {
    try {
      const { nome, estrelas, comentarios } = req.body;
      if (!nome || !estrelas || !comentarios) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
      }
  
      const novaAvaliacao = await prisma.avaliacao.create({
        data: { nome, estrelas, comentarios},
      });
  
      res.status(201).json(novaAvaliacao);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao criar avaliação!" });
    }
  });
  
  
  router.get("/", async (req, res) => {
    try {
      const avaliacoes = await prisma.avaliacao.findMany();
      res.json(avaliacoes);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao buscar avaliações!" });
    }
  });
  
  
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const avaliacao = await prisma.avaliacao.findUnique({ where: { id } });
  
      if (!avaliacao) {
        return res.status(404).json({ mensagem: "Avaliação não encontrada!" });
      }
  
      res.json(avaliacao);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao buscar avaliação!" });
    }
  });
  
  
  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, estrelas, comentarios } = req.body;
  
      const avaliacaoAtualizada = await prisma.avaliacao.update({
        where: { id },
        data: { nome, estrelas, comentarios},
      });
  
      res.json(avaliacaoAtualizada);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao atualizar avaliação!" });
    }
  });
  
  
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      await prisma.avaliacao.delete({ where: { id } });
  
      res.json({ mensagem: "Avaliação excluída com sucesso!" });
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao excluir avaliação!" });
    }
  });
  

  export default router