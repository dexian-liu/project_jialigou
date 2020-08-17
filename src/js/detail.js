class Product{
    constructor(){
        this.addEvent();
        this.init();
    }

    init(){

        let cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
        let cookieObj = convertStrToObj(cookieStr);

        let num = 0;
        for(let key in cookieObj){
            num += cookieObj[key].good_num;
        }   
        
        $('.menu-cart span').last().html(num);
        
    }


    addEvent(){
        let address = window.location.search;
        let id = address.replace('?id=','');

        $.ajax({
            type : 'get',
            url : '../php/list.php',
            success : function(data){
                data = JSON.parse(data);
                $.each(data,function(key,value){
                    if(value.id == id){

                        let str = `
                        <div class="detail-content-logo">
                            <img src="../img/detail-content-logo${value.id}.jpg" alt="">
                            <div class="mask"></div>
                            <div class="big">
                                <img src="../img/detail-content-logo${value.id}.jpg" alt="">
                            </div>
                        </div>
                        <div class="detail-content-logo-samll">
                            <img src="../img/detail-content-logo${value.id}.jpg" alt="">
                        </div>
                        <div class="detail-content-list" data-id="sp${value.id}">
                            <h2>
                                <span>自营商品</span> 
                                <span class="good-name">${value.name}</span>
                                <span class="good-id">(供货号:${value.serial})</span>
                            </h2>
                            <ul>
                                <li>
                                    <span>嘉丽价</span>
                                    <span class="good-price">${value.price}</span></li>
                                <li>
                                    <span>积分</span>
                                    <span class="good-point">订购此商品可返回${value.point}积分</span>
                                </li>
                                <li>
                                    <span>尺寸</span>
                                    <span class="good-size">${value.name}
                                    </span>
                                </li>
                                <li>
                                    <span>数量</span>
                                    <span class="good-size clear">
                                        <a href="javascript:;" class="minus">-</a>
                                        <input type="text" class="num" value="1">
                                        件
                                        <a href="javascript:;" class="plus">+</a>
                                    </span>
                                </li>
                            </ul>
                            <div class="btn clear">
                                <a href="javascript:;" class="buy">立即购买</a>
                                <a href="javascript:;" class="addcart">加入购物车</a>
                                <a href="javascript:;" class="collect">收藏</a>
                            </div>
                        </div>
                    </div>
                        `;

                    let $div = $('.detail-content');
                    $div.html(str);

                    //设置cookie传参
                    $('.addcart').on('click',function(){
                        //获取数据
                        let good_name = $(this).parent().parent().children('h2').children('.good-name').html();

                        let good_serial = $(this).parent().parent().children('h2').children('.good-id').html();
                        let re = /(\d+)/;
                        good_serial = parseInt(re.exec(good_serial)[1]);

                        let good_num = parseInt($(this).parent().prev().children().last().children('.good-size').find('.num').val());

                        let good_point = $(this).parent().prev().children().eq(1).children('.good-point').html();

                        good_point = parseInt(re.exec(good_point)[1]);

                        let good_price = parseInt($(this).parent().prev().children().eq(0).children('.good-price').html());
                        // console.log( good_price )

                        let good_id = $(this).parent().parent().attr('data-id');
                        let good_img = parseInt(re.exec(good_id)[1]);
            
                    
                        /*
                        设计cookie
                        carts ：{
                            'sp1':{
                                    good_name : good_name,
                                    good_price : good_price,
                                    good_num : good_num,
                                    good_point : good_point
                            },
                            'sp2':{
                                    good_name : good_name,
                                    good_price : good_price,
                                    good_num : good_num,
                                    good_point : good_point
                            }

                        }
                        */        
                        let cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
                        let cookieObj = convertStrToObj(cookieStr);
                        

                        if(good_id in cookieObj){

                            cookieObj[good_id].good_num += good_num;
                            $.cookie('carts',JSON.stringify(cookieObj),{expires:7,path:'/'});
                            
                        }else{
                            cookieObj[good_id] = {

                                'good_serial': good_serial,
                                'good_name' : good_name,
                                'good_price' : good_price,
                                'good_num' : good_num,
                                'good_point' : good_point,
                                'good_img':good_img
                                
                            }
                        
                            $.cookie('carts',JSON.stringify(cookieObj),{expires:7,path:'/'});
                                               
                        
                        }

                        let num = parseInt($('.menu-cart span').last().html());
                        num = num + good_num;
                        $('.menu-cart span').last().html(num);
                        
                    })
                    
                    $('.menu-cart').on('click',function(){
                        location.href = './cart.html';
                    })

                    



                    $('.detail-content-logo').on('mouseenter',function(){

                        $('.mask').css('display','block');
                        $('.big').css('display','block');
                        
                        $(this).on('mousemove',function(e){
                    
                            let disX = parseInt(e.pageX - $(this).offset().left);
                            let disY = parseInt(e.pageY - $(this).offset().top);

                    
                            let left = disX - $('.mask').width() / 2;
                            let top = disY - $('.mask').height() / 2;
                            
                            if(left <= 0){
                                left = 0;
                            }else if(left >= $(this).width() - $('.mask').width()) {
                                left = $(this).width() - $('.mask').width();
                            }
                            
                            if(top <= 0){
                                top = 0;
                            }else if(top >= $(this).height() - $('.mask').height()){
                                top =  $(this).height() - $('.mask').height();
                            }
                    
                            $('.mask').css({'left':left,'top':top});
                    
                            let p_x = left / ($('.detail-content-logo').width() - $('.mask').width());
                            let p_y = top / ($('.detail-content-logo').height() - $('.mask').height());
                    
                            let big_left = ($('.big').width() - $('.big img').width()) * p_x;
                            let big_top = ($('.big').height() - $('.big img').height()) * p_y;
                    
                            $('.big img').css({'left':big_left,'top':big_top});
                    
                        })
                    
                        $(this).on('mouseleave',function(){
                            $('.mask').css('display','none');
                            $('.big').css('display','none');
                    
                        })
                    })

                    $('.minus').on('click',function(){
                        let num = $(this).next().val();
                        num--;
                        if(num <= 0){
                            num = 1;
                        }
                        $('.num').val(num);
                    })

                    $('.plus').on('click',function(){
                        let num = $(this).prev().val();
                        num++;
                        $('.num').val(num);
                        // console.log(num);
                    })
                    
                    }
                })
            }
        })
    }
}






