/*!
 * Original idea: https://github.com/Nycto/PicoModal
 * Accessibility inspiration: https://github.com/nico3333fr/jquery-accessible-modal-window-aria
 * MIT License (https://github.com/Aymkdn/picoModal-Accessible/blob/master/LICENSE)
*/
!function(e,t){"undefined"!=typeof module?module.exports=t():"function"==typeof define&&"object"==typeof define.amd?define(t):this[e]=t()}("picoModal",function(){var e=function(e,t){"use strict";var n=function(){var t=[];return{watch:function(e){t.push(e)},trigger:function(){for(var n=0;n<t.length;n++)e.setTimeout(t[n],1)}}},i=function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,n)},o=function(){var e=function(){var e=1;if(t.body.getBoundingClientRect){var n=t.body.getBoundingClientRect(),i=n.right-n.left,o=t.body.offsetWidth;e=Math.round(i/o*100)/100}return e},n=e(),i=Math.round(t.documentElement.clientWidth/n),o=Math.round(t.documentElement.clientHeight/n);return{width:i,height:o}},r=function(e,n){1==arguments.length&&"string"==typeof e&&(n=e,e=null),n=n||"div";var o=t.createElement(n);(e||t.body).appendChild(o);var l={elem:o,child:function(e){return r(o,e||"a")},stylize:function(e){e=e||{},"undefined"!=typeof e.opacity&&(e.filter="alpha(opacity="+100*e.opacity+")");for(var t in e)e.hasOwnProperty(t)&&(o.style[t]=e[t]);return l},clazz:function(e){return o.className+=e,l},setAttr:function(e){for(var t in e)e.hasOwnProperty(t)&&o.setAttribute(t,e[t]);return l},invisible:function(){return this.stylize({border:"0 none",clip:"rect(0px, 0px, 0px, 0px)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",width:"1px"}),l},html:function(e){return o.innerHTML=e,l},getWidth:function(){return o.clientWidth},onClick:function(e){return i(o,"click",e),l},destroy:function(){return t.body.removeChild(o),l}};return l},l=function(e){var t=n(),i=r().setAttr({title:"Close this windows"}).clazz("pico-overlay").stylize({display:"block",position:"fixed",top:"0px",left:"0px",height:"100%",width:"100%",zIndex:1e4}).stylize(e("overlayStyles",{opacity:.5,background:"#000"})).onClick(t.trigger);return e("overlayClose",!0)&&i.child("span").invisible().setAttr({tabindex:"0",id:"overlayCloseForReaders"}).html(e("closeHtml","Close")),{elem:i.elem,destroy:i.destroy,onClick:t.watch}},a=function(e,t){var n=t.length?t[0]:t,i=n.parentNode,o=n.nextSibling;for(e.appendChild(n);t.length;)e.appendChild(t[0]);if(o)try{i.insertBefore(e,o)}catch(r){}else try{i.appendChild(e)}catch(r){}};Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){var n;if(null==this)throw new TypeError('"this" is null or undefined');var i=Object(this),o=i.length>>>0;if(0===o)return-1;var r=+t||0;if(Math.abs(r)===1/0&&(r=0),r>=o)return-1;for(n=Math.max(r>=0?r:o-Math.abs(r),0);o>n;){if(n in i&&i[n]===e)return n;n++}return-1});var d=function(e,t){if(e){var n,i,o=e.children,r=o.length;if(r>0){do d(o[r],t);while(r--)}else{switch(n=e.getAttribute("tabindex"),i=e.getAttribute("contenteditable"),e.tagName){case"A":case"AREA":case"INPUT":case"SELECT":case"TEXTAREA":case"BUTTON":if(!e.getAttribute("disabled"))return void t.push(e);break;case"IFRAME":case"OBJECT":case"EMBED":return void t.push(e)}if(null!==i)return void t.push(e);if(null!==n&&n>=0)return void t.push(e)}}};return function(e){function c(t,n){return void 0===e[t]?n:e[t]}"string"==typeof e&&(e={content:e});var u=t.activeElement;!function(){var e=(t.createDocumentFragment(),t.createElement("div"));e.setAttribute("aria-hidden","true"),e.setAttribute("id","picoModalProtect"),a(e,t.body.children),t.body.appendChild(e)}();var s,h=n(),f=o(),p=r("dialog").clazz("pico-content").stylize({display:"block",boxSizing:"border-box",position:"fixed",zIndex:10001,left:"50%",top:"50px",overflow:"auto",maxWidth:f.width+"px",maxHeight:f.height-100+"px"}).setAttr({role:"dialog"}).html(e.content),v=function(){m.destroy(),p.destroy();var e=t.body,n=t.getElementById("picoModalProtect");a(e,n.children),n.parentNode.removeChild(n),t.body.removeEventListener?t.body.removeEventListener("keydown",x,!1):t.body.detachEvent("onkeydown",x),u&&u.focus(),h.trigger()};c("closeButton",!0)&&(s=p.html("").child("button").html(c("closeHtml","Close")).clazz("pico-close").stylize(c("closeStyles",{borderRadius:"2px",cursor:"pointer",height:"auto",width:"auto",position:"absolute",top:"5px",right:"5px",fontSize:"16px",textAlign:"center",lineHeight:"15px",background:"#CCC"})).setAttr({tabindex:"0"}).onClick(v),s.elem.insertAdjacentHTML("afterend",e.content));var y=c("width",p.getWidth());f.width<768&&(y=f.width-40),p.stylize({width:y+"px",margin:"0 0 0 "+(-(y/2)+"px")}).stylize(c("modalStyles",{backgroundColor:"white",padding:"20px",borderRadius:"5px"}));var m=l(c);c("overlayClose",!0)&&m.onClick(v);var g;e.focusOn?(g=t.querySelector(c("focusOn")),g&&(g.setAttribute("tabindex","0"),setTimeout(function(){g.focus()},0))):c("closeButton",!0)?(g=s,s.elem.focus()):!function(){g=p.html("").child("span").setAttr({lang:"en",tabindex:"0"}).html("popup"),p.child("div").html(e.content),g.elem.focus(),setTimeout(function(){g.invisible()},250)}();var b=c("closeButton",!0)||c("overlayClose",!0),x=function(e){var n=e.which?e.which:e.keyCode;if(9==n){var i,o,r=[];d(p.elem,r),r.reverse(),i=r.length,o=r.indexOf(t.activeElement),0===o&&e.shiftKey?(r[i-1].focus(),e.preventDefault?e.preventDefault():e.returnValue=!1):o!==i-1||e.shiftKey||(r[0].focus(),e.preventDefault?e.preventDefault():e.returnValue=!1)}else 27==n&&b&&v()};return i(t.body,"keydown",x),{modalElem:p.elem,closeElem:s?s.elem:null,overlayElem:m.elem,close:v,onClose:h.watch}}}(window,document);return e});

var modalHtml = "<h1>Example</h1><p>This is a simple example for picoModal. We can write something longuer or shorter or we can use Lorem Ipsum that is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>";

var fnLogin = function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(data) {
                if (xhttp.readyState == XMLHttpRequest.DONE) {
                          if(xhttp.status == 200){
                                 localStorage.setItem('token', xhttp.responseText)
                                 document.getElementById("login-form").style.display="None";
                                 document.getElementById("message").innerHTML = "You have logged in successfully."
                          } else{
                                document.getElementById("message").innerHTML = "Log in failed."
                          }
                             
                 }
        };
                
        var login = document.getElementById('txtlogin').value;
        var password = document.getElementById('txtpassword').value;

        xhttp.open("POST", "/auth/signin", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");            
        xhttp.send("login="+login+"&password="+password);
}


var xhr = new XMLHttpRequest();

var modalHtml ='\
        <p id="message"></p>\
        <form>\
                <fieldset id="login-form">\
                        <legend>Login form:</legend>\
                        <label for="txtlogin">Email: </label>\
                        <input name="login" id="txtlogin"/>\
                        <br />\
                        <label for="txtpassword">Password: </label>\
                        <input type="password" name="password" id="txtpassword" />\
                        <br />\
                        <input type="button" onclick="fnLogin()" value="Login"/>\
                </fieldset>\
        </form>'

xhr.onreadystatechange = function(data) {
if (xhr.readyState == XMLHttpRequest.DONE) {
	if(xhr.status==200)
		console.log('Your token is good.');
        else
		picoModal(modalHtml);
        }       
}
xhr.open("POST", "/auth/status", true);
var token = localStorage.getItem("token");
xhr.setRequestHeader("Authorization", "Bearer " + token);
if(token){
	xhr.send();
}
else{
	picoModal(modalHtml);
}

