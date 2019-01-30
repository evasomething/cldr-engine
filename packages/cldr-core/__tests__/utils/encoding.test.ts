import {
  vuintDecode, vuintEncode,
  z85Decode, z85Encode,
  zigzag32Decode, zigzag32Encode
} from '../../src/utils/encoding';

test('variable uint encode', () => {
  const enc = vuintEncode;

  // encoding for numbers < 128 is identity
  let nums = [0, 1, 4, 8, 32, 64];
  let arr: number[] = [];
  nums.forEach(n => enc(n, arr));
  expect(arr).toEqual(nums);

  // encoding for numbers >= 128 uses 2 or more bytes
  nums = [128, 256, 512, 1024, 2048, 4096];
  arr = [];
  nums.forEach(n => enc(n, arr));
  expect(arr).toEqual([128, 1, 128, 2, 128, 4, 128, 8, 128, 16, 128, 32]);

  // if negative numbers are passed in, they become zeros
  nums = [-1, -2, -3, -4, -5];
  arr = [];
  nums.forEach(n => enc(n, arr));
  expect(arr).toEqual([0, 0, 0, 0, 0]);
});

test('variable uint decode', () => {
  const dec = vuintDecode;

  // encode some random positive integers in a range
  const nums: number[] = [0];
  for (let i = 0; i < 1000; i++) {
    const n = Math.floor(Math.random() * 10000000);
    nums.push(n);
  }

  // encode, then decode in-place and check
  const arr: number[] = [];
  nums.forEach(n => vuintEncode(n, arr));
  vuintDecode(arr);
  expect(arr).toEqual(nums);
});

test('variable uint decode w/ mapping', () => {
  const dec = vuintDecode;
  const nums: number[] = [1, 2, 4, 5, 7, 11, 17];
  const arr: number[] = [];
  nums.forEach(n => vuintEncode(n, arr));
  vuintDecode(arr, n => n * 2);
  expect(arr).toEqual([2, 4, 8, 10, 14, 22, 34]);
});

test('z85 encode', () => {
  const enc = z85Encode;

  expect(enc([0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3])).toEqual('0000010000200003');

  // play with powers of 256 / 85
  expect(enc([3, 38, 0, 45])).toEqual('011111');
  expect(enc([6, 76, 0, 90])).toEqual('022222');
  expect(enc([3, 47, 152, 143])).toEqual('012345');

  // padding
  expect(enc([0])).toEqual('300000');
  expect(enc([0, 0])).toEqual('200000');
  expect(enc([0, 0, 0])).toEqual('100000');
  expect(enc([0, 0, 0, 0])).toEqual('000000');
});

test('z85 decode', () => {
  const enc = z85Encode;
  const dec = z85Decode;

  const nums: number[] = [];
  for (let i = 0; i < 10; i++) {
    const n = Math.floor(Math.random() * 255);
    nums.push(n);
  }

  const s = enc(nums);
  const d = dec(s);
  expect(d).toEqual(nums);

  // padding
  expect(dec(enc([0]))).toEqual([0]);
  expect(dec(enc([0, 0]))).toEqual([0, 0]);
  expect(dec(enc([0, 0, 0]))).toEqual([0, 0, 0]);
  expect(dec(enc([0, 0, 0, 0]))).toEqual([0, 0, 0, 0]);
});

test('zigzag encode', () => {
  const enc = zigzag32Encode;
  expect(enc(0)).toEqual(0);
  expect(enc(-1)).toEqual(1);
  expect(enc(1)).toEqual(2);
  expect(enc(-2)).toEqual(3);
  expect(enc(2)).toEqual(4);
});

test('zigzag decode', () => {
  const dec = zigzag32Decode;
  expect(dec(0)).toEqual(0);
  expect(dec(1)).toEqual(-1);
  expect(dec(2)).toEqual(1);
  expect(dec(3)).toEqual(-2);
  expect(dec(4)).toEqual(2);
});
