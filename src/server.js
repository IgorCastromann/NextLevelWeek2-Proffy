const proffys = [
    {
        name: "Pablo Escobar",
        avatar: "https://cdn-istoe-ssl.akamaized.net/wp-content/uploads/sites/14/2018/02/pablo-escobar.jpg",
        whatsapp: "99386752",
        bio: "Pablo Emilio Escobar Gaviria foi um narcotraficante colombiano que conquistou fama mundial como (o senhor da droga colombiano), tornando-se um dos homens mais ricos do mundo graças ao tráfico de cocaína nos Estados Unidos e outros países.",
        subject: "Pó",
        cost: "360",
        weekday: [0],
        time_from: [720],
        time_to: [1220],
    },
    {
        name: "Maradona",
        avatar: "https://i0.statig.com.br/bancodeimagens/8n/ys/xh/8nysxh9br5f2q2l2gnwfpbsoo.jpg",
        whatsapp: "99386752",
        bio: "Pablo Emilio Escobar Gaviria foi um narcotraficante colombiano que conquistou fama mundial como o senhor da droga colombiano, tornando-se um dos homens mais ricos do mundo graças ao tráfico de cocaína nos Estados Unidos e outros países.",
        subject: "Pó",
        cost: "360",
        weekday: [2],
        time_from: [720],
        time_to: [1220],
    }
]

const subjects = [
    "Biologia",
    "Artes",
    "Ciências",
    "ducação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",

]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res){
    return res.render("index.html")
}

function pageStudy(req, res){
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res){
    const data = req.query

    const isNotEmpty = Object.keys(data).length > 0
    if(isNotEmpty){
        data.subject = getSubject(data.subject)
        proffys.push(data)
        return res.redirect('/study')
    }

    return res.render("give-classes.html", { subjects, weekdays })
}

function Servidor(){
    const express =require('express')
    const server = express()
    const nunjucks = require('nunjucks')
    
    nunjucks.configure('src/views', {
        express: server,
        noCache: true,

    })

    server
    .use(express.static("public"))
    .get('/', pageLanding)
    .get('/study', pageStudy)
    .get('/give-classes', pageGiveClasses)
    .listen(5500)
    console.log('servidor rodando na porta: 5500')
}

Servidor()