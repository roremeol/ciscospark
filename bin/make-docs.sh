#!/bin/bash
cd "$(dirname $0)/.."
PATH="$(pwd)/node_modules/.bin:$PATH"
jsdoc -c ./jsdocs.json
exit 0
