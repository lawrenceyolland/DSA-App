
export const linearSearch = (
  haystack: Array<string | number>,
  needle: string | number
): boolean => {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      return true;
    }
  }
  return false;
};

export const binarySearch = (
  haystack: Array<string | number>,
  needle: string | number
): boolean => {
  let start: number = 0;
  let end: number = haystack.length;

  do {
    let midPoint: number = Math.floor(start + (end - start) / 2);
    let midValue = haystack[midPoint];

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
