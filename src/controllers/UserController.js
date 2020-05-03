const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id }
    });

    return res.json(user);
  },
  
  async store(req, res){
    const { nome, email, celular, senha } = req.body;

    const user = await User.create({ nome, email, celular, senha });

    return res.json(user);

  },

  async update(req, res){
    const { id } = req.params;
    const { nome, email, celular, senha } = req.body;

    const user = await User.update(
      { nome, email, celular, senha },
      { where: { id }}
    );
    
    if (!user || user == 0 || user == null) {
      return res.status(400).json({ error: 'Ops.. Algo deu errado' });
    }

    return res.status(200).json({ msg: `User ${id} alterado com sucesso!` })

  },

  async destroy(req, res){
    const { id } = req.params;

    const user = await User.destroy(     
      { where: { id }}
    );
    
    if (!user || user == 0 || user == null) {
      return res.status(400).json({ error: 'Ops.. Algo deu errado' });
    }

    return res.status(200).json({ msg: `User ${id} deletado com sucesso!` })

  }
}