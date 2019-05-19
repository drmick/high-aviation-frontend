git fetch --all
git reset --hard origin/master
npm install
killall -9 node
npm run build
nohup npm run start &
logout
#ssh dep@highaviation.ru 'cd /var/www/high-aviation-frontend/high-aviation-frontend; sh run.sh;'


    b-form-group(label="Название" label-for="corrAccount")
      b-form-input(
        :class="{ 'is-invalid': errors.has('corrAccount') }"
        name="corrAccount"
        key="corrAccount",
        type="text"
        v-model="data.corrAccount"
        v-validate="'required'")
        span.error {{ errors.first('corrAccount') }}
