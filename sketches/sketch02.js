const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5
    const cy = height * 0.5
    const w = width * 0.01
    const h = height * 0.1

    let x, y

    const num = 100
    const radius = width * 1 
    for(let i = 0; i < num; ++i){

      const slice = math.degToRad(360 / num)
      const angle = slice * i

      x = cx + radius * Math.sin(angle)
      y = cy + radius * Math.cos(angle)
      
      // --- lines ---
      context.save()
      //context.translate(x, y)
      context.rotate(-angle)
      context.scale(random.range(0.1, 2), random.range(0.2, 1))
      context.beginPath();
      context.fillStyle = "black"
      context.rect(-w * 0.2, random.range(10, -h * 22.5), w, h+20)
      context.fill()
      context.restore()
      // -------

      // --- arcs ---
      context.save()
      //context.translate(cx, cy)
      context.rotate(-angle)
      context.lineWidth = random.range(5, 20)
      context.beginPath()
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -7), slice * random.range(1, 3))
      context.stroke() 
      context.restore()
      // -------
    }
  };
};

canvasSketch(sketch, settings);
