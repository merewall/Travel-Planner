const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Traveller, Location, Trip } = require('../../models');

// GET all location data - works!
router.get('/', async (req, res) => {
  try {
    const locationData = await Location.findAll();
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single location with associated trips - works!
router.get('/:id', async (req, res) => {
  try {
    const locationData = await Location.findByPk(req.params.id, {
      include: [{model: Trip}],
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with that id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a location - works!
router.post('/', async (req, res) => {
    try {
      const locationData = await Location.create(req.body);
      res.status(200).json(locationData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// DELETE a location and associated trips - works!
router.delete('/:id', async (req, res) => {
  try {
    const locationData = await Location.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with that id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;