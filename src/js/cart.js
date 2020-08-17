class Cart{
    constructor(){
        this.addEvent();
    }
    addEvent(){
        let cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
        let cookieObj = convertStrToObj(cookieStr);
        console.log(cookieObj);

        for(let key in cookieObj){
            let good = cookieObj[key];
            let str = `
            <td class="oper-select">
               
                <img src="../img/detail-content-logo${good.good_img}.jpg" alt="">
            </td>
            <td class="oper-name">
                <p class="name"><a href="">${good.good_name}</a></p>
                <p class="id">货号：${good.good_serial}</p>
                <p class="size">颜色/尺码 ：</p>
            </td>
            <td class="price">${good.good_price}</td>
            <td class="oper-num" data-id=${key}>
                <a href="javascript:;" class="minus">-</a>
                <span class="num">${good.good_num}</span>
                <a href="javascript:;" class="plus">+</a>
            </td>
            <td class="j-price">${good.good_price * good.good_num}</td>
            <td class="del">
                <a href="javascript:;">删除</a>
            </td>
            `;

            // $('.cart-list').html(str1);
            let $tr = $('<tr>');
            $tr.attr('class','cart-list');
            
            $tr.html(str);

            //获取父级
            $('table').append($tr);
        }

        $('.minus').on('click',function(){

            let good_id = $(this).parent().attr('data-id');

            let cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
            let cookieObj = convertStrToObj(cookieStr);

            if(cookieObj[good_id].good_num > 1){
                cookieObj[good_id].good_num--;
            }
            
            $.cookie('carts',JSON.stringify(cookieObj),{expires:7,path:'/'});

            $(this).next().html(cookieObj[good_id].good_num);

            $(this).parent().next().html(cookieObj[good_id].good_num * cookieObj[good_id].good_price);
            
        })

        $('.plus').on('click',function(){
            let good_id = $(this).parent().attr('data-id');

            let cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
            let cookieObj = convertStrToObj(cookieStr);

            cookieObj[good_id].good_num++;
            
            $.cookie('carts',JSON.stringify(cookieObj),{expires:7,path:'/'});

            $(this).prev().html(cookieObj[good_id].good_num);

            $(this).parent().next().html(cookieObj[good_id].good_num * cookieObj[good_id].good_price);

        })

        $('.del a').on('click',function(){
            let good_id = $(this).parent().prev().prev().attr('data-id');

            console.log(good_id);
            let cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
            let cookieObj = convertStrToObj(cookieStr);

            delete cookieObj[good_id];
            
            $.cookie('carts',JSON.stringify(cookieObj),{expires:7,path:'/'});

            $(this).parent().parent().remove();
        })

        
    }
}


























