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
- O sistema já deve trazer a lista de cidades e UF, possibilitando apenas a seleção pelo usuário.
