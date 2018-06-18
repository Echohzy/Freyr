import { observable } from 'mobx';

export class IndexStore {
  @observable isRequesting = false;
}

export default new IndexStore();