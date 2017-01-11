#!/bin/bash
# bluebird
cp node_modules/bluebird/js/browser/bluebird.core.min.js ./
rm -rf node_modules/bluebird/
mkdir -p node_modules/bluebird/js/browser
mv bluebird.core.min.js node_modules/bluebird/js/browser/
