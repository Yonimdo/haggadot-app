#!/bin/bash
set -ex
ng build -d /static/app/ -bh /static/app/
rsync -av --progress dist/ sysop@nli.oglam.hasadna.org.il:/home/sysop/Hagadot/collected_static/app/
echo "OK! No go and see http://nli.oglam.hasadna.org.il/static/app/"

