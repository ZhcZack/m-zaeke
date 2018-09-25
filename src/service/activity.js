import store from '@/store';
import { log } from '@/lib/lib';

export function getActivities(skipnum = 0, length = 12) {
  return fetch(`${store.state.globalIp}/main/live_list?skipnum=${skipnum}&length=${length}`)
    .then(result => result.json()).then(json => {
      if (json.code === 1) {
        return json.data.list;
      } else {
        return null;
      }
    }).catch(error => log(error));
}