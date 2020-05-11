const User = require('../models/User');
const Fished = require('../models/Fished');

module.exports = {
  
  async index(req, res) {
    const fished = await Fished.findAll();
    return res.json(fished);
  },

  async show(req, res) {
    const { id } = req.params;
    const fished = await Fished.findOne({
      where: { id }
    });
    return res.json(fished);
  },

  async store(req, res){
    try{
      const { ...data } = req.body;
      const fished = await Fished.create(data);      
      return res.status(200).json(fished);      
    }catch{
      return res.status(400).json({ err });
    }
  },
  async storeUser(req, res) {
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

  async update(req, res){
    try{
      const { id } = req.params;    
      const { ...data } = req.body;
      const fished = await Fished.findOne({
        where: { id }
      });        
      fished.update(data);      
      return res.status(200).json(fished);      
    }catch{
      return res.status(400).json({ err });
    }
  },

  async delete(req, res) {
    try{
      const { id } = req.params;
      const fished = await Fished.destroy(     
        { where: { id }}
      );
      return res.status(200).json(fished);      
    }catch{
      return res.status(400).json({ err });
    }        
  }

}