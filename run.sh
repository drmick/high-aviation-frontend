npm install
git fetch --all
git reset --hard origin/master
killall -9 node
npm run build
nohup npm run start &

#ssh dep@highaviation.ru 'cd /var/www/high-aviation-frontend/high-aviation-frontend; sh run.sh;'

