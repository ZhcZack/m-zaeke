import { formatArticleInfomation, log } from '@/lib/lib';
import store from '@/store';


export function index(skipnum = 0, length = 10) {
  return fetch(`${store.state.globalIp}/main/index?skipnum=${skipnum}&length=${length}`)
    .then(response => response.json()).then(json => {
      if (json.code === 1) {
        let list = json.data.article_list;
        list = list.map(l => formatArticleInfomation(l));
        return list;
      } else {
        return null;
      }
    })
    .catch(error => log(error));
}