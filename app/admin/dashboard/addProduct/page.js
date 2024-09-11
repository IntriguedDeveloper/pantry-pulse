import { getCategories } from "../addProductCategories/handler";
import ClientComponent from "./ClientComponent";

export default async function AddProductPage(){
  const categories = await getCategories();
  console.log(categories);
  return <ClientComponent categories = {categories}/>
}