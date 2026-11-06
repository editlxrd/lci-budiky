# LCI Budíky

**Vytvořeno Davidem My (330e)**

Vlastní česká aplikace pro iDrive 7 odvozená od G’s Dash. Tmavé rozhraní s červenými akcenty, vlastní G20 grafika, přepínání BC z aplikace i čtením fyzické páčky, nastavení a diagnostika.

## První testovací vydání 0.3.1

Určeno k prvnímu ověření **ve stojícím voze**. Zapnutí vyžaduje čerstvě přečtené **P z EGS**, rychlost pod **1 km/h**, **Sport Individual** a platné otáčky. Test trvá nejvýše **60 sekund**; při změně podmínek, opuštění aplikace, výpadku dat nebo chybě rendereru se vypne. Po restartu aplikace zůstává vypnuté.

Geometrie vychází z naměřených oblastí M/Sport KOMBI v G’s Dash. Tato upravená grafika ještě nebyla na cílovém 330e ověřena: před použitím za jízdy je nutné ověřit původní kontrolky, výstrahy, dojezdy a soužití mapy. Toto vydání běh za jízdy nepovoluje. Stránka časů zatím neprovádí jízdní měření v této parkovací relaci.

## Instalace přes MGU Store

1. Měj nainstalovaný **Cluster renderer (`cluster-render`, nejméně 0.2.2)** z `robertnisipeanu/idrive-apps`.
2. V MGU Store otevři **Settings → Add source** a přidej `editlxrd/lci-budiky`.
3. Vyber zdroj z větve **main**, nainstaluj **LCI Budíky** a otevři jej v nabídce APPS.
4. Ve stojícím autě v P a Sport Individual stiskni **Zapnout test (60 s)**. Stav aplikace musí potvrdit „Test běží“.
5. Nejprve ověř původní kontrolky, dojezdy, malé ukazatele a mapu. Kdykoli použij **Vypnout test**. Pokud se cokoli překrývá, test vypni a zaznamenej obrazovku; další nastavení se v této verzi nekóduje.

Store aplikaci sestaví na jednotce s jejím vlastním SDK. Do auta se neflashuje firmware ani nekóduje KOMBI. Původní G’s Dash má jiné ID a tato aplikace ho nepřepisuje.

## Rozhraní

- **Budíky** – zapnutí/vypnutí testu a náhradní tlačítko **Další hodnoty BC**.
- **Nastavení** – zachování mapy, shift lights, bod přeřazení a profil Sport Individual.
- **Diagnostika** – nástroje rendereru, widgety a zvuk, s českými popisky.

Vlastní grafika používá čtyři efektové vrstvy a tři textury. Vyhrazené oblasti původních ukazatelů zůstávají průhledné. Střed je podmíněné okno BC/mapy; při zjištěné mapě či navádění zůstává průhledný a rychlost/zařazení jsou pod ním. Nativní vrstvy BMW nejsou tímto repozitářem emulované.

## Vývoj a ověření

`npm ci && npm test`

Náhled iDrive: `node kit/tools/emu.js dv_lci_budiky --port 64558`, potom http://127.0.0.1:64558/. Jde o veřejný browserový emulátor App Kitu, nikoli plnou MGU firmware VM. Na Macu není připojené vozidlo; chybějící živé podklady jsou zobrazené jako neznámé a nezapnou test.

Kontrola skutečných shaderů: `node kit/tools/check_lci_webgl.js`, http://127.0.0.1:64559/. Používá pevná testovací data; není testem auta.

`kit/tools/build_lci.py` je sestavení pro jednotku se SDK. `build_emu.py` je oddělené hostitelské sestavení bez SDK; jeho výstupy nejsou instalační archiv.

## Původ a licence

Základ: [G’s Dash od Nicka G](https://github.com/nickgcode/idrive7-apps), původní commit `0c0eec6b9bf8c40791f38ef1ccc9fafcb1982a33` (MIT). Původní zdroje a licence zůstaly zachované. Upravená aplikace je GPL-3.0-or-later; viz `apps/dv_lci_budiky/LICENSE` a `NOTICE`. App Kit (MIT), cluster-render (samostatný nástroj) a font Inter (SIL OFL) mají zachované kredity. Nejde o aplikaci BMW ani aplikaci podporovanou původními autory.

Repozitář neobsahuje BMW SDK, firmware, soukromé záznamy vozidla ani přihlašovací údaje. Sestavené OAP balíčky se SDK se nezveřejňují.
