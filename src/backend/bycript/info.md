
## bcrypt
O bycript é uma ferramenta focada em segurança que resolve um problema crucial: Nunca salvar senhas em texto puro no banco de dados.


### Teoria
O Algoritmo de via única(One-way hash) -> Transforma sua senha (ex: 123456) em uma string embaralhada irreconhecível (ex: 28cjkvr939%4). è matematicamente inviável
fazer o caminho inverso.

### Salting (Tempero): Antes de gerar o hash, o bcrypt gera uma string aleatória chamada Salt e a mistura com a senha.
Isso garante que se dois usuários tiverem a mesma senha (123456), os hashes finais guardados o banco serão completamente diferentes, protegendo o sistema contra ataques.

### Custo de Processamento
Você define o custo de Processamento, ou seja, quanto maior o custo acima de (10), mais tempo o processador leva para gerar o hash. 
Torna o sistema lento para um hacker que tentar adivinhar milhões de senhas por segundo (atauqe de força bruta), mas é imperceptível para um 
usuário comum fazendo login.

npm install bcrypt



exemplo:
import bcrypt from "bcryptjs"
const password = 'sua_senha'
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt)
