#!/usr/bin/env python3
"""Host-only staging for the App Kit emulator. No BMW SDK, no install archive."""
import importlib.util, pathlib, shutil, sys
here=pathlib.Path(__file__).resolve().parent
sp=importlib.util.spec_from_file_location('lci_preview_build',here/'build.py')
m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m)
m.DIST=str(here.parent.parent/'preview-stage')
real_copy=shutil.copy
sdk=pathlib.Path(m.SDK).resolve()
def host_copy(src,dst,*a,**k):
    if pathlib.Path(src).resolve().parent==sdk:
        return str(dst)  # hu-stub injects the head unit API; no synthetic SDK is created.
    return real_copy(src,dst,*a,**k)
shutil.copy=host_copy
try:
    m.build(sys.argv[1])
finally:
    # Even if the builder fails, no host-only archive is retained as an installable package.
    for p in pathlib.Path(m.DIST).glob('*'):
        if p.is_file() and (p.name.endswith('.tgz') or p.name.endswith('.mgu')):p.unlink()
