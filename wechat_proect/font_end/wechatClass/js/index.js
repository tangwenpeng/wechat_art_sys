$(function(){
    let totalpage = 0
    let currentPage = 1
  // 默认展示分组
    function getGroups(currentPage) {
      $.ajax({
        url: `http://192.168.1.199:8888/Api/${currentPage}`,
        type: 'GET',
        dataType: 'JSON',
        success: (res) =>{
          let navstr = ''
          let str = ''
          totalpage = res.count / 10
          if(res.code === 1){
            // 渲染标签
            if(typeof(res.urls)!=='string'){
              for(let i=0;i<res.urls.length;i++){
                str += `<a href="${res.urls[i].url}" class="urls" target="_blank">${res.urls[i].article_name}</a>`
              }
            }else{
          let arr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '一十', '一十一','一十二',]
              for (var i=0; i<12; i++){
                str += `<a href="https://mp.weixin.qq.com/s/" class="urls" target="_blank">第一组/第${arr[i]}篇</a>`
              }
            }
            // 渲染分页
            for(let i=0;i<res.groups.length;i++){
              // 将小于4的用数字显示，大于4的用省略号显示
              // if(i<=3){
                navstr += `<li class="groupNav ${res.groups[i].group_id === res.groups[0].group_id? 'active':''}" data-id=" ${res.groups[i].group_id}"><a href="javascript:void(0);">${res.groups[i].name}</a></li>`
              // }else{
              //   navstr += `<li class="groupNav" data-id=" ${res.groups[i].group_id}" style="display:none;"><a href="javascript:void(0);">${res.groups[i].group_id}</a></li>`
              // }
              // if(i > 2 && flag){
              //   navstr += `<li class="groupNav"><a href="javascript:void(0);">....</a></li>`
              //   flag = false
              // }
            }
          }else if(res.code === 0){
          let arr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '一十', '一十一','一十二',]
            for (var i=0; i<12; i++){
              str += `<a href="https://mp.weixin.qq.com/s/" class="urls" target="_blank">第一组/第${arr[i]}篇</a>`
            }
            $($('li.groupNav')[$(this).data('id')-1]).addClass('active').siblings().removeClass('active')
           }   
          $('.wechatgroup').html(str)
          $('.pagination li').eq(0).after(navstr)
        }
      })
    }
    getGroups(currentPage)
  // 点击切换上一页
  $('.Previous').on('click',function(){
    if(currentPage >1){
      $('.wechatgroup').html(' ')
      $('.pagination li.groupNav').remove()
       currentPage--
       getGroups(currentPage)
     }else{
       alert('当前已经是第一页')
       return false
     }
  })

  // 点击切换下一页
  $('.Next').on('click',function(){
    if(currentPage < totalpage){
      $('.wechatgroup').html(' ')
      $('.pagination li.groupNav').remove()
      currentPage++
      getGroups(currentPage)
    }else {
      alert('当前已经是最后一页')
      return false
    }
  })
  // 点击切换组
  $('.pagination').off('click').on('click','.groupNav',function(){
    let params = {group_id: $(this).data('id').toString()}
    $.ajax({
      url: 'http://192.168.1.199:8888/Api',
      data: JSON.stringify(params),
      dataType:'JSON',
      contentType: 'application/json',
      type: 'POST',
      success: (res) => {
        let str = ''
        if(res.code === 1){
          for(let i=0;i<res.urls.length;i++){
            str += `<a href="${res.urls[i].url}" class="urls" target="_blank">${res.urls[i].article_name}</a>`
          }
          for(let i=0;i<$('.pagination').find('li.groupNav').length;i++){
            if($($('li.groupNav')[i]).data('id') == res.urls[0].group_id){
              $($('li.groupNav')[i]).addClass('active').siblings().removeClass('active')
            }
          }
        }else if(res.code === 0){
          let arr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '一十', '一十一','一十二',]
          for (var i=0; i<12; i++){
            str += `<a href="https://mp.weixin.qq.com/s/" class="urls" target="_blank">第${$(this).text()}/第${arr[i]}篇</a>`
          }
          for(let i=0;i<$('.pagination').find('li.groupNav').length;i++){
            if($($('li.groupNav')[i]).data('id') == $(this).data('id')){
              $($('li.groupNav')[i]).addClass('active').siblings().removeClass('active')
            }
          }
        }
        $('.wechatgroup').html(str)
      }
    })
  })
})