var url = require('url');
// source - https://github.com/nanek/mstranslator //
var MsTranslator = require('mstranslator');
// TODO: Make this info private //
var client = new MsTranslator({
        client_id: "Solaode1",
        client_secret: "xxxxxxxxxxxxxxxxx"
    });


exports.translate = function(text, source_lang, dest_lang) {
    var params = {
	text: text,
	from: source_lang,
	to: dest_lang
    };
    console.log("From: " +params.from);
    console.log("To: " + params.to);
    console.log("Text: " + params.text);

    var translation = ""

    client.initialize_token(function(keys) {
	    client.translate(params, function(err, data) {
		    translation = data;
		    console.log(translation);
	      		});
	});
    return translation;
}
