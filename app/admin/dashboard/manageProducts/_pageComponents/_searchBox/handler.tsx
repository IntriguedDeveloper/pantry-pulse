"use server";

import { ProductDetails } from "../../../addProduct/ClientComponent";
type CategoryList = {
  categoryName: string;
  matchCounter: number;
};
function searchCategories(
  slicedArray: ProductDetails[],
  searchQuery: string
): CategoryList[] {
  let modifiedList: CategoryList[] = [];
  for (let i = 0; i < slicedArray.length; i++) {
    let nameLength = slicedArray[i].selectedCategory.length;
    let categoryName = slicedArray[i].selectedCategory;
    let matchCounter = 0;
    for (let j = 0; j < nameLength; j++) {
      if (equalsIgnoringCase(categoryName.charAt(j), searchQuery.charAt(0))) {
        matchCounter = 1;
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
    modifiedList.push({
      categoryName: categoryName,
      matchCounter: matchCounter,
    });
  }
  mergeSortCategoryList(modifiedList);
  console.log(modifiedList);
  return modifiedList;
}
function mergeSortCategoryList(dataSet: CategoryList[]): void {
  if (dataSet.length < 2) {
    return;
  }
  let len = dataSet.length;
  let midIndex = Math.floor(dataSet.length / 2);
  let leftArr = new Array(midIndex);
  let rightArr = new Array(len - midIndex);

  for (let i = 0; i < midIndex; i++) {
    leftArr[i] = dataSet[i];
  }
  for (let j = midIndex; j < len; j++) {
    rightArr[j - midIndex] = dataSet[j];
  }

  mergeSortCategoryList(leftArr);
  mergeSortCategoryList(rightArr);
  mergeHelper(leftArr, rightArr, dataSet);
}
function mergeHelper(
  leftArr: CategoryList[],
  rightArr: CategoryList[],
  arr: CategoryList[]
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
