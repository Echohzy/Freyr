import '../../stylesheets/style.less';

export default class BaseApp {
  constructor(...args) {
    this.initialize(...args);
  }
  initialize() {
    alert("initialize must be defined");
  }
}