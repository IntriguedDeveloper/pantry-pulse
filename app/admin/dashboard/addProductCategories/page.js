import { getCategories } from "./handler"; 
import ClientComponent from "./ClientComponent"; 


export default async function Home() {
  const categories = await getCategories(); 
  return <ClientComponent categories={categories} />;
}
