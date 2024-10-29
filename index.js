const cors = require('cors');
const express = require('express');
const admin = require('firebase-admin');

const serviceAccount {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
}; 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

const db = admin.firestore();

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

// Modificação na rota raiz para retornar o vetor de cartões

// Rota específica para obter os cartões (opcional, pois agora também está na rota '/')
app.get('/cartoes', async (req, res) => {
    try{
        const response = await db.collection('cartoes').get();
        const cartoes = response.docs.map(doc => doc.data({
            id: doc.id, ...doc.data()
        }));
            console.log(cartoes);
            res.status(200).json({cartoes}); // Retorna o vetor de cartões
        console.log('Cartões enviados'); // Mensagem de sucesso
    } catch (e){
        console.log(e);
        res.status(500).json({ error: 'erro' + e });
        console.log('Erro' + e);
    }
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