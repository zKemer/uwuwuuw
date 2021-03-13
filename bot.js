const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
//////DİSCORD GİRİSİ
const express = require('express')
const app = express();

const passport = require("passport");
const { Strategy } = require('passport-discord');
const session = require('express-session')
passport.serializeUser(( user, done) => {
done(null, user);
})

passport.deserializeUser((obj, done) => {
done(null, obj);
})


let strategy = new Strategy({
clientID: "780799480484069376",
clientSecret: "yXz6YzU2vRFxpK-9FTt_hVP4DYzZ6IXC",
callbackURL: "https://awake-flash-canoe.glitch.me/callback",
scope: ['guilds', 'identify']
}, (accessToken, refreshToken, profile, done) => {
process.nextTick(() => done(null, profile));
});

passport.use(strategy);

app.use(session({

  secret: "secret",
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());


app.use(passport.session());


app.get("/giris", passport.authenticate("discord", {
 
    scope: ["guilds", "identify"]
  })
 
);

app.get(
  "/callback",
  passport.authenticate("discord", {
    
    failureRedirect: "/error"
  }),
  (req, res) => {
    res.redirect("/");
  }
);




var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
   
    res.render("home", {
    user: req.user
    })
});


app.get('/panel', function (req, res) {
      let guild = client.guilds.cache.get("741055407119794267");
      let member = req.user ? guild.members.cache.get(req.user.id) : null;
   if(!member.roles.cache.has("783251230604132362")) { res.redirect("https://awake-flash-canoe.glitch.me/") } else {
    res.render("panel", {
    user: req.user
 
    })
        }
});

/////////////////////////////////////////////////////////////////////
    const listener = app.listen(3000, (err) => {

      console.log(`Site hazır.`);
      })


client.login(ayarlar.token)