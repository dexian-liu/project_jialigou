"use strict";function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,r,n){return r&&_defineProperties(e.prototype,r),n&&_defineProperties(e,n),e}var Login=function(){function e(){_classCallCheck(this,e),this.addEvent()}return _createClass(e,[{key:"addEvent",value:function(){var i=[!1,!1,!1];$("#username").on("blur",function(){var e=$(this).val();if(!/^[a-zA-Z]{4,8}$/.test(e))return alert("请输入正确的格式"),void(i[0]=!1);i[0]=!0}),$("#userpwd").on("blur",function(){var e=$(this).val();if(!/^[0-9]{8,16}$/.test(e))return alert("请输入正确的格式"),void(i[1]=!1);i[1]=!0}),$("#verify").on("blur",function(){var e=$(this).val();if(!/^[0-9a-zA-Z]{4}$/.test(e))return alert("请输入正确的格式"),void(i[2]=!1);var r=$(this).next().html().toLowerCase();if(console.log(r),e!=r)return console.log("错误"),void(i[2]=!1);console.log("成功"),i[2]=!0});var r=this;$(".verify-img").on("click",function(){var e=r.randomInt();$(".verify-img").html(e)}),$(".login").on("click",function(){if(-1===i.indexOf(!1)){var e=$("#username").val(),r=$("#userpwd").val(),n=$.cookie("register")?$.cookie("register"):"",t=convertStrToObj(n);if(!(e in t))return void alert("用户名不存在");t[e]==r?location.href="../index.html":alert("密码错误")}})}},{key:"randomInt",value:function(){for(var e="0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ",r="";r.length<4;){var n=Math.floor(Math.random()*e.length);-1===r.indexOf(e[n])&&(r+=e[n])}return r}}]),e}();