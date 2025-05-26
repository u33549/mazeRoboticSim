




function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function delay(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}
function distanceBetween2Points(p1, p2) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

function maxObject(obj, prop) {
  let maxProp = 0;
  let maxObj;

  for (const i in obj) {
    if (obj[i][prop] > maxProp) {
      maxProp = obj[i][prop];
      maxObj = obj[i];
    }
  }

  return maxObj;
}
function minObject(obj, prop) {
  let minProp = Infinity;
  let minObj;

  for (const i in obj) {
    if (obj[i][prop] < minProp) {
      minProp = obj[i][prop];
      minObj = obj[i];
    }
  }
  return minObj;
}

function maxObjectArr(arr, prop) {
  let maxProp = 0;
  let maxObj;

  arr.forEach((element) => {
    if (element[prop] > maxProp) {
      maxProp = element[prop];
      maxObj = element;
    }
  });
  return maxObj;
}
function minObjectArr(arr, prop) {
  let minProp = Infinity;
  let minObj;

  arr.forEach((element) => {
    if (element[prop] < minProp) {
      minProp = element[prop];
      minObj = element;
    }
  });
  return minObj;
}

function ceilN(num) {
  return parseFloat(num.toFixed(2));
}
function findPointOnLine(x1, y1, x2, y2, knownX, knownY) {
  const m = (y2 - y1) / (x2 - x1);
  if (knownX !== undefined && knownY === undefined) {
    const y = m * (knownX - x1) + y1;
    return y;
  }
  if (knownY !== undefined && knownX === undefined) {
    const x = (knownY - y1) / m + x1;
    return x;
  }

  console.log('Bir bilinmeyen değer belirtmelisiniz (knownX veya knownY)');
  return null;
}

function rad2Deg(rad) {
  return rad * (180 / Math.PI);
}
function deg2Rad(deg) {
  return deg * (Math.PI / 180.0);
}
function sin(rad) {
  return parseFloat(Math.sin(rad).toFixed(10));
}
function cos(rad) {
  return parseFloat(Math.cos(rad).toFixed(10));
}
function findPrincipalRad(radians) {
  const normalizedRadians = radians % (2 * Math.PI);
  const principalRadians =
    normalizedRadians >= 0
      ? normalizedRadians
      : 2 * Math.PI + normalizedRadians;
  return principalRadians;
}

function shortestDistance(A, B, C, D) {
  const AB = [B[0] - A[0], B[1] - A[1]];
  const CD = [D[0] - C[0], D[1] - C[1]];
  const AC = [C[0] - A[0], C[1] - A[1]];
  const perpendicular = [AB[1], -AB[0]];
  const BD = [B[0] - D[0], B[1] - D[1]];
  const perpendicular2 = [-CD[1], CD[0]];
  const angle = Math.abs(Math.atan2(AB[1], AB[0]) - Math.atan2(CD[1], CD[0]));
  const distance1 =
    Math.abs(AC[0] * perpendicular[0] + AC[1] * perpendicular[1]) /
    Math.sqrt(perpendicular[0] ** 2 + perpendicular[1] ** 2);
  const distance2 =
    Math.abs(BD[0] * perpendicular2[0] + BD[1] * perpendicular2[1]) /
    Math.sqrt(perpendicular2[0] ** 2 + perpendicular2[1] ** 2);
  if (angle !== 0 && angle !== Math.PI) {
    return distance1 + distance2;
  }
  const distances = [
    Math.sqrt((A[0] - C[0]) ** 2 + (A[1] - C[1]) ** 2),
    Math.sqrt((A[0] - D[0]) ** 2 + (A[1] - D[1]) ** 2),
    Math.sqrt((B[0] - C[0]) ** 2 + (B[1] - C[1]) ** 2),
    Math.sqrt((B[0] - D[0]) ** 2 + (B[1] - D[1]) ** 2),
  ];

  return Math.min(...distances);
}

function distancePointLine(P, A, B) {
  var AB = [B[0] - A[0], B[1] - A[1]];
  var AP = [P[0] - A[0], P[1] - A[1]];
  var dot = AB[0] * AP[0] + AB[1] * AP[1];
  var len2 = AB[0] * AB[0] + AB[1] * AB[1];
  var t = dot / len2;
  if (t < 0) {
    t = 0;
  } else if (t > 1) {
    t = 1;
  }
  var closest = [A[0] + t * AB[0], A[1] + t * AB[1]];
  var distance = Math.sqrt(
    (P[0] - closest[0]) * (P[0] - closest[0]) +
      (P[1] - closest[1]) * (P[1] - closest[1])
  );
  return distance;
}

function doesRayIntersectSegment(A, B, C, D) {
  const slopeAB = (B.y - A.y) / (B.x - A.x);
  const yInterceptAB = A.y - slopeAB * A.x;

  const slopeCD = (D.y - C.y) / (D.x - C.x);
  const yInterceptCD = C.y - slopeCD * C.x;

  if (slopeAB === slopeCD) {
    return false;
  }

  const x = (yInterceptCD - yInterceptAB) / (slopeAB - slopeCD);

  if (
    x < Math.min(A.x, B.x) ||
    x > Math.max(A.x, B.x) ||
    x < Math.min(C.x, D.x) ||
    x > Math.max(C.x, D.x)
  ) {
    return false;
  }

  return true;
}

canvasSize = { w: 1000, h: 1000 };
const lineWidth = 4;
var layer2 = document.getElementById("layer2");
var ctx2 = layer2.getContext("2d");

var layer1 = document.getElementById("layer1");
var ctx1 = layer1.getContext("2d");

ctx2.canvas.width = canvasSize.w;
ctx2.canvas.height = canvasSize.h;
ctx1.canvas.width = canvasSize.w;
ctx1.canvas.height = canvasSize.h;
ctx2.lineWidth = lineWidth/2;
ctx1.lineWidth = lineWidth;


const mazeDimensions = {
  w: 8,
  h: 8,
};
const cellSize = {
  w: (canvasSize.w - (mazeDimensions.w + 1) * lineWidth) / mazeDimensions.w,
  h: (canvasSize.h - (mazeDimensions.h + 1) * lineWidth) / mazeDimensions.h,
};
const fps = 30;
robotImageDimensions = {w:1000,h:1000}
const wall_color="#FF7F7F"
const start_color="#e8dff5"
const finish_color="#e8dff5"

let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;
    Body=Matter.Body
    Composite=Matter.Composite
    World=Matter.World

let engine = Engine.create();
let world = engine.world;

engine.gravity.y=0
engine.gravity.x=0
world.frictionAir = 0;
world.frictionStatic = 0;

var render = Render.create({
    element: document.querySelector(".layers"),
    engine: engine,
    canvas: document.getElementById('layer1'),
    options: {
        width: canvasSize.w,
        height: canvasSize.h,
        wireframes: false,
        // showAxes: true,
        // showCollisions: true,
        // showPositions: false,
        // showAngleIndicator: true,
        // showIds: false,
        // showConvexHulls: false,
    }
});
var runner = Runner.create({fps: fps});
