const cors = require('cors');
const express = require('express');

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

// Vetor de objetos com os cartões no backend
const cartoes = [
    {
        nome: 'Silvia',
        valor: '19,20',
        descricao: 'Descrição do Cartão 1',
        img: 'https://driftforu.com/cdn/shop/products/image_0d0ed780-67c6-454e-8225-d01518819aa0.jpg?v=1710955863&width=1445'
    },
    {
        nome: 'Messi careca',
        valor: '29,99',
        descricao: 'Descrição do Cartão 2',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrLJ6IKmikTJtwQBlCDbGxbtq5jkV_bdl8DQ&s'
    },
    {
        nome: 'Neymar',
        valor: '39,50',
        descricao: 'Descrição do Cartão 3',
        img: 'https://f.i.uol.com.br/fotografia/2020/02/10/15813740235e41da475cca0_1581374023_3x2_md.jpg'
    },
    {
        nome: 'O vasco vai me matar',
        valor: '55,55',
        descricao: 'Descrição do Cartão 4',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXlikNbPxUbc5Bfgt2XKylnWVQ5BeKaVYY0A&s'
    },
    {
        nome: 'Ribamar',
        valor: '2,99',
        descricao: 'Descrição do Cartão 5',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7hykkOSbTt9XA1_D1J8_kU9kcSMwYXdnIQ&s'
    },
    {
        nome: 'Chico Buarque',
        valor: '12,33',
        descricao: 'Descrição do Cartão 6',
        img: 'https://portal6.com.br/wp-content/uploads/2021/08/zeca.png'
    }
];
// Modificação na rota raiz para retornar o vetor de cartões

// Rota específica para obter os cartões (opcional, pois agora também está na rota '/')
app.get('/cartoes', (req, res) => {
    res.status(200).json({ cartoes }); // Retorna o vetor de cartões
    console.log('Cartões enviados');
});
// Rota para criar um novo cartão
app.post('/cartoes', (req, res) => { //antes era "/falas"
    const { nome, valor, descricao, imagem } = req.body;
    cartoes.push({ nome, valor: valor, imagem: imagem, descricao: descricao});
    res.status(201).json({ mensagem: 'Cartão criado'}); // Retorna o novo cartão criado
  });
  
  // Rota para atualizar um cartão existente
  app.put('/cartoes', (req, res) => { //antes era "/cartoes/:id"

    const numero = req.body.numero;
    const mensagem = req.body.mensagem;
    cartoes[numero].mensagem = mensagem;
    console.log(vetor);
    res.status(201).json({ mensagem: 'Cartão atualizado'});
  });
  
  // Rota para excluir um cartão existente
  app.delete( '/cartoes', (req, res) => {
    const {cartao} = req.body;
    cartoes.splice(cartao, 1);
    console.log(cartao + ' excluído');
    res.status(201).json({mensagem: 'Cartão excluído' + cartao});
  });
  
  app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
  });