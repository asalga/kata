#!/bin/sh
d=$(pwd)
pushd ~/Downloads/
for x in __*.png;do mv $x $d/hiragana/${x#__};done;
popd
