const cors = require('cors');
const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = {
  type: "service_account",
  project_id: "banco-portfolio",
  private_key_id: "5c2c80b81814b9e76da557f9290ab1a0a9b580af",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDsavY+WyHs/Y/T\nUoClVUuQmW9vhKwAvseLGGRfSBL/ByRE0ObiYIjEv06HQG+dPcN3tey06x7euxfw\nhaHkxyqG5uC6ntFAa/Vo81TvDq/yGeLbz7wdwa/BylwVgKARlUXuXANGCukIaw/L\nnva+aAR/deFbvORm+Vh1FyHx7MPMxg83ZKLyLowueNLAJfAotgp4giYmXTjn/tdX\n2qG8hENvApRzYN8iYf/V2Vw2mvzq/Adl3Kh+qMKje3PMWfkoeyZcOFZbgVYyCNlc\nHLe8Hrx7ayRmF6495rJKK2oJ0Yx2wK/ISFB6u1Sn1U0ygiMaOGR09z7cuawL1n+l\ncrbcNSx9AgMBAAECggEAHgztflkSm59SSgPlXr6UA44BPF1SiKi3T+6aiYLtiTWU\n7ltYUaOAFvQTLP1rgoLghuWcsBVnv9trrFKsFJqdRPbxTz9TLTtbvwqY++bzxdP1\nAkgqKuUc7EbGxCPslLeS4zyWXO+TldKX+COdTPAHTFVFPyYoKQ+eJwn48lmMPMmc\nfd2zYQAnCnmoRPId6tSjzvu3FywV7srNr3vvovJlqq2jpKqw7ENj6wQ9/fIxltvj\nRA0WD16xUEYssYOb3EO6TNxAA/ommd+UMQLLMKvK2frhrlgAbFToX7R/7YlSSWVT\nISGLuqA3TpJOIXumH2LrEsiniYUNO9MbJ70WJitKCQKBgQD/GypS2lcV7ED6ObLW\n7QK/6bI5pjreo/iJNIgKb1WXxI3mMM7UMy4zdHdlLHD1lFxm+pu/dY8Xl6J2I1N4\nTNIx8YZMQUJeHCrWIqk5JrGJywfA6Cq06CjGKahAxw6CTJs1fRhsCrzZunpjbig5\nKxlQmDvpqe/yUvOu8plRTMqa9QKBgQDtPwhnwAaaQ6Qc0o8w9Z2fELp0qMlQGuYX\nfR+matBiG6U3/ReJetn3CdTuSH1HY3w+SbMO/Xnd+Bxa4sCvfy3L+rGFVgVkNod2\noCndFXBJKxdodqT4R6I6IpcxpjtN/1l7arBkZcr96Soe8kswsxwFY6Smn5zbicec\nZBPINyZmaQKBgQCruEqGGQkz7aNTjJFQ0ZvfOV1KJxZLlg6PtTe55nW0Qo/OGp6v\nAoCgDE7uYLrs5GBKxXkfqO+YTu8CHQdr3DJFgjIHlIorNUS0fgJxQRWTDoL6nI1a\n10fTFGl4qUWf+hckKz/MQnIbEcaetaEH0nYo5UC3KjglYyc7ZXxE2K8tHQKBgQDd\nE1WzyF7etZViPlusldQxe5ckSnx9pvMuhCxQGUzhfz1wdOnP9KjT6VeATBBhy7Tl\nHiw7FbzQOPnDP3Wqk+qLH6r4wvX3MlD9G7anC+k8ZWlEsPp9WdM0NTOK0oqE3iP2\nO67vf2OvQ+06NTIXyW+dHgM6OZYjhbp6Y0+DzNB9sQKBgHCdLLLBffKCMdlgPnsM\n3tAug/zOtfaSNmyaYHB8pUntiZBB+0yVj1Bs4e2SVwnDR4S+fTBCsQU+klQoisLO\nPRNCom2r9XenpZ+HJgRGg7KsEfmy3CyIu2wLERFrx9lD5okT/8q5KN2OmEXKd55L\n26iMWcQTUE3kr3vXkpB3LEbr\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-r51tn@banco-portfolio.iam.gserviceaccount.com",
  client_id: "113870966862177870878",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-r51tn%40banco-portfolio.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); //ela conytrola o BD

const app = express();
/* const porta = 3000; */

app.use(cors());
app.use(express.json());

// Modificação na rota raiz para retornar o vetor de cartões

// Rota específica para obter os cartões (opcional, pois agora também está na rota '/')
app.get('/cartoes', async (req, res) => {
  try {
    const response = await db.collection('cartoes').get();
    const cartoes = response.docs.map(doc => doc.data({
      id: doc.id, ...doc.data()
    }));
    console.log(cartoes);
    res.status(200).json({ cartoes }); // Retorna o vetor de cartões
    console.log('Cartões enviados'); // Mensagem de sucesso
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'erro' + e });
    console.log('Erro' + e);
  }
});
// Rota para criar um novo cartão
app.post('/cartoes', async (req, res) => {
  const { nome, valor, descricao, imagem } = req.body;
  if (!nome) {
    res.status(400).json({ message: 'nome do cartão e obrig' });
    console.log('nao');
  } else if (!valor) {
    res.status(400).json({ message: 'valor do cartão e obrig' });
    console.log('nao');
  } else if (!descricao) {
    res.status(400).json({ message: 'descricao do cartão e obrig' });
    console.log('nao');
  } else if (!imagem) {
    res.status(400).json({ message: 'imagem do cartão e obrig' });
    console.log('nao');
  } else {
    try {
      const novoCartao = await db.collection('cartoes').add({
        nome,
        valor,
        imagem,
        descricao,
        criadoEm: admin.firestore.FieldValue.serverTimestamp()
      });
      res.status(201).json({ message: "novo cartao com id", id: novoCartaoRef.id });
      console.log('Cartão criado', novoCartaoRef.id);
    } catch (error) {
      console.log('erro ao cadastrar', error);
      res.status(500).json({ error: 'erro ao cadastrar' });
    }
    cartoes.push({ nome, valor: valor, imagem: imagem, descricao: descricao });
    res.status(201).json({ mensagem: 'Cartão criado' }); // Retorna o novo cartão criado
  }
});

// Rota para atualizar um cartão existente
app.put('/cartoes', async (req, res) => {
  const { id, nome, valor, img } = req.body;
  if (!id) {
    res.status(400).json({ message: 'id do cartão não fornecido' });
    console.log('nao');
  } else{
      try {
        const cartaoRef = db.collection('cartoes').doc(id);
        const doc = await cartaoRef.get();
        if (!doc.exists) {
          res.status(400).json({ message: 'cartão com id' + id + 'inexistente' });
          console.log('nao');
      } else {
        const dadosAtualizados = {};
        if (nome) dadosAtualizados.nome = nome;
        if (valor) dadosAtualizados.valor = valor;
        if (img) dadosAtualizados.img = img;
        await cartaoRef.update(dadosAtualizados);
        res.status(200).json({
          message: 'cartão com id' + id
            + 'atualizado'
        });
        console.log('cartão com id' + id + 'atualizado');
      }
    } catch (e) {
      console.log('erro', e);
      res.status(500).json({ message: 'erro' });
    }
    }
});

// Rota para excluir um cartão existente
app.delete('/cartoes', async (req, res) => {
  const id = req.body.cartao;

  if (!id) {
    res.status(400).json({ message: 'id do cartão e obrig' });
    console.log('erro id');
  } else {
    try {
      const cartaoRef = db.collection('cartoes').doc(id);
      const doc = await cartaoRef.get();
      if (!doc.exists) {
        res.status(400).json({ message: 'cartão com id' + id + 'inexistente' });
        console.log('erro achar');
      } else {
        await cartaoRef.delete();
        res.status(200).json({
          message: 'cartão com id' + id
            + 'deletado'
        });
        console.log('cartão com id' + id + 'deletado');
      }

    } catch (e) {
      console.log('erro', e);
      res.status(500).json({ message: 'erro' });
    }
  }
});


module.exports = app;

  app.listen(3000, () => {
    console.log('rodando na porta 3000');
  });