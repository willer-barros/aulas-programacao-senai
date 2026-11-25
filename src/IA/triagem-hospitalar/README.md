# 🏥 Sistema de Triagem Hospitalar com IA Local

Backend de triagem hospitalar desenvolvido em **Node.js (ES Modules)**, **Express** e **PostgreSQL (`pg`)**, integrado ao **Ollama** rodando localmente via **Docker** para classificar o risco clínico (Protocolo de Manchester) e direcionar a especialidade médica.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js 20** (ES Modules) + **Express**
* **PostgreSQL 16** (via biblioteca nativa `pg`)
* **Ollama** (Modelo `llama3.2:3b` rodando localmente)
* **Docker** & **Docker Compose**

---

## 🚀 Como Iniciar o Projeto

### 1. Subir os containers (API, Banco de Dados e Ollama)
Principais comandos

```bash
sudo docker compose up -d --build

sudo docker ps

sudo docker exec -it triagem_ollama ollama pull llama3.2:3b


