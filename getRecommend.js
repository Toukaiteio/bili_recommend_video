var xhr = new XMLHttpRequest();
xhr.timeout = 3000;
xhr.responseType = "text";
function createCommonjsModule(de, pe) {
    return pe = {
        exports: {}
    },
    de(pe, pe.exports),
    pe.exports
}
var crypt = createCommonjsModule(function(de) {
    (function() {
        var pe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
          , me = {
            rotl: function(ye, $e) {
                return ye << $e | ye >>> 32 - $e
            },
            rotr: function(ye, $e) {
                return ye << 32 - $e | ye >>> $e
            },
            endian: function(ye) {
                if (ye.constructor == Number)
                    return me.rotl(ye, 8) & 16711935 | me.rotl(ye, 24) & 4278255360;
                for (var $e = 0; $e < ye.length; $e++)
                    ye[$e] = me.endian(ye[$e]);
                return ye
            },
            randomBytes: function(ye) {
                for (var $e = []; ye > 0; ye--)
                    $e.push(Math.floor(Math.random() * 256));
                return $e
            },
            bytesToWords: function(ye) {
                for (var $e = [], Se = 0, Te = 0; Se < ye.length; Se++,
                Te += 8)
                    $e[Te >>> 5] |= ye[Se] << 24 - Te % 32;
                return $e
            },
            wordsToBytes: function(ye) {
                for (var $e = [], Se = 0; Se < ye.length * 32; Se += 8)
                    $e.push(ye[Se >>> 5] >>> 24 - Se % 32 & 255);
                return $e
            },
            bytesToHex: function(ye) {
                for (var $e = [], Se = 0; Se < ye.length; Se++)
                    $e.push((ye[Se] >>> 4).toString(16)),
                    $e.push((ye[Se] & 15).toString(16));
                return $e.join("")
            },
            hexToBytes: function(ye) {
                for (var $e = [], Se = 0; Se < ye.length; Se += 2)
                    $e.push(parseInt(ye.substr(Se, 2), 16));
                return $e
            },
            bytesToBase64: function(ye) {
                for (var $e = [], Se = 0; Se < ye.length; Se += 3)
                    for (var Te = ye[Se] << 16 | ye[Se + 1] << 8 | ye[Se + 2], we = 0; we < 4; we++)
                        Se * 8 + we * 6 <= ye.length * 8 ? $e.push(pe.charAt(Te >>> 6 * (3 - we) & 63)) : $e.push("=");
                return $e.join("")
            },
            base64ToBytes: function(ye) {
                ye = ye.replace(/[^A-Z0-9+\/]/ig, "");
                for (var $e = [], Se = 0, Te = 0; Se < ye.length; Te = ++Se % 4)
                    Te != 0 && $e.push((pe.indexOf(ye.charAt(Se - 1)) & Math.pow(2, -2 * Te + 8) - 1) << Te * 2 | pe.indexOf(ye.charAt(Se)) >>> 6 - Te * 2);
                return $e
            }
        };
        de.exports = me
    }
    )()
})
  , charenc = {
    utf8: {
        stringToBytes: function(de) {
            return charenc.bin.stringToBytes(unescape(encodeURIComponent(de)))
        },
        bytesToString: function(de) {
            return decodeURIComponent(escape(charenc.bin.bytesToString(de)))
        }
    },
    bin: {
        stringToBytes: function(de) {
            for (var pe = [], me = 0; me < de.length; me++)
                pe.push(de.charCodeAt(me) & 255);
            return pe
        },
        bytesToString: function(de) {
            for (var pe = [], me = 0; me < de.length; me++)
                pe.push(String.fromCharCode(de[me]));
            return pe.join("")
        }
    }
}
  , charenc_1 = charenc;
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var isBuffer_1 = function(de) {
    return de != null && (isBuffer$2(de) || isSlowBuffer(de) || !!de._isBuffer)
};
function isBuffer$2(de) {
    return !!de.constructor && typeof de.constructor.isBuffer == "function" && de.constructor.isBuffer(de)
}
function isSlowBuffer(de) {
    return typeof de.readFloatLE == "function" && typeof de.slice == "function" && isBuffer$2(de.slice(0, 0))
}
var md5 = createCommonjsModule(function(de) {
    (function() {
        var pe = crypt
          , me = charenc_1.utf8
          , ye = isBuffer_1
          , $e = charenc_1.bin
          , Se = function(Te, we) {
            Te.constructor == String ? we && we.encoding === "binary" ? Te = $e.stringToBytes(Te) : Te = me.stringToBytes(Te) : ye(Te) ? Te = Array.prototype.slice.call(Te, 0) : !Array.isArray(Te) && Te.constructor !== Uint8Array && (Te = Te.toString());
            for (var Ae = pe.bytesToWords(Te), Ce = Te.length * 8, Pe = 1732584193, xe = -271733879, Oe = -1732584194, Me = 271733878, Fe = 0; Fe < Ae.length; Fe++)
                Ae[Fe] = (Ae[Fe] << 8 | Ae[Fe] >>> 24) & 16711935 | (Ae[Fe] << 24 | Ae[Fe] >>> 8) & 4278255360;
            Ae[Ce >>> 5] |= 128 << Ce % 32,
            Ae[(Ce + 64 >>> 9 << 4) + 14] = Ce;
            for (var De = Se._ff, je = Se._gg, Ne = Se._hh, Ie = Se._ii, Fe = 0; Fe < Ae.length; Fe += 16) {
                var Re = Pe
                  , ke = xe
                  , Le = Oe
                  , Ve = Me;
                Pe = De(Pe, xe, Oe, Me, Ae[Fe + 0], 7, -680876936),
                Me = De(Me, Pe, xe, Oe, Ae[Fe + 1], 12, -389564586),
                Oe = De(Oe, Me, Pe, xe, Ae[Fe + 2], 17, 606105819),
                xe = De(xe, Oe, Me, Pe, Ae[Fe + 3], 22, -1044525330),
                Pe = De(Pe, xe, Oe, Me, Ae[Fe + 4], 7, -176418897),
                Me = De(Me, Pe, xe, Oe, Ae[Fe + 5], 12, 1200080426),
                Oe = De(Oe, Me, Pe, xe, Ae[Fe + 6], 17, -1473231341),
                xe = De(xe, Oe, Me, Pe, Ae[Fe + 7], 22, -45705983),
                Pe = De(Pe, xe, Oe, Me, Ae[Fe + 8], 7, 1770035416),
                Me = De(Me, Pe, xe, Oe, Ae[Fe + 9], 12, -1958414417),
                Oe = De(Oe, Me, Pe, xe, Ae[Fe + 10], 17, -42063),
                xe = De(xe, Oe, Me, Pe, Ae[Fe + 11], 22, -1990404162),
                Pe = De(Pe, xe, Oe, Me, Ae[Fe + 12], 7, 1804603682),
                Me = De(Me, Pe, xe, Oe, Ae[Fe + 13], 12, -40341101),
                Oe = De(Oe, Me, Pe, xe, Ae[Fe + 14], 17, -1502002290),
                xe = De(xe, Oe, Me, Pe, Ae[Fe + 15], 22, 1236535329),
                Pe = je(Pe, xe, Oe, Me, Ae[Fe + 1], 5, -165796510),
                Me = je(Me, Pe, xe, Oe, Ae[Fe + 6], 9, -1069501632),
                Oe = je(Oe, Me, Pe, xe, Ae[Fe + 11], 14, 643717713),
                xe = je(xe, Oe, Me, Pe, Ae[Fe + 0], 20, -373897302),
                Pe = je(Pe, xe, Oe, Me, Ae[Fe + 5], 5, -701558691),
                Me = je(Me, Pe, xe, Oe, Ae[Fe + 10], 9, 38016083),
                Oe = je(Oe, Me, Pe, xe, Ae[Fe + 15], 14, -660478335),
                xe = je(xe, Oe, Me, Pe, Ae[Fe + 4], 20, -405537848),
                Pe = je(Pe, xe, Oe, Me, Ae[Fe + 9], 5, 568446438),
                Me = je(Me, Pe, xe, Oe, Ae[Fe + 14], 9, -1019803690),
                Oe = je(Oe, Me, Pe, xe, Ae[Fe + 3], 14, -187363961),
                xe = je(xe, Oe, Me, Pe, Ae[Fe + 8], 20, 1163531501),
                Pe = je(Pe, xe, Oe, Me, Ae[Fe + 13], 5, -1444681467),
                Me = je(Me, Pe, xe, Oe, Ae[Fe + 2], 9, -51403784),
                Oe = je(Oe, Me, Pe, xe, Ae[Fe + 7], 14, 1735328473),
                xe = je(xe, Oe, Me, Pe, Ae[Fe + 12], 20, -1926607734),
                Pe = Ne(Pe, xe, Oe, Me, Ae[Fe + 5], 4, -378558),
                Me = Ne(Me, Pe, xe, Oe, Ae[Fe + 8], 11, -2022574463),
                Oe = Ne(Oe, Me, Pe, xe, Ae[Fe + 11], 16, 1839030562),
                xe = Ne(xe, Oe, Me, Pe, Ae[Fe + 14], 23, -35309556),
                Pe = Ne(Pe, xe, Oe, Me, Ae[Fe + 1], 4, -1530992060),
                Me = Ne(Me, Pe, xe, Oe, Ae[Fe + 4], 11, 1272893353),
                Oe = Ne(Oe, Me, Pe, xe, Ae[Fe + 7], 16, -155497632),
                xe = Ne(xe, Oe, Me, Pe, Ae[Fe + 10], 23, -1094730640),
                Pe = Ne(Pe, xe, Oe, Me, Ae[Fe + 13], 4, 681279174),
                Me = Ne(Me, Pe, xe, Oe, Ae[Fe + 0], 11, -358537222),
                Oe = Ne(Oe, Me, Pe, xe, Ae[Fe + 3], 16, -722521979),
                xe = Ne(xe, Oe, Me, Pe, Ae[Fe + 6], 23, 76029189),
                Pe = Ne(Pe, xe, Oe, Me, Ae[Fe + 9], 4, -640364487),
                Me = Ne(Me, Pe, xe, Oe, Ae[Fe + 12], 11, -421815835),
                Oe = Ne(Oe, Me, Pe, xe, Ae[Fe + 15], 16, 530742520),
                xe = Ne(xe, Oe, Me, Pe, Ae[Fe + 2], 23, -995338651),
                Pe = Ie(Pe, xe, Oe, Me, Ae[Fe + 0], 6, -198630844),
                Me = Ie(Me, Pe, xe, Oe, Ae[Fe + 7], 10, 1126891415),
                Oe = Ie(Oe, Me, Pe, xe, Ae[Fe + 14], 15, -1416354905),
                xe = Ie(xe, Oe, Me, Pe, Ae[Fe + 5], 21, -57434055),
                Pe = Ie(Pe, xe, Oe, Me, Ae[Fe + 12], 6, 1700485571),
                Me = Ie(Me, Pe, xe, Oe, Ae[Fe + 3], 10, -1894986606),
                Oe = Ie(Oe, Me, Pe, xe, Ae[Fe + 10], 15, -1051523),
                xe = Ie(xe, Oe, Me, Pe, Ae[Fe + 1], 21, -2054922799),
                Pe = Ie(Pe, xe, Oe, Me, Ae[Fe + 8], 6, 1873313359),
                Me = Ie(Me, Pe, xe, Oe, Ae[Fe + 15], 10, -30611744),
                Oe = Ie(Oe, Me, Pe, xe, Ae[Fe + 6], 15, -1560198380),
                xe = Ie(xe, Oe, Me, Pe, Ae[Fe + 13], 21, 1309151649),
                Pe = Ie(Pe, xe, Oe, Me, Ae[Fe + 4], 6, -145523070),
                Me = Ie(Me, Pe, xe, Oe, Ae[Fe + 11], 10, -1120210379),
                Oe = Ie(Oe, Me, Pe, xe, Ae[Fe + 2], 15, 718787259),
                xe = Ie(xe, Oe, Me, Pe, Ae[Fe + 9], 21, -343485551),
                Pe = Pe + Re >>> 0,
                xe = xe + ke >>> 0,
                Oe = Oe + Le >>> 0,
                Me = Me + Ve >>> 0
            }
            return pe.endian([Pe, xe, Oe, Me])
        };
        Se._ff = function(Te, we, Ae, Ce, Pe, xe, Oe) {
            var Me = Te + (we & Ae | ~we & Ce) + (Pe >>> 0) + Oe;
            return (Me << xe | Me >>> 32 - xe) + we
        }
        ,
        Se._gg = function(Te, we, Ae, Ce, Pe, xe, Oe) {
            var Me = Te + (we & Ce | Ae & ~Ce) + (Pe >>> 0) + Oe;
            return (Me << xe | Me >>> 32 - xe) + we
        }
        ,
        Se._hh = function(Te, we, Ae, Ce, Pe, xe, Oe) {
            var Me = Te + (we ^ Ae ^ Ce) + (Pe >>> 0) + Oe;
            return (Me << xe | Me >>> 32 - xe) + we
        }
        ,
        Se._ii = function(Te, we, Ae, Ce, Pe, xe, Oe) {
            var Me = Te + (Ae ^ (we | ~Ce)) + (Pe >>> 0) + Oe;
            return (Me << xe | Me >>> 32 - xe) + we
        }
        ,
        Se._blocksize = 16,
        Se._digestsize = 16,
        de.exports = function(Te, we) {
            if (Te == null)
                throw new Error("Illegal argument " + Te);
            var Ae = pe.wordsToBytes(Se(Te, we));
            return we && we.asBytes ? Ae : we && we.asString ? $e.bytesToString(Ae) : pe.bytesToHex(Ae)
        }
    }
    )()
});
function getMixinKey(de) {
    var pe = [46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52]
      , me = [];
    return pe.forEach(function(ye) {
        de.charAt(ye) && me.push(de.charAt(ye))
    }),
    me.join("").slice(0, 32)
}
function encWbi(de, pe) {
    pe || (pe = {});
    var me = getWbiKey(pe)
      , ye = me.imgKey
      , $e = me.subKey;
    if (ye && $e) {
        for (var Se = getMixinKey(ye + $e), Te = Math.round(Date.now() / 1e3), we = Object.assign({}, de, {
            wts: Te
        }), Ae = Object.keys(we).sort(), Ce = [], Pe = /[!'\(\)*]/g, xe = 0; xe < Ae.length; xe++) {
            var Oe = Ae[xe]
              , Me = we[Oe];
            Me && typeof Me == "string" && (Me = Me.replace(Pe, "")),
            Me != null && Ce.push("".concat(encodeURIComponent(Oe), "=").concat(encodeURIComponent(Me)))
        }
        var Fe = Ce.join("&")
          , De = md5(Fe + Se);
        return {
            w_rid: De,
            wts: Te.toString(),
            tar:Fe
        }
    }
    return null
}
function getLocal(de) {
    try {
        return localStorage.getItem(de)
    } catch (pe) {
        return null
    }
}
function getKeyFromURL(de) {
    return de.substring(de.lastIndexOf("/") + 1, de.length).split(".")[0]
}
function getWbiKey(de) {
    if (de.useAssignKey)
        return {
            imgKey: de.wbiImgKey,
            subKey: de.wbiSubKey
        };
    var pe = getLocal("wbi_img_url")
      , me = getLocal("wbi_sub_url")
      , ye = pe ? getKeyFromURL(pe) : de.wbiImgKey
      , $e = me ? getKeyFromURL(me) : de.wbiSubKey;
    return {
        imgKey: ye,
        subKey: $e
    }
}
const getNewRecmdVideos=()=>{
    const _wbiImgKey=getKeyFromURL(getLocal("wbi_img_url"));
    const _wbiSubKey=getKeyFromURL(getLocal("wbi_sub_url"));
    const _wrid=encWbi({fresh_idx:1,
        fresh_idx_1h: 1,
        fresh_type: 3,
        homepage_ver: 1,
        ps: 10,
        version: 1,
        web_location: 1430651
    },{wbiImgKey:_wbiImgKey,wbiSubKey:_wbiSubKey});
    const rcmdUrl="https://api.bilibili.com/x/web-interface/wbi/index/top/rcmd?"+_wrid.tar+"&w_rid="+_wrid.w_rid;
    xhr.open('GET',rcmdUrl);
    xhr.onload = function(e) { 
        if(this.status == 200){
            const _data=JSON.parse(this.responseText);
            console.log(_data);
        }
    }
    xhr.send();
}