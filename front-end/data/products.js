  

const categoryNames = [
  {
    name: "Electronics",
    subcategories: ["Smartphones", "Laptops", "Cameras", "Headphones", "Wearables"],
  },
  {
    name: "Fashion",
    subcategories: ["Men's Clothing", "Women's Clothing", "Shoes", "Accessories", "Bags"],
  },
  {
    name: "Beauty",
    subcategories: ["Makeup", "Skincare", "Haircare", "Fragrances", "Personal Care"],
  },
  {
    name: "Home & Kitchen",
    subcategories: ["Furniture", "Appliances", "Cookware", "Home Decor", "Storage"],
  },
  {
    name: "Sports",
    subcategories: ["Fitness Equipment", "Outdoor Gear", "Team Sports", "Cycling", "Shoes"],
  },
  {
    name: "Toys",
    subcategories: ["Action Figures", "Board Games", "Dolls", "Educational Toys", "RC Toys"],
  },
  {
    name: "Books",
    subcategories: ["Fiction", "Non-fiction", "Comics", "Children's Books", "Textbooks"],
  },
  {
    name: "Groceries",
    subcategories: ["Fruits", "Vegetables", "Beverages", "Snacks", "Dairy"],
  },
  {
    name: "More Info",
    subcategories: ["About", "Home", "Products", "Contact", "Account"],
  },
];

function generateRandomProducts(){
  let productId = 1;
  let subIds = 1000;
  let mainIds = 2000;
  const categories = categoryNames.map(category =>
    {
      const mainId = mainIds++;
      const mainName = category.name;
      const subcategories =  category.subcategories.map(sub =>{
       const products = [];
       for( let i = 1; i < 11; i++){
          const aSingleCategory = {
        id: productId++,
        name: `${sub} product ${i}`,
        imgSrc: {
          imageFront: `https://picsum.photos/seed/${sub}-front-${i}/400/400`,
          imageBack: `https://picsum.photos/seed/${sub}-back-${i}/400/400`
        },
        cents: Math.floor(Math.random() * 2000) + 1200,
        rating:{
          count: Math.floor(Math.random() * 2004) + 100,
          stars: Math.floor(Math.random()*5) + 1,
        },
        sales: Math.floor(Math.random()* 1000) + 200,
        featured: Math.random() > 0.4
       }
       products.push(aSingleCategory);
       }
       return {subName: sub,subId: subIds++, products};
      });
      return {mainId, mainName, subcategories};
    }
  )

  return categories;
}
const categories = generateRandomProducts();
export const products = categories.flatMap(category => category.subcategories.flatMap(sub => sub.products));

