export const linearSearch = (haystack: number[], needle: number): boolean => {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      return true;
    }
  }
  return false;
};

export const binarySearch = (haystack: number[], needle: number): boolean => {
  let start: number = 0;
  let end: number = haystack.length;

  do {
    let midPoint: number = Math.floor(start + (end - start) / 2);
    let midValue: number = haystack[midPoint];

    if (midValue === needle) {
      return true;
    } else if (midValue > needle) {
      end = midPoint;
    } else {
      start = midPoint + 1;
    }
  } while (start < end);

  return false;
};
