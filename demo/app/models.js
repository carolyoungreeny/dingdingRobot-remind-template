

module.exports = {
  // 钉钉 Webhook 地址
  DDhook: 'https://oapi.dingtalk.com/robot/send?access_token=5aab9bf43e6ab7f395aec6af0b9102aaa232bf14fc56d6adafd316ef0b7afa4b', 
  // 执行间隔时间：
  runtime: {
    cron: '', // 定时任务cron表达式：每三小时准点执行一次 0 0 23 * * *
    interval: '10s', // 间隔 10s 单位，s、m、h
  },  
  // 信息设置：(切记包含自定义关键词)
  MDcardInfo: {
    title: '疫情打卡', //标题 
    textcontent: '班主任call你打卡啦', // 内容
    picurl: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2573387653,3850339436&fm=26&gp=0.jpg", 
    datetime: '',  // 默认自动获取发送的日期 例：2021-01-30，
  },
  // 数据模板
  studentInfo: [
    {
      m_phone: '15622221811', // 手机号，at学生本人进行提醒
    },
    {
      m_phone: '12388888888', // 手机号，at学生本人进行提醒
    }
    //...
  ],
  
  

}