const Cardapio = () => {
  const cardapio = [
    {
      id: 1,
      name: "Da casa",
      descricao: "Prato do chefe, feito com o molho especial",
    },
    {
      id: 2,
      name: "Strogonoff",
      descricao: "Delicioso strogonoff feito com peito de frango",
    },
    {
      id: 3,
      name: "Petit gâteau",
      descricao:
        "Sobremesa clássica feita de um pequeno bolo de chocolate com casca crocante e recheio cremoso e escorregadio",
    },
  ];

  const adicionar = (item) => {
    window.dispatchEvent(
      new CustomEvent("adicionarCarrinho", { detail: item }),
    );
  };

  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold text-stone-100">Cardápio</h2>

      <ul className="grid gap-4 p-4 sm:grid-cols-2">
        {cardapio.map((item) => (
          <li
            key={item.id}
            className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900 p-20 transition hover:-translate-y-1 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10"
          >
            <div>
              <h3 className="text-lg font-semibold text-amber-400">
                {item.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                {item.descricao}
              </p>
            </div>

            <button
              onClick={() => adicionar(item)}
              className="mt-5 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-amber-400 active:scale-95"
            >
              + Adicionar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cardapio;
