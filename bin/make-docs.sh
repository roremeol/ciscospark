#!/bin/bash
cd "$(dirname $0)/.."
PATH="$(pwd)/node_modules/.bin:$PATH"
esdoc -c esdoc.json
exit 0
