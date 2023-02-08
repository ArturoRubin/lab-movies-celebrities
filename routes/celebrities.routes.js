const router = require("express").Router()
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req,res,next) =>{
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    if (name !== "" && occupation !== "" && catchPhrase !== "") {
      Celebrity.create({ name, occupation, catchPhrase })
        .then((newCelebrity) => {
          res.render("celebrities/celebrities", { celebrity: newCelebrity });
        })
        .catch((err) => next(err));
    } else {
      res.redirect("/celebrities/create");
    }
  });

  router.get("/celebrities", (req,res,next) =>{
    Celebrity.find()
        .then(allCelebritiesFromDB => 
            res.render("celebrities/celebrities", {celebrity: allCelebritiesFromDB}))
            .catch(err => next(err))
        
    
  })

module.exports = router