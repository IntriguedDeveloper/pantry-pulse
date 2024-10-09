"use server";
function searchCategories(slicedArray: any[], searchQuery: string): any[] {
  let modifiedList: Object[] = [];
  for (let i = 0; i < slicedArray.length; i++) {
    let nameLength = slicedArray[i].categoryName.length;
    let categoryName = slicedArray[i].categoryName;
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
    modifiedList.push({ categoryName: categoryName, matchCounter :  matchCounter });
  }
  console.log(modifiedList);
}
function mergeSortCategoryList(dataSet: any[]): void {

}
function equalsIgnoringCase(string1: string, string2: string): boolean {
  return (
    string1.localeCompare(string2, undefined, { sensitivity: "base" }) === 0
  );
}
