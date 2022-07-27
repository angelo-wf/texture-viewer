
var romBuffer = new Buffer([]);
var c = el("canvas");
var ctx = c.getContext("2d");
var c2 = document.createElement("canvas");
var ctx2 = c2.getContext("2d");
var pc = el("palcanvas");
var pctx = pc.getContext("2d");

var palette = [];
var palBuffer = new Buffer([]);

el("file").onchange = function() {
  var reader = new FileReader();
  reader.onload = function() {
    var arrb = this.result;
    var arr = new Uint8Array(arrb);
    romBuffer = new Buffer(arr);
    if(el("paltype").value == 1) {
      palBuffer = new Buffer(romBuffer.data);
      drawPal(); //includes draw
    } else {
      draw();
    }
  }
  reader.readAsArrayBuffer(this.files[0]);
}

function loadPalFile() {
  var reader = new FileReader();
  reader.onload = function() {
    var arrb = this.result;
    var arr = new Uint8Array(arrb);
    palBuffer = new Buffer(arr);
    if(el("paltype").value == 2) {
      drawPal();
    }
  }
  reader.readAsArrayBuffer(el("palfile").files[0]);
}

function setSize(w, h) {
  var scale = +el("scale").value;
  c2.width = c.width = w;
  c2.height = c.height = h;
  c.style.width = w * scale + "px";
  c.style.height = h * scale + "px";
}

function grayPal() {
  var pal= [];
  for(var i = 0; i < 256; i++) {
    pal.push(i);
    pal.push(i);
    pal.push(i);
  }
  for(i = 0; i < 16; i++) {
    pal.push(i * 16 + i);
    pal.push(i * 16 + i);
    pal.push(i * 16 + i);
  }
  for(i = 0; i < 8; i++) {
    pal.push(Math.round(i * 255 / 7));
    pal.push(Math.round(i * 255 / 7));
    pal.push(Math.round(i * 255 / 7));
  }
  pal.push(0, 0, 0);
  pal.push(85, 85, 85);
  pal.push(190, 190, 190);
  pal.push(255, 255, 255);
  pal.push(0, 0, 0);
  pal.push(255, 255, 255);
  palBuffer = new Buffer(pal);
}

function draw() {
  var adr = +el("adr").value;
  var w = +el("w").value;
  var h = +el("h").value;
  var a = el("a").checked;
  var f = el("f").checked;
  var c = +el("codec").value;
  el("bg").style.backgroundColor = el("acol").value;
  render(adr, w, h, f, a, c);
}

function drawPal() {
  var adr = +el("paladr").value;
  var c = +el("palcodec").value;
  var a = el("pala").checked;
  renderPal(adr, c, a);
  el("palbg").style.backgroundColor = el("acol").value;
  //because palette has ben changed, redraw data as well
  draw();
}

function renderPal(adr, c, a) {
  palette = [];
  palBuffer.setOffset(adr);
  img = pctx.createImageData(16, 16);
  for(var i = 0; i < 16; i++) {
    for(var j = 0; j < 16; j++) {
      var off = (i * 16 + j) * 4;
      var color = codecs[c].decode(palBuffer);
      color[0][3] = a ? 255 : color[0][3];
      palette.push(color[0]); //add color to palette used for rendering
      img.data[off] = color[0][0];
      img.data[off + 1] = color[0][1];
      img.data[off + 2] = color[0][2];
      img.data[off + 3] = color[0][3];
    }
  }
  pctx.putImageData(img, 0, 0);
}

function render(adr, w, h, f, a, c) {
  romBuffer.setOffset(adr);
  setSize(w, h);
  var img = ctx2.createImageData(w, h);
  var bw = codecs[c].blockWidth;
  var bh = codecs[c].blockHeight;
  for(var i = 0; i < h; i += bh) {
    for(var j = 0; j < w; j += bw) {
      //for each block at (j, i);
      var colors = codecs[c].decode(romBuffer);
      //array of color-arrays
      for(var k = 0; k < bh; k++) {
        for(var l = 0; l < bw; l++) {
          //for each pixel in the block, if it is within the area
          if(i + k < h && j + l < w) {
            var off = ((i + k) * w + (j + l)) * 4;
            img.data[off] = colors[k * bw + l][0];
            img.data[off + 1] = colors[k * bw + l][1];
            img.data[off + 2] = colors[k * bw + l][2];
            img.data[off + 3] = a ? 255 : colors[k * bw + l][3];
          }
        }
      }
    }
  }
  ctx2.putImageData(img, 0, 0);
  //ctx2 is now the raw data, now flip it and put it on c1
  if(f) {
    ctx.translate(0, h);
    ctx.scale(1, -1);
  }
  ctx.drawImage(c2, 0, 0);
}

function fillCodecs() {
  for(var i = 0; i < codecs.length; i++) {
    var s = "<option value=\"" + i + "\">" + codecs[i].name;
    if(codecs[i].blockWidth > 1 || codecs[i].blockHeight > 1) {
      s += " [" + codecs[i].blockWidth + "x" + codecs[i].blockHeight + "]";
    }
    s += "</option>";
    el("codec").innerHTML += s;
  }
}

function fillPalCodecs() {
  for(var i = 0; i < codecs.length; i++) {
    if(!codecs[i].nopal) {
      var s = "<option value=\"" + i + "\"";
      if(codecs[i].name == "rgb888") {
        s += " selected";
      }
      s += ">" + codecs[i].name + "</option>";
      el("palcodec").innerHTML += s;
    }
  }
}

function switchPal() {
  switch(+el("paltype").value) {
    case 0:
      grayPal();
      drawPal();
      break;
    case 1:
      palBuffer = new Buffer(romBuffer.data);
      drawPal();
      break;
    case 2:
      if(el("palfile").files.length > 0) {
        loadPalFile();
      }
      break;
  }
}

fillCodecs();
fillPalCodecs();
grayPal();
drawPal(); //calls draw as well

el("adr").onchange = draw;
el("w").onchange = draw;
el("h").onchange = draw;
el("a").onchange = draw;
el("f").onchange = draw;
el("codec").onchange = draw;
el("scale").onchange = draw;

el("paladr").onchange = drawPal;
el("palcodec").onchange = drawPal;
el("pala").onchange = drawPal;
el("palfile").onchange = loadPalFile;
el("paltype").onchange = switchPal;
el("acol").onchange = drawPal;

window.onkeydown = function(e) {
  var focus = document.activeElement.tagName == "INPUT";
  if(el("key").checked && !focus) {
    var key = e.keyCode || e.which;
    var c = +el("codec").value;
    var adr = +el("adr").value;
    var w = Math.ceil(+el("w").value / codecs[c].blockWidth);
    var h = Math.ceil(+el("h").value / codecs[c].blockHeight);
    var s = e.shiftKey;
    var pc = +el("palcodec").value;
    var padr = +el("paladr").value;
    var origAdr = el("adr").value;
    var origPal = el("paladr").value;
    //l, u, r, d, <, >, [, ], ', \, -, =
    var keys = [37, 38, 39, 40, 188, 190, 219, 221, 222, 220, 189, 187];
    //W A S D Q E Z X
    var palKeys = [87, 65, 83, 68, 81, 69, 90, 88];
    switch(key) {
      case 37:
        el("adr").value = adr - (codecs[c].bytes * (s ? 8 : 1));
        break;
      case 38:
        el("adr").value = adr - (codecs[c].bytes * w * (s ? 8 : 1));
        break;
      case 39:
        el("adr").value = adr + (codecs[c].bytes * (s ? 8 : 1));
        break;
      case 40:
        el("adr").value = adr + (codecs[c].bytes * w * (s ? 8 : 1));
        break;
      case 188:
        el("adr").value = adr - (codecs[c].bytes * w * h);
        break;
      case 190:
        el("adr").value = adr + (codecs[c].bytes * w * h);
        break;
      case 219:
        el("w").value -= s ? 8 : 1;
        if(el("w").value < 1) {
          el("w").value = 1;
        }
        break;
      case 221:
        el("w").value = +el("w").value + (s ? 8 : 1);
        break;
      case 222:
        el("h").value -= s ? 8 : 1;
        if(el("h").value < 1) {
          el("h").value = 1;
        }
        break;
      case 220:
        el("h").value = +el("h").value + (s ? 8 : 1);
        break;
      case 189:
        el("adr").value = adr - 1;
        break;
      case 187:
        el("adr").value = adr + 1;
        break;
      case 87:
        el("paladr").value = padr - (codecs[pc].bytes * 16);
        break;
      case 65:
        el("paladr").value = padr - codecs[pc].bytes;
        break;
      case 83:
        el("paladr").value = padr + (codecs[pc].bytes * 16);
        break;
      case 68:
        el("paladr").value = padr + codecs[pc].bytes;
        break;
      case 81:
        el("paladr").value = padr - (codecs[pc].bytes * 256);
        break;
      case 69:
        el("paladr").value = padr + (codecs[pc].bytes * 256);
        break;
      case 90:
        el("paladr").value = padr - 1;
        break;
      case 88:
        el("paladr").value = padr + 1;
        break;
    }
    if(inArray(keys, key)) {
      e.preventDefault();
      draw();
    }
    if(inArray(palKeys, key)) {
      e.preventDefault();
      drawPal();
    }
    if(origAdr.startsWith("0x") && +el("adr").value >= 0) {
      el("adr").value = "0x" + (+el("adr").value).toString(16);
    }
    if(origPal.startsWith("0x") && +el("paladr").value >= 0) {
      el("paladr").value = "0x" + (+el("paladr").value).toString(16);
    }
  }
}
