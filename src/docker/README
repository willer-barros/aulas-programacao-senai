# Aula de Docker
 
## Objetivo da Aula
Ao final desta aula, o aluno será capaz de:
- Entender o que é Docker
- Compreender a diferença entre imagens e containers
- Criar e executar containers
- Utilizar comandos básicos do Docker
- Criar sua própria imagem utilizando Dockerfile
- Executar aplicações em containers

# O que é Docker?
Docker é uma plataforma que permite empacotar aplicações e suas dependências em ambientes isolados chamados **containers**.
Com Docker, uma aplicação pode ser executada em qualquer computador que possua Docker instalado, sem a necessidade de configurar manualmente bibliotecas, frameworks ou dependências.

## Problema sem Docker
Imagine a seguinte situação:
Desenvolvedor:
> "Na minha máquina funciona."
Cliente:
> "Aqui não funciona."
Isso acontece porque cada ambiente possui configurações diferentes.

## Solução com Docker
Docker cria um ambiente padronizado para a aplicação.


# Proposta de ensino
## Módulo 1 — Fundamentos e Ambiente (4h)
### Objetivos
- Compreender o conceito de containers
- Diferenciar containers de máquinas virtuais
- Configurar o ambiente Docker no Windows

### Conteúdo
1. Containers vs VMs: por que o Docker existe
2. Instalação do Docker Desktop no Windows
3. WSL2 como backend: o que é e por que o Docker depende dele
4. Diferença entre usar WSL2 e Hyper-V como motor

5. Primeiros comandos:
- `docker run`
- `docker ps`
- `docker stop`
- `docker rm`
 
---
 
## Módulo 2 — Imagens e Dockerfile (6h)
### Objetivos
- Entender como imagens Docker são construídas
- Criar imagens personalizadas
### Conteúdo
1. Camadas de imagem e cache de build
2. Escrevendo um Dockerfile do zero (Node.js ou Python)
3. Principais instruções:
- `COPY`
- `ADD`
- `WORKDIR`
- `EXPOSE`
- `CMD`
- `ENTRYPOINT`
4. Build e push básico para o Docker Hub
---

## Módulo 3 — Volumes e Persistência (4h)
### Objetivos
- Garantir persistência de dados nos containers
### Conteúdo
1. Bind mounts vs Named Volumes
2. Particularidades do Windows:
- Caminhos de arquivo
- Permissões
- Performance de bind mounts em `/mnt/c` via WSL2
3. Prática: banco de dados com volume persistente
---
 
## Módulo 4 — Redes (4h)
 
### Objetivos
- Compreender a comunicação entre containers
 
### Conteúdo
1. Tipos de rede:
- Bridge
- Host
- None
2. Comunicação entre containers
3. A pegadinha do `localhost` no Windows ao expor portas
4. Prática: aplicação e banco de dados se comunicando
---
## Módulo 5 — Docker Compose (6h)
### Objetivos
- Orquestrar múltiplos containers
### Conteúdo
1. Estrutura do arquivo `docker-compose.yml`
2. Conceitos:
- Services
- Networks
- Volumes
3. Orquestrando uma stack simples:
- Frontend
- Backend
- Banco de dados
4. Variáveis de ambiente e arquivo `.env`
5. Prática guiada de ponta a ponta
---
 
## Módulo 6 — Otimização de Imagens (4h)
### Objetivos
- Construir imagens menores e mais eficientes
### Conteúdo
1. Multi-stage builds
2. Redução de tamanho de imagens:
- Imagens Alpine
- Arquivo `.dockerignore`
3. Boas práticas de cache e camadas
---
 
## Módulo 7 — WSL2 na Prática (4h)
 
### Objetivos
- Trabalhar de forma eficiente com Docker no Windows
### Conteúdo
1. Performance:
- Projeto dentro do WSL2
- Projeto no sistema de arquivos do Windows
2. Integração:
- VS Code
- WSL2
- Docker
3. Resolução de problemas comuns:
- Memória do WSL2
- Arquivo `.wslconfig`
---
 
## Módulo 8 — CI/CD Básico e Registries (4h)
### Objetivos
- Automatizar builds e distribuição de imagens
### Conteúdo
1. Docker Hub vs Registry Privado
2. Build automatizado com GitHub Actions
3. Tagging e versionamento de imagens
 
---
## Módulo 9 — Segurança e Boas Práticas (2h)
### Objetivos
- Aplicar conceitos básicos de segurança em containers
 
### Conteúdo
1. Executar containers como usuário não-root
2. Análise de vulnerabilidades:
- `docker scout`
- Ferramentas similares
3. Gerenciamento de segredos:
- O que não fazer
- Senhas em Dockerfile
- Variáveis de ambiente versionadas
---
 
## Módulo 10 — Projeto Final (2h)
 
### Objetivos
- Consolidar os conhecimentos adquiridos no curso
 
### Atividade
Containerizar uma aplicação completa composta por:
- Frontend
- Backend
- Banco de dados
 
### Entregáveis
- Dockerfile(s)
- Docker Compose funcional
- Persistência de dados configurada
- Documentação de execução
### Avaliação
Apresentação prática demonstrando:
- Construção das imagens
- Subida da stack
- Comunicação entre serviços
- Persistência de dados
- Boas práticas aplicadas

