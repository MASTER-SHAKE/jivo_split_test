/* Настройки - домен сайта для проставления куков и время хранения*/
var domain = "hand-operation.ru;";
var date = new Date(new Date().getTime() + 600 * 1000);

/* ---------- Нужные нам функции в том числе вызов JIVO ----------- */
function jivoSite() {
    var widget_id = 'u8xSO4uvmc';
    var d = document;
    var w = window;

    function l() {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//code.jivosite.com/script/widget/' + widget_id;
        var ss = document.getElementsByTagName('script')[0];
        ss.parentNode.insertBefore(s, ss);
    }

    if (d.readyState == 'complete') {
        l();
    } else {
        if (w.attachEvent) {
            w.attachEvent('onload', l);
        } else {
            w.addEventListener('load', l, false);
        }
    }
}
function getCookie(Counter) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + Counter.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function delCookie(name) {
    document.cookie = name + "=" + ";";
}
/* ------------- Нужные нам функции закончились ---------------*/


var jscookie = getCookie("counter");
jscookie = parseInt(jscookie);
console.log("число в прошлой сессии - "+jscookie);
/* Если куков нету у данного юзера - рандомим случайное число в куки*/
if (jscookie != 2 && jscookie != 1) {
    /* Рандомное число от 1 до 2 */
    number = getRandomInt(1, 2);

    if (number % 2 == 0) {
        /* Если четное */
        document.cookie = "counter=" + number + ";" + domain + "path=/; expires=" + date.toUTCString();
        console.log("первая сессия - четное");
        ga('set', 'dimension1', 'withoutJivosite');
        ga('set', 'dimension2', 'withoutJivosite');
    } else {
        /* Если не четное */
        jivoSite();
        document.cookie = "counter=" + number + ";" + domain + "path=/; expires=" + date.toUTCString();
        console.log("первая сессия - не четное");
        ga('set', 'dimension1', 'withJivosite');
        ga('set', 'dimension2', 'withJivosite');
    }
}
/* Если куки на сайте есть, то делаем действие в зависимости от старого значения куков */
else {
    if (jscookie == 2) {

        jivoSite();
        delCookie("counter");
        document.cookie = "counter=1;" + domain + "path=/; expires=" + date.toUTCString();
        console.log("не первая сессия - четное");
        ga('set', 'dimension1', 'withJivosite');
        ga('set', 'dimension2', 'withJivosite');
    }
    if (jscookie == 1) {
        delCookie("counter");
        document.cookie = "counter=2;" + domain + "path=/; expires=" + date.toUTCString();
        console.log("не первая сессия - нечетное");
        ga('set', 'dimension1', 'withoutJivosite');
        ga('set', 'dimension2', 'withoutJivosite');
    }
}