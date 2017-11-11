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
  }
}

export default ajax;
