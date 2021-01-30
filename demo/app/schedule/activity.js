const Subscripton = require('egg').Subscription;
const models = require('../../app/models');
const nowDate = require('../../app/nowDate');

class Activity extends Subscripton {
  //  通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    if (models.runtime.cron) {
      return {
        // interval: '10s', // 间隔 10s 单位，s、m、h
        // 定时任务cron表达式：每三小时准点执行一次
        cron: models.runtime.cron, 
        // cron: '0 0 12 * * 1-2 2021',
        type: 'worker'
      }
    } else {
      return {
        interval: models.runtime.interval, // 间隔 10s 单位，s、m、h
        // 定时任务cron表达式：每三小时准点执行一次
        // cron: '0 0 23 * * *', 
        // cron: '0 0 12 * * 1-2 2021',
        type: 'worker'
      };
    }
    
  }

  // subscribe 是 真正定时任务执行时被运行的函数
  async subscribe() {
    const { ctx } = this;
    let data;
    if (models.mysql) {
      const ids = models.studentID;
      const pdata = await ctx.service.user.find(ids);
      data = JSON.parse(pdata);
    } else {
      data = models.studentInfo;
    }
    const getPhones = function(data) {
      let m_phones = [];
      let i = 0;
      data.forEach((val) => {
        m_phones[i] = val.m_phone;
        i++;
      });
      return m_phones;
    }
    // 信息设置：
    const title = models.MDcardInfo.title;  // 信息标题
    const picurl = models.MDcardInfo.picurl; // 图片地址
    const textcontent = models.MDcardInfo.textcontent; // 信息内容
    let datetime;
    if (models.datetime){
      datetime = models.MDcardInfo.datetime;
    } else {
      datetime = nowDate;
    }
    const sendData = {
      "msgtype": "markdown",
      "markdown": {
        "title": title,
        // "text": "#### 任务提醒 @15622221811 \n> 醒醒！来活啦！ " + taskList[0].task + "\n>![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png)\n> ###### 10点20分发布) \n"
        "text": `#### ${title} \n> ${data.map(((obj) => { return '@'+ obj.m_phone }))}  \n>${textcontent} \n>![screenshot](${picurl})\n> ###### 于${datetime}发布) \n`
      },
      "at": {
        "atMobiles": [
          // "15622221811"
          ...getPhones(data)
        ],
        "isAtAll": false
      }
    }

    const res = await ctx.curl(models.DDhook, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: sendData,
    });
  }
}


module.exports = Activity;