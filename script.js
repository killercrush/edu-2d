var   deg30 = 0.523599,//0.785398,
      deg120 = 2.61799;//Math.PI; //2.0944;
function radian(alpha) {
  return (alpha * Math.PI / 180.0);
}

var Point = function(x, y, z, ctx, O, C) {
  var _x = parseInt(x),
      _y = parseInt(y),
      _z = parseInt(z);
  var P = {x: _x, y: _y, z: _z};
  var angleY, angleX;
  var lengthOS = 250;
  var XBegin = {x: 0, y: 0, z: 0};
  var XEnd = {x: 0, y: 0, z: 0};
  var YBegin = {x: 0, y: 0, z: 0};
  var YEnd = {x: 0, y: 0, z: 0};
  var ZBegin = {x: 0, y: 0, z: 0};
  var ZEnd = {x: 0, y: 0, z: 0};

  var P1 = {x: 0, y: 0, z: 0};
  var P2 = {x: 0, y: 0, z: 0};
  var P3 = {x: 0, y: 0, z: 0};
  var Px = {x: 0, y: 0, z: 0};
  var Py = {x: 0, y: 0, z: 0};
  var Pz = {x: 0, y: 0, z: 0};
  var draw_dash_line = function (x1, y1, x2, y2, center) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.setLineDash([5]);
    ctx.beginPath();
    if (center != undefined) {
      ctx.moveTo(center.x + x1 + .5, center.y - y1 + .5);
      ctx.lineTo(center.x + x2 + .5, center.y - y2 + .5);
    } else {
      ctx.moveTo(x1 + .5, y1 + .5);
      ctx.lineTo(x2 + .5, y2 + .5);
    }

    ctx.stroke();
    ctx.restore();
  }
  var point_size = 3;

  var draw_point = function(x, y, color) {
      ctx.beginPath();
      ctx.arc(x, y, point_size, 0, 2 * Math.PI, false);
      ctx.fillStyle = color;
      ctx.fill();
  }
  function vm(v3, m) {
    var matPoint = [[v3.x, v3.y, v3.z, 1]];

    var resultMatrix = numbers.matrix.multiply(matPoint, m);
    var tempPoint = {x: 0, y: 0, z: 0};

    if (resultMatrix[0][3] != 0) {
      tempPoint.x = resultMatrix[0][0] / resultMatrix[0][3];
      tempPoint.y = resultMatrix[0][1] / resultMatrix[0][3];
      tempPoint.z = resultMatrix[0][2] / resultMatrix[0][3];
    }
    else {
      tempPoint.x = resultMatrix[0][0];
      tempPoint.y = resultMatrix[0][1];
      tempPoint.z = resultMatrix[0][2];
    }
    return tempPoint;
  }
  var vmm = function(v3, m1, m2) {
    return vm(vm(v3, m1), m2);
  }

      this.draw_complex = function () {
        draw_point(O.x - _x, O.y + _y, "#333399");
        draw_dash_line(O.x - _x, O.y, O.x - _x, O.y + _y);
        draw_dash_line(O.x, O.y + _y, O.x - _x, O.y + _y);

        draw_point(O.x - _x, O.y - _z, "#333399");
        draw_dash_line(O.x, O.y - _z, O.x - _x, O.y - _z);
        draw_dash_line(O.x - _x, O.y, O.x - _x, O.y - _z);

        draw_point(O.x + _y, O.y - _z, "#333399");
        draw_dash_line(O.x, O.y - _z, O.x + _y, O.y - _z);
        draw_dash_line(O.x + _y, O.y, O.x + _y, O.y - _z);
      }

      // this.draw_iso_ = function() {
      //   ctx.fillStyle="#FF0000";
      //     var c_x = O.x,
      //         c_y = O.y - _y;
      //
      //     var P0 = {x: O.x, y: O.y - _y};
      //     var P1 = {x: P0.x + _x * Math.cos(deg30), y: P0.y + _x * Math.sin(deg30)};
      //     var P2 = {x: P1.x + _z * Math.cos(deg120), y: P1.y + _z * Math.sin(deg120)};
      //     var P3 = {x: P0.x + _z * Math.cos(deg120), y: P0.y + _z * Math.sin(deg120)};
      //
      //     var P4 = {x: O.x + _x * Math.cos(deg30), y: O.y + _x * Math.sin(deg30)};
      //     var P5 = {x: P4.x + _z * Math.cos(deg120), y: P4.y + _z * Math.sin(deg120)};
      //     var P6 = {x: O.x + _z * Math.cos(deg120), y: O.y + _z * Math.sin(deg120)};
      //
      //     draw_dash_line(P0.x, P0.y, P1.x, P1.y);
      //     draw_dash_line(P1.x, P1.y, P2.x, P2.y);
      //     draw_dash_line(P2.x, P2.y, P3.x, P3.y);
      //     draw_dash_line(P0.x, P0.y, P3.x, P3.y);
      //
      //     draw_dash_line(P1.x, P1.y, P4.x, P4.y);
      //     draw_dash_line(P2.x, P2.y, P5.x, P5.y);
      //     draw_dash_line(P3.x, P3.y, P6.x, P6.y);
      //
      //     draw_dash_line(P4.x, P4.y, P5.x, P5.y);
      //     draw_dash_line(P5.x, P5.y, P6.x, P6.y);
      //
      //   draw_point(P2.x, P2.y, "#333399");
      // }

      this.draw = function (is_persp) {
        draw_line(O.x, O.y, O.x + XBegin.x, O.y - XBegin.y, ctx_iso, "#66b3ff");
        ctx_iso.fillStyle="#66b3ff";
        ctx_iso.fillText("X", O.x + XBegin.x - 20, O.y - XBegin.y - 20);

        draw_line(O.x, O.y, O.x + ZBegin.x, O.y - ZBegin.y, ctx_iso, "#ff6666");
        ctx_iso.fillStyle="#ff6666";
        ctx_iso.fillText("Z", O.x + ZBegin.x - 20, O.y - ZBegin.y - 20);

        draw_line(O.x, O.y, O.x + YBegin.x, O.y - YBegin.y, ctx_iso, "#b3ff66");
        ctx_iso.fillStyle="#b3ff66";
        ctx_iso.fillText("Y", O.x + YBegin.x - 20, O.y - YBegin.y - 20);

        function check_pos(pt_arr, O, max_x, max_y) {
          for (var i = 0; i < pt_arr.length; i++) {
            if( O.x + pt_arr[i].x < 0 || O.x + pt_arr[i].x > max_x ||
                O.y - pt_arr[i].y < 0 || O.y - pt_arr[i].y > max_y) return false;
          }
          return true;
        }

        if (is_persp && ((_x >= C.x && _y >= C.y && _z >= C.z) || !check_pos([P, P1, P2, P3, Px, Py, Pz], O, 600, 600))) {
          ctx_iso.fillStyle="#222426";
          ctx_iso.font="20px Verdana";
          ctx_iso.fillText('За границами области отображения', O.x - 160, O.y - 10);
          return;
        }


        draw_dash_line(P.x, P.y, P1.x, P1.y, O);
        draw_dash_line(P.x, P.y, P2.x, P2.y, O);
        draw_dash_line(P.x, P.y, P3.x, P3.y, O);
        draw_dash_line(Px.x, Px.y, P1.x, P1.y, O);

        draw_dash_line(Px.x, Px.y, P2.x, P2.y, O);
        draw_dash_line(Py.x, Py.y, P1.x, P1.y, O);
        draw_dash_line(Py.x, Py.y, P3.x, P3.y, O);

        draw_dash_line(Pz.x, Pz.y, P2.x, P2.y, O);
        draw_dash_line(Pz.x, Pz.y, P3.x, P3.y, O);

        draw_point(O.x + P.x, O.y - P.y, "#333399");
        ctx_iso.fillStyle="#222426";
        ctx_iso.font="10px Verdana";
        ctx_iso.fillText('P (' + _x + ',' + _y + ',' + _z + ')', O.x + P.x + 10, O.y - P.y - 10);
      }

      this.calc = function(is_persp) {
        if (Math.sqrt(C.x*C.x + C.z*C.z)) {
          angleY = Math.acos((C.z / Math.sqrt(C.x*C.x + C.z*C.z)));
        }
        else {
          angleY = 0;
        }

        if (Math.sqrt(C.x*C.x + C.y*C.y + C.z*C.z))
          angleX = Math.asin((C.y/ Math.sqrt(C.x*C.x + C.y*C.y + C.z*C.z)));
        else
          angleX = -90;

        angleY = -angleY * (180.0 / Math.PI);
        angleX = angleX * (180.0 / Math.PI);

      //Задаем коодинаты осей
      //Ось Х
      XBegin.x = lengthOS;
      XBegin.y = 0;
      XBegin.z = 0;

      //XEnd.x = -lengthOS;
      //XEnd.y = 0;
      //XEnd.z = 0;

      //Ось Y
      YBegin.x = 0;
      YBegin.y = lengthOS;
      YBegin.z = 0;

      //YEnd.x = 0;
      //YEnd.y = -lengthOS;
      //YEnd.z = 0;

      //Ось Z
      ZBegin.x = 0;
      ZBegin.y = 0;
      ZBegin.z = lengthOS;

      //ZEnd.x = 0;
      //ZEnd.y = 0;
      //ZEnd.z = -lengthOS;

      //Проекции
      P1.x = P.x;
      P1.y = P.y;
      P1.z = 0;

      P2.x = P.x;
      P2.y = 0;
      P2.z = P.z;

      P3.x = 0;
      P3.y = P.y;
      P3.z = P.z;

      Px.x = P.x;
      Px.y = 0;
      Px.z = 0;

      Py.x = 0;
      Py.y = P.y;
      Py.z = 0;

      Pz.x = 0;
      Pz.y = 0;
      Pz.z = P.z;

      // Поворот вокруг оси Х
      // Задаем матрицу поворота
      var a = [[1, 0,                    0,                   0],
               [0,  Math.cos(radian(angleX)),  Math.sin(radian(angleX)), 0],
               [0,  -Math.sin(radian(angleX)), Math.cos(radian(angleX)), 0],
               [0,  0,                    0,                   1]];

      //Поворот вокруг оси У
      var b = [[Math.cos(radian(angleY)), 0, -Math.sin(radian(angleY)), 0],
                [0,                    1, 0,                    0],
                [Math.sin(radian(angleY)),  0, Math.cos(radian(angleY)),  0],
                [0,                    0, 0,                    1]];

        P  = vmm(P, b, a);
        P1 = vmm(P1, b, a);
        P2 = vmm(P2, b, a);
        P3 = vmm(P3, b, a);
        Px = vmm(Px, b, a);
        Py = vmm(Py, b, a);
        Pz = vmm(Pz, b, a);
        if (is_persp){
          var root = Math.sqrt(C.x*C.x + C.y*C.y +C.z*C.z);
          root = root == 0 ? 1 : root;
          //Матрица перспективы
          var pers = [[1, 0, 0, 0],
                     [0, 1, 0, 0],
                     [0, 0, 0, -1 / root],
                     [0, 0, 0, 1]];

           P  = vm(P, pers);
           P1 = vm(P1, pers);
           P2 = vm(P2, pers);
           P3 = vm(P3, pers);
           Px = vm(Px, pers);
           Py = vm(Py, pers);
           Pz = vm(Pz, pers);
        }
        XBegin = vmm(XBegin, b, a);
        //XEnd   = vmm(XEnd, b, a);
        YBegin = vmm(YBegin, b, a);
        //YEnd   = vmm(YEnd, b, a);
        ZBegin = vmm(ZBegin, b, a);
        //ZEnd   = vmm(ZEnd, b, a);
      }

      this.draw_iso = function(is_perp) {
        this.calc(is_perp);
        this.draw(is_perp);
      }

}

function draw_line(x1, y1, x2, y2, ctx, style) {
  ctx.save();
  ctx.strokeStyle = style;
  ctx.fillStyle = style;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x1 - 0.5, y1 - 0.5);
  ctx.lineTo(x2 - 0.5, y2 - 0.5);
  ctx.stroke();
  ctx.restore();
}
var O = {x: 300, y: 300};
var ctx_comp = document.getElementById('complex').getContext('2d');
var ctx_iso = document.getElementById('isometric').getContext('2d');

function draw_complex() {
  ctx_comp.fillStyle="#fff";
  ctx_comp.fillRect(0, 0, 600, 600);
  ctx_comp.fillStyle="#000000";
  ctx_comp.font="20px Verdana";
  draw_line(0, O.y, 600, O.y, ctx_comp);

  draw_line(O.x, O.y, O.x, 0, ctx_comp, "#ff6666");
  ctx_comp.fillStyle="#ff6666";
  ctx_comp.fillText("Z", O.x - 20, 20);

  draw_line(O.x, O.y, 600, O.y, ctx_comp, "#b3ff66");
  ctx_comp.fillStyle="#b3ff66";
  ctx_comp.fillText("Y", 580, O.y - 20);
  draw_line(O.x, O.y, O.x, 600, ctx_comp, "#b3ff66");
  ctx_comp.fillStyle="#b3ff66";
  ctx_comp.fillText("Y", O.x - 20, 580);

  draw_line(O.x, O.y, 0, O.y, ctx_comp, "#66b3ff");
  ctx_comp.fillStyle="#66b3ff";
  ctx_comp.fillText("X", 0 + 20, O.y - 20);


  var T = new Point(document.getElementById('x').value, document.getElementById('y').value, document.getElementById('z').value, ctx_comp, O);
  T.draw_complex();
}

// var prev_val_pt = {x: document.getElementById('x').value, y: document.getElementById('y').value, z: document.getElementById('z').value};
// var prev_val_c = {x: document.getElementById('c_x').value, y: document.getElementById('c_y').value, z: document.getElementById('c_z').value};
function draw_isometric(is_persp) {
  ctx_iso.fillStyle="#FFFFFF";
  ctx_iso.fillRect(0, 0, 600, 600);
  ctx_iso.fillStyle="#000000";
  ctx_iso.lineWidth = 1;
  ctx_iso.font="20px Verdana";
  var x1 = 300, y1 = 300;

  var pt = {x: document.getElementById('x').value, y: document.getElementById('y').value, z: document.getElementById('z').value};
  var cam = {x: document.getElementById('c_x').value, y: document.getElementById('c_y').value, z: document.getElementById('c_z').value};

  ctx_iso.fillStyle="#222426";
  ctx_iso.font="14px Verdana";
  ctx_iso.fillText('C (' + cam.x + ',' + cam.y + ',' + cam.z + ')', 20, 580);

  var T = new Point(pt.x, pt.y, pt.z, ctx_iso, O, cam);
  T.draw_iso(is_persp);

  // prev_val_pt = pt;
  // prev_val_c = cam;
}

function redraw() {
  if(document.getElementById('ortog').checked) {
    draw_isometric(false);
  } else {
    draw_isometric(true);
  }
  draw_complex()
}

redraw();
