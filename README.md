# PublicSoft

Desenvolvendo Soluções para o Setor Público

## Desafio Fullstack - Seleção 202104

A PublicSoft é uma GovTech referência em prover soluções inovadoras para o setor público. Ao longo de 15 anos, temos desenvolvido softwares que atendem a diferentes necessidades de gestão em órgãos públicos em diferentes estados do Nordeste. Possuimos um ambiente moderno e agradável de trabalho que permite liberar todo seu potencial.

Com o nosso desafio queremos conhecer mais sobre seu estilo de programação e seus conhecimentos sobre padrões e convenções, mantenha o projeto mais legível e manutenível que conseguir sem deixar de mostrar onde suas habilidades que mais se destacam.

## Objetivo

Criar um sistema controle de contratos tendo como back-end uma REST API em Nodejs utilizando o banco de dados Postgresql e com front-end em Angular. Conforme história de usuário abaixo:

> Como gestor de contratos preciso controlar os vencimentos dos meus contratos para não perder os prazos de renovação.

**Critérios de aceite**
- Deve ser possível cadastrar os prestadores de serviços (CRUD - com soft delete)
- Deve ser possível cadastrar os contratos (CRUD - com soft delete)
- Deve ser permitido visualizar os totais(contagem) de contratos por situação:
  - “Vencem em 30 dias”
  - “Vencem em 15 dias”
  - “Vencem em 7 dias”
  - “Vencem hoje”
- Deve ser possível receber uma notificação quando o prazo estiver próximo do vencimento (7 dias antes do vencimento)
- Deve ser possível visualizar o tempo restante de cada contrato
- Deve ser possível filtrar a lista de contratos do dashboard a partir do clique as
situações:
  - “Vencem em 30 dias”
  - “Vencem em 15 dias”
  - “Vencem em 7 dias”
  - “Vencem hoje”
- Deve ser permitido cadastrar um endereço caso o CEP não seja encontrado
- O sistema já deve trazer a lista de cidades e UF, possibilitando apenas a seleção pelo usuário

**O sistema deverá ter as seguintes telas:**

**Cadastro prestador**
- Tipo (pessoa física ou pessoa jurídica)
- CPF ou CNPJ (dependendo do tipo selecionado)
- Nome ou Razão Social (dependendo do tipo selecionado)
- Email
- Endereço
  - CEP (fazer uso da api viacep)
  - Logradouro
  - Número
  - Complemento
  - Bairro
  - Cidade (lista pré-cadastrada - apenas seleção)
  - UF (lista pré-cadastrada - apenas seleção)

**Cadastro contrato**
- CPF ou CNPJ do prestador (consultar no cadastro de prestador)
- Nome ou Razão Social (apenas visualização)
- Serviço Prestado
- Vigência do contrato
  - Data de início
  - Data de fim

**Dashboard**
- Totais por situação (prazo para vencimento)
- Prazo restante de cada contrato (em dias)
- Gráfico do tipo donuts (para representar a quantidade de contratos por vencimento)
- Apresentar de forma gráfica o prazo restante dos contratos em dias (progress bar)

**API**
- Deve consumir a api do viacep e entregar os dados para o frontend (o viacep não ser consumido diretamente pelo frontend)
- Deve fazer uso dos verbos HTTP e os status code HTTP

## Bônus

É esperado que desenvolvedores plenos realizem ao menos 3 itens dos bônus:

- Interface bonita e intuitiva
- Utilização do docker
- Implementação de testes
- Permitir pesquisa avançada (combinação entre os filtros - operadores “e”, “ou”, “maior que” e “menor que”)
- Autenticação usando JWT
- Utilização de TypeScript
- API com swagger

## Requisitos do desafio

- Feito com tecnologias da stack proposta podendo usar bibliotecas e templates (sugestão de biblioteca - https://ng.ant.design/docs/introduce/en)
- Seguir padrões e convenções já estabelecidas no mercado
- Criar um banco normalizado
- Ter paginação
- Ter documentação (README com instruções breves de configuração da aplicação frontend e backend e uma visão geral do aplicativo implementado)
- Disponibilizar código no github (enviar o link do projeto quando finalizar)

## Critérios de avaliação

- Verificação das funcionalidades
- Responsividade
- Organização do código
- Aderência aos padrões e convenções
- Normalização do banco
- Nível de conhecimentos nos frameworks

## Prazo de entrega

5 dias (a partir da data de contato). Sucesso e até breve.
