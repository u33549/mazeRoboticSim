function writeParams(){
    const paramsOrj=[mazeDimensions.w,mazeDimensions.h,
                    cellSize.w,cellSize.h,
                    lineWidth,
                    Apo.dimensions.w,Apo.dimensions.h,
                    Apo.pos.x,Apo.pos.y,
                    Apo.absoluteDistance.top,Apo.absoluteDistance.bottom,Apo.absoluteDistance.left,Apo.absoluteDistance.right,
                    Apo.sensorLimit,
                    Apo.angle,
                    Apo.moveSpeed,
                    Apo.rotationSpeed,
                    Apo.sensors.A,Apo.sensors.B,Apo.sensors.C,Apo.sensors.D,
                    Apo.sideSensors.AB,Apo.sideSensors.CD,Apo.sideSensors.BC,Apo.sideSensors.DA
    ]
    let params=[]
    paramsOrj.forEach(function(e){
        params.push(ceilN(e))
    })

    document.getElementById("mazeDimensions").innerHTML=`Genişlik: ${params[0]} &emsp; Yükseklik: ${params[1]}`;
    document.getElementById("cellSize").innerHTML=`Genişlik: ${params[2]} br &emsp; Yükseklik: ${params[3]} br`;
    document.getElementById("lineWidth").innerHTML=`${params[4]} br`;
    document.getElementById("robotDimensions").innerHTML=`Genişlik: ${params[5]} br &emsp; Yükseklik: ${params[6]} br`;
    document.getElementById("robotPos").innerHTML=`X: ${params[7]} &emsp; Y: ${params[8]}`;
    document.getElementById("robotAbsoluteDistance").innerHTML=`Üst: ${params[9]} br&emsp;Alt: ${params[10]} br <br> Sol: ${params[11]} br &emsp; Sağ: ${params[12]} br <br>`;
    document.getElementById("robotSensorLimit").innerHTML=`${params[13]} br`;
    document.getElementById("robotAngle").innerHTML=`${rad2Deg(params[14])} deg`;
    document.getElementById("robotMoveSpeed").innerHTML=`${params[15]} br/s`;
    document.getElementById("robotRotationSpeed").innerHTML=`${params[16]} rad/s`;
    document.getElementById("sensorA").innerHTML=`${params[17]} br`;
    document.getElementById("sensorB").innerHTML=`${params[18]} br`;
    document.getElementById("sensorC").innerHTML=`${params[19]} br`;
    document.getElementById("sensorD").innerHTML=`${params[20]} br`;
    document.getElementById("robotSideSensors").innerHTML=`AB:${params[21]} &emsp; CD:${params[22]} <br> BC:${params[23]} &emsp; DA:${params[24]}`
};
