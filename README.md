# texture-viewer
Allows interpreting files as pixel-data in a variety of formats

## Info

This web-application allows viewing files as pixel-data, in a variety of formats.
It is available online [here](https://angelo-wf.github.io/texture-viewer/).

The address fields allow hexadecimal values by prefixing them with `0x`.

The code is not the best, as this was written quite a while back.

## Controls

- Arrows: move up/down one pixel/block row or forward/backward one pixel/block (which might be multiple bytes)
  - Hold shift to move 8 at a time
- `<`, `>`: move forward/backward one 'page', that is, to the data following the currently rendered data
- `-`, `=`: move forward/backward one byte
- `[`, `]`: change width
- `'`, `\`: change height
  - Hold shift to change with 8 pixels at a time (width and height)
- `WASD`: move up/down one pixel row or forward/backward one pixel in the palette
- `QE`: move forward/backward one 'page' in the palette
- `ZX`: move forward/backward one byte in the palette

## Codecs

The selected 'codec' indicates how the file's data is interpreted as pixel data.

These currently don't have the best names, but the general gist is as follows:
- The name for the top set of codecs consist of the channel order, followed by the bit-depths of those channels:
  - `r`, `g` and `b` are the normal red, green and blue color channels
  - `a` indicates the alpha-channel (transparency)
  - `i` indicates 'intensity', indicating the value for all color channels (monochrome)
- `Xbpp` indicates data with that amount of bits per pixel
- `(r)` indicates little-endian for 16-bit formats (otherwise big-endian)
- `(R)` indicates LSB first for reading values out of a byte
- `[XxY]` indicates the size of a decoded block, for formats that encode multiple pixels in a (set of) byte(s)
- `even/odd` indicated that only every other value is used, `odd` for skipping the first value as well
- `P` indicates that the palette is used
- `t-planar`, `r-planar` and `tr-planar` indicates usage of certain pixel encoding used by certain older consoles:
  - `t-planar`: the data for the bit-planes are stored per tile (NES)
  - `r-planar`: the data for the bit-planes are stored per row (GB/GBC/SNES 2bpp)
  - `tr-planar`: the data for the bit-planes are stored per row for each 2 planes (SNES 4bpp/8bpp)
- `DXT1` and `DXT5` refer to GPU-texture compression algorithms, also known as `BC1` and `BC3`
- `PS1`, `NES` and `7+1` are some special specific formats for the Playstation 1 VRAM, NES palettes and SNES mode 7+extbg respectively

## Licence

Licensed under the MIT license, see `LICENSE` for details.
