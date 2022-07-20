import {default as V} from './Vector.js'

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
    this.partner = null;
  }
}

const withinHoweverMuch = (num1, num2, rad) => {
  return (num1 > num2 - rad) && (num1 < num2 + rad);
}
Math.closestTen = (num1) => {
  return Math.round(num1 / 10) * 10;
}

let nodes = [];
const dist = 15;

for(let i = 0;i<2;i++){
  let x = Math.closestTen((Math.random() * (canvas.width/2)) + (canvas.width/4));
  let y = Math.closestTen((Math.random() * (canvas.height/3)) + (canvas.height/3));
  let index = 0;

  while(index < nodes.length){
    if(withinHoweverMuch(x, nodes[index].x, dist) && withinHoweverMuch(y, nodes[index].y, dist)){
      x = Math.closestTen((Math.random() * (canvas.width/2)) + (canvas.width/4));
      y = Math.closestTen((Math.random() * (canvas.height/3)) + (canvas.height/3));
      index = 0;
    }else{
      index++;
    }
  }

  nodes.push(new Node({
    x: x,
    y: y,
    lit: i%2===0
  }))
  
  // if(i%2!==0){
  //   nodes[i].partner = nodes[i-1];
  //   nodes[i-1].partner = nodes[i];
  // }
}

let lit = [];
let dim = [];
for(let i = 0;i<nodes.length;i++){
  if(i%2===0){
    lit.push(nodes[i]);
  }else{
    dim.push(nodes[i]);
  }
}

for(let i = 0;i<lit.length;i++){

  for(let j = 0;j<dim.length;j++){
    if(lit[i].partner === null && dim[j].partner === null){
      lit[i].partner = dim[j];
      dim[j].partner = lit[i];
    }else if(lit[i].partner !== null && dim[j].partner === null && withinHoweverMuch(dim[j].y, lit[i].y, Math.abs(lit[i].y - lit[i].partner.y))){
      lit[i].partner.partner = null;
      lit[i].partner = dim[j];
      dim[j].partner = lit[i];
    }
  }

}

lit.forEach(node => console.log(node.partner));

let interval = setInterval(() => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  nodes.forEach((node, i)=> {
    if(node.lit){
      ctx.strokeStyle = 'white'
      ctx.drawCircle(node.x, node.y, 5);
    }else{
      ctx.fillStyle = 'white';
      ctx.fillCircle(node.x, node.y, 5);
    }
  })

  for(let i = 0;i<lit.length;i++){
    let toLine = V.createNew(lit[i].x - lit[i].partner.x, lit[i].y - lit[i].partner.y);
    if(lit[i].x < lit[i].partner.x){
      toLine.addAngle((Math.PI*2) - toLine.getAngle());
    }else{
      toLine.addAngle(Math.PI - toLine.getAngle());
    }
    toLine.normalize().mult(5);
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(lit[i].x, lit[i].y);
    let lastX = lit[i].x, lastY = lit[i].y;
    for(let z = 0;z<50;z++){

      if(Math.abs(lastY - lit[i].partner.y) > Math.abs(lastX - lit[i].partner.x)){
        if(lit[i].y > lit[i].partner.y){
          toLine.addAngle(Math.PI/4);
          ctx.lineTo(lastX + toLine.x, lastY + toLine.y);
          lastX = lastX + toLine.x;
          lastY = lastY + toLine.y;
          toLine.addAngle(-Math.PI/4)
        }else{
          toLine.addAngle(-Math.PI/4);
          ctx.lineTo(lastX + toLine.x, lastY + toLine.y);
          lastX = lastX + toLine.x;
          lastY = lastY + toLine.y;
          toLine.addAngle(Math.PI/4);
        }

        toLine.normalize().mult(5);
      }else{
        ctx.lineTo(lastX + toLine.x, lastY + toLine.y);
        lastX = lastX + toLine.x;
        lastY = lastY + toLine.y;
      }
    }

    ctx.stroke();
  }

  // for(let i = 0;i<nodes.length;i+=2){
  //   ctx.strokeStyle = 'white';
  //   ctx.beginPath();
  //   ctx.moveTo(nodes[i].x, nodes[i].y);
  //   ctx.lineTo(nodes[i].partner.x, nodes[i].partner.y);
  //   ctx.stroke();
  // }

}, 10);

