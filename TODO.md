# TODO - Projeto Frontend React SPA com PokéAPI

## Passos para Implementação

- [x] **Inicializar Projeto com Vite**

  - Criar novo projeto React usando Vite no diretório atual (c:/UTF/full/projeto1).
  - Comando: `npm create vite@latest . -- --template react`

- [x] **Instalar Dependências**

  - Instalar Material-UI: `npm install @mui/material @emotion/react @emotion/styled`
  - Verificar se React e outras dependências estão instaladas.

- [x] **Criar Estrutura de Pastas**

  - Criar pasta `src/components`
  - Criar pasta `src/contexts`

- [x] **Implementar Contexto SearchContext**

  - Criar arquivos: `src/contexts/searchReducer.js`, `src/contexts/SearchContextObject.js`, `src/contexts/SearchProvider.jsx`, `src/hooks/useSearch.js`
  - Usar useReducer para gerenciar estado: loading, pokemonData, error
  - Definir ações: SEARCH_START, SEARCH_SUCCESS, SEARCH_ERROR
  - Fornecer função para buscar Pokémon via API
  - Adicionar função para limpar erro

- [x] **Criar Componente SearchForm**

  - Arquivo: `src/components/SearchForm.jsx`
  - Formulário com TextField (Material-UI) para nome/ID do Pokémon
  - Validação: Campo obrigatório, mostrar erro se vazio
  - Botão para iniciar busca, chamar função do contexto
  - Limpar mensagem de erro da API ao digitar

- [x] **Criar Componente PokemonCard**

  - Arquivo: `src/components/PokemonCard.jsx`
  - Exibir nome, imagem, tipos, altura, peso, habilidades, estatísticas, fraquezas
  - Player de áudio para cries dos Pokémon
  - Usar Card do Material-UI

- [x] **Criar Componente ErrorMessage**

  - Arquivo: `src/components/ErrorMessage.jsx`
  - Mostrar mensagens de erro (ex.: Pokémon não encontrado, erro de rede)
  - Usar Alert do Material-UI

- [x] **Integrar no App.jsx**

  - Envolver com SearchContext Provider
  - Renderizar SearchForm, PokemonCard (se sucesso), ErrorMessage (se erro)
  - Tema personalizado com cores Pokémon

- [x] **Mover Estilos Inline para CSS**

  - Criar classes CSS em `App.css` para estilos do App, SearchForm e PokemonCard
  - Substituir `sx` por `className` onde possível

- [x] **Testar Aplicação Localmente**

  - Executar `npm run dev`
  - Testar busca válida e inválida, validação, player de áudio

- [x] **Alterar Busca para Substring e Múltiplos Resultados**

  - Modificar SearchProvider para buscar lista de Pokémon filtrada por substring
  - Alterar reducer para suportar lista de Pokémon
  - Atualizar PokemonCard para renderizar múltiplos cards se lista
  - Limitar resultados a 10 para performance

- [ ] **Gerar Build e Deploy**

  - Comando: `npm run build`
  - Hospedar em Netlify ou similar

- [ ] **Configurar Git**
  - Inicializar repositório: `git init`
  - Adicionar remote: `git remote add origin https://github.com/Edumachdo/poke_projeto1_fullstack.git`
  - Commits incrementais após cada passo
  - Push inicial após setup

## Melhorias de Frontend para Aparência Profissional

- [x] Adicionar cabeçalho com título e subtítulo explicativo
- [x] Usar Grid e Box do Material-UI para melhor organização e espaçamento dos componentes
- [x] Melhorar o cartão do Pokémon com bordas, sombras e tipografia aprimorada
- [x] Ajustar o formulário de busca para alinhamento e espaçamento melhores
- [x] Adicionar rodapé simples com créditos ou informações adicionais
- [x] Garantir responsividade para diferentes tamanhos de tela
- [x] Usar paleta de cores agradável e consistente
- [x] Instalar @mui/icons-material para ícones
- [x] Corrigir importação do CSS customizado
- [x] Adicionar ícones para cada tipo nas fraquezas
