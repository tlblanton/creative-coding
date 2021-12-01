const canvasSketch = require('canvas-sketch');
const random  = require('canvas-sketch-util/random')
const math = require('canvas-sketch-util/math')

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};
// -- Sketch -- //
const sketch = ({ context, width, height }) => {

  const agents = [];

  for(let i = 0; i < 40; ++i){
    const x = random.range(0, width)
    const y = random.range(0, height)
    
    agents.push(new Agent(x, y))
  }
  

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    for(let i = 0; i < agents.length; ++i){
      const agent = agents[i];

      for(let j = i+1; j < agents.length; ++j){
        const other = agents[j] 

        const dist = agent.pos.getDistance(other.pos)
        if(dist > 200) continue;

        context.lineWidth = math.mapRange(dist, 0, 200, 20, 0.5)

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y)
        context.lineTo(other.pos.x, other.pos.y)
        context.strokeStyle = "white"
        context.stroke()
      } 
    }

    agents.forEach(agent => {
      agent.update()
      agent.draw(context) 
      agent.wrap(width, height)
    })
  };
};

// -- Sketch the sketch! - //
canvasSketch(sketch, settings);

// -- Classes -- //
class  Vector{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  getDistance(v){
    const dx = this.x - v.x
    const dy = this.y - v.y

    return Math.sqrt((dx * dx) + (dy * dy))
  }
}

class Agent{
  constructor(x, y){
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1.5, 1.5), random.range(-1.5, 1.5))
    this.radius = random.range(4, 8);
  }

  update(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  bounce(width, height){
    if(this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1
    if(this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1
  }

  wrap(width, height){
    if(this.pos.x < 0) this.pos.x = width
    if(this.pos.x > width) this.pos.x = 0

    if(this.pos.y < 0) this.pos.y = height
    if(this.pos.y > height) this.pos.y = 0
  }

  draw(context){    
    context.save();

    context.translate(this.pos.x, this.pos.y)

    context.lineWidth = 4
    context.beginPath()
    context.arc(0, 0, this.radius, 0, Math.PI * 2)
    context.stroke()

    context.restore()
  }
}