'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async info() {
    const { ctx } = this;
    const ids = [1,2];
    // const userPhone = ctx.params.phone;
    const userInfo = await ctx.service.user.find(ids);
    ctx.body = userInfo;
  }
}

module.exports = UserController;
