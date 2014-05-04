'use strict';
$(function(){
    chrome.tabs.getSelected(null, function(tab) {
          $('#qrcode').qrcode({text: utf16to8(tab.url)});
    });
    $('#url').bind('input propertychange', function() {
      if ($('#url').val().length==0) {
        chrome.tabs.getSelected(null, function(tab) {
              $('#qrcode').html('').qrcode({text: utf16to8(tab.url)});
        });
        return;
      }
        $('#qrcode').html('').qrcode({text:utf16to8($('#url').val())});
    });
});

//http://www.haogongju.net/art/2205618
//http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt
//UTF8Coding
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
    } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    } else {
        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
    }
    }
    return out;
}
