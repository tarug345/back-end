const cors = require('cors');
const express = require('express');

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

// Vetor de objetos com os cartões no backend
const cartoes = [
    {
        nome: 'Cartão 1',
        valor: '19,20',
        descricao: 'Descrição do Cartão 1',
        imagem: 'https://assets.mubicdn.net/images/artworks/605435/images-original.png?1686656725'
    },
    {
        nome: 'Cartão 2',
        valor: '29,99',
        descricao: 'Descrição do Cartão 2',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrLJ6IKmikTJtwQBlCDbGxbtq5jkV_bdl8DQ&s'
    },
    {
        nome: 'Cartão 3',
        valor: '39,50',
        descricao: 'Descrição do Cartão 3',
        imagem: 'https://f.i.uol.com.br/fotografia/2020/02/10/15813740235e41da475cca0_1581374023_3x2_md.jpg'
    },
    {
        nome: 'Cartão 4',
        valor: '55,55',
        descricao: 'Descrição do Cartão 4',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXlikNbPxUbc5Bfgt2XKylnWVQ5BeKaVYY0A&s'
    },
    {
        nome: 'Cartão 5',
        valor: '2,99',
        descricao: 'Descrição do Cartão 5',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7hykkOSbTt9XA1_D1J8_kU9kcSMwYXdnIQ&s'
    },
    {
        nome: 'Cartão 6',
        valor: '12,33',
        descricao: 'Descrição do Cartão 6',
        imagem: 'https://portal6.com.br/wp-content/uploads/2021/08/zeca.png'
    }
];
// Modificação na rota raiz para retornar o vetor de cartões

/* app.get('/', (req, res) => {
    res.status(200).json(cartoes); */ // Retorna o vetor de cartões quando acessa a rota '/'
/*     console.log('Cartões enviados');
}); */

// Rota específica para obter os cartões (opcional, pois agora também está na rota '/')
app.get('/cartoes', (req, res) => {
    res.status(200).json({cartoes}); // Retorna o vetor de cartões
    console.log('01');
});
// Rota para criar um novo cartão
app.post('/cartoes', (req, res) => { //antes era "/falas"
    const { nome, valor, descricao, imagem } = req.body;

    /* const novoCartao = { nome, valor, descricao, imagem }; */

    cartoes.push({nome: nome, valor: valor, imagem: imagem});
    // console.log('Novo cartão criado');
    res.status(201).json({ mensagem: 'Cartão criado'}); // Retorna o novo cartão criado
  });
  
  // Rota para atualizar um cartão existente
  app.put('/cartoes/', (req, res) => { //antes era "/cartoes/:id"
    /* const id = req.params.id;
    const { nome, valor, descricao, imagem } = req.body;
    const cartao = cartoes.find((cartao) => cartao.id === parseInt(id));
    if (!cartao) {
      res.status(404).json({ mensagem: 'Cartão não encontrado' });
    } else {
      cartao.nome = nome;
      cartao.valor = valor;
      cartao.descricao = descricao;
      cartao.imagem = imagem;
      res.status(200).json(cartao); // Retorna o cartão atualizado
      console.log('Cartão atualizado');
    } */

    const numero = req.body.numero;
    const mensagem = req.body.mensagem;
    vetor[numero].mensagem = mensagem;
    console.log(vetor);
    req.status(201).json({ mensagem: 'Cartão atualizado'});
  });
  
  // Rota para excluir um cartão existente
  app.delete( '/cartoes', (req, res) => {
 /* const id = req.params.id;
    const cartao = cartoes.find((cartao) => cartao.id === parseInt(id));
    if (!cartao) {
      res.status(404).json({ mensagem: 'Cartão não encontrado' });
    } else {
      cartoes.splice(cartoes.indexOf(cartao), 1);
      res.status(200).json({ mensagem: 'Cartão excluído' });
      console.log('Cartão excluído');
    } */
    const {cartao} = req.body;
    cartoes.splice(cartao, 1);
    console.log(cartao + ' excluído');
    res.status(201).json({mensagem: 'Cartão excluído' + cartao});
  });
  
  app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
  });