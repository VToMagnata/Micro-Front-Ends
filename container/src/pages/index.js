import dynamic from "next/dynamic";

const Cardapio = dynamic(() => import("catalogo/Cardapio"), { ssr: false });
const Pedidos = dynamic(() => import("carrinho/Pedidos"), { ssr: false });

const Home = () => {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <header className="border-b border-stone-800 bg-stone-900/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-5">
          <span className="text-3xl">🍽️</span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-amber-400">
              Sabor da Casa
            </h1>
            <p className="text-sm text-stone-400">
              Escolha seus pratos e monte o seu pedido
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-3">
        <section className="lg:col-span-2 flex flex-col gap-4">
          <Cardapio />
        </section>

        <aside className="lg:col-span-1">
          <div className="sticky top-6 rounded-2xl border border-stone-800 bg-stone-900 p-6 shadow-xl shadow-black/30">
            <Pedidos />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Home;
