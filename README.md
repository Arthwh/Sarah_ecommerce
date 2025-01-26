# Sarah E-commerce

Projeto de e-commerce para a venda de roupas e calçados, permitindo que os clientes comprem produtos online e os administradores gerenciem o estoque, pedidos e personalização da landing page.

## Status do Projeto

🚧 Em desenvolvimento

### Funcionalidades:

- Cadastro de produtos com variantes (cor, tamanho);
- Upload de imagens e reutilização de imagens entre variantes;
- Edição da Landing Page (Pode-se adicionar componentes pré-definidos e mudar a ordenação);
- Listagem dos produtos;
- Página de produto específico com informações detalhadas e escolha de variantes;
- Filtragem por categorias e subcategorias;
- Landing Page funcional;
- Sistema de login;
- Carrinho de compras funcional (Pedido já é gerado, porém sem integração com API de pagamentos);
- Wishlist funcional;
- Visualização dos pedidos;
- Autenticação e controle de acesso por nível de usuário (cliente, admin, root);
- Registro de logs de acesso;

## Tecnologias Utilizadas

- **Front-end:** EJS (Template Engine), JavaScript, TailwindCSS, HTML, CSS
- **Back-end:** Node.js (Express)
- **Banco de Dados:** PostgreSQL
- **Outras Ferramentas:** Multer (upload de arquivos)

## Arquitetura do Projeto

O projeto segue uma arquitetura organizada em camadas para garantir separação de responsabilidades e facilidade de manutenção:

- **Controller:** Responsável por receber as requisições HTTP, chamar os serviços necessários e retornar as respostas apropriadas.
- **Service:** Contém a lógica de negócios da aplicação, garantindo a aplicação das regras e a interação com os repositórios.
- **Repository:** Responsável pela comunicação com o banco de dados, realizando operações de CRUD utilizando o Sequelize ORM.
- **Routes:** Define os endpoints da API e direciona as requisições para os controllers apropriados.
- **Middleware:** Contém funções intermediárias para autenticação, logs e validação de dados.
- **Public:** Contém arquivos estáticos, como imagens, CSS e JavaScript.
```

## Contato

Projeto desenvolvido por **Arthur e equipe**. Para dúvidas ou sugestões, entre em contato pelo GitHub: [Seu Perfil](https://github.com/seuusuario)
