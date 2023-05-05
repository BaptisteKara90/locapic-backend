var express = require('express');
var router = express.Router();
const { checkBody } = require('../modules/checkbody');

require('../models/connection');
const Place = require('../models/places');

router.post('/', (req,res)=>{
    if (!checkBody(req.body, ['nickname', 'name', 'latitude', 'longitude'])) {
        res.json({ result: false});
        return;
      }
    
    const newPlace = new Place({
        nickname: req.body.nickname,
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    })
    .save()
    .then(()=>{
        res.json({result: true})
    })
})

router.get('/:nickname', (req, res)=>{
    Place.find({nickname: req.params.nickname})
    .then(data=> {
        res.json({result: true, places: data})
    })
})

router.delete('/', (req, res)=>{
    if (!checkBody(req.body, ['nickname', 'name'])) {
        res.json({ result: false});
        return;
      }
    Place.deleteOne({nickname: req.body.nickname, name: req.body.name})
    .then(()=>{
        res.json({result: true})
    })
})

module.exports = router