var codecs = [
  {
    name: "abgr1555 (r)",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 2,
    nopal: false,
    decode: function(buffer) {
      var temp = buffer.readByte();
      var data = buffer.readByte() * 256 + temp;
      var r = data & 0x001f;
      var g = (data & 0x03e0) >> 5;
      var b = (data & 0x7c00) >> 10;
      var a = (data & 0x8000) >> 15;
      return roundColArr([[r * 255 / 31, g * 255 / 31, b * 255 / 31, a * 255]]);
    }
  },
  {
    name: "abgr1555 PS1 (r)",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 2,
    nopal: false,
    decode: function(buffer) {
      var temp = buffer.readByte();
      var data = buffer.readByte() * 256 + temp;
      var r = data & 0x001f;
      var g = (data & 0x03e0) >> 5;
      var b = (data & 0x7c00) >> 10;
      var a = (data & 0x8000) >> 15;
      var alpha
      if(a == 0) {
        alpha = (r + g + b) == 0 ? 0 : 255;
      } else {
        alpha = (r + b + g) == 0 ? 255 : 127;
      }
      return roundColArr([[r * 255 / 31, g * 255 / 31, b * 255 / 31, alpha]]);
    }
  },
  {
    name: "abgr1555",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 2,
    nopal: false,
    decode: function(buffer) {
      var temp = buffer.readByte();
      var data = buffer.readByte() + temp * 256;
      var r = data & 0x001f;
      var g = (data & 0x03e0) >> 5;
      var b = (data & 0x7c00) >> 10;
      var a = (data & 0x8000) >> 15;
      return roundColArr([[r * 255 / 31, g * 255 / 31, b * 255 / 31, a * 255]]);
    }
  },
  {
    name: "rgba5551",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 2,
    nopal: false,
    decode: function(buffer) {
      var temp = buffer.readByte();
      var data = buffer.readByte() + (256 * temp);
      var r = (data & 0xf800) >> 11;
      var g = (data & 0x07c0) >> 6;
      var b = (data & 0x003e) >> 1;
      var a = data & 0x0001;
      return roundColArr([[r * 255 / 31, g * 255 / 31, b * 255 / 31, a * 255]]);
    }
  },
  {
    name: "rgb565 (r)",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 2,
    nopal: false,
    decode: function(buffer) {
      var data = buffer.readByte();
      data += buffer.readByte() * 256;
      var r = (data & 0xf800) >> 11;
      var g = (data & 0x07e0) >> 5;
      var b = data & 0x001f;
      var a = 255;
      return roundColArr([[r * 255 / 31, g * 255 / 63, b * 255 / 31, a]]);
    }
  },
  {
    name: "rgba4444 (r)",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 2,
    nopal: false,
    decode: function(buffer) {
      var data = buffer.readByte();
      data += buffer.readByte() * 256;
      var r = (data & 0xf000) >> 12;
      var g = (data & 0x0f00) >> 8;
      var b = (data & 0x00f0) >> 4;
      var a = data & 0x000f;
      return roundColArr([[r * 255 / 15, g * 255 / 15, b * 255 / 15, a * 255 / 15]]);
    }
  },
  {
    name: "argb4444 (r)",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 2,
    nopal: false,
    decode: function(buffer) {
      var data = buffer.readByte();
      data += buffer.readByte() * 256;
      var a = (data & 0xf000) >> 12;
      var r = (data & 0x0f00) >> 8;
      var g = (data & 0x00f0) >> 4;
      var b = data & 0x000f;
      return roundColArr([[r * 255 / 15, g * 255 / 15, b * 255 / 15, a * 255 / 15]]);
    }
  },
  {
    name: "abgr4444 (r)",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 2,
    nopal: false,
    decode: function(buffer) {
      var data = buffer.readByte();
      data += buffer.readByte() * 256;
      var a = (data & 0xf000) >> 12;
      var b = (data & 0x0f00) >> 8;
      var g = (data & 0x00f0) >> 4;
      var r = data & 0x000f;
      return roundColArr([[r * 255 / 15, g * 255 / 15, b * 255 / 15, a * 255 / 15]]);
    }
  },
  {
    name: "abgr4444",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 2,
    nopal: false,
    decode: function(buffer) {
      var data = buffer.readByte() * 256;
      data += buffer.readByte();
      var a = (data & 0xf000) >> 12;
      var b = (data & 0x0f00) >> 8;
      var g = (data & 0x00f0) >> 4;
      var r = data & 0x000f;
      return roundColArr([[r * 255 / 15, g * 255 / 15, b * 255 / 15, a * 255 / 15]]);
    }
  },
  {
    name: "rgb888",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 3,
    nopal: false,
    decode: function(buffer) {
      var r = buffer.readByte();
      var g = buffer.readByte();
      var b = buffer.readByte();
      return [[r, g, b, 255]];
    }
  },
  {
    name: "rgba8888",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 4,
    nopal: false,
    decode: function(buffer) {
      var r = buffer.readByte();
      var g = buffer.readByte();
      var b = buffer.readByte();
      var a = buffer.readByte();
      return [[r, g, b, a]];
    }
  },
  {
    name: "bgra8888",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 4,
    nopal: false,
    decode: function(buffer) {
      var b = buffer.readByte();
      var g = buffer.readByte();
      var r = buffer.readByte();
      var a = buffer.readByte();
      return [[r, g, b, a]];
    }
  },
  {
    name: "argb8888",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 4,
    nopal: false,
    decode: function(buffer) {
      var a = buffer.readByte();
      var r = buffer.readByte();
      var g = buffer.readByte();
      var b = buffer.readByte();
      return [[r, g, b, a]];
    }
  },
  {
    name: "ia31",
    blockWidth: 2,
    blockHeight: 1,
    bytes: 1,
    nopal: true,
    decode: function(buffer) {
      var ret = [];
      var data = buffer.readByte();
      var r = ((data & 0xe0) >> 5) * 255 / 7;
      var g = r;
      var b = r;
      var a = ((data & 0x10) >> 4) * 255;
      ret.push([r, g, b, a]);
      var r = ((data & 0x0e) >> 1) * 255 / 7;
      var g = r;
      var b = r;
      var a = (data & 0x01) * 255;
      ret.push([r, g, b, a]);
      return roundColArr(ret);
    }
  },
  {
    name: "ia44",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 1,
    nopal: false,
    decode: function(buffer) {
      var data = buffer.readByte();
      var r = ((data & 0xf0) >> 4) * 255 / 15;
      var g = r;
      var b = r;
      var a = (data & 0x0f) * 255 / 15;
      return roundColArr([[r, g, b, a]]);
    }
  },
  {
    name: "i4",
    blockWidth: 2,
    blockHeight: 1,
    bytes: 1,
    nopal: true,
    decode: function(buffer) {
      var ret = [];
      var data = buffer.readByte();
      var r = ((data & 0xf0) >> 4) * 255 / 15;
      var g = r;
      var b = r;
      var a = 255;
      ret.push([r, g, b, a]);
      var r = (data & 0x0f) * 255 / 15;
      var g = r;
      var b = r;
      var a = 255;
      ret.push([r, g, b, a]);
      return roundColArr(ret);
    }
  },
  {
    name: "a4",
    blockWidth: 2,
    blockHeight: 1,
    bytes: 1,
    nopal: true,
    decode: function(buffer) {
      var ret = [];
      var data = buffer.readByte();
      var r = 255;
      var g = 255;
      var b = 255;
      var a = ((data & 0xf0) >> 4) * 255 / 15;
      ret.push([r, g, b, a]);
      var r = 255;
      var g = 255;
      var b = 255;
      var a = (data & 0x0f) * 255 / 15;
      ret.push([r, g, b, a]);
      return roundColArr(ret);
    }
  },
  {
    name: "i8",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 1,
    nopal: false,
    decode: function(buffer) {
      var r = buffer.readByte();
      var g = r;
      var b = r;
      var a = 255;
      return [[r, g, b, a]];
    }
  },
  {
    name: "a8",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 1,
    nopal: false,
    decode: function(buffer) {
      var r = 255;
      var g = 255;
      var b = 255;
      var a = buffer.readByte();
      return [[r, g, b, a]];
    }
  },
  {
    name: "i8 even",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 2,
    nopal: false,
    decode: function(buffer) {
      var r = buffer.readByte();
      buffer.readByte();
      var g = r;
      var b = r;
      var a = 255;
      return [[r, g, b, a]];
    }
  },
  {
    name: "ia88",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 2,
    nopal: false,
    decode: function(buffer) {
      var r = buffer.readByte();
      var g = r;
      var b = r;
      var a = buffer.readByte();
      return [[r, g, b, a]];
    }
  },
  {
    name: "i8 NES",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 1,
    nopal: false,
    decode: decodeNespal
  },
  {
    name: "DXT1",
    blockWidth: 4,
    blockHeight: 4,
    bytes: 8,
    nopal: true,
    decode: decodeDXT1
  },
  {
    name: "DXT5",
    blockWidth: 4,
    blockHeight: 4,
    bytes: 16,
    nopal: true,
    decode: decodeDXT5
  },
  {
    name: "P 1bpp",
    blockWidth: 8,
    blockHeight: 1,
    bytes: 1,
    nopal: true,
    decode: function(buffer) {
      var data = buffer.readByte();
      var indexes = [];
      indexes.push((data & 0x80) >> 7);
      indexes.push((data & 0x40) >> 6);
      indexes.push((data & 0x20) >> 5);
      indexes.push((data & 0x10) >> 4);
      indexes.push((data & 0x08) >> 3);
      indexes.push((data & 0x04) >> 2);
      indexes.push((data & 0x02) >> 1);
      indexes.push(data & 0x01);
      var ret = [];
      for(var i = 0; i < 8; i++) {
        var r = palette[indexes[i]][0];
        var g = palette[indexes[i]][1];
        var b = palette[indexes[i]][2];
        var a = palette[indexes[i]][3];
        ret.push([r, g, b, a]);
      }
      return ret;
    }
  },
  {
    name: "P 4bpp",
    blockWidth: 2,
    blockHeight: 1,
    bytes: 1,
    nopal: true,
    decode: function(buffer) {
      var data = buffer.readByte();
      var indexes = [(data & 0xf0) >> 4, data & 0x0f];
      var ret = [];
      for(var i = 0; i < 2; i++) {
        var r = palette[indexes[i]][0];
        var g = palette[indexes[i]][1];
        var b = palette[indexes[i]][2];
        var a = palette[indexes[i]][3];
        ret.push([r, g, b, a]);
      }
      return ret;
    }
  },
  {
    name: "P 4bpp (R)",
    blockWidth: 2,
    blockHeight: 1,
    bytes: 1,
    nopal: true,
    decode: function(buffer) {
      var data = buffer.readByte();
      var indexes = [data & 0x0f, (data & 0xf0) >> 4];
      var ret = [];
      for(var i = 0; i < 2; i++) {
        var r = palette[indexes[i]][0];
        var g = palette[indexes[i]][1];
        var b = palette[indexes[i]][2];
        var a = palette[indexes[i]][3];
        ret.push([r, g, b, a]);
      }
      return ret;
    }
  },
  {
    name: "P 4bpp even",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 1,
    nopal: true,
    decode: function(buffer) {
      var data = (buffer.readByte() & 0xf0) >> 4;
      var ret = [];
      var r = palette[data][0];
      var g = palette[data][1];
      var b = palette[data][2];
      var a = palette[data][3];
      ret.push([r, g, b, a]);
      return ret;
    }
  },
  {
    name: "P 4bpp odd",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 1,
    nopal: true,
    decode: function(buffer) {
      var data = buffer.readByte() & 0x0f;
      var ret = [];
      var r = palette[data][0];
      var g = palette[data][1];
      var b = palette[data][2];
      var a = palette[data][3];
      ret.push([r, g, b, a]);
      return ret;
    }
  },
  {
    name: "P 8bpp",
    blockWidth: 1,
    blockHeight: 1,
    bytes: 1,
    nopal: true,
    decode: function(buffer) {
      var index = buffer.readByte();
      var r = palette[index][0];
      var g = palette[index][1];
      var b = palette[index][2];
      var a = palette[index][3];
      return [[r, g, b, a]];
    }
  },
  {
    name: "P 2bpp t-planar",
    blockWidth: 8,
    blockHeight: 8,
    bytes: 16,
    nopal: true,
    decode: decodeNes2
  },
  {
    name: "P 2bpp r-planar",
    blockWidth: 8,
    blockHeight: 8,
    bytes: 16,
    nopal: true,
    decode: decodeSnes2
  },
  {
    name: "P 3bpp",
    blockWidth: 8,
    blockHeight: 8,
    bytes: 24,
    nopal: true,
    decode: function(buffer) {
      var ret = [];
      for(i = 0; i < 8; i++) {
        var data = buffer.readByte();
        data = data * 256 + buffer.readByte();
        data = data * 256 + buffer.readByte();
        var indexes = [];
        indexes.push((data & 0xe00000) >> 21);
        indexes.push((data & 0x1c0000) >> 18);
        indexes.push((data & 0x038000) >> 15);
        indexes.push((data & 0x007000) >> 12);
        indexes.push((data & 0x000e00) >> 9);
        indexes.push((data & 0x0001c0) >> 6);
        indexes.push((data & 0x000038) >> 3);
        indexes.push(data & 0x000007);
        for(var j = 0; j < 8; j++) {
          var r = palette[indexes[j]][0];
          var g = palette[indexes[j]][1];
          var b = palette[indexes[j]][2];
          var a = palette[indexes[j]][3];
          ret.push([r, g, b, a]);
        }
      }
      return ret;
    }
  },
  {
    name: "P 3bpp tr-planar",
    blockWidth: 8,
    blockHeight: 8,
    bytes: 24,
    nopal: true,
    decode: decodeSnes3
  },
  {
    name: "P 4bpp (R)",
    blockWidth: 8,
    blockHeight: 8,
    bytes: 32,
    nopal: true,
    decode: function(buffer) {
      var ret = [];
      for(i = 0; i < 32; i++) {
        var data = buffer.readByte();
        var indexes = [data & 0x0f, (data & 0xf0) >> 4];
        for(var j = 0; j < 2; j++) {
          var r = palette[indexes[j]][0];
          var g = palette[indexes[j]][1];
          var b = palette[indexes[j]][2];
          var a = palette[indexes[j]][3];
          ret.push([r, g, b, a]);
        }
      }
      return ret;
    }
  },
  {
    name: "P 4bpp (rR)",
    blockWidth: 8,
    blockHeight: 8,
    bytes: 32,
    nopal: true,
    decode: function(buffer) {
      var ret = [];
      for(i = 0; i < 16; i++) {
        var data = buffer.readByte();
        var indexes2 = [(data & 0xf0) >> 4, data & 0x0f];
        data = buffer.readByte();
        var indexes1 = [(data & 0xf0) >> 4, data & 0x0f];
        for(var j = 0; j < 2; j++) {
          var r = palette[indexes1[j]][0];
          var g = palette[indexes1[j]][1];
          var b = palette[indexes1[j]][2];
          var a = palette[indexes1[j]][3];
          ret.push([r, g, b, a]);
        }
        for(var j = 0; j < 2; j++) {
          var r = palette[indexes2[j]][0];
          var g = palette[indexes2[j]][1];
          var b = palette[indexes2[j]][2];
          var a = palette[indexes2[j]][3];
          ret.push([r, g, b, a]);
        }
      }
      return ret;
    }
  },
  {
    name: "P 4bpp",
    blockWidth: 8,
    blockHeight: 8,
    bytes: 32,
    nopal: true,
    decode: function(buffer) {
      var ret = [];
      for(i = 0; i < 32; i++) {
        var data = buffer.readByte();
        var indexes = [(data & 0xf0) >> 4, data & 0x0f];
        for(var j = 0; j < 2; j++) {
          var r = palette[indexes[j]][0];
          var g = palette[indexes[j]][1];
          var b = palette[indexes[j]][2];
          var a = palette[indexes[j]][3];
          ret.push([r, g, b, a]);
        }
      }
      return ret;
    }
  },
  {
    name: "P 4bpp tr-planar",
    blockWidth: 8,
    blockHeight: 8,
    bytes: 32,
    nopal: true,
    decode: decodeSnes4
  },
  {
    name: "P 8bpp",
    blockWidth: 8,
    blockHeight: 8,
    bytes: 64,
    nopal: true,
    decode: function(buffer) {
      var ret = [];
      for(var i = 0; i < 64; i++) {
        var index = buffer.readByte();
        var r = palette[index][0];
        var g = palette[index][1];
        var b = palette[index][2];
        var a = palette[index][3];
        ret.push([r, g, b, a]);
      }
      return ret;
    }
  },
  {
    name: "P 8bpp even",
    blockWidth: 8,
    blockHeight: 8,
    bytes: 128,
    nopal: true,
    decode: function(buffer) {
      var ret = [];
      for(var i = 0; i < 64; i++) {
        var index = buffer.readByte();
        buffer.readByte();
        var r = palette[index][0];
        var g = palette[index][1];
        var b = palette[index][2];
        var a = palette[index][3];
        ret.push([r, g, b, a]);
      }
      return ret;
    }
  },
  {
    name: "P 7+1bpp even",
    blockWidth: 8,
    blockHeight: 8,
    bytes: 128,
    nopal: true,
    decode: function(buffer) {
      var ret = [];
      for(var i = 0; i < 64; i++) {
        var index = buffer.readByte() & 0x7f;
        buffer.readByte();
        var r = palette[index][0];
        var g = palette[index][1];
        var b = palette[index][2];
        var a = palette[index][3];
        ret.push([r, g, b, a]);
      }
      return ret;
    }
  },
  {
    name: "P 8bpp tr-planar",
    blockWidth: 8,
    blockHeight: 8,
    bytes: 64,
    nopal: true,
    decode: decodeSnes8
  }
]

// etc1[4x4], etc2[4x4] [rgb, rgb-a1], eac[4x4] [r [s, u], rg [s, u], rgba]
// bc1 (dxt1), bc2 (dxt3), bc3 (dxt5), bc4 [s, u], bc5 [s, u], bc6 [s, u], bc7; all [4x4]
// astc[x*y] [l, h]
// pvrtc[4/8x4], pvrtc2[4/8x4]
// atc[4x4] (atitc) [rgb, rgb-a, rgba]
// fxt1[8x4]
// also do floating point formats (like r11g11b10_float and such)
