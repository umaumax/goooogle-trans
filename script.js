$(function() {
    $('#gt-lang-left #sugg-item-ko').hide();
    $('#gt-lang-right #sugg-item-ko').hide();
    var auto_detect_element = $('#gt-lang-left .sl-sugg-button-container :last-child');
    auto_detect_element.click();

    // $('#source').keyup(function() {
    auto_detect_element.bind("DOMSubtreeModified", function() {
        var language = auto_detect_element.text();
        //         $('#gt-lang-right [aria-pressed=true]').attr('aria-pressed', 'false');
        if (language.indexOf('日本語') >= 0) {
            console.log('日本語 ==> 英語');
            //             console.log($('#gt-lang-right #sugg-item-en'));
            // NOTE: なぜか，click eventが発火しない
            //             $('#gt-lang-right #sugg-item-en').attr('aria-pressed', 'true');
            //             $('#gt-lang-right #sugg-item-en')[0].trigger("click");
            //             $('#gt-lang-right #sugg-item-en')[0].click();
            var tmp = location.href.replace('/ja/', '/en/');
            if (location.href != tmp) location.href = tmp;
        }
        if (language.indexOf('英語') >= 0) {
            console.log('英語 ===> 日本語');
            //             console.log($('#gt-lang-right #sugg-item-ja'));
            var tmp = location.href.replace('/en/', '/ja/');
            if (location.href != tmp) location.href = tmp;
        }
    });
});
