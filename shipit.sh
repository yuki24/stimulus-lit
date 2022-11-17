#!/bin/sh

set -xe

yarn run prettier-project
git pull -r origin main
yarn type-check
yarn test
git push origin head
