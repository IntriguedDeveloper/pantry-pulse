"use server";

import { ProductDetails } from "../../../addProduct/ClientComponent";

export async function searchCategories(
  slicedArray: ProductDetails[],
  searchQuery: string
): Promise<ProductDetails[]> {
  for (let i = 0; i < slicedArray.length; i++) {
    let nameLength = slicedArray[i].selectedCategory.length;
    let categoryName = slicedArray[i].selectedCategory;
    let matchCounter = 0;

    for (let j = 0; j < nameLength; j++) {
      if (equalsIgnoringCase(categoryName.charAt(j), searchQuery.charAt(0))) {
        matchCounter = 1;
				console.log(categoryName, searchQuery);
        if (equalsIgnoringCase(categoryName, searchQuery)) {
          matchCounter = searchQuery.length + 1;
          break;
        } else {
          for (
            let k = 1, l = j + 1;
            k < searchQuery.length && k < nameLength;
            k++, l++
          ) {
            if (
              equalsIgnoringCase(
                categoryName.charAt(l - 1),
                searchQuery.charAt(k - 1)
              ) &&
              equalsIgnoringCase(categoryName.charAt(l), searchQuery.charAt(k))
            ) {
              matchCounter++;
            }
          }
        }
      }
    }

    // Add the matchCounter to the existing slicedArray product object
    slicedArray[i].matchCounter = matchCounter;
  }

  // Sort the array by matchCounter in descending order
  mergeSortProductDetails(slicedArray);
  
  return slicedArray;
}

function mergeSortProductDetails(dataSet: ProductDetails[]): void {
  if (dataSet.length < 2) {
    return;
  }

  let len = dataSet.length;
  let midIndex = Math.floor(len / 2);
  let leftArr = new Array(midIndex);
  let rightArr = new Array(len - midIndex);

  for (let i = 0; i < midIndex; i++) {
    leftArr[i] = dataSet[i];
  }
  for (let j = midIndex; j < len; j++) {
    rightArr[j - midIndex] = dataSet[j];
  }

  mergeSortProductDetails(leftArr);
  mergeSortProductDetails(rightArr);
  mergeHelper(leftArr, rightArr, dataSet);
}

function mergeHelper(
  leftArr: ProductDetails[],
  rightArr: ProductDetails[],
  arr: ProductDetails[]
) {
  let leftSize = leftArr.length;
  let rightSize = rightArr.length;
  let i = 0,
    j = 0,
    k = 0;

  while (i < leftSize && j < rightSize) {
    if (leftArr[i].matchCounter >= rightArr[j].matchCounter) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  while (i < leftSize) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  while (j < rightSize) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}

function equalsIgnoringCase(string1: string, string2: string): boolean {
  return (
    string1.localeCompare(string2, undefined, { sensitivity: "base" }) === 0
  );
}
