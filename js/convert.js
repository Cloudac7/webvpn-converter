// 源自 https://github.com/spencerwooo/bit-webvpn-converter，重写了 encrypt_URL()（原名 encryptUrl()），新增 decrypt_URL()。
// https://github.com/spencerwooo/bit-webvpn-converter/blob/c97806011cc3113a5090d7b7f919c7d868bd090d/src/components/convert.ts

import { aesjs } from "./aes-js.js";

const utf8 = aesjs.utils.utf8
const hex = aesjs.utils.hex
const AesCfb = aesjs.ModeOfOperation.cfb
const magic_word = 'wrdvpnisthebest!'

const textRightAppend = (text, mode) => {
    const segmentByteSize = mode === 'utf8' ? 16 : 32
    if (text.length % segmentByteSize === 0) {
        return text
    }

    const appendLength = segmentByteSize - (text.length % segmentByteSize)
    let i = 0
    while (i++ < appendLength) {
        text += '0'
    }
    return text
}

const encrypt = (text, key, iv) => {
    const textLength = text.length
    text = textRightAppend(text, 'utf8')

    const keyBytes = utf8.toBytes(key)
    const ivBytes = utf8.toBytes(iv)
    const textBytes = utf8.toBytes(text)

    const aesCfb = new AesCfb(keyBytes, ivBytes, 16)
    const encryptBytes = aesCfb.encrypt(textBytes)

    return (
        hex.fromBytes(ivBytes) +
        hex.fromBytes(encryptBytes).slice(0, textLength * 2)
    )
}


/**
 * 猜测 URL 协议类型
 * @param {string} url_str 
 * @returns 补足协议类型的 URL
 */
function guess_protocol(url_str) {
    if (!url_str.includes('://')) {
        if (url_str.includes('.bit.edu.cn'))
            return 'http://' + url_str;
        else
            return 'https://' + url_str;
    } else
        return url_str;
}

/**
 * 普通 URL 转 WebVPN URL
 * @param {string} url_str 
 * @returns WebVPN URL
 * @version 1.0
 * @description 与 0.0 版的区别：此版本返回值是完整 URL，使用 URL API（无需特别处理 IPv6）。
 * @see decrypt_URL
 */
export function encrypt_URL(url_str) {
    const url = new URL(guess_protocol(url_str));

    const protocol = url.protocol.slice(0, -1).toLowerCase(), // "https:" -> "https"
        port = url.port,
        pathname_etc = url.pathname + url.search + url.hash;

    const protocol_and_port = port ? `${protocol}-${port}` : protocol,
        cipher = encrypt(url.hostname, magic_word, magic_word);

    return `${protocol_and_port}/${cipher}${pathname_etc}`
}

export function convert(webvpn_link, pageUrl){

    var encrypted_url = encrypt_URL(pageUrl);
	var Url = webvpn_link + '/' + encrypted_url;

    return Url;
}