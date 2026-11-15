# Dominando o Docker Compose

Enquanto o **`Dockerfile`** serve para construir a imagem de **um único container**, o **`Docker Compose`** é a ferramenta usada para **orquestrar múltiplos containers** que trabalham juntos como uma única aplicação.

Com apenas um comando (`docker compose up`), ele cria redes virtuais, monta volumes de dados e sobe todo o seu ambiente (Banco de Dados + Backend + Frontend) de forma integrada.

---

## Estrutura de Pastas do Projeto Exemplo

Para este guia, vamos imaginar a seguinte organização na raiz do seu projeto:

```text
meu-projeto/
├── docker-compose.yml   <-- O maestro da orquestra
├── backend/
│   └── Dockerfile       <-- Receita da API (ex: Node/NestJS)
└── frontend/
    └── Dockerfile       <-- Receita da Interface (ex: React/Next/Vite)
```

---

## As Chaves (Tags) Principais do `docker-compose.yml`

O ficheiro utiliza o formato **YAML**, onde a **indentação (espaços)** define a hierarquia. Nunca use `Tab`, use sempre **2 espaços**.

### 1. `services`
É a seção principal onde você lista cada container da sua aplicação. O nome que você dá a cada serviço (ex: `db`, `backend`, `frontend`) também funciona como o **endereço de rede (hostname)** interno entre eles.

### 2. `image` vs `build`
* **`image`**: Baixa uma imagem pronta diretamente do Docker Hub (ideal para bancos de dados como `postgres:16-alpine` ou `redis`).
* **`build`**: Constrói uma imagem personalizada a partir de um `Dockerfile` local no seu computador.

### 3. `container_name`
Define um nome fixo e amigável para o container (evitando nomes aleatórios gerados pelo Docker).

### 4. `ports`
Mapeia as portas entre a sua máquina (**Host**) e o **Container** no formato `"PORTA_HOST:PORTA_CONTAINER"`.
* Exemplo: `"3000:3000"` significa que ao acessar `localhost:3000` no seu navegador, o tráfego vai para a porta `3000` do container.

### 5. `environment`
Define as variáveis de ambiente dentro do container (credenciais do banco, URLs de conexão, portas, etc.).

### 6. `volumes`
Serve para duas coisas principais:
1. **Persistência de dados:** Salvar os dados do PostgreSQL no seu disco para não perdê-los ao desligar o container.
2. **Hot-Reload (Desenvolvimento):** Espelhar sua pasta de código local dentro do container para que alterações no código reflitam na hora.

### 7. `depends_on`
Define a **ordem de inicialização**. Garante que o banco de dados suba antes do backend tentar se conectar a ele.

### 8. `networks`
Cria redes isoladas para que os containers conversem entre si com segurança. *(Nota: por padrão, o Docker Compose já cria uma rede única para todos os serviços do mesmo ficheiro, mas declarar explicitamente é uma ótima prática).*

---

## Exemplo Completo na Prática (Frontend + Backend + Postgres)

Aqui está um ficheiro **`docker-compose.yml`** completo e comentado, pronto para subir uma stack inteira:

```yaml
services:
  # ---------------------------------------------------
  # 1. BANCO DE DADOS (PostgreSQL)
  # ---------------------------------------------------
  db:
    image: postgres:16-alpine
    container_name: meu-postgres
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secretpassword
      POSTGRES_DB: app_db
    ports:
      - "5432:5432" # Permite acessar o banco pelo DBeaver/Beekeeper na sua máquina
    volumes:
      - postgres_data:/var/lib/postgresql/data # Salva os dados em um volume gerenciado
    networks:
      - app-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d app_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  # ---------------------------------------------------
  # 2. BACKEND (API Node.js / NestJS)
  # ---------------------------------------------------
  backend:
    build:
      context: ./backend        # Pasta onde está o código e o Dockerfile do backend
      dockerfile: Dockerfile
    container_name: meu-backend
    restart: on-failure
    ports:
      - "3000:3000"
    environment:
      PORT: 3000
      # ATENÇÃO AQUI: O host do banco NÃO é 'localhost', mas sim o nome do serviço ('db')!
      DATABASE_URL: postgresql://admin:secretpassword@db:5432/app_db?schema=public
    depends_on:
      db:
        condition: service_healthy # Só inicia o backend quando o Postgres estiver 100% pronto
    networks:
      - app-network

  # ---------------------------------------------------
  # 3. FRONTEND (React / Vite / Next.js)
  # ---------------------------------------------------
  frontend:
    build:
      context: ./frontend       # Pasta onde está o código e o Dockerfile do frontend
      dockerfile: Dockerfile
    container_name: meu-frontend
    ports:
      - "5173:5173"
    environment:
      # URL que o navegador do usuário vai usar para chamar a API
      VITE_API_URL: http://localhost:3000
    depends_on:
      - backend
    networks:
      - app-network

# Declaração dos volumes persistentes
volumes:
  postgres_data:

# Declaração das redes virtuais
networks:
  app-network:
    driver: bridge
```

---

## O Segredo da Comunicação Entre Containers

Um dos erros mais comuns de quem está começando é configurar `localhost` na string de conexão do backend para acessar o banco:

* ❌ **Errado (dentro do container):** `postgresql://admin:secret@localhost:5432/app_db`
  *(Dentro do container do backend, `localhost` aponta para ele mesmo, e não para o container do banco).*
* ✅ **Certo (dentro do container):** `postgresql://admin:secret@db:5432/app_db`
  *(O Docker possui um DNS interno que resolve o nome do serviço `db` diretamente para o IP interno do container do PostgreSQL).*

> **Exceção para o Frontend:** Como o código React/Vue/Angular roda **no navegador do usuário** (fora do Docker), a URL da API configurada no frontend deve apontar para `http://localhost:3000` (a porta exposta na sua máquina).

---

## Comandos Essenciais do Dia a Dia

Abra o terminal na mesma pasta onde está o `docker-compose.yml`:

| Comando | O que faz |
| :--- | :--- |
| `docker compose up -d` | Constrói as imagens (se necessário) e sobe todos os containers em segundo plano (*detached*). |
| `docker compose up --build` | Força a reconstrução das imagens (útil quando você altera o `Dockerfile` ou instala pacotes novos). |
| `docker compose ps` | Lista o status e as portas apenas dos containers deste projeto. |
| `docker compose logs -f backend` | Mostra os logs em tempo real apenas do serviço `backend`. |
| `docker compose down` | Para e remove todos os containers e a rede criada (mantendo os dados salvos no volume). |
| `docker compose down -v` | Para tudo **E apaga os volumes** (zera o banco de dados completamente). |