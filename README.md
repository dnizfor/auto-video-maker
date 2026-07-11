# auto-video-maker

![](https://user-images.githubusercontent.com/86577022/222952943-c6f341c4-d972-4bb2-9158-62b439519b95.png)

Tool For create youtube videos from json !

- You have to change the font for different alphabets.
- Her kelime için `images/<word>.png` biçiminde bir görsel ekleyin. Video
  ekranının sol yarısında kelime ve anlam, sağ yarısında bu görsel gösterilir.

[Example Result Video](https://www.youtube.com/watch?v=253vwC1K9nI)

# dependencies

- İmageMagic

## Piper TTS

Seslendirme yerel olarak Piper TTS ile yapılır. Bağımlılıkları ve varsayılan
İngilizce/İspanyolca ses modellerini kurun:

```bash
python -m pip install -r requirements.txt
python -m piper.download_voices --data-dir assets/voices en_US-lessac-medium es_ES-sharvard-medium
```

Farklı modeller kullanmak için modelin `.onnx` dosyasını ortam değişkeniyle
belirtin. Eşleşen `.onnx.json` dosyası aynı klasörde bulunmalıdır:

```bash
export PIPER_VOICE_EN=/path/to/english-model.onnx
export PIPER_VOICE_ES=/path/to/spanish-model.onnx
python app.py
```

### Supported Languages

- af: Afrikaans
- ar: Arabic
- bg: Bulgarian
- bn: Bengali
- bs: Bosnian
- ca: Catalan
- cs: Czech
- da: Danish
- de: German
- el: Greek
- en: English
- es: Spanish
- et: Estonian
- fi: Finnish
- fr: French
- gu: Gujarati
- hi: Hindi
- hr: Croatian
- hu: Hungarian
- id: Indonesian
- is: Icelandic
- it: Italian
- iw: Hebrew
- ja: Japanese
- jw: Javanese
- km: Khmer
- kn: Kannada
- ko: Korean
- la: Latin
- lv: Latvian
- ml: Malayalam
- mr: Marathi
- ms: Malay
- my: Myanmar (Burmese)
- ne: Nepali
- nl: Dutch
- no: Norwegian
- pl: Polish
- pt: Portuguese
- ro: Romanian
- ru: Russian
- si: Sinhala
- sk: Slovak
- sq: Albanian
- sr: Serbian
- su: Sundanese
- sv: Swedish
- sw: Swahili
- ta: Tamil
- te: Telugu
- th: Thai
- tl: Filipino
- tr: Turkish
- uk: Ukrainian
- ur: Urdu
- vi: Vietnamese
- zh-CN: Chinese (Simplified)
- zh-TW: Chinese (Traditional)
