# Náhled LCI Budíky 0.3.0

Název LCI Budíky, kredit Vytvořeno Davidem My (330e), české rozhraní Budíky / Nastavení / Diagnostika a font Inter.

Emulátor spouští skutečný kód obrazovek a kit runtime s WASM grafikou. BMW SDK, RHMI a vozidlo nahrazuje hostitelský stub. Jde o veřejný browserový emulátor App Kitu, nikoli plnou MGU firmware VM.

Spuštění: `node kit/tools/emu.js dv_lci_budiky --port 64558`. Hostitelský build používá preview-stage/ a nevytváří instalační archiv se SDK.

Ovládání je připojené k samostatné relaci rendereru. Na Macu chybí živá data, takže test zůstane vypnutý. Fyzická páčka BC a nativní vrstvy BMW vyžadují ověření na vozidle.

`node kit/tools/check_lci_webgl.js` na portu 64559 ověřuje skutečné shadery s pevnými testovacími daty. Neukazuje skutečnou situaci vozu ani původní kontrolky BMW.
