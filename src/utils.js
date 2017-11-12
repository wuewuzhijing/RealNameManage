import axios from 'axios';

//当前运行环境
var domain = 'https://dev.bookingyun.com/KmsMaster';

//封装ajax
var ajax = {
  //通用的ajax-post
  getRquery:function(url,data,sucFn,errFn){
    axios.get(domain + url , { params: data }).then(
      (response) => {
        //先判断appId是否已经过期
        if(response.data.returnCode == '1'){
          console.log('基类成功！');
          return sucFn(response);
        }else{
          //否则跳转到温馨提示登录过期页面
          console.log('基类失败！');
          return  errFn(response);
        }
      }
    ) .catch(function (error) {
      console.log('基类异常');
      console.log(error);
      // return  errFn(error); //异常的情况一个该做统一的处理

    })
  },
  timeFormat:function (formart, newDate){
    var dateSty = arguments[0].split(' '),
      separatorFirst  = '',
      separatorSecond = '',
      realDate        = '';
    var yyyy = newDate.getFullYear(),
      mm   = newDate.getMonth()+ 1,
      dd   = newDate.getDate(),
      hh   = newDate.getHours(),
      ii   = newDate.getMinutes(),
      ss   = newDate.getSeconds();
    mm = mm < 10 ? '0' + mm : mm;
    dd = dd < 10 ? '0' + dd : dd;
    hh = hh < 10 ? '0' + hh : hh;
    ii = ii < 10 ? '0' + ii : ii;
    ss = ss < 10 ? '0' + ss : ss;

    if(dateSty.length > 1) {
      console.log(dateSty);
      separatorFirst = dateSty[0].charAt(4);
      separatorSecond = dateSty[1].charAt(2);
      realDate = yyyy + separatorFirst + mm + separatorFirst + dd + hh + separatorSecond + ii +separatorSecond+ ss;
    } else {
      separatorFirst = dateSty[0].join('').charAt(4);
      realDate = yyyy + separatorFirst + dd + separatorFirst
    }
    return realDate;
  }


};

export default ajax;
