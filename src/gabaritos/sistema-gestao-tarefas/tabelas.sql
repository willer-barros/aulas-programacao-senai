CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(255) NOT NULL
);

CREATE TABLE colaboradores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cargo VARCHAR(50) NOT NULL
);

CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    colaborador_id INT REFERENCES colaboradores(id) ON DELETE CASCADE
);

CREATE TABLE agendamentos (
    id SERIAL PRIMARY KEY,
    tarefa_id INT REFERENCES tarefas(id) ON DELETE CASCADE,
    data_entrega TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'Pendente'
);

-- População Inicial (mínimo 3 registros por tabela)
INSERT INTO usuarios (nome, email, senha, cpf) VALUES
('Admin', 'admin@task.com', '123456', '123.456.789-00'),
('Carlos Silva', 'carlos@task.com', '123456', '987.654.321-11'),
('Mariana Lima', 'mariana@task.com', '123456', '456.789.123-22');

INSERT INTO colaboradores (nome, email, cargo) VALUES
('Ana Costa', 'ana@empresa.com', 'Desenvolvedora'),
('Bruno Rocha', 'bruno@empresa.com', 'Designer'),
('Carla Souza', 'carla@empresa.com', 'Gerente de Projetos');

INSERT INTO tarefas (titulo, descricao, colaborador_id) VALUES
('Criar Layout', 'Desenhar mockup no Figma', 2),
('Desenvolver API', 'Criar endpoints do backend', 1),
('Reunião de Alinhamento', 'Alinhar prazos da sprint', 3);

INSERT INTO agendamentos (tarefa_id, data_entrega, status) VALUES
(1, '2026-11-01 14:00:00', 'Pendente'),
(2, '2026-11-05 18:00:00', 'Em Andamento'),
(3, '2026-10-25 10:00:00', 'Concluído');
