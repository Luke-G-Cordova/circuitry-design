
export default class Circuit{
  constructor(){
    this.nodes = [];
  }

}


class Node {
  constructor(options){
    let ogo = {
      x: 0,
      y: 0,
      lit: false
    }
    ogo = Object.assign(ogo, options);
    this.x = ogo.x;
    this.y = ogo.y;
    this.lit = ogo.lit;
  }
}