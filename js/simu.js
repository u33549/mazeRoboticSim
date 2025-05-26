function drawWals() {
  let walls = [];
  let maze = Dobby.area; //labirentin şeması
  for (var i = 0; i < maze.length; i++) {
    for (var l = 0; l < maze[i].length; l++) {
      // i->satır numarası l-> sütun numarası

      //kalemin geleceği pozisyonların hesaplanması
      var x = l * cellSize.w + (l + 1) * lineWidth; //sütun numarası* hücre genişliği + duvar numarası * duvar kalınlığı
      var y = i * cellSize.h + (i + 1) * lineWidth; //satır numarası* hücre genişliği + duvar numarası * duvar kalınlığı

      if (maze[i][l].isStart) { //başlangıç karasei ise beyaza boya
        var sensor = Matter.Bodies.rectangle(x+cellSize.w/2, y+cellSize.h/2, cellSize.w, cellSize.h, {
          isSensor: true, 
          render: {
            fillStyle: start_color,
          }
        });
        walls.push(sensor)
      }

      if (maze[i][l].isFinish) {//bitiş karasei ise beyaza boya
        var sensor = Matter.Bodies.rectangle(x+cellSize.w/2, y+cellSize.h/2, cellSize.w, cellSize.h, {
          isSensor: true, 
          render: {
            fillStyle: finish_color,
            zIndex:0
          }
        });
        walls.push(sensor)
      }
      //eğer duvar varsa o duvarın konumuna gel ve duvar kalınlığının yarısını kullanarak kalemi ortala ardından çiz
      if (maze[i][l].walls.top) {
        var x = l * cellSize.w + (l + 1) * lineWidth + cellSize.w / 2+lineWidth;
        var y = i * cellSize.h + lineWidth / 2 + i * lineWidth;
        walls.push(createWall('r', x - lineWidth, y));
      }

      if (maze[i][l].walls.bottom) {
        var x = l * cellSize.w + (l + 1) * lineWidth + cellSize.w / 2+lineWidth;
        var y = (i + 1) * cellSize.h + lineWidth / 2 + (i + 1) * lineWidth;
        walls.push(createWall('r', x - lineWidth, y));
      }
      if (maze[i][l].walls.left) {
        var x = l * cellSize.w + lineWidth / 2 + l * lineWidth;
        var y = i * cellSize.h + (i + 1) * lineWidth + cellSize.h / 2+lineWidth;
        walls.push(createWall('c', x, y - lineWidth));
      }
      if (maze[i][l].walls.right) {
        var x = (l + 1) * cellSize.w + lineWidth / 2 + (l + 1) * lineWidth;
        var y = i * cellSize.h + (i + 1) * lineWidth + cellSize.h / 2+lineWidth;
        walls.push(createWall('c', x, y - lineWidth));
      }
    }
  }
  return walls;
}

function createWall(type, x, y) {
  if (type === 'c') {
    var wall = Bodies.rectangle(x, y, lineWidth, cellSize.h+lineWidth, {
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      isStatic: true,
      render: {
        fillStyle: wall_color,
      }
    });
  } 
  else if (type === 'r') {
    var wall = Bodies.rectangle(x, y, cellSize.h+lineWidth, lineWidth, {
    friction: 0,
    frictionAir: 0,
    frictionStatic: 0,
    isStatic: true,
    render: {
      fillStyle: wall_color,
    }
    });
  }
  return wall;
}
let sim=drawWals();
sim.push(Apo.robot)
Apo.draw();
World.add(world, sim);
Render.run(render);
Runner.run(runner, engine);

Matter.Events.on(runner, "beforeUpdate", function(event) {
  ctx2.clearRect(0, 0, canvasSize.w, canvasSize.h);

  writeParams()
  Apo.draw();
  Apo.calcMove()
});