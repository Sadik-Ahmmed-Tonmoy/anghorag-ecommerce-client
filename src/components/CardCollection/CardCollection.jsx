import Card from "../Card/Card";

const CardCollection = ({ products }) => {
  //

  // const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 mb-4 md:mb-[6px] lg:mb-7">
      {products.map((item, i) => (
        <Card key={i} item={item} />
      ))}
    </div>
  );
};

export default CardCollection;
