const User    = require('../models/User');
const Address = require('../models/Address');
const Fished  = require('../models/Fished');

module.exports = {

  async login(req, res) {
    const { email, senha } = req.body;
    const user = await User.findOne({ 
      where: { email } 
    });
    if (!user) {
      res.redirect('/login?error=1');
    }
    // if (!bcrypt.compareSync(senha, user.senha)) {
    //   res.redirect('/login?error=1');
    // }
    req.session.user = user;
    res.redirect('/home');
  },

  async index(req, res) {
    let  pagina  = parseInt(req.query.pagina);
    
    if (isNaN(pagina) || pagina == 0) pagina = 1; 
    const paginaTotal = await User.count();
    
    const user = await User.findAll({
      include: [
        { model: Address, as:'addresses' },
        { 
          model: Fished, 
          as:'fisheds', 
          through: { attributes: [] } 
        },
      ],
      offset: (pagina - 1) * 10,
      limit: 10
    });
    
    if(paginaTotal > pagina){
      user.push({
        "pagina_atual": pagina, 
        "pagina_total": paginaTotal
      })
    }
    return res.json(user);
  },  

  async show(req, res) {
    const { id } = req.params;
    const user = await User.findOne({
      include: [
        { model: Address, as:'addresses' },
        { 
          model: Fished, 
          as:'fisheds', 
          through: { attributes: [] } 
        },
      ] 
    });
    return res.json(user);
  },

  async store(req, res){
    try{
      const { fisheds, ...data } = req.body;
      const user = await User.create(data);
      if(fisheds && fisheds.length > 0) {
        user.setFisheds(fisheds);
      }
      return res.status(200).json(user);      
    }catch{
      return res.status(400).json({ err });
    }
  },

  async update(req, res){
    try{
      const { id } = req.params;    
      const { fisheds, ...data } = req.body;
      const user = await User.findOne({
        where: { id }
      });        
      user.update(data);      
      if(fisheds && fisheds.length > 0) {
        user.setFisheds(fisheds);
      }
      return res.status(200).json(user);      
    }catch{
      return res.status(400).json({ err });
    }
  },

  async destroy(req, res){
    try{
      const { id } = req.params;
      const user = await User.destroy(     
        { where: { id }}
      );
      return res.status(200).json(user);      
    }catch{
      return res.status(400).json({ err });
    }    
  }
}