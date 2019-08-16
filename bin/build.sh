#!/bin/bash
cd "$(dirname $0)/.."
PATH="$(pwd)/node_modules/.bin:$PATH"

echo
echo "# Clean build directory"
rm -R build && mkdir build && touch build/.empty
if [ $? -ne 0 ]; then
  echo "FAIL: Clean Build directory" 1>&2
  exit 3
fi

echo
echo "# Transpile Source code with Babel"
babel src -d build/src
if [ $? -ne 0 ]; then
  echo "FAIL: Transpile Source code" 1>&2
  exit 4
fi

if [ "$1" == "--publish" ]; then
  echo
  echo "# Publish to NPM"
  npm publish .
  if [ $? -ne 0 ]; then
    echo "FAIL: Publish to NPM" 1>&2
    exit 9
  fi
  echo
  echo "PASS: TEST, BUILD and DEPLOY are SUCCESSFUL!"
  exit 0
fi

echo
echo "PASS: BUILD are SUCCESSFUL!"
exit 0
