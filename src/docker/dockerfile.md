#Dominando o Dockerfile

O **`Dockerfile`** é um documento de texto sem extensão que contém todas as instruções necessárias para o Docker montar uma **Imagem** de forma automatizada. Pense nele como uma receita de bolo: cada linha é um passo que prepara o ambiente para a sua aplicação rodar exatamente da mesma forma em qualquer máquina.

---

## Como funciona o sistema de Camadas (Layers)

Cada instrução no `Dockerfile` cria uma **camada** somente leitura na imagem. 
* **Cache Inteligente:** O Docker guarda essas camadas em cache. Se você alterar apenas o código da sua aplicação, ele não precisa baixar o Node.js ou instalar o `package.json` novamente — ele reaproveita o cache e só reconstrói a partir da linha que mudou.
* **Regra de Ouro:** Coloque as instruções que mudam menos no topo (ex: instalação do sistema operacional e dependências) e as que mudam mais no final (ex: cópia do código-fonte).

---

## As Instruções (Tags) Mais Comuns do Dockerfile

Por convenção, as instruções são escritas em **MAIÚSCULAS** para se destacarem dos argumentos.

### 1. `FROM` (Obrigatória)
Define a **imagem base** a partir da qual a sua nova imagem será construída. Todo `Dockerfile` válido precisa começar com um `FROM` (exceto se houver `ARG` antes dele).

```dockerfile
# Usa a imagem oficial do Node.js versão 20 baseada no Linux Alpine (muito leve)
FROM node:20-alpine
```

### 2. `WORKDIR`
Define o **diretório de trabalho** dentro do container. Todas as instruções seguintes (`RUN`, `CMD`, `COPY`, `ADD`) serão executadas a partir desta pasta. Se a pasta não existir, o Docker a cria automaticamente.

```dockerfile
# Define /usr/src/app como a pasta padrão do projeto dentro do container
WORKDIR /usr/src/app
```

### 3. `COPY`
Copia ficheiros e pastas do seu computador (host) para dentro do sistema de ficheiros do container.

```dockerfile
# Copia o package.json e o package-lock.json para o WORKDIR atual (./)
COPY package*.json ./

# Copia todo o restante do código-fonte para dentro do container
COPY . .
```

### 4. `ADD`
Faz o mesmo que o `COPY`, mas possui dois recursos extras:
1. Pode baixar ficheiros diretamente de uma URL remota.
2. Descompacta automaticamente ficheiros compactados locais (`.tar`, `.tar.gz`, `.zip`).

> **Boa prática:** Prefira sempre usar `COPY` quando quiser apenas copiar ficheiros locais, pois é mais explícito e seguro. Use `ADD` apenas quando precisar da extração automática de arquivos compactados.

```dockerfile
ADD arquivo-compactado.tar.gz /app/destino/
```

### 5. `RUN`
Executa comandos no terminal **durante o processo de construção (build)** da imagem. É usado para instalar pacotes do sistema, dependências do projeto ou compilar o código. Cada `RUN` cria uma nova camada.

```dockerfile
# Instala as dependências do Node.js
RUN npm install

# Compila o projeto TypeScript/NestJS para JavaScript
RUN npm run build
```

### 6. `ENV`
Define **variáveis de ambiente** persistentes dentro da imagem e do container quando ele estiver em execução.

```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
```

### 7. `ARG`
Define variáveis que existem **apenas durante o build** da imagem (não ficam disponíveis quando o container já estiver rodando). Muito útil para passar versões de pacotes ou tokens temporários no momento do `docker build --build-arg`.

```dockerfile
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine
```

### 8. `EXPOSE`
Informa ao Docker e a outros desenvolvedores qual **porta de rede** o container escuta em tempo de execução. 

> **Atenção:** O `EXPOSE` funciona mais como documentação e metadado; ele **não** publica a porta automaticamente para o seu computador. Para acessar a porta externamente, você ainda precisa usar a flag `-p 3000:3000` no `docker run` ou configurar o `ports:` no `docker-compose.yml`.

```dockerfile
EXPOSE 3000
```

### 9. `USER`
Define qual utilizador (e opcionalmente grupo) será usado para executar os comandos `RUN`, `CMD` e `ENTRYPOINT` seguintes. Por padrão, o Docker roda tudo como `root`, o que é um risco de segurança em produção.

```dockerfile
# Muda para o utilizador 'node' (que já vem criado nas imagens oficiais do Node)
USER node
```

### 10. `VOLUME`
Cria um ponto de montagem para armazenamento persistente. Garante que dados importantes (como bancos de dados ou uploads) não sejam perdidos quando o container for destruído.

```dockerfile
VOLUME /var/lib/postgresql/data
```

### 11. `CMD`
Define o **comando padrão** que será executado **quando o container iniciar** (tempo de execução, não no build). Só pode haver **um** `CMD` ativo no `Dockerfile` (se houver vários, apenas o último vale). Ele pode ser facilmente sobrescrito se você passar outro comando no `docker run`.

```dockerfile
# Forma recomendada (Exec form - JSON array)
CMD ["node", "dist/main.js"]
```

### 12. `ENTRYPOINT`
Assim como o `CMD`, define o comando que roda quando o container inicia, mas **não é sobrescrito** facilmente pelos argumentos passados no `docker run`. Na verdade, tudo o que você passa no final do `docker run` é anexado como argumento para o `ENTRYPOINT`.

```dockerfile
ENTRYPOINT ["npm", "run"]
# Se combinado com CMD:
CMD ["start:prod"]
# Resultado final ao iniciar: npm run start:prod
```

---

## Exemplo Completo na Prática (NestJS / Node.js)

Veja como todas essas tags trabalham juntas num `Dockerfile` otimizado para aproveitar o cache de dependências:

```dockerfile
# 1. Imagem base leve
FROM node:20-alpine

# 2. Define a pasta de trabalho
WORKDIR /usr/src/app

# 3. Copia apenas os ficheiros de dependências primeiro (para aproveitar o cache!)
COPY package*.json ./

# 4. Instala as dependências
RUN npm ci

# 5. Copia o restante do código da aplicação (incluindo pasta prisma, src, etc.)
COPY . .

# 6. Gera o client do Prisma e compila o TypeScript
RUN npx prisma generate
RUN npm run build

# 7. Define variáveis de ambiente
ENV NODE_ENV=production

# 8. Usa um utilizador sem privilégios de root por segurança
USER node

# 9. Documenta a porta utilizada pela API
EXPOSE 3000

# 10. Comando final que inicia o servidor quando o container subir
CMD ["node", "dist/main.js"]
```

---

## Dica Bônus: O ficheiro `.dockerignore`

Sempre crie um ficheiro chamado **`.dockerignore`** na mesma pasta do seu `Dockerfile` (funciona igual ao `.gitignore`). Isso evita que pastas pesadas ou sensíveis da sua máquina sejam enviadas para o Docker durante o `COPY . .`, deixando o build muito mais rápido e seguro:

```text
node_modules
dist
.git
.env
npm-debug.log
```