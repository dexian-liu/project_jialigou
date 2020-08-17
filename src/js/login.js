class Login{
    constructor(){
        this.addEvent();
    }
    addEvent(){

        var arr = [false,false,false];

        $('#username').on('blur',function(){
            let uname = $(this).val();
            let re = /^[a-zA-Z]{4,8}$/;
            if(!(re.test(uname))){
                alert('请输入4-8位用户名');
                arr[0] = false;
                return;
            }else{
                // console.log(uname);
                arr[0] = true;
            }
        })

        $('#userpwd').on('blur',function(){
            let upwd = $(this).val();
            let re = /^[0-9]{8,16}$/;
            if(!(re.test(upwd))){
                alert('请输8-16位密码');
                arr[1] = false;
                return;
            }else{
                // console.log(upwd);
                arr[1] = true;
            }
        })

        $('#verify').on('blur',function(){
            let verify = $(this).val();
            let re = /^[0-9a-zA-Z]{4}$/;
            if(!(re.test(verify))){
                alert('请输入正确的格式');
                arr[2] = false;
                return;
            }else{
                let verify_img = $(this).next().html().toLowerCase();
                console.log(verify_img);
                if(verify == verify_img){
                    console.log('成功');
                    arr[2] = true;
                }else{
                    console.log('错误');
                    arr[2] = false;
                    return;
                }
            }
        })

        let that = this;
        $('.verify-img').on('click',function(){
            let str = that.randomInt();
            $('.verify-img').html(str);
        });

        $('.login').on('click',function(){

            if(arr.indexOf(false) === -1){

                let uname = $('#username').val();
                let upwd = $('#userpwd').val();

                let cookieStr = $.cookie('register') ? $.cookie('register') : '';

                let cookieObj = convertStrToObj(cookieStr);

                if(uname in cookieObj){
                    if(cookieObj[uname]== upwd){
                        location.href = '../index.html';
                    }else{
                        alert('密码错误');
                    }
                }else{
                    alert('用户名不存在');
                    return;
                }
            }



            // let cookieStr = $.cookie('register') ? $.cookie('register') : '';

            // let cookieObj = convertStrToObj(cookieStr);
            // console.log(cookieObj);
            
        })



    }

    randomInt(){
        let str = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ';
        let newStr = '';
        while(newStr.length < 4){
            let num = Math.floor(Math.random()*str.length);
            if(newStr.indexOf(str[num]) === -1){
                newStr += str[num];
            } 
        }
        return newStr;
    }
}