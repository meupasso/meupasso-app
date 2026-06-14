-- Extensão para UUID
create extension if not exists "uuid-ossp";

-- Tabela de usuários
create table users (
  id uuid primary key default uuid_generate_v4(),
  nome text not null,
  email text unique not null,
  sessoes_gratis_usadas integer not null default 0,
  assinante boolean not null default false,
  created_at timestamp with time zone default now()
);

-- Tabela de exercícios
create table exercicios (
  id uuid primary key default uuid_generate_v4(),
  titulo text not null,
  linguagem text not null,
  modulo text not null,
  nivel text not null check (nivel in ('basico', 'intermediario', 'avancado')),
  descricao text not null,
  objetivo text not null,
  permitidos text[],
  proibidos text[],
  erros_comuns text[],
  exemplos text,
  created_at timestamp with time zone default now()
);

-- Tabela de conversas
create table conversas (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  exercicio_id uuid references exercicios(id) on delete cascade,
  created_at timestamp with time zone default now()
);

-- Tabela de mensagens
create table mensagens (
  id uuid primary key default uuid_generate_v4(),
  conversa_id uuid references conversas(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  conteudo text not null,
  created_at timestamp with time zone default now()
);

-- RLS
alter table users enable row level security;
alter table exercicios enable row level security;
alter table conversas enable row level security;
alter table mensagens enable row level security;

-- Policies
create policy "Usuário vê só seus dados" on users
  for select using (auth.uid() = id);

create policy "Exercícios visíveis para todos" on exercicios
  for select using (true);

create policy "Usuário vê só suas conversas" on conversas
  for select using (auth.uid() = user_id);

create policy "Usuário vê só suas mensagens" on mensagens
  for select using (
    exists (
      select 1 from conversas
      where conversas.id = mensagens.conversa_id
      and conversas.user_id = auth.uid()
    )
  );
