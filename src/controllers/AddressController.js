const User = require('../models/User');
const Address = require('../models/Address');

module.exports = {

  async index(req, res) {
    const address = await Address.findAll();
    return res.json(address);
  },

  async show(req, res) {
    const { id } = req.params;
    const address = await Address.findOne({
      where: { id }
    });
    return res.json(address);
  },

  async showAllUser(req, res) {
    const { user_id } = req.params;
    const user = await User.findByPk(user_id, {
      include: { association: 'addresses' }
    });
    return res.json(user.addresses);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { cep, rua, numero, bairro, cidade, uf } = req.body;  
    const user = await User.findByPk(user_id);
    if(!user) {
      return res.status(400).json({ error: 'Usuario não encontrado!'});
    }
    const address = await Address.create({ 
      cep, rua, numero, bairro, cidade, uf, user_id 
    });
    return res.json(address);
  },

  async update(req, res){
    const { id } = req.params;
    const { cep, rua, numero, bairro, cidade, uf } = req.body;  

    const address = await Address.update(
      { cep, rua, numero, bairro, cidade, uf },
      { where: { id }}
    );
    
    if (!address || address == 0 || address == null) {
      return res.status(400).json({ error: 'Ops.. Algo deu errado' });
    }

    return res.status(200).json({ msg: `Endereço ${id} alterado com sucesso!` })
  },

  async destroy(req, res){
    const { id } = req.params;

    const address = await Address.destroy(     
      { where: { id }}
    );
    
    if (!address || address == 0 || address == null) {
      return res.status(400).json({ error: 'Ops.. Algo deu errado' });
    }

    return res.status(200).json({ msg: `Endereço ${id} deletado com sucesso!` })
  }
}