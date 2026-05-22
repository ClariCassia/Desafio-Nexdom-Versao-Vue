# Desafio Técnico Nexdom - Versão Vue.js

Versão alternativa do desafio técnico da Nexdom, desenvolvida como bônus utilizando **Vue.js 3**, **TypeScript**, **Pinia** e **Tailwind CSS**.

Esta aplicação reproduz o fluxo de validação de autorizações de procedimentos médicos, com foco em experiência de usuário, interface responsiva e organização moderna de frontend.

---

##  ▶ Sobre esta versão

O desafio técnico original foi solicitado em Java Web, utilizando Servlets, JSP, JDBC, H2, Liquibase e Maven.

**🔗 Repositório Principal (Java):** [Clique aqui para acessar o repositório com o desafio oficial](https://github.com/ClariCassia/desafio-tecnico-nexdom)

Como a descrição da vaga também mencionava conhecimentos em Vue.js, esta versão foi desenvolvida como complemento ao projeto principal, com o objetivo de demonstrar domínio em frontend moderno, estruturação de layouts globais, componentização para reaproveitamento de código, gerenciamento de estado e construção de interfaces reativas

> Esta versão Vue.js é uma entrega bônus e não substitui a implementação principal em Java.


---

## ▶ Demonstração Online

A aplicação está publicada na Vercel e para acessar
[clique aqui](https://desafio-nexdom-versao-vue-clarissa.vercel.app/)

---

## ▶ Funcionalidades

A aplicação permite:

- Realizar solicitação de autorização de procedimento médico.
- Validar automaticamente se o procedimento é autorizado ou não.
- Aplicar regras de elegibilidade com base em:
  - Código do procedimento;
  - Idade do paciente;
  - Sexo do paciente.
- Exibir o parecer da autorização.
- Apresentar justificativa administrativa para solicitações não autorizadas.
- Consultar o histórico de solicitações realizadas.
- Persistir dados localmente (`localStorage`), garantindo que o histórico de auditoria não seja perdido ao recarregar a página.
- Utilizar uma interface responsiva para desktop e mobile.

---

## ▶ Cenários de Teste Disponíveis

Para facilitar a validação manual da aplicação, utilize os cenários abaixo:

| Procedimento | Idade | Sexo |  Status Esperado  | Justificativa                                     |
| ------------ | ----: | :--: | :---------------: | ------------------------------------------------- |
| **1234**     |    20 |  M   |   ✅ Autorizado   | Procedimento autorizado com sucesso.              |
| **4567**     |    20 |  M   |   ✅ Autorizado   | Procedimento autorizado com sucesso.              |
| **4567**     |    30 |  F   |   ✅ Autorizado   | Procedimento autorizado com sucesso.              |
| **6789**     |    10 |  M   |   ✅ Autorizado   | Procedimento autorizado com sucesso.              |
| **6789**     |    10 |  F   | ❌ Não Autorizado | Procedimento não permitido para o sexo informado. |

---

## ▶ Tecnologias Utilizadas

- **Nuxt 3** (Framework)
- **Vue.js 3** (Composition API)
- **TypeScript**
- **Pinia** (Gerenciamento de Estado)
- **Tailwind CSS** (Estilização Utilitária Responsiva)
- **Vercel** (Deploy)

## ▶ Como Executar Localmente
### Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

 - Node.js
 - npm

### 1. Clonar o repositório

```bash
git clone https://github.com/ClariCassia/Desafio-Nexdom-Versao-Vue.git
cd Desafio-Nexdom-Versao-Vue
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Executar o projeto

```bash
npm run dev
```

### 4. Acessar a aplicação

Após executar o projeto, o Nuxt exibirá no terminal a URL local da aplicação.

Normalmente, a aplicação ficará disponível em:

```bash
http://localhost:3000/
```

Caso a porta 3000 esteja em uso, verifique a porta indicada pelo Nuxt no terminal.

##  ▶ Observação Final

Esta versão foi desenvolvida como complemento ao desafio técnico original, com o objetivo de demonstrar também conhecimentos em desenvolvimento frontend moderno.

A aplicação principal em Java atende aos requisitos obrigatórios do desafio, enquanto esta versão Vue.js apresenta uma alternativa mais moderna para a camada de interface e experiência do usuário.

## 

Desenvolvido por Clarissa de Cássia Gama Lacerda.
