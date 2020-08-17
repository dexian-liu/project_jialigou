class List{
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
        $.ajax({
            type : 'get',
            url : '../php/list.php',
            success : function(data){
                // console.log(JSON.parse(data));
                data = JSON.parse(data);
                let $ul = $('.list-good');
                let str = '';
                // 循环生成li
                $.each(data,(key,value) => {
                    str += `
                    <li data-id="${value.id}">
                        <img src="../img/detail-content-logo${value.id}.jpg" alt="">
                        <div class="name">${value.name}</div>
                        <div class="good-price">
                            <span class="price">¥${value.price}
                            </span>
                            <span class="num">已售：${value.sell}件</span>
                        </div>
                        <div class="good-btn">
                            <a href="" class="addcart">加入购物车</a>
                            <a href="" class="collect">收藏</a>
                        </div>  
                    </li>
                    `;
                });
                $ul.html(str);
        
                //传id到详情页
                $('.list-good>li>img').on('click',function(){
                   let id = $(this).parent().attr('data-id');
                   $.ajax({
                        type : 'get',
                        url : `./detail.html?id=${id}`,
                        success : function(data){
                            console.log(data);
                        }
                   })
                   location.href = `./detail.html?id=${id}`;
                    console.log(id);
                })
        
            }
        })
    }
}













