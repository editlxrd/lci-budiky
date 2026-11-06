# Návrh prvního přenosu

Cíl: zachovat schválený červený vzhled, obrysy rychloměru a otáčkoměru, bílé zaplnění otáček, M logo, shift lights a BC stránky. Původní kontrolky, palivový/hybridní dojezd a původní spodní ukazatele kreslí BMW.

Doporučená cesta: vlastní aplikace v repozitáři odvozeném od G’s Dash. Převzít životní cyklus, status/limit kontroly, průhledné boční kreslení a koordinaci mapy. Nahradit jen vzhled a přidat naše BC. Varianta přepsat nynější 11vrstvý renderer by znamenala znovu řešit i vše, co G’s Dash již obsahuje; prosté přejmenování G’s Dash by zase nepřeneslo náš design ani BC.

První zkušební rozsah: viditelnost pouze při přesně rozpoznaném Sport Individual; ostatní režimy a neznámý režim vracejí originál. To je návrh podle jediného uživatelem ověřeného režimu, nikoli tvrzení o omezení aktuálního upstreamu. Nebudeme překódovávat celé KOMBI kvůli vynucení M layoutu.

Schválený vzhled zachovat v prostoru vlastních budíků. Přesunutý vlastní čas, venkovní teplota a vlastní eDojezd se střetávají s cílem ponechat kompletní původní spodní pás; doporučení je nepřekreslovat je duplicitně. Před frontendovým portem ukázat jejich umístění na podkladu skutečného 330e.

První technický milník: samostatné app id, režimový adaptér, dvě boční vrstvy a nejvýše jedna společná doplňková vrstva pro BC/shift lights podle skutečné kompozice; ověřit průhlednost a paměť, ne pouze počet. Střed pro mapu se nekreslí, pokud jej má Waze/CarPlay. BC pozoruje naměřené D10E 0x40; běžnou BMW funkci nemění.

Druhý milník: simulace stejného aplikačního kódu s prosazenými limity rendereru, následně firmware emulátor, až bude dostupný jeho projekt a potřebné podklady. Oba druhy testů označit odlišně.

Distribuce: vlastní GitHub repo, původní upstream jako zdroj; mgu-repo.json a sestavení na jednotce. Unikátní id vlastní aplikace, aby se nepřepsal ng_gsdash. Do repozitáře nepatří VIN, SSH klíče, soukromé záznamy vozidla, SDK ani firmware. Ověřovat čistý checkout i Store manifest před publikací. Tento návrh ještě není implementovaný port.
