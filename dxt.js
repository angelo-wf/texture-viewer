function decodeDXT1(buffer) {
  var colt = buffer.readByte();
  var col0 = colt + buffer.readByte() * 256;
  colt = buffer.readByte();
  var col1 = colt + buffer.readByte() * 256;
  var ra = [];
  var ga = [];
  var ba = [];
  var alpha = [255,255,255,255];
  ra.push((col0 & 0xf800) >> 11);
  ga.push((col0 & 0x07e0) >> 5);
  ba.push(col0 & 0x001f);
  ra.push((col1 & 0xf800) >> 11);
  ga.push((col1 & 0x07e0) >> 5);
  ba.push(col1 & 0x001f);
  if(col0 > col1) {
    ra.push(Math.round(((2/3) * ra[0]) + ((1/3) * ra[1])));
    ra.push(Math.round(((1/3) * ra[0]) + ((2/3) * ra[1])));
    ga.push(Math.round(((2/3) * ga[0]) + ((1/3) * ga[1])));
    ga.push(Math.round(((1/3) * ga[0]) + ((2/3) * ga[1])));
    ba.push(Math.round(((2/3) * ba[0]) + ((1/3) * ba[1])));
    ba.push(Math.round(((1/3) * ba[0]) + ((2/3) * ba[1])));
  } else {
    ra.push(Math.round(((1/2) * ra[0]) + ((1/2) * ra[1])));
    ra.push(0);
    ga.push(Math.round(((1/2) * ga[0]) + ((1/2) * ga[1])));
    ga.push(0);
    ba.push(Math.round(((1/2) * ba[0]) + ((1/2) * ba[1])));
    ba.push(0);
    alpha = [255,255,255,0];
  }
  //we have the colors. now go and make the array
  var result = [];
  for(var i = 0; i < 4; i++) {
    //for each row
    var table = buffer.readByte();
    var t4 = (table & 0xc0) >> 6;
    var t3 = (table & 0x30) >> 4;
    var t2 = (table & 0x0c) >> 2;
    var t1 = table & 0x03;
    result.push([ra[t1] * 255 / 31, ga[t1] * 255 / 63, ba[t1] * 255 / 31, alpha[t1]]);
    result.push([ra[t2] * 255 / 31, ga[t2] * 255 / 63, ba[t2] * 255 / 31, alpha[t2]]);
    result.push([ra[t3] * 255 / 31, ga[t3] * 255 / 63, ba[t3] * 255 / 31, alpha[t3]]);
    result.push([ra[t4] * 255 / 31, ga[t4] * 255 / 63, ba[t4] * 255 / 31, alpha[t4]]);
  }
  return roundColArr(result);
}

function decodeDXT5(buffer) {
  var alpha = [];
  alpha.push(buffer.readByte());
  alpha.push(buffer.readByte());
  if(alpha[0] > alpha[1]) {
    alpha.push((6 * alpha[0] + alpha[1])/7);
    alpha.push((5 * alpha[0] + 2 * alpha[1])/7);
    alpha.push((4 * alpha[0] + 3 * alpha[1])/7);
    alpha.push((3 * alpha[0] + 4 * alpha[1])/7);
    alpha.push((2 * alpha[0] + 5 * alpha[1])/7);
    alpha.push((alpha[0] + 6 * alpha[1])/7);
  } else {
    alpha.push((4 * alpha[0] + alpha[1])/5);
    alpha.push((3 * alpha[0] + 2 * alpha[1])/5);
    alpha.push((2 * alpha[0] + 3 * alpha[1])/5);
    alpha.push((alpha[0] + 4 * alpha[1])/5);
    alpha.push(0);
    alpha.push(255);
  } //we now have the alpha values
  var at1 = buffer.readByte();
  var at2 = buffer.readByte();
  var at3 = buffer.readByte();
  var at4 = buffer.readByte();
  var at5 = buffer.readByte();
  var at6 = buffer.readByte();
  var at = [];
  at.push(at1 & 0x07);
  at.push((at1 & 0x38) >> 3);
  at.push(((at2 & 0x01) << 2) + ((at1 & 0xc0) >> 6));
  at.push((at2 & 0x0e) >> 1);
  at.push((at2 & 0x70) >> 4);
  at.push(((at3 & 0x03) << 1) + ((at2 & 0x80) >> 7));
  at.push((at3 & 0x1c) >> 2);
  at.push((at3 & 0xe0) >> 5);
  at.push(at4 & 0x07);
  at.push((at4 & 0x38) >> 3);
  at.push(((at5 & 0x01) << 2) + ((at4 & 0xc0) >> 6));
  at.push((at5 & 0x0e) >> 1);
  at.push((at5 & 0x70) >> 4);
  at.push(((at6 & 0x03) << 1) + ((at5 & 0x80) >> 7));
  at.push((at6 & 0x1c) >> 2);
  at.push((at6 & 0xe0) >> 5);
  //we now have the values for what alpha to select from alpha[]
  var av = [];
  for(var i = 0; i < 16; i++) {
    av[i] = alpha[at[i]];
  }
  var colt = buffer.readByte();
  var col0 = colt + buffer.readByte() * 256;
  colt = buffer.readByte();
  var col1 = colt + buffer.readByte() * 256;
  var ra = [];
  var ga = [];
  var ba = [];
  ra.push((col0 & 0xf800) >> 11);
  ga.push((col0 & 0x07e0) >> 5);
  ba.push(col0 & 0x001f);
  ra.push((col1 & 0xf800) >> 11);
  ga.push((col1 & 0x07e0) >> 5);
  ba.push(col1 & 0x001f);
  ra.push(Math.round(((2/3) * ra[0]) + ((1/3) * ra[1])));
  ra.push(Math.round(((1/3) * ra[0]) + ((2/3) * ra[1])));
  ga.push(Math.round(((2/3) * ga[0]) + ((1/3) * ga[1])));
  ga.push(Math.round(((1/3) * ga[0]) + ((2/3) * ga[1])));
  ba.push(Math.round(((2/3) * ba[0]) + ((1/3) * ba[1])));
  ba.push(Math.round(((1/3) * ba[0]) + ((2/3) * ba[1])));
  //we have the colors. now go and make the array
  var result = [];
  for(i = 0; i < 4; i++) {
    //for each row
    var table = buffer.readByte();
    var t4 = (table & 0xc0) >> 6;
    var t3 = (table & 0x30) >> 4;
    var t2 = (table & 0x0c) >> 2;
    var t1 = table & 0x03;
    result.push([ra[t1] * 255 / 31, ga[t1] * 255 / 63, ba[t1] * 255 / 31, av[i * 4 ]]);
    result.push([ra[t2] * 255 / 31, ga[t2] * 255 / 63, ba[t2] * 255 / 31, av[i * 4 + 1]]);
    result.push([ra[t3] * 255 / 31, ga[t3] * 255 / 63, ba[t3] * 255 / 31, av[i * 4 + 2]]);
    result.push([ra[t4] * 255 / 31, ga[t4] * 255 / 63, ba[t4] * 255 / 31, av[i * 4 + 3]]);
  }
  return roundColArr(result);
}
