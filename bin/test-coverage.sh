#!/bin/bash
cd "$(dirname $0)/.."
PATH="$(pwd)/node_modules/.bin:$PATH"
check-node-version --node '>=4.0.0' && istanbul cover ./node_modules/mocha/bin/_mocha ./test -- -R spec
exit 0
