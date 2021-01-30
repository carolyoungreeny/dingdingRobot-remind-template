const Service = require('egg').Service;


class UserService extends Service {
  async find(ids) {
    
    const results = await this.app.mysql.select('t_classmember',{
      where: { m_id: ids },
      columns: ['m_phone'],
    });
    const result = JSON.stringify(results);
    // this.ctx.logger.info('select table t_classmember',results);
    return result;
  }
}

module.exports = UserService;