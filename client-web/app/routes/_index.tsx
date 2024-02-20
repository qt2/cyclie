import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { ReactNode } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

export const meta: MetaFunction = () => {
  return [
    { title: "Swap Estate" },
    { name: "description", content: "物件交換サービス" },
  ];
};

export default function Index() {
  return (
    <div>
      <header className="py-8">
        <div className="container flex items-center gap-4">
          <Link to="/" className="text-lg font-bold">
            Swap Estate
          </Link>
          <div className="grow"></div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-3xl"
            >
              <div className="indicator">
                <span className="indicator-item badge badge-primary badge-xs">
                  <span className="absolute badge badge-primary badge-xs animate-ping"></span>
                </span>
                <IoPersonCircleOutline />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content w-48 z-10 menu p-2 shadow bg-base-100 rounded"
            >
              <li>
                <a href="">物件情報入力</a>
              </li>
              <li>
                <Link to="/result">
                  結果確認
                  <span className="badge badge-primary badge-xs"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main>
        <div className="container py-36 text-center">
          <h1 className="text-4xl font-bold">Swap Estate</h1>
          <div className="mt-2 text-primary font-semibold">
            賃貸物件交換サービス
          </div>
          <Link to="/find" className="mt-8 btn btn-lg">
            物件を探す！
          </Link>
        </div>
        <Section>
          <img
            src="/undraw_searching_re_3ra9.svg"
            width={240}
            className="aspect-square"
          />
          <div>
            <h3 className="text-2xl font-semibold">引越し先を探そう！</h3>
            <p className="mt-4">
              Swap Estate
              なら空き家だけでなく、引越しを検討してる人の居住地を含めて探すことができます！
            </p>
          </div>
        </Section>
        <Section>
          <img
            src="/undraw_empty_street_re_atjq.svg"
            width={240}
            className="aspect-square"
          />
          <div>
            <h3 className="text-2xl font-semibold">引越し先を探そう！</h3>
            <p className="mt-4">
              Swap Estate
              なら空き家だけでなく、引越しを検討してる人の居住地を含めて探すことができます！
            </p>
          </div>
        </Section>
      </main>
    </div>
  );
}

export function Section({ children }: { children: ReactNode }) {
  return (
    <section className="py-8 odd:bg-base-200">
      <div className="container flex flex-col sm:flex-row items-center gap-8">
        {children}
      </div>
    </section>
  );
}
