const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const sequelize = require('./config/db')
const Usuario = require('./models/usuario.model')
const Produto = require('./models/produto.model')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine(
    'handlebars', 
    exphbs.engine( {defaultLayout: false} )
);
app.set(
    'view engine', 
    'handlebars'
);

app.get(
    '/exercicio4',
     async (req, res) => {
        await Produto.create({
            nome: 'Notebook',
            preco: 3500.00
        });

         await Produto.create({
            nome: 'Celular',
            preco: 2500.00
        });

         await Produto.create({
            nome: 'Tablet',
            preco: 1500.00
        });

        const Produtos = await Produto.findAll();
        console.log(Produtos);
        res.send('Produtos criados com sucesso!');
     }
);

app.get(
    '/exercicio5',
     async (req, res) => {   
    const id = 2; 
    const produto = await Produto.findByPk(id);

    if (!produto) {
        console.log('Produto não encontrado');
        res.send('Produto não encontrado');
    }else{
        console.log('Nome:', produto.nome);
        console.log('Preço:', produto.preco);
        res.send('Produto encontrado!');
    }
}
);

app.get('/exercicio6',
    async (req, res) => {
    const id = 1;
    const produto = await Produto.findByPk(id);
    produto.preco = produto.preco + 500;
    await produto.save();
    console.log(produto.preco);
    res.send('Preço do produto atualizado com sucesso!');
}
);

app.get(
    '/exercicio6/deletar',
    async (req, res) => {
    const produt = await Produto.findByPk(1);
    await produt.destroy();
    const produtosSobra = await Produto.findAll({raw:true});
    res.send('produto deletado com sucesso!');
}
);

app.get(
    '/produtos',
    async(req, res) => {
        const produtos = await Produto.findAll();
        res.json(produtos);
    }
);

app.post(
    '/produtosrec',
    async(req, res) => {
        const { nome, preco } = req.body;
        const produto = await Produto.create({ nome, preco});
        res.json(produto);
    }
);

app.get(
    '/produtosdel/:id',
    async(req, res) => {
    const id = req.params.id;
    const produto = await Produto.findByPk(id);
    if (!produto) {
        res.status(404).json({ error: 'Produto não encontrado' });
    } else {
        await produto.destroy();
        res.send('Produto deletado com sucesso!');
    }
}
);

app.get(
    '/usuarios',
    async(req, res) => {
        const usuarios = await Usuario.findAll();
         let lista = ``;
        usuarios.forEach
        (usuario => {
            lista += `
                <li>${usuario.nome} - ${usuario.email}</li>
            `;
        });
        res.render('usuarios', { lista });
    }
);

app.post(
    '/usuariosred',
    async(req, res) => {
        const { nome, email, idade } = req.body;
        const usuario = await Usuario.create({ nome, email, idade});
        res.redirect('/usuarios');
    }
);

app.get(
    '/usuarios/deletar/:id',
    async(req,res) => {
        const id = req.params.id;
        const usuario = await Usuario.destroy({where: {id}});
        if (usuario === 0) {
            res.status(404).json({ error: 'Usuário não encontrado' });
        } else {
            await usuario.destroy();
            res.redirect('/usuarios');
        }
    }
)

const videos = [
    {
        titulo: 'Video 1',
        nomeCriador: 'Criador 1',
        descricao: 'Descrição do video 1',
        qtdVisualizacoes: 100,
        qtdCurtidas: 50,
        hastagPrinc: 'hashtag1',
        urlVideo: 'https://www.youtube.com/watch?v=video1',
        urlThumb: 'https://img.youtube.com/vi/video1/hqdefault.jpg'
    }
]

app.get(
    '/',
    (req, res) => {
        res.render('Home');
    }
)

app.get(
    '/videos',
    (req, res) => {
        res.render('Videos', { videos });
    }
)

app.get(
    '/videos/cadastrar',
    (req, res) => {
        res.render('CadastrarVideo');
    }
)

app.post(
    '/videos',
    async (req, res) => {
      const {
    titulo,
    nomeCriador,
    descricao,
    qtdVisualizacoes,
    qtdCurtidas,
    hastagPrinc,
    urlVideo,
    urlThumb,
  } = req.body;

  videos.push({
    titulo,
    nomeCriador,
    descricao,
    qtdVisualizacoes,
    qtdCurtidas,
    hastagPrinc,
    urlVideo,
    urlThumb,
  });

  await Video.create({video})
  res.redirect("/videos");
});

app.get(
    '/videos/editar/:id',
    async (req, res) => {
        const id = req.params.id;
        const video = await videos.findByPk({ raw: true, where: { id } });
        res.render('EditarVideo', { video });
    }
)

app.post(
    '/videos/editar/:id',
    async (req, res) => {
        const id = req.body.id;
        const videoAtualizado = {
    titulo: req.body.titulo,
    nomeCriador: req.body.nomeCriador,
    descricao: req.body.descricao,
    qtdVisualizacoes: req.body.qtdVisualizacoes,
    qtdCurtidas: req.body.qtdCurtidas,
    hastagPrinc: req.body.hastagPrinc,
    urlVideo: req.body.urlVideo,
    urlThumb: req.body.urlThumb,
  };
    await Video.update(videoAtualizado, { where: { id } });
    res.redirect('/videos');
 }
)

app.post(
    '/videos/deletar/:id',
    async (req, res) => {
        const id = req.params.id;
        await Video.destroy({ where: { id } });
        res.redirect('/videos');
 }
)

async function conectarBD() {
    try{
        await sequelize.sync();
        console.log('Conexão com o banco de dados estabelecida com sucesso!')
    } catch (erro) {
        console.error('Erro ao conectar:', erro);
    }
}

conectarBD()

app.listen(
    3000,
    () => console.log('Servidor em execução')
)