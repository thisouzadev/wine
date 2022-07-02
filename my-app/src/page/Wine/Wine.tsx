import React, {useEffect, useState} from 'react';

interface IWineListProps {
    id: number,
    image: string,
    name: string,
    price: number,
    priceMember: number,
    discount: number,
}
const Wine: React.FC = () => {
  const [wineData, setWineData] = useState<IWineListProps[]>([]);
  const [wineList, setWineList] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  async function getWineAPIData() {
    const url = `https://wine-back-test.herokuapp.com/products?page=${page}&limit=10`;
    const response = await fetch(url).then((resp) => resp.json());
    setWineData(response.items);
    setWineList(response.items);
    setData(response);
  }

  useEffect(() => {
    getWineAPIData();
  }, [wineData, data]);

  const increment = () => {
    if (page !== data.totalPages) {
      setPage((prevpage) => {
        const currentpage = prevpage + 1;
        return currentpage;
      });
    }
  };

  const decrement = () => {
    if (page !== 1) {
      setPage((prevpage) => {
        const currentpage = prevpage - 1;
        return currentpage;
      });
    }
  };
  const inputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setPage(+value);
  };
  if (!wineData) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        {wineData.map((wine) => (
          <section key={wine.id}>
            <img src={wine.image} alt={wine.name} />
            <div>
              <h1>{wine.name}</h1>
              <p>R${wine.price}</p> <p>{wine.discount}% off</p>
              <p>SÓCIO WINE R${wine.priceMember}</p>
              <p>NÃO SÓCIO R${wine.price}</p>
              <button
                type="button"
              >Adicionar</button>
            </div>
          </section>
        ))}
      </div>
      <footer>
        <button
          type="button"
          onClick={ () => decrement() }
        >
       anterior
        </button>
        <input
          type="number"
          className="form-control"
          onChange={ (e) => inputValue(e) }
          value={ page }
        />
        <button
          type="button"
          onClick={ () => increment() }
        >
       próximo
        </button>
      </footer>
    </>
  );
};

export default Wine;
// Language: typescript
// Path: src/page/Wine.tsx
