/*
 * Copyright (c) 2018 Princess Rosella. All rights reserved.
 *
 * @LICENSE_HEADER_START@
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @LICENSE_HEADER_END@
 */

function roundToLines(offset: number, line: number): number {
    return (((offset / line)|0) * line) - offset;
}

export class HexFormatter {
    offsetColumnSize: number  = 5;
    bytesPerLine:     number  = 16;
    printCharacters:  boolean = true;
    aligned:          boolean = true;

    constructor() {
    }

    offsetAsHexString(o: number): string {
        let   h = o.toString(16).toUpperCase();
        const l = this.offsetColumnSize;

        while (h.length < l)
            h = "0" + h;

        return h;
    }

    byteAsHexString(b: number): string {
        if (b < 16)
            return "0" + b.toString(16).toUpperCase();
        else
            return b.toString(16).toUpperCase();
    }

    format(data: Uint8Array | DataView | ArrayBuffer, baseOffset: number = 0): string[] {
        let lines: string[] = [];

        if (data instanceof DataView)
            data = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        else if (data instanceof ArrayBuffer)
            data = new Uint8Array(data);

        if (!(data instanceof Uint8Array))
            throw new Error(`Expected a Uint8Array, a DataView or an ArrayBuffer. Received ${data.constructor.name}`);

        const aligned         = this.aligned;
        const dataByteLength  = data.byteLength;
        const bytesPerLine    = this.bytesPerLine;
        const printCharacters = this.printCharacters;

        baseOffset += data.byteOffset;

        let o = 0;

        if (aligned)
            o = roundToLines(baseOffset, bytesPerLine);

        for (; o < dataByteLength; o += bytesPerLine) {
            let line  = this.offsetAsHexString(baseOffset + o) + ":";
            let eol   = Math.min(dataByteLength, o + bytesPerLine);
            let chars = "";
            let i     = o;

            for (; i < eol; i++) {
                if (i < 0) {
                    line += "   ";

                    if (printCharacters)
                        chars += " ";

                    continue;
                }

                const byte = data[i];

                line += " " + this.byteAsHexString(byte);

                if (printCharacters) {
                    if (byte <= 32 || byte >= 127)
                        chars += ".";
                    else
                        chars += String.fromCharCode(byte);
                }
            }

            for (; i < o + bytesPerLine; i++)
                line += "   ";

            if (printCharacters)
                line += "  " + chars;

            lines.push(line);
        }

        return lines;
    }
}
