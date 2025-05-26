class Robot {
  constructor() {
    this.robot=undefined;
    this.dimensions = {
      w: (Math.sqrt((cellSize.w * cellSize.h) / 4)),
      h: (Math.sqrt((cellSize.w * cellSize.h) / 4)),
    };
    this.moveSpeed = 15;
    this.rotationSpeed = 0.05 ;
    this.angle = deg2Rad(90);
    this.pos = {
      x: (
        ceilN(Dobby.area[0][Dobby.startCol].cordinate.x + cellSize.w / 2)
      ),
      y: ceilN((Dobby.area[0][Dobby.startCol].cordinate.y + cellSize.h / 2))
    };
    this.sensors = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    };
    this.sensorsPos = {
      A: {x:0,y:0},
      B: {x:0,y:0},
      C: {x:0,y:0},
      D: {x:0,y:0},
    };
    this.absoluteDistance = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };
    this.sensorLimit = Infinity;
    this.cornersWithoutAngel = [
        {
          x: 0,
          y: 0,
        },
        {
          x: 0,
          y: 0,
        },
        {
          x: 0,
          y: 0,
        },      {
          x: 0,
          y: 0,
        },
      ];
    this.corners={A:{x:0,y:0},B:{x:0,y:0},C:{x:0,y:0},D:{x:0,y:0}};
    this.absoluteCorners={
      top: {x:0,y:0},
      bottom: {x:0,y:0},
      left: {x:0,y:0},
      right: {x:0,y:0},
    }
    this.sideSensors={ 
      AB: 0,
      BC: 0,
      CD: 0,
      DA: 0
    };
    this.absoluteEdges={top: undefined, bottom:undefined, left: undefined, right: undefined}
    this.set_allParams();
    this.med=1
    const x=this.pos.x
    const y= this.pos.y
    const w=this.dimensions.w
    const h=this.dimensions.h
    var imageUrl = 'imgs/robot1.png';

    let robot = Bodies.rectangle(x, y, w,h, {
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
      restitution :0,
      render: {
        zIndex: 100,
        sprite: {
            texture: imageUrl,
            xScale:this.dimensions.w/robotImageDimensions.w,
            yScale:this.dimensions.h/robotImageDimensions.h,
            
        }
    }
    });
    this.robot=robot
    Body.setAngle(robot, this.angle)
    
  }
  draw() {
    this.draw_sensor(this.pos,this.sensorsPos.A);
    this.draw_sensor(this.pos,this.sensorsPos.B);
    this.draw_sensor(this.pos,this.sensorsPos.C);
    this.draw_sensor(this.pos,this.sensorsPos.D);
    this.draw_sensor(this.absoluteCorners.top,{x:this.absoluteCorners.top.x,y:0},1);
    this.draw_sensor(this.absoluteCorners.bottom,{x:this.absoluteCorners.bottom.x,y:canvasSize.h},1);
    this.draw_sensor(this.absoluteCorners.left,{x:0,y:this.absoluteCorners.left.y},1);
    this.draw_sensor(this.absoluteCorners.right,{x:canvasSize.w,y:this.absoluteCorners.right.y},1);


    // ctx2.beginPath();
    // ctx2.strokeStyle ="#0ff"
    // ctx2.arc(this.pos.x,this.pos.y, Math.sqrt(this.dimensions.w**2+this.dimensions.h**2)/2, 0, 2 * Math.PI);
    // ctx2.stroke(); 
    return;
  }
  //set functions
  set_corners() {
    this.set_cornersWithoutAngel();
    let pos=[]
    for (var i = 0; i < this.cornersWithoutAngel.length; i++) {
      var x1 =  this.cornersWithoutAngel[i].x;
      var y1 =  this.cornersWithoutAngel[i].y;

      var nPos = {
        x:
          (x1 - this.pos.x) * cos(this.angle) -
            (y1 - this.pos.y) * sin(this.angle) +
            this.pos.x,
          y:(x1 - this.pos.x) * sin(this.angle) +
            (y1 - this.pos.y) * cos(this.angle) +
            this.pos.y
      };
      pos.push(nPos);
    }
    this.corners.A=pos[0];
    this.corners.B=pos[1];
    this.corners.C=pos[2];
    this.corners.D=pos[3]

    
    // pos.forEach(function(e,id){
    //   if(id==3){
    //     ctx2.fillStyle="#0f0"
    // ctx2.fillRect(e.x-4, e.y-4, 8, 8);
    //   }
        

    // })
    return pos;

  }
  set_cornersWithoutAngel(){
    this.cornersWithoutAngel = [
        {
          x: this.pos.x - this.dimensions.w / 2,
          y: this.pos.y - this.dimensions.h / 2,
        },
        {
          x: this.pos.x + this.dimensions.w / 2,
          y: this.pos.y - this.dimensions.h / 2,
        },
        {
          x: this.pos.x + this.dimensions.w / 2,
          y: this.pos.y + this.dimensions.h / 2,
        },      {
          x: this.pos.x - this.dimensions.w / 2,
          y: this.pos.y + this.dimensions.h / 2,
        },
      ];
  }
  set_sensorPos(){
    this.set_corners();
    this.sensorsPos.A={x:(this.corners.C.x+this.corners.D.x)/2,y:(this.corners.C.y+this.corners.D.y)/2}
    this.sensorsPos.B={x:(this.corners.A.x+this.corners.D.x)/2,y:(this.corners.A.y+this.corners.D.y)/2}
    this.sensorsPos.C={x:(this.corners.C.x+this.corners.B.x)/2,y:(this.corners.C.y+this.corners.B.y)/2}
    this.sensorsPos.D={x:(this.corners.A.x+this.corners.B.x)/2,y:(this.corners.A.y+this.corners.B.y)/2}
  }
  set_absoluteCorners(){
    this.set_corners();
    this.absoluteCorners.top=minObject(this.corners,"y");
    this.absoluteCorners.bottom=maxObject(this.corners,"y");
    this.absoluteCorners.right=maxObject(this.corners,"x");
    this.absoluteCorners.left=minObject(this.corners,"x");
  }
  //-------------------
  //sensors
  get_wallLevelsAtSightLevel(p1,p2){

    let points=[];
    for(var i=0;i<Dobby.wallCols.length;i++){
      var point={
        x:Dobby.wallCols[i],
        y:findPointOnLine(p1.x, p1.y, p2.x, p2.y, Dobby.wallCols[i], undefined),
        type:"c"
      }
      // console.log((((Dobby.wallCols[i]-x1)/(x2-x1))*(y2-y1))+y1)
      points.push(point);
    }
    // console.log("---------------------")
    
    for(var i=0;i<Dobby.wallRows.length;i++){
      var point={
        x: findPointOnLine(p1.x, p1.y, p2.x, p2.y, undefined, Dobby.wallRows[i]),
        y:Dobby.wallRows[i],
        type:"r"

      }
      points.push(point);
    }

    let points0=[]
    for(var i=0;i<points.length;i++){
      if(p1.x>p2.x && p1.x<points[i].x){         
          continue;
      }
      if(p1.x<p2.x && p1.x>points[i].x){
          continue;
      }
      if(p1.y>p2.y && p1.y<points[i].y){         
        continue;
    }
    if(p1.y<p2.y && p1.y>points[i].y){
        continue;
    }
      if(points[i].x>canvasSize.w || points[i].y>canvasSize.h || points[i].x<0 || points[i].y<0){
        continue;
      }
      if(!Boolean(points[i].x)){
        continue;
      }
      if(!Boolean(points[i].y)){
        continue;
      }
      points0.push(points[i])
    }
    // points0.forEach(function(e){
    //   ctx2.fillStyle="#0f0";
    //   ctx2.fillRect(e.x-1,e.y-1,2,2)
    // })
    return points0;
  }
  check_isWall(point){
    if(lineWidth>=point.x){return 1;}
    if(lineWidth>=point.y){return 1;}
    if(canvasSize.w-lineWidth<=point.x){return 1;}
    if(canvasSize.h-lineWidth<=point.y){return 1;}
    if(point.type=="r"){
      let col=-2;
      for(var i=0;i<Dobby.wallCols.length;i++){
        if(point.x>Dobby.wallCols[i]){
          col++;
        }
      }
      col=Math.floor(col/2);
      for(var i=0;i<Dobby.area.length;i++){
        // console.log(i,col,point.y)
        if(Dobby.area[i][col].cordinate.y==point.y|| Dobby.area[i][col].cordinate.y==(point.y+lineWidth)){
          if(Dobby.area[i][col].walls.top){
            return 1;
        }
        }
          
      }
    }
    else if(point.type=="c"){
      let row=-2;
      for(var i=0;i<Dobby.wallRows.length;i++){
        if(point.y>Dobby.wallRows[i]){
          row++;
        }
      }
      row=Math.floor(row/2);
      for(var i=0;i<Dobby.area[0].length;i++){
        if(Dobby.area[row][i].cordinate.x==point.x || Dobby.area[row][i].cordinate.x==(point.x+lineWidth)){
          if(Dobby.area[row][i].walls.left){
            return 1;
          }
        }
          
        
      }
    }
    return 0;

  }
  get_wallsPointsAtSightLevel(p1,p2){
    let points=this.get_wallLevelsAtSightLevel(p1,p2);    
    let points0=[];
    for(var i=0;i<points.length;i++){
      if(this.check_isWall(points[i])){
        points0.push(points[i])
      }
      
    }
    // points.forEach(function(e){
    //   ctx2.fillStyle="#000";
    //   ctx2.fillRect(e.x-1,e.y-1,2,2)
    // })
    // points0.forEach(function(e){
    //   ctx2.fillStyle="#000";
    //   ctx2.fillRect(e.x-1,e.y-1,2,2)
    // })
    return points0;
  }
  calc_sensor(p1,p2,abs=0){
    let points=this.get_wallsPointsAtSightLevel(p1,p2);
    

    // let r=minObj.distance;//-((1/cos(deg2Rad(rad2Deg(this.angle)%90)))*(lineWidth/2))
    for(var i=0;i<points.length;i++){
      if(abs){
        points[i]["distance"]=distanceBetween2Points(points[i],p1)
      }
      else{
        points[i]["distance"]=distanceBetween2Points(points[i],p2)
      }
    }
    let minObj=minObjectArr(points,"distance");
    if(minObj.distance<this.sensorLimit){
      return minObj;
    }
    return undefined;
  }
  draw_sensor(p1,p2,abs=0){
    let minObj=this.calc_sensor(p1,p2,abs)
    if(abs==0){
      ctx2.beginPath();
      ctx2.strokeStyle = "#0f0";
      ctx2.moveTo(p2.x, p2.y);
      ctx2.lineTo(minObj.x,minObj.y);
      ctx2.stroke();
      ctx2.closePath();
    }
    else if(abs==1){
      ctx2.beginPath();
      ctx2.strokeStyle = "#00f";
      ctx2.moveTo(p1.x, p1.y);
      ctx2.lineTo(minObj.x,minObj.y);
      ctx2.stroke();
      ctx2.closePath();
    }
  }
  set_sensors(){
    this.set_sensorPos();
    this.sensors.A=this.calc_sensor(this.pos,this.sensorsPos.A).distance;
    this.sensors.B=this.calc_sensor(this.pos,this.sensorsPos.B).distance;
    this.sensors.C=this.calc_sensor(this.pos,this.sensorsPos.C).distance;
    this.sensors.D=this.calc_sensor(this.pos,this.sensorsPos.D).distance;
  }
  set_absoluteDistance() {
    this.set_corners(),
    this.absoluteDistance.top=this.calc_sensor(this.absoluteCorners.top,{x:this.absoluteCorners.top.x,y:0},1).distance;
    this.absoluteDistance.bottom=this.calc_sensor(this.absoluteCorners.bottom,{x:this.absoluteCorners.bottom.x,y:canvasSize.h},1).distance;
    this.absoluteDistance.left=this.calc_sensor(this.absoluteCorners.left,{x:0,y:this.absoluteCorners.left.y},1).distance;
    this.absoluteDistance.right=this.calc_sensor(this.absoluteCorners.right,{x:canvasSize.w,y:this.absoluteCorners.right.y},1).distance;
  }
  set_sideSensors(){
    this.sideSensors.AB=this.calc_sideSensors(this.corners.A,this.corners.D,this.corners.B,this.corners.C);
    this.sideSensors.CD=this.calc_sideSensors(this.corners.D,this.corners.A,this.corners.C,this.corners.B);
    this.sideSensors.BC=this.calc_sideSensors(this.corners.C,this.corners.D,this.corners.B,this.corners.A);
    this.sideSensors.DA=this.calc_sideSensors(this.corners.D,this.corners.C,this.corners.A,this.corners.B);


  }
  get_wallsAtSightLevel(p1,p2,p3,p4){
    let points0=this.get_wallLevelsAtSightLevel(p1,p2);
    let points1=this.get_wallLevelsAtSightLevel(p3,p4);
    let points2=[];
    let points3=[];

    for(var i=0;i<points0.length;i++){
      for(var j=0;j<points1.length;j++){

        if(points0[i].x===points1[j].x){
          points0[i].skip=true;
          points1[j].skip=true;

          if(points0[i].y<points1[j].y){
            points2.push([points0[i],points1[j]]);
          }
          else{
            points2.push([points1[j],points0[i]]);
          }  
        }
        else if(points0[i].y===points1[j].y){
          points0[i].skip=true;
          points1[j].skip=true;
          if(points0[i].x<points1[j].x){
            points2.push([points0[i],points1[j]]);
          }
          else{
            points2.push([points1[j],points0[i]]);
          }
        }
      }
    }
    points0.forEach(function(e){
      if(e.skip){
        return;
      }
      if(e.x==0 || e.y==0 || e.x==lineWidth || e.y==lineWidth || e.x==canvasSize.w || e.y==canvasSize.h || e.x==canvasSize.w-lineWidth || e.y==canvasSize.h-lineWidth ){
        if(e.x==0 || e.y==0 || e.x==lineWidth || e.y==lineWidth){
          var col=-2;
          var row=-2;
        }
        else if(e.x==canvasSize.w || e.y==canvasSize.h || e.x==canvasSize.w-lineWidth || e.y==canvasSize.h-lineWidth){
          var col=0;
          var row=0;
        }
        if(e.type==="r"){
          
          for(var j=0;j<Dobby.wallCols.length;j++){
            if(e.x>=Dobby.wallCols[j]){
              col++;
            }
          }
          if(e.x>Dobby.wallCols[col]){
            points2.push([{x:Dobby.wallCols[col],y:e.y,type:e.type},e])
          }
          else{
            points2.push([e,{x:Dobby.wallCols[col],y:e.y,type:e.type}])   
          }
        }
        else if(e.type==="c"){
          for(var j=0;j<Dobby.wallRows.length;j++){
            if(e.y>=Dobby.wallRows[j]){
              row++;
            }
          }
          if(e.y>Dobby.wallRows[row]){
            points2.push([{x:e.x,y:Dobby.wallCols[row],type:e.type},e])
          }
          else{
            points2.push([e,{x:e.x,y:Dobby.wallCols[row],type:e.type}])
          }
        }              
      }
    })
    points1.forEach(function(e){
      if(e.skip){
        return;
      }
      if(e.x==0 || e.y==0 || e.x==lineWidth || e.y==lineWidth || e.x==canvasSize.w || e.y==canvasSize.h || e.x==canvasSize.w-lineWidth || e.y==canvasSize.h-lineWidth ){
        if(e.x==0 || e.y==0 || e.x==lineWidth || e.y==lineWidth){
          var col=-2;
          var row=-2;
        }
        else if(e.x==canvasSize.w || e.y==canvasSize.h || e.x==canvasSize.w-lineWidth || e.y==canvasSize.h-lineWidth){
          var col=0;
          var row=0;
        }
        if(e.type==="r"){
          
          for(var j=0;j<Dobby.wallCols.length;j++){
            if(e.x>=Dobby.wallCols[j]){
              col++;
            }
          }
          if(e.x>Dobby.wallCols[col]){
            points2.push([{x:Dobby.wallCols[col],y:e.y,type:e.type},e])
          }
          else{
            points2.push([e,{x:Dobby.wallCols[col],y:e.y,type:e.type}])   
          }
        }
        else if(e.type==="c"){
          for(var j=0;j<Dobby.wallRows.length;j++){
            if(e.y>=Dobby.wallRows[j]){
              row++;
            }
          }
          if(e.y>Dobby.wallRows[row]){
            points2.push([{x:e.x,y:Dobby.wallCols[row],type:e.type},e])
          }
          else{
            points2.push([e,{x:e.x,y:Dobby.wallCols[row],type:e.type}])
          }
        }              
      }
    })
    for(var i=0;i<points2.length;i++){
      // console.log(this.check_isWall(points2[i][0]),this.check_isWall(points2[i][1]))
      if(this.check_isWall(points2[i][0])==1 && this.check_isWall(points2[i][1])==1 ){continue;}
      else if(this.check_isWall(points2[i][0])==0 && this.check_isWall(points2[i][1])==0 ){points2[i].push("skip")}
      else if(this.check_isWall(points2[i][0])==1 && this.check_isWall(points2[i][1])==0){
        if(points2[i][0].type==="r"){
          var col=1;
          for(var j=0;j<Dobby.wallCols.length;j++){
            if(points2[i][0].x>=Dobby.wallCols[j]){
              col++;
            }
          }
          points2[i][1].x=Dobby.wallCols[col];
        }
        else if(points2[i][0].type==="c"){
          var row=1;
          for(var j=0;j<Dobby.wallRows.length;j++){
            if(points2[i][0].y>=Dobby.wallRows[j]){
              row++;
            }
          }
          points2[i][1].y=Dobby.wallCols[row];
        }
      }
      else if(this.check_isWall(points2[i][0])==0 && this.check_isWall(points2[i][1])==1){
        if(points2[i][1].type==="r"){
          var col=-2;
          for(var j=0;j<Dobby.wallCols.length;j++){
            if(points2[i][1].x>Dobby.wallCols[j]){
              col++;
            }
          }
          points2[i][0].x=Dobby.wallCols[col];
        }
        else if(points2[i][1].type==="c"){
          var row=-2;
          for(var j=0;j<Dobby.wallRows.length;j++){
            if(points2[i][1].y>Dobby.wallRows[j]){
              row++;
            }
          }
          points2[i][0].y=Dobby.wallCols[row];
        }
      }
    }
    points2.forEach(function(e){
      if(e.length==2){
        points3.push(e);
      }
    })

    points3.forEach(function(e){
        ctx2.beginPath();
        ctx2.strokeStyle="#ff0"
        ctx2.moveTo(e[0].x,e[0].y);
        ctx2.lineTo(e[1].x,e[1].y);
        ctx2.stroke();    
    })
    return points3;

  }
  calc_sideSensors(p1,p2,p3,p4){
    let points=this.get_wallsAtSightLevel(p1,p2,p3,p4);
    
    for(var i=0;i<points.length;i++){
      points[i].dist=shortestDistance([p2.x,p2.y],[p4.x,p4.y],[points[i][0].x,points[i][0].y],[points[i][1].x,points[i][1].y]);
    }
    const minObj=minObjectArr(points,"dist");
    // ctx2.beginPath();
    // ctx2.strokeStyle="#f00"
    // ctx2.moveTo(p2.x,p2.y);
    // ctx2.lineTo(p4.x,p4.y);
    // ctx2.lineTo(minObj[0].x,minObj[0].y);
    // ctx2.lineTo(minObj[1].x,minObj[1].y);
    // ctx2.lineTo(p2.x,p2.y);
    // ctx2.stroke();
    return minObj.dist
  }
  set_ExtremeEdges() {
    const edges=[
      [this.corners.A,this.corners.B,"AB"],
      [this.corners.B,this.corners.C,"BC"],
      [this.corners.C,this.corners.D,"CD"],
      [this.corners.D,this.corners.A,"DA"]
    ];
    this.absoluteEdges.top=edges[0]
    this.absoluteEdges.left=edges[0]
    this.absoluteEdges.right=edges[0]
    this.absoluteEdges.bottom=edges[0]
    edges.forEach(edge => {
      if(this.absoluteEdges.top[0].y>edge[0].y){
        if(this.absoluteEdges.top[1].y>edge[0].y){
          this.absoluteEdges.top=edge
        }
      }
      else if(this.absoluteEdges.top[0].y>edge[1].y){
        if(this.absoluteEdges.top[1].y>edge[1].y){
          this.absoluteEdges.top=edge
        }
      }

      if(this.absoluteEdges.bottom[0].y<edge[0].y){
        if(this.absoluteEdges.bottom[1].y<edge[0].y){
          this.absoluteEdges.bottom=edge
        }
      }
      else if(this.absoluteEdges.bottom[0].y<edge[1].y){
        if(this.absoluteEdges.bottom[1].y<edge[1].y){
          this.absoluteEdges.bottom=edge
        }
      }


      if(this.absoluteEdges.right[0].x>edge[0].x){
        if(this.absoluteEdges.right[1].x>edge[0].x){
          this.absoluteEdges.right=edge
        }
      }
      else if(this.absoluteEdges.right[0].x>edge[1].x){
        if(this.absoluteEdges.right[1].x>edge[1].x){
          this.absoluteEdges.right=edge
        }
      }

      if(this.absoluteEdges.left[0].x<edge[0].x){
        if(this.absoluteEdges.left[1].x<edge[0].x){
          this.absoluteEdges.left=edge
        }
      }
      else if(this.absoluteEdges.left[0].x<edge[1].x){
        if(this.absoluteEdges.left[1].x<edge[1].x){
          this.absoluteEdges.left=edge
        }
      }


    })
  }

  set_allParams(){
    try {
      this.angle=this.robot.angle;
      this.pos=this.robot.position
    } catch (error) {
      console.log(error)
    }
    this.set_cornersWithoutAngel();
    this.set_corners();
    this.set_sensorPos();
    this.set_sensors();
    this.set_absoluteCorners();
    this.set_absoluteDistance();
    this.set_sideSensors();
    this.set_ExtremeEdges();
    
    
  }
  set_speed(x){this.speed=x;}
  set_rotationSpeed(x){this.rotationSpeed=x;}
  set_angle(rad){this.angle=findPrincipalRad(rad);}

  calcMove(){
    this.set_allParams();
    const speed=this.moveSpeed/fps;
    const angle=(this.angle+deg2Rad(90))*-1;
    const speedForce={
      x:cos(angle)*speed*1,
      y:sin(angle)*speed*-1
    }
    const rotSpeed=this.rotationSpeed/fps;
    Body.setAngularVelocity(this.robot, rotSpeed);
    Body.setVelocity(this.robot, speedForce);
    // console.log(Body.getVelocity(this.robot))

        // Matter.Events.on(engine, 'collisionEnd', function(event) {
    //   var pairs = event.pairs;
    //   for (var i = 0; i < pairs.length; i++) {
    //     var pair = pairs[i];
    //     Body.setVelocity(robot, { x: 1, y: 1 });
    //     robot.torque = 0
    //   }
    // });
  }

}
const Apo = new Robot();






// for(var l=0;l<Dobby.area[0].length;l++){
//   if(Dobby.area[j][l].cordinate.y===(pointsO[i].y+2)){
//     if(Dobby.area[j][l].walls.top){
//       points1.push(pointsO[i])
//       console.log("a")

//     }
//   } 
// }