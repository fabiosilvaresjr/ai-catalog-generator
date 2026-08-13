# AI Catalog Generator

Um sistema web projetado para automatizar a criação de catálogos de produtos. O usuário insere dados brutos (nome, categoria e características básicas), e o sistema processa essas informações para gerar descrições comerciais persuasivas e otimizadas para SEO.

Este projeto é um laboratório prático para aprofundamento e consolidação de conhecimentos no ecossistema **PHP/Laravel**, aplicando conceitos sólidos de arquitetura MVC, banco de dados relacional e consumo de APIs externas.

## Stack Tecnológica

* **Linguagem:** PHP 8.x
* **Framework:** Laravel
* **Banco de Dados:** PostgreSQL (via WSL/Docker)
* **Arquitetura:** MVC (Model-View-Controller) e Service Pattern

## Aprendizados e Arquitetura

Vindo de uma base em Java/Spring Boot e Node.js, este projeto tem sido fundamental para mapear e adaptar conceitos de injeção de dependências, ORM e rotas para o padrão Laravel.

**Destaque Técnico: Resiliência de API (Fallback de Segurança)**
Durante a integração inicial com o serviço de Inteligência Artificial para geração de textos, o sistema lidou com indisponibilidades e restrições de endpoint da API terceira (erros 404/500). 

Para garantir a estabilidade do back-end, foi implementado um mecanismo de Fallback. A aplicação isola a chamada HTTP dentro de um Service; caso a API externa falhe, o sistema intercepta a exceção (`try/catch`), registra a falha nos logs nativos do Laravel para auditoria e gera uma resposta padrão. Isso impede o travamento da aplicação, garantindo que o fluxo de gravação no banco de dados continue funcionando.

## Desenvolvimento

O projeto está em evolução contínua. Abaixo estão meus passos já concluídos e os próximos desafios arquiteturais e de interface:

### Fase 1: Fundação Back-end 
- [x] Configuração do ambiente (WSL, PostgreSQL, VS Code).
- [x] Estruturação do banco de dados com Migrations e Models (`Product`).
- [x] Criação de Controllers para recebimento de requisições.
- [x] Implementação do Service Pattern para isolar lógicas de negócios.
- [x] Tratamento de exceções e Fallback de Segurança em requisições externas.

### Fase 2: Front 
- [ ] Construção do Front-end (React ou interface fluida com Vanilla JS + Bootstrap).
- [ ] Integração Front/Back via Fetch API ou Axios.
- [ ] Indicadores de carregamento (Loaders) enquanto a requisição HTTP é processada.

### Fase 3: Ideias que quero implementar
- [ ] **Filas (Queues & Jobs):** Transferir a chamada da IA para um processamento em background nativo do Laravel, liberando a resposta imediata para o usuário.
- [ ] **Dashboard:** Criar uma listagem (GET) para exibir o histórico de todos os produtos gerados e salvos no PostgreSQL, provavelmeente um CRUD completo com modelos.
- [ ] **Autenticação:** Proteger o endpoint de criação de produtos utilizando Laravel Sanctum (adapação a linguagem).
- [ ] **Refinamento da IA:** Ajustar as credenciais da API Cloud para retomar a geração dinâmica de conteúdo via LLM.

---
*Projeto desenvolvido como portfólio técnico e roteiro prático de estudos.*