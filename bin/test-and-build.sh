#!/bin/bash
cd "$(dirname $0)/.."
PATH="$(pwd)/node_modules/.bin:$PATH"

if [ "$1" == "--nocover" ]; then
  NoCoverage=1
else
  NoCoverage=0
fi

check-node-version --node '>=4.0.0'
if [ $? -eq 0 ]; then
  echo
  echo "# Check coding standard..."
  standard
  if [ $? -ne 0 ]; then
    echo "FAIL: Coding standard" 1>&2
    exit 1
  fi

  if [ "$NoCoverage" == "1" ]; then
    echo
    echo "# Run Test on Source"
    _mocha ./test -R spec
    if [ $? -ne 0 ]; then
      echo "FAIL: Test" 1>&2
      exit 2
    fi
  else
    echo
    echo "# Run Test on Source and Create Code Coverage Report"
    istanbul cover ./node_modules/mocha/bin/_mocha ./test -- -R spec
    if [ $? -ne 0 ]; then
      echo "FAIL: Test Coverage" 1>&2
      exit 2
    fi
  fi
fi

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

echo
echo "# Transpile Unit Test code with Babel"
babel test -d build/test
if [ $? -ne 0 ]; then
  echo "FAIL: Transpile Unit Test code" 1>&2
  exit 5
fi

echo
echo "# Run Tests on Transpiled codes"
_mocha ./build/test -R spec
if [ $? -ne 0 ]; then
  echo "FAIL: Transpile Code Test" 1>&2
  exit 6
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
echo "PASS: TEST and BUILD are SUCCESSFUL!"
exit 0
