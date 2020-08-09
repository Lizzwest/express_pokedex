const express = require('express');
const router = express.Router();
const axios = require("axios");
const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try {
    const locatePoke = await db.pokemon.findAll() 
    res.render('favorites', { pokemon: locatePoke });
  } catch (error) {
    res.render(error, "error");
    

  }//res.render('pokemon')
});  


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', async (req, res) => {
  try {
    // TODO: Get form data and add a new record to DB
    await db.pokemon.findOrCreate({
      where: {
        name: req.body.name,
      },
    });
    res.redirect('/pokemon');
  } catch (error) {

    res.render(error, "error")
  }
  
});

router.get('/:name', async (req, res) => {
  try {
    if(req.params && req.params.name) {
      const pokeURL = `https://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}`;
      const result = await axios.get(pokeURL);
      let pokeInfo = result.data; 
      res.render('show', { pokedata: pokeInfo });
    }

  } catch (error){

    res.render( "error")

  }

});

router.delete("/", async (req, res) => {
  try {
    await db.pokemon.destroy({
      where: {
        name: req.body.name,
      },
    });
    res.redirect("/pokemon");
  } catch (error) {
    res.render("error");
  }
});


module.exports = router;
