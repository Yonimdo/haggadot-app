#!/bin/bash
set -ex
ng build -d="/app/" -bh="/app/"
rsync -av --progress dist/ sysop@nli.oglam.hasadna.org.il:/home/sysop/haggadot-app/dist/
echo "OK! Now go and see http://nli.oglam.hasadna.org.il/app/"

