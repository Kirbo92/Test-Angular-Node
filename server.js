var express     = require('express'); // Cargamos servidor Web
var app         = express(); // Instancia de un servidor Express
var mongoose    = require('mongoose'); // BBDD NoSQL

var morgan      = require('morgan'); // Muestra las peticiones a la API con colores en el log
var bodyParser  = require('body-parser');
var methodOverride = require('method-override'); //Permite hacer PUT y DELETE 

// Conexión con la base de datos
mongoose.connect('mongodb://localhost:27017/test');

// Configuración
app.use(express.static(__dirname + '/public')); 
app.use(morgan('dev'));                           
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());                         
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// Modelos
var Cliente = mongoose.model('Cliente', {  
    name: String
});

// API
app.get('/api/clientes', function(req, res) {  
    Cliente.find(function(err, clientes) {
        if(err) {
            res.send(err);
        }
        res.json(clientes);
    });
});

app.post('/api/clientes', function(req, res) {  
    Cliente.create({
        name: req.body.name,
        done: false
    }, function(err, cliente){
        if(err) {
            res.send(err);
        }

        Cliente.find(function(err, clientes) {
            if(err){
                res.send(err);
            }
            res.json(clientes);
        });
    });
});

app.delete('/api/clientes/:dni', function(req, res) {  
    Cliente.remove({
        _id: req.params.dni
    }, function(err, cliente) {
        if(err){
            res.send(err);
        }

        Cliente.find(function(err, clientes) {
            if(err){
                res.send(err);
            }
            res.json(clientes);
        });
    })
});


app.get('*', function(req, res) {  
    res.sendfile('./public/index.html');                
});


app.listen(8000, function() {  
    console.log('Escuchando en el puerto 8000');
});