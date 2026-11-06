'use strict';
const assert=require('assert'),t=require('../apps/dv_lci_budiky/core/lci_czech').translate;
assert.equal(t('Renderer refusals'),'Odmítnuté vrstvy');
assert.equal(t('Not installed'),'Nenainstalováno');
assert.equal(t('Žádné kontrolky'),'Žádné kontrolky','translation must not replace on inside Czech words');
assert.equal(t('de.bmw.infotainment.vehicle.Vehicle2'),'de.bmw.infotainment.vehicle.Vehicle2');
assert.equal(t('hmi_widgets.txt'),'hmi_widgets.txt');
assert.equal(t('Off (Car\'s own dials & HUD)'),'Vypnuto (Původní budíky a HUD BMW)');
console.log('PASS Czech UI translation without corrupting Czech words or technical identifiers');
