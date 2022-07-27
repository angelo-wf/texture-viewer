var nesPal = [[ 117, 117, 117 ], [ 39, 27, 143 ], [ 0, 0, 171 ], [ 71, 0, 159 ],[ 143, 0, 119 ], [ 171, 0, 19 ], [ 167, 0, 0 ], [ 127, 11, 0 ],[ 67, 47, 0 ], [ 0, 71, 0 ], [ 0, 81, 0 ], [ 0, 63, 23 ],[ 27, 63, 95 ], [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ],
[ 188, 188, 188 ], [ 0, 115, 239 ], [ 35, 59, 239 ], [ 131, 0, 243 ],[ 191, 0, 191 ], [ 231, 0, 91 ], [ 219, 43, 0 ], [ 203, 79, 15 ],[ 139, 115, 0 ], [ 0, 151, 0 ], [ 0, 171, 0 ], [ 0, 147, 59 ],[ 0, 131, 139 ], [ 0, 0, 0 ], [ 0, 0, 0 ], [ 0, 0, 0 ],
[ 255, 255, 255 ], [ 63, 191, 255 ], [ 95, 151, 255 ], [ 167, 139, 253 ],[ 247, 123, 255 ], [ 255, 119, 183 ], [ 255, 119, 99 ], [ 255, 155, 59 ],[ 243, 191, 63 ], [ 131, 211, 19 ], [ 79, 223, 75 ], [ 88, 248, 152 ],[ 0, 235, 219 ], [ 60, 60, 60 ], [ 0, 0, 0 ], [ 0, 0, 0 ],
[ 255, 255, 255 ], [ 171, 231, 255 ], [ 199, 215, 255 ], [ 215, 203, 255 ],[ 255, 199, 255 ], [ 255, 199, 219 ], [ 255, 191, 179 ], [ 255, 219, 171 ],[ 255, 231, 163 ], [ 227, 255, 163 ], [ 171, 243, 191 ], [ 179, 255, 207 ],[ 159, 255, 243 ], [ 160, 160, 160 ], [ 0, 0, 0 ], [ 0, 0, 0 ],];

function decodeNespal(buffer) {
  var index = buffer.readByte() & 0x3f;
  return [[nesPal[index][0], nesPal[index][1], nesPal[index][2], 255]];
}

function decodeNes2(buffer) {
  var tile = [];
  //lower plane
  for(var i = 0; i < 8; i++) {
    var data = buffer.readByte();
    for(var j = 0; j < 8; j++) {
      //for each byte of each row, get the byte and add it in row
      tile.push((data & (0x80 >> j)) >> (7 - j));
    }
  }
  //higher plane
  for(i = 0; i < 8; i++) {
    var data = buffer.readByte();
    for(j = 0; j < 8; j++) {
      var off = i * 8 + j;
      //for each byte of each row, get the byte and add it in row
      tile[off] += 2 * ((data & (0x80 >> j)) >> (7 - j));
    }
  }
  var ret = [];
  for(i = 0; i < 64; i++) {
    var r = palette[tile[i]][0];
    var g = palette[tile[i]][1];
    var b = palette[tile[i]][2];
    var a = palette[tile[i]][3];
    ret.push([r, g, b, a]);
  }
  return ret;
}

function decodeSnes2(buffer) {
  tile = [];
  for(var i = 0; i < 8; i++) {
    var low = buffer.readByte();
    var high = buffer.readByte();
    for(var j = 0; j < 8; j++) {
      var data = (low & (0x80 >> j)) >> (7 - j);
      data += 2 * (high & (0x80 >> j)) >> (7 - j);
      tile.push(data);
    }
  }
  var ret = [];
  for(i = 0; i < 64; i++) {
    var r = palette[tile[i]][0];
    var g = palette[tile[i]][1];
    var b = palette[tile[i]][2];
    var a = palette[tile[i]][3];
    ret.push([r, g, b, a]);
  }
  return ret;
}

function decodeSnes4(buffer) {
  tile = [];
  //lower plane
  for(var i = 0; i < 8; i++) {
    var low = buffer.readByte();
    var high = buffer.readByte();
    for(var j = 0; j < 8; j++) {
      var data = (low & (0x80 >> j)) >> (7 - j);
      data += 2 * (high & (0x80 >> j)) >> (7 - j);
      tile.push(data);
    }
  }
  //higher plane
  for(var i = 0; i < 8; i++) {
    var low = buffer.readByte();
    var high = buffer.readByte();
    for(var j = 0; j < 8; j++) {
      var off = i * 8 + j;
      var data = (low & (0x80 >> j)) >> (7 - j);
      data += 2 * (high & (0x80 >> j)) >> (7 - j);
      tile[off] += 4 * (data);
    }
  }
  var ret = [];
  for(i = 0; i < 64; i++) {
    var r = palette[tile[i]][0];
    var g = palette[tile[i]][1];
    var b = palette[tile[i]][2];
    var a = palette[tile[i]][3];
    ret.push([r, g, b, a]);
  }
  return ret;
}

function decodeSnes8(buffer) {
  tile = [];
  //1st plane
  for(var i = 0; i < 8; i++) {
    var low = buffer.readByte();
    var high = buffer.readByte();
    for(var j = 0; j < 8; j++) {
      var data = (low & (0x80 >> j)) >> (7 - j);
      data += 2 * (high & (0x80 >> j)) >> (7 - j);
      tile.push(data);
    }
  }
  //2nd plane
  for(var i = 0; i < 8; i++) {
    var low = buffer.readByte();
    var high = buffer.readByte();
    for(var j = 0; j < 8; j++) {
      var off = i * 8 + j;
      var data = (low & (0x80 >> j)) >> (7 - j);
      data += 2 * (high & (0x80 >> j)) >> (7 - j);
      tile[off] += 4 * (data);
    }
  }
  //3rd plane
  for(var i = 0; i < 8; i++) {
    var low = buffer.readByte();
    var high = buffer.readByte();
    for(var j = 0; j < 8; j++) {
      var off = i * 8 + j;
      var data = (low & (0x80 >> j)) >> (7 - j);
      data += 2 * (high & (0x80 >> j)) >> (7 - j);
      tile[off] += 16 * (data);
    }
  }
  //4th plane
  for(var i = 0; i < 8; i++) {
    var low = buffer.readByte();
    var high = buffer.readByte();
    for(var j = 0; j < 8; j++) {
      var off = i * 8 + j;
      var data = (low & (0x80 >> j)) >> (7 - j);
      data += 2 * (high & (0x80 >> j)) >> (7 - j);
      tile[off] += 64 * (data);
    }
  }
  var ret = [];
  for(i = 0; i < 64; i++) {
    var r = palette[tile[i]][0];
    var g = palette[tile[i]][1];
    var b = palette[tile[i]][2];
    var a = palette[tile[i]][3];
    ret.push([r, g, b, a]);
  }
  return ret;
}

function decodeSnes3(buffer) {
  tile = [];
  //lower plane
  for(var i = 0; i < 8; i++) {
    var low = buffer.readByte();
    var high = buffer.readByte();
    for(var j = 0; j < 8; j++) {
      var data = (low & (0x80 >> j)) >> (7 - j);
      data += 2 * (high & (0x80 >> j)) >> (7 - j);
      tile.push(data);
    }
  }
  //higher plane
  for(var i = 0; i < 8; i++) {
    var low = buffer.readByte();
    for(var j = 0; j < 8; j++) {
      var off = i * 8 + j;
      var data = (low & (0x80 >> j)) >> (7 - j);
      tile[off] += 4 * (data);
    }
  }
  var ret = [];
  for(i = 0; i < 64; i++) {
    var r = palette[tile[i]][0];
    var g = palette[tile[i]][1];
    var b = palette[tile[i]][2];
    var a = palette[tile[i]][3];
    ret.push([r, g, b, a]);
  }
  return ret;
}
