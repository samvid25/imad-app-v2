var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var page1 = {
    title: 'Page 1 | Hey!',
    heading: 'Page 1 Content:',
    content:`
            <p>
                Some stuff
            </p>
            <p>
                Some more stuff
            </p>
            <p>
                Some more more stuff
            </p>`
};

function createTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name = "viewport" content = "width=device-width, initial-scale = 1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class = "container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h3>
                ${heading}
            </h3>
            <div>
                Some stuff here:
            </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:pageName', function (req, res){
   // res.send('Page 1 request will be served here');
    //res.sendFile(path.join(__dirname, 'ui', 'page1.html'));
    var pageName = req.pageName;
    res.send(createTemplate(pageName));
});

//app.get('/test', send('Test message'));

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
