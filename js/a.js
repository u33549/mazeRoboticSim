function findExtremeEdges(corners, point) {
  
  const edges = [
    [corners.A, corners.B, "AB"],
    [corners.B, corners.C, "BC"],
    [corners.C, corners.D, "CD"],
    [corners.D, corners.A, "DA"]
  ];
  const rays = [
    [point, { x: point.x, y: point.y - 1 }],
    [point, { x: point.x, y: point.y + 1 }],
    [point, { x: point.x - 1, y: point.y }],
    [point, { x: point.x + 1, y: point.y }]
  ];

  // Initialize extreme edges as the first edge in the array
  let leftEdge = edges[0];
  let rightEdge = edges[0];
  let topEdge = edges[0];
  let bottomEdge = edges[0];

  // Loop over all edges and check their intersection with the rays
  edges.forEach(edge => {
    rays.forEach(ray => {
      const intersects = doesRayIntersectSegment(ray[0], ray[1], edge[0], edge[1]);
      if (intersects) {
        // Update extreme edges if necessary
        if (edge[0].x < leftEdge[0].x) leftEdge = edge;
        if (edge[0].x > rightEdge[0].x) rightEdge = edge;
        if (edge[0].y < topEdge[0].y) topEdge = edge;
        if (edge[0].y > bottomEdge[0].y) bottomEdge = edge;
      }
    });
  });

  return {
    leftEdgeName: leftEdge[2],
    leftEdgeLength: Math.sqrt((leftEdge[1].x - leftEdge[0].x) ** 2 + (leftEdge[1].y - leftEdge[0].y) ** 2),
    rightEdgeName: rightEdge[2],
    rightEdgeLength: Math.sqrt((rightEdge[1].x - rightEdge[0].x) ** 2 + (rightEdge[1].y - rightEdge[0].y) ** 2),
    topEdgeName: topEdge[2],
    topEdgeLength: Math.sqrt((topEdge[1].x - topEdge[0].x) ** 2 + (topEdge[1].y - topEdge[0].y) ** 2),
    bottomEdgeName: bottomEdge[2],
    bottomEdgeLength: Math.sqrt((bottomEdge[1].x - bottomEdge[0].x) ** 2 + (bottomEdge[1].y - bottomEdge[0].y) ** 2)
  };
}










set_ExtremeEdges() {
  const edges=[
    [this.corners.A,this.corners.B,"AB"],
    [this.corners.B,this.corners.C,"BC"],
    [this.corners.C,this.corners.D,"CD"],
    [this.corners.D,this.corners.A,"DA"]
  ];
  const rays=[
    [this.pos,{x:this.pos.x,y:this.pos.y-1}],
    [this.pos,{x:this.pos.x,y:this.pos.y+1}],
    [this.pos,{x:this.pos.x-1,y:this.pos.y}],
    [this.pos,{x:this.pos.x+1,y:this.pos.y}]
  ]
  let k=0
  for(var i in this.absoluteEdges){
    var r=rays[k]
    k+=1
    edges.forEach(function(e){
      console.log(r)
      // console.log(e)
      // console.log(doesRayIntersectSegment(e[0],e[1],r[0],r[1]))
      console.log("-----------------")
      if(doesRayIntersectSegment(e[0],e[1],r[0],r[1])){
        this.absoluteEdges[i]=e[2]
      }
    },this)
  }
}













set_ExtremeEdges() {
  const edges=[
    [this.corners.A,this.corners.B,"AB"],
    [this.corners.B,this.corners.C,"BC"],
    [this.corners.C,this.corners.D,"CD"],
    [this.corners.D,this.corners.A,"DA"]
  ];
  const rays=[
    [this.pos,{x:this.pos.x,y:this.pos.y-1}],
    [this.pos,{x:this.pos.x,y:this.pos.y+1}],
    [this.pos,{x:this.pos.x-1,y:this.pos.y}],
    [this.pos,{x:this.pos.x+1,y:this.pos.y}]
  ]
  let k=0
  for(var i in this.absoluteEdges){
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++")
    var r=rays[k]
    k+=1
    edges.forEach(function(e){
      console.log(i)
      console.log(r)
      console.log(e)
      console.log(doesRayIntersectSegment(r[0],r[1],e[0],e[1]))
      console.log("-----------------")
      if(doesRayIntersectSegment(r[0],r[1],e[0],e[1])){
        this.absoluteEdges[i]=e[2]
      }
    },this)
  }
}