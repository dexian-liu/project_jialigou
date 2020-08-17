class Index{
  constructor() {
    this.slider();
    this.addEvent();
    this.init();
  }

  init(){
    //获取购物车数量
    let cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
    let cookieObj = convertStrToObj(cookieStr);

    let num = 0;
    for(let key in cookieObj){
        num += cookieObj[key].good_num;
    }   
    
    $('.menu-cart span').last().html(num);

    $(window).on('scroll', function () {
      // 判断显示还是隐藏按钮
      if($(this).scrollTop() >= 300){
        $('#backTop').fadeIn();
      }else {
        $('#backTop').fadeOut();
      }
    });

    $('#backTop').on('click',function () {
      // 设置滚动动画
      $('html').animate({scrollTop:0},500);
    });
    
}

  slider() {

    var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', // 垂直切换选项
      loop: true, // 循环模式选项
    
      autoplay: true,
      autoplay: {
        disableOnInteraction: false,
      },
    
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
    
        clickable: true,
      },
    
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
    })
    
    //鼠标覆盖停止自动切换
    mySwiper.el.onmouseover = function () {
      mySwiper.autoplay.stop();
    }
    
    //鼠标离开开始自动切换
    mySwiper.el.onmouseout = function () {
      mySwiper.autoplay.start();
    }
  }

  //
  addEvent(){
    let n = 0;
    $('.dot-btn-r').on('click',function(){
      n--;
      if(n < -4){
        n = -4;
      }
    
      $('.hot-show-r').css('left',n * 260);
    })
    $('.dot-btn-l').on('click',function(){
      n++;
      if(n > 0){
        n = 0;
      }
      console.log(n)
      $('.hot-show-r').css('left',n * 260);
    })
  }
}