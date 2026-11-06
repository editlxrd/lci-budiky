# Ověření LCI Budíky 0.3.0

6. 11. 2026, macOS. Skutečné obrazovky běží v App Kit emulátoru s WASM grafikou. Inter obsahuje českou znakovou sadu.

Automatické kontroly: BC a uložení nastavení, české texty, fonty, dekódování read-only telemetrie, odmítnutí starých callbacků a cache, podmínky parkovací relace, ukončení při pohybu či ztrátě dat, 60sekundový limit, čtyři vrstvy, průhledné oblasti původních ukazatelů a sestavení balíčku se syntetickým SDK v dočasné složce. Produkční kód prochází syntaxí Node 8.

Shadery jsou kontrolované v prohlížeči. Tato kontrola ani emulátor nejsou důkazem funkce na cílovém KOMBI. V autě zbývá ověřit služby, fyzické BC, geometrii, kontrolky, dojezdy a mapu. Testovací vydání jízdu nepovoluje.
