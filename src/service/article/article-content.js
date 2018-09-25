import store from '@/store';
import { log } from '@/lib/lib';

export function articleContent(id) {
  return fetch(`${store.state.globalIp}/main/article?id=${id}`).then(result => result.json()).then(json => {
    if (json.code === 1) {
      return json.data;
    } else {
      return null;
    }
  }).catch(error => log(error));
}