#!/bin/zsh
set -eu
cd -- "${0:A:h}"
nodebin="../BMW-iDrive-priprava/runtime/node-v26.13.0-darwin-arm64/bin/node"
if [[ ! -x "$nodebin" ]]; then nodebin="$(command -v node || true)"; fi
if [[ -z "$nodebin" ]]; then print "Chybí připravený Node runtime."; read; exit 1; fi
if /usr/sbin/lsof -nP -iTCP:64558 -sTCP:LISTEN >/dev/null 2>&1; then
  print "Náhled už běží: http://127.0.0.1:64558/"
  read
  exit 0
fi
exec "$nodebin" kit/tools/emu.js dv_lci_budiky --port 64558
