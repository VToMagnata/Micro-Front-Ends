import { useEffect, useState } from "react";

const Pedidos = () => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      setItens((prev) => [...prev, e.detail]);
    };

    window.addEventListener("adicionarCarrinho", handler);

    return () => {
      window.removeEventListener("adicionarCarrinho", handler);
    };
  }, []);

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold text-stone-100">
        Seu pedido{" "}
        {itens.length > 0 && (
          <span className="ml-1 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-stone-950">
            {itens.length}
          </span>
        )}
      </h2>

      {itens.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-700 p-6 text-center text-sm text-stone-500">
          Nenhum item no pedido ainda 🍴
        </p>
      ) : (
        <ul className="space-y-3">
          {itens.map((item, idx) => (
            <li
              key={`${item.id}-${idx}`}
              className="rounded-xl bg-stone-800/60 p-3"
            >
              <p className="font-medium text-stone-100">{item.name}</p>
              <p className="text-xs text-stone-400">{item.descricao}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Pedidos;
