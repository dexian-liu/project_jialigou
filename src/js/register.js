class Register{
    constructor(){
        this.addEvent();
    }
    addEvent(){

        let arr = [false,false,false];

        $('#user-name').on('blur',function(){
            let uname = $(this).val();
            let re = /^[a-zA-Z]{4,8}$/;
            if(!(re.test(uname))){
                alert('请输入4-8位字母');
                arr[0] = false;
                return;
            }else{
                let cookieStr = $.cookie('register') ? $.cookie('register') : '';
            
                let cookieObj = convertStrToObj(cookieStr);
                // console.log(uname);
                if(uname in cookieObj){
                    alert('用户已经存在');
                    arr[0] = false;
                    return;
                }else{
                    arr[0] = true;
                }
            }
        })

        $('#user-pwd').on('blur',function(){
            let upwd = $(this).val();
            let re = /^[0-9]{8,16}$/;
            if(!(re.test(upwd))){
                alert('请输入8-16位密码');
                arr[1] = false;
                return;
            }else{
                // console.log(upwd);
                arr[1] = true;
            }
        })

        $('#user-sure').on('blur',function(){
            let upwd = $('#user-pwd').val();
            let usure = $(this).val();
            let re = /^[0-9]{8,16}$/;
            if(!(re.test(usure))){
                alert('请输入正确的确认密码格式');
                arr[2] = false;
                return;
            }else{
                if(!(upwd == usure)){
                    alert('两次密码不一致');
                    arr[2] = false;
                    return;
                }else{
                    // console.log('success');
                    arr[2] = true;
                }
            }
        })

            $('.register').on('click',function(){

            if(arr.indexOf(false) === -1){

                if ($('.choice').is(":checked")) {
                    let uname = $('#user-name').val();
                    let upwd = $('#user-pwd').val();

                // console.log(uname,upwd);

                let cookieStr = $.cookie('register') ? $.cookie('register') : '';
            
                let cookieObj = convertStrToObj(cookieStr);
                
                cookieObj[uname] = upwd;

                // console.log(cookieObj);
                
                $.cookie('register',JSON.stringify(cookieObj),{expires:7, path:'/'});

                location.href = './login.html';
                }
                else {
                    alert('请先阅读条款');
                }     

            }else{
                alert('请完善表单');
            }

        
        })     
               
    }
}