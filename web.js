var express = require('express');
var translate = require('./translate');
var fs = require('fs');
var app = express();

var url = require('url');
// source - https://github.com/nanek/mstranslator //                            
var MsTranslator = require('mstranslator');
// TODO: Make this info private //                                              
var client = new MsTranslator({
        client_id: "xxxxxxxxxxxx",
        client_secret: "xxxxxxxxxxxxxxxxxxxxxx"
    });


app.use('/public', express.static(__dirname + '/public'));

app.post('/', function(request, response) {
	response.sendfile(__dirname + '/public/index.html');
    });

app.get('/', function(request, response) {
	response.sendfile(__dirname + '/public/index.html');
    });
app.get('/index.html', function(request, response) {
	response.sendfile(__dirname + '/public/index.html');
    });

app.get('/app.html', function(request, response) {
	response.sendfile(__dirname + '/public/app.html');
});

/*app.get('/stylesheets/style.css', function(request, response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end(fs.readFileSync(__dirname + '/public/stylesheets/style.css'));
    });

app.get('/images', function(request, response) {

});
app.get('/images/appview.jpg', function(request, response) {

});
*/
app.get('/translate', function(request, response) {
	var text = request.query.text;
	var source_lang = request.query.from;
	var dest_lang = request.query.to;

	var params = {
	    text: text,
	    from: source_lang,
	    to: dest_lang
	}

	client.initialize_token(function(keys){
		client.translate(params, function(err, data) {
			return response.json({result: data}, 200);
		    });
	    });
    });

var port = process.env.PORT || 5000;
app.listen(port);
