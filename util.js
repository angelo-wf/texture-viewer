
function el(id) {
  return document.getElementById(id);
}

function clone(arr) {
  var ret = [];
  for(var i = 0; i < arr.length; i++) {
    ret.push(arr[i]);
  }
  return ret;
}

function inArray(arr, val) {
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] === val) {
      return true;
    }
  }
  return false;
}

function roundColArr(arr) {
  for(var i = 0; i < arr.length; i++) {
    arr[i][0] = Math.round(arr[i][0]);
    arr[i][1] = Math.round(arr[i][1]);
    arr[i][2] = Math.round(arr[i][2]);
    arr[i][3] = Math.round(arr[i][3]);
  }
  return arr;
}

function Buffer(data) {
  this.data = data;
  this.bitOff = 0;
  this.offset = 0;

  this.setOffset = function(offset) {
    this.offset = offset;
    this.bitOff = 0;
  }

  this.readByte = function() {
    if(this.offset < 0 || this.offset >= data.length) {
      this.offset++;
      return 0xff;
    }
    return this.data[this.offset++];
  }

  this.readBits = function(amount) {
    var result = 0;
    for(var i = 0; i < amount; i++) {
      if(this.offset < 0 || this.offset >= data.length) {
        return 0xff;
      }
      var bit = (this.data[this.offset] & (0x80 >> this.bitOff)) > 0 ? 1 : 0;
      if(++this.bitOff === 8) {
        this.offset++;
        this.bitOff = 0;
      }
      result = (result << 1) + bit;
    }
    return result;
  }

  this.readShort = function() {
    var temp = this.readByte();
    return temp + (this.readByte() * 256);
  }

  this.readLong = function() {
    var temp = this.readByte();
    temp = temp + (this.readByte() * 256);
    temp = temp + (this.readByte() * 65536);
    temp = temp + (this.readByte() * 16777216);
    return temp;
  }

  this.readBigLong = function() {
    var temp = this.readByte();
    temp = temp * 256 + (this.readByte());
    temp = temp * 256 + (this.readByte());
    temp = temp * 256 + (this.readByte());
    return temp;
  }
}
