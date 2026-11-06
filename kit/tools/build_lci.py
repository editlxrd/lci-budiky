#!/usr/bin/env python3
"""Build only LCI Budíky through the upstream kit; SDK is supplied on the unit."""
import json, pathlib, sys, tarfile
import build as base

def build(app_id='dv_lci_budiky'):
    if app_id != 'dv_lci_budiky':
        raise ValueError('This source publishes only dv_lci_budiky')
    base.build(app_id)
    stage=pathlib.Path(base.DIST)/app_id
    spec=json.loads((pathlib.Path(base.APPS)/app_id/'app.json').read_text())
    pkg=stage/'source/package.json'
    data=json.loads(pkg.read_text())
    data.update(author=spec['author'],license=spec['license'],mguHmi=['ID7'])
    pkg.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
    dest=pathlib.Path(base.DIST)
    with tarfile.open(dest/(app_id+'@'+spec['version']+'.tgz'),'w:gz') as tf:
        tf.add(stage/'source',arcname='package')
    with tarfile.open(dest/(app_id+'@'+spec['version']+'.mgu'),'w:gz') as tf:
        for name in ['meta.json','source','rhmiData','rhmiDataStartWidget','oapgen']:
            if (stage/name).exists():tf.add(stage/name,arcname=name)

if __name__=='__main__':
    build(sys.argv[1] if len(sys.argv)>1 else 'dv_lci_budiky')
