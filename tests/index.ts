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

import { HexFormatter } from "../lib/index"

const buffer = (function() {
    const numbers: number[] = [];

    for (let i = 0; i < 256; i++)
        numbers.push(i);

    return new Uint8Array(numbers);
})();

function assertEquals(l: string, r: string): void {
    if (l !== r)
        throw new Error(`Expected ${l}, got ${r}`);
}

(function() {
    const formatter = new HexFormatter();
    const trimmed   = new Uint8Array(buffer.buffer, 18, 28);

    formatter.offsetColumnSize = 4;
    formatter.aligned          = false;

    assertEquals(
        "0012: 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F 20 21  ...............!\n" +
        "0022: 22 23 24 25 26 27 28 29 2A 2B 2C 2D              \"#$%&'()*+,-", formatter.format(trimmed).join("\n"))
})();

(function() {
    const formatter = new HexFormatter();
    const trimmed   = new Uint8Array(buffer.buffer, 18, 28);

    formatter.offsetColumnSize = 4;

    assertEquals(
        "0010:       12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F    ..............\n" +
        "0020: 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D        .!\"#$%&'()*+,-", formatter.format(trimmed).join("\n"))
})();

(function() {
    const formatter = new HexFormatter();
    const trimmed   = new DataView(buffer.buffer, 18, 28);

    formatter.offsetColumnSize = 4;

    assertEquals(
        "0010:       12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F    ..............\n" +
        "0020: 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D        .!\"#$%&'()*+,-", formatter.format(trimmed).join("\n"))
})();

(function() {
    const formatter = new HexFormatter();
    const trimmed   = buffer.buffer.slice(18, 46);

    formatter.offsetColumnSize = 4;

    assertEquals(
        "0010:       12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F    ..............\n" +
        "0020: 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D        .!\"#$%&'()*+,-", formatter.format(trimmed, 18).join("\n"))
})();

(function() {
    const formatter = new HexFormatter();
    const trimmed   = new Uint8Array(buffer.buffer, 16, 30);

    formatter.offsetColumnSize = 4;

    assertEquals(
        "0010: 10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F  ................\n" +
        "0020: 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D        .!\"#$%&'()*+,-", formatter.format(trimmed).join("\n"))
})();

(function() {
    assertEquals(
        "00000: 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F  ................\n" +
        "00010: 10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F  ................\n" +
        "00020: 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D 2E 2F  .!\"#$%&'()*+,-./\n" +
        "00030: 30 31 32 33 34 35 36 37 38 39 3A 3B 3C 3D 3E 3F  0123456789:;<=>?\n" +
        "00040: 40 41 42 43 44 45 46 47 48 49 4A 4B 4C 4D 4E 4F  @ABCDEFGHIJKLMNO\n" +
        "00050: 50 51 52 53 54 55 56 57 58 59 5A 5B 5C 5D 5E 5F  PQRSTUVWXYZ[\\]^_\n" +
        "00060: 60 61 62 63 64 65 66 67 68 69 6A 6B 6C 6D 6E 6F  `abcdefghijklmno\n" +
        "00070: 70 71 72 73 74 75 76 77 78 79 7A 7B 7C 7D 7E 7F  pqrstuvwxyz{|}~.\n" +
        "00080: 80 81 82 83 84 85 86 87 88 89 8A 8B 8C 8D 8E 8F  ................\n" +
        "00090: 90 91 92 93 94 95 96 97 98 99 9A 9B 9C 9D 9E 9F  ................\n" +
        "000A0: A0 A1 A2 A3 A4 A5 A6 A7 A8 A9 AA AB AC AD AE AF  ................\n" +
        "000B0: B0 B1 B2 B3 B4 B5 B6 B7 B8 B9 BA BB BC BD BE BF  ................\n" +
        "000C0: C0 C1 C2 C3 C4 C5 C6 C7 C8 C9 CA CB CC CD CE CF  ................\n" +
        "000D0: D0 D1 D2 D3 D4 D5 D6 D7 D8 D9 DA DB DC DD DE DF  ................\n" +
        "000E0: E0 E1 E2 E3 E4 E5 E6 E7 E8 E9 EA EB EC ED EE EF  ................\n" +
        "000F0: F0 F1 F2 F3 F4 F5 F6 F7 F8 F9 FA FB FC FD FE FF  ................", (new HexFormatter()).format(buffer).join("\n"))
})();

(function() {
    const formatter = new HexFormatter();

    formatter.printCharacters = false;

    assertEquals(
        "00000: 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F\n" +
        "00010: 10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F\n" +
        "00020: 20 21 22 23 24 25 26 27 28 29 2A 2B 2C 2D 2E 2F\n" +
        "00030: 30 31 32 33 34 35 36 37 38 39 3A 3B 3C 3D 3E 3F\n" +
        "00040: 40 41 42 43 44 45 46 47 48 49 4A 4B 4C 4D 4E 4F\n" +
        "00050: 50 51 52 53 54 55 56 57 58 59 5A 5B 5C 5D 5E 5F\n" +
        "00060: 60 61 62 63 64 65 66 67 68 69 6A 6B 6C 6D 6E 6F\n" +
        "00070: 70 71 72 73 74 75 76 77 78 79 7A 7B 7C 7D 7E 7F\n" +
        "00080: 80 81 82 83 84 85 86 87 88 89 8A 8B 8C 8D 8E 8F\n" +
        "00090: 90 91 92 93 94 95 96 97 98 99 9A 9B 9C 9D 9E 9F\n" +
        "000A0: A0 A1 A2 A3 A4 A5 A6 A7 A8 A9 AA AB AC AD AE AF\n" +
        "000B0: B0 B1 B2 B3 B4 B5 B6 B7 B8 B9 BA BB BC BD BE BF\n" +
        "000C0: C0 C1 C2 C3 C4 C5 C6 C7 C8 C9 CA CB CC CD CE CF\n" +
        "000D0: D0 D1 D2 D3 D4 D5 D6 D7 D8 D9 DA DB DC DD DE DF\n" +
        "000E0: E0 E1 E2 E3 E4 E5 E6 E7 E8 E9 EA EB EC ED EE EF\n" +
        "000F0: F0 F1 F2 F3 F4 F5 F6 F7 F8 F9 FA FB FC FD FE FF", formatter.format(buffer).join("\n"))
})();

(function() {
    const formatter = new HexFormatter();
    const trimmed   = new Uint8Array(buffer.buffer, 0, 32);

    formatter.offsetColumnSize = 3;
    formatter.printCharacters  = false;

    assertEquals(
        "000: 00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F\n" +
        "010: 10 11 12 13 14 15 16 17 18 19 1A 1B 1C 1D 1E 1F", formatter.format(trimmed).join("\n"))
})();
