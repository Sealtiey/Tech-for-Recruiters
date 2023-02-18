// server.js

// importamos o framework express para nosso servidor
const express = require("express");

// criamos uma aplicação usando express framework
const app = express();

// configurações que permitem que nossa api seja acessada por outros domínios
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// fica 'escutando' chamadas para nossa aplicação
const listener = app.listen(process.env.PORT, () => {
  console.log("A applicação está 'ouvindo' na porta " + listener.address().port);
});

const falsoBancoDeDados = {
  'Javascript':['React', 'React Native', 'JQuery', 'Vue.js', 'AngularJS', 'Ember.js', 'Express.js', 'Next.js'],
  'Python':['Django', 'AIOHTTP', 'Bottle', 'CherryPy', 'CubicWeb', 'Dash', 'Falcon', 'Flask'],
  'Java':['Spring', 'Hibernate', 'JSF (JavaServer Faces)', 'GWT (Google Web Toolkit)', 'Struts', 'Blade', 'Play', 'Vaadin', 'Grails', 'DropWizard'],
  'C#':['.NET', 'ASP.NET', 'NHibernate'],
  'C++':['Qt', 'ffead-cpp', 'Kigs framework', 'ROOT', 'Ultimate++'],
  'C':['Kore', 'facil.io', 'Duda'],
  'Go':['Gin', 'Beego', 'Iris', 'Echo', 'Fiber'],
  'Dart':['Flutter'],
  'Kotlin':['Ktor', 'Kweb', 'Javalin', 'Spark', 'Spring Boot', 'Vaadin-On-Kotlin', 'Jooby'],
  'PHP':['CakePHP', 'CodeIgniter', 'Horde', 'Laravel', 'Symfony', 'Yii', 'Zend', 'Zikula', 'Fuel', 'Slim', 'Phalcon', 'Aura'],
  'Ruby':['Ruby on Rails', 'Sinatra', 'Hanami or Lotus', 'Ramaze', 'Cuba', 'Padrino'],
  'Rust':['actix-web', 'Warp', 'Axum']
}

// recebe uma requisição externa e retorna uma resposta
app.get("/", (request, response) => {
  
  const termoBuscado = request.query.tecnologia
  const resposta = buscarTecnologia (termoBuscado)
  response.json ({response:resposta})
});

function buscarTecnologia(termoBuscado){
  
  const termoBuscadoMinusculo = termoBuscado.toLowerCase()
  var resultado = 'não encontrado'
  
  for (const linguagem in falsoBancoDeDados){
    const linguagemMinuscula = linguagem.toLowerCase() 
    const frameworksMinusculos = falsoBancoDeDados[linguagem].map(framework => {return framework.toLowerCase()})
    
    if (linguagemMinuscula == termoBuscadoMinusculo) {
        resultado = retornarFrameworksParaLinguagem(linguagem)
     
    } else if (frameworksMinusculos.includes(termoBuscadoMinusculo)) {
      resultado = retornarLinguagemParaFramework(linguagem, termoBuscado)      
    }
  }
  return resultado
}

function retornarFrameworksParaLinguagem(linguagem){
  const texto = `
      <p><b>${linguagem}</b> é uma linguagem de programação</p>
      <p>${falsoBancoDeDados[linguagem].join(', ')} são alguns de seus frameworks</p>
    `
  return texto
}

function retornarLinguagemParaFramework(linguagem, termoBuscado){
  const texto = `
    <p><b>${termoBuscado}</b> é um framework da linguagem <b>${linguagem}</b></p>
  `
  return texto
}
