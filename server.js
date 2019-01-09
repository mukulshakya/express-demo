const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'html');

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("upperCase", (test) => test.toUpperCase());

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log, (err) =>{
        if(err) {
            console.log(err);
        }
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintainance.hbs');
// })
//un-comment whole app.use while site is under maintainance

app.use(express.static(__dirname + "/public")); //app.use() is called as express middleware in which we tell our express to do following things

app.get('/', (request, response) => {
    response.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to My Site'
    });
});

app.get('/test', (request, response) => {
    response.send('Hi Express');
});

app.get('/json', (request, response) => {
    response.send({
        name: "Mukul Shakya",
        city: "Agra",
        knows: ["java", "python", "node"],
        occupation: "student"
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs',{
        pageTitle: "About Page",
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: "Unable to Handle Request"
    });
});

app.listen(port, () => console.log(`Listening on Port ${port}`));