const User = require('../models/User');
const Fished = require('../models/Fished');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { 
        association: 'fisheds',
        attributes: ['nome'],
        through: { attributes: []} //tabela pivo
       } 
    })

    return res.json(user.fisheds)
  },

  async list(req, res) {
    const fisheds = await Fished.findAll()
    return res.json(fisheds)
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { nome, img } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'Usuario não encontrado!' });
    }

    const [fished] = await Fished.findOrCreate({
      where: { nome },
      defaults: { img }
    });

    await user.addFished(fished);
    return res.json(fished);
  },

  async update(req, res) {
    const { user_id } = req.params;
    const { nome, img } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'Usuario não encontrado!' });
    }

    const fished = await Fished.findOne({
      where: { nome }
    });

    await user.removeFished(fished);

    return res.json();
  },

  async delete(req, res) {
    const { user_id } = req.params;
    const { nome, img } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'Usuario não encontrado!' });
    }

    const fished = await Fished.findOne({
      where: { nome }
    });

    await user.removeFished(fished);

    return res.json();
  }

}