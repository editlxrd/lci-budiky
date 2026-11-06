"""Packaging test with a synthetic non-BMW SDK, kept entirely in a temp directory."""
import importlib.util,sys,tempfile,pathlib,json,tarfile
root=pathlib.Path(__file__).resolve().parents[1]
sys.path.insert(0,str(root/'kit/tools'))
import build_lci
with tempfile.TemporaryDirectory(prefix='lci-package-test-') as td:
    tmp=pathlib.Path(td);sdk=tmp/'synthetic-sdk';sdk.mkdir()
    (sdk/'index.js').write_text("throw new Error('SYNTHETIC_TEST_SDK_NOT_FOR_INSTALL');\n")
    (sdk/'package.json').write_text('{"name":"synthetic-test-sdk","version":"0.0.0"}')
    build_lci.base.SDK=str(sdk);build_lci.base.DIST=str(tmp/'dist')
    build_lci.build()
    stage=tmp/'dist/dv_lci_budiky/source'
    pkg=json.loads((stage/'package.json').read_text())
    assert pkg['name']=='dv_lci_budiky' and pkg['version']=='0.3.1'
    assert pkg['author']=='David My (330e)' and pkg['license']=='GPL-3.0-or-later'
    assert pkg['mguHmi']==['ID7']
    manifest=json.loads((stage/'manifest.json').read_text())
    tasu=manifest['proxies']['com.harman.infotainment.systemfunctions.tasu.tasu.InternalTasu']
    assert tasu['methods']==['sendTasuRequest'] and tasu['broadcasts']==['sendTasuResponse']
    assert tasu['instances']=='SystemFunctionsInternalTasuInst1'
    assert (stage/'javascript/lci_cluster.pack').is_file()
    assert (stage/'javascript/fonts.pack').is_file()
    assert (stage/'javascript/licenses.pack').is_file()
    ui=json.loads((stage/'rhmiData/variantGroups/Common/texts/en_GB.json').read_text())
    assert 'LCI Budíky' in ui.values()
    with tarfile.open(tmp/'dist/dv_lci_budiky@0.3.1.tgz') as tf:
        archive=json.load(tf.extractfile('package/package.json'))
        assert archive['author']==pkg['author'] and archive['license']==pkg['license']
print('PASS production packaging with synthetic SDK, author/license, UDS permissions, fonts and graphics')
