$(function() {
    $('#gt-lang-left #sugg-item-ko').hide();
    $('#gt-lang-right #sugg-item-ko').hide();
    // NOTE: for new version(左側の方にしか適用されない)
    // $('#sugg-item-ko').hide();
    // NOTE: for new version(右側は動的生成?の要素の可能性があるので，stylesheet自体を追加)
    var style = '';
    style += '<style type="text/css" id="StyleId">';
    style += '#sugg-item-ko { display: none !important; }';
    style += '</style>';
    $('head').append(style);
    setInterval("detectAutoButton()", 100);
});

function modifyURL(query, param) {
    /*
     * queryParameters -> handles the query string parameters
     * queryString -> the query string without the fist '?' or '#' character
     * re -> the regular expression
     * m -> holds the string matching the regular expression
     */
    var queryParameters = {},
        queryString = query.substring(1),
        re = /([^&=]+)=([^&]*)/g,
        m;
    // Creates a map with the query string parameters
    while (m = re.exec(queryString)) {
        queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    // Add new parameters or update existing ones
    for (let key of Object.keys(param)) {
        queryParameters[key] = param[key];
    }

    /*
     * Replace the query portion of the URL.
     * jQuery.param() -> create a serialized representation of an array or
     *     object, suitable for use in a URL query string or Ajax request.
     */
    var prefix = query[0];
    if (query.length == 0) prefix = '?';
    return prefix + $.param(queryParameters);
}

var detectFlag = false;

function detectAutoButton() {
    if (detectFlag) return;
    // NOTE: https://translate.google.co.jp/m/translate, https://translate.google.com/m/translate
    var auto_detect_element = $('.sl-sugg-button-container :first-child')
    console.log(auto_detect_element)

    if (auto_detect_element.text().indexOf('検出') < 0) {
        // NOTE: https://translate.google.co.jp, https://translate.google.com
        var auto_detect_element = $('#gt-lang-left .sl-sugg-button-container :last-child');
    }
    console.log(auto_detect_element)
    var language = auto_detect_element.text();
    console.log(language);
    if (auto_detect_element.text().indexOf('検出') < 0) {
        return;
    }
    detectFlag = true;
    auto_detect_element.click();


    // $('#source').keyup(function() {
    auto_detect_element.bind("DOMSubtreeModified", function() {
        var language = auto_detect_element.text();
        // NOTE: for delete '英語 - 自動検出日本語'
        language = language.replace(/-.*/, '');
        console.log(language);
        //         $('#gt-lang-right [aria-pressed=true]').attr('aria-pressed', 'false');
        if (language.indexOf('日本語') >= 0) {
            console.log('日本語 ==> 英語');
            //             console.log($('#gt-lang-right #sugg-item-en'));
            // NOTE: なぜか，click eventが発火しない
            //             $('#gt-lang-right #sugg-item-en').attr('aria-pressed', 'true');
            //             $('#gt-lang-right #sugg-item-en')[0].trigger("click");
            //             $('#gt-lang-right #sugg-item-en')[0].click();
            // NOTE: old version
            if (location.pathname == '' || location.pathname == '/') {
                var tmp = location.href;
                // NOTE: for old
                tmp = tmp.replace('/ja/', '/en/');
                if (location.href != tmp) location.href = tmp;
                return;
            }
            return;
            // NOTE: new versionではURLにリアルタイムに情報が反映されない
            var tmp = location.search || location.hash;
            tmp = modifyURL(tmp, {
                'tl': 'en'
            });
            tmp = location.protocol + '//' + location.host + location.pathname + tmp;
            if (location.href != tmp) location.href = tmp;
        }
        if (language.indexOf('英語') >= 0) {
            console.log('英語 ===> 日本語');
            // NOTE: for old version
            if (location.pathname == '' || location.pathname == '/') {
                var tmp = location.href;
                tmp = tmp.replace('/en/', '/ja/');
                if (location.href != tmp) location.href = tmp;
                return;
            }
            return;
            var tmp = location.search || location.hash;
            tmp = modifyURL(tmp, {
                'tl': 'ja'
            });
            tmp = location.protocol + '//' + location.host + location.pathname + tmp;
            if (location.href != tmp) location.href = tmp;
        }
    });
}
