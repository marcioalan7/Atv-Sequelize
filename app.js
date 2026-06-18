const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const sequelize = require('./config/db')
const Usuario = require('./models/usuario.model')
const Produto = require('./models/produto.model')

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