import type { MetaFunction } from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";
import { ReactNode } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

export const meta: MetaFunction = () => {
  return [
    { title: "Cyclie" },
    { name: "description", content: "賃貸住み替えサービス" },
  ];
};

export async function loader() {
  const res = await fetch("http://server-recommend:8000/result");
  const data = await res.json();
  const result: string | null = data.result;
  return json({
    has_result: result !== null,
  });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <header className="py-8">
        <div className="container flex items-center gap-4">
          <Link to="/" className="text-lg font-bold">
            Cyclie
          </Link>
          <div className="grow"></div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-3xl"
            >
              {data.has_result ? (
                <div
                  className="indicator tooltip tooltip-open tooltip-bottom tooltip-secondary"
                  data-tip="結果が更新されました！"
                >
                  <span className="indicator-item badge badge-primary badge-xs">
                    <span className="absolute badge badge-primary badge-xs animate-ping"></span>
                  </span>
                  <IoPersonCircleOutline />
                </div>
              ) : (
                <IoPersonCircleOutline />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content w-48 z-10 menu p-2 shadow bg-base-100 rounded"
            >
              {data.has_result && (
                <li>
                  <Link to="/result">
                    結果確認
                    <span className="badge badge-primary badge-xs"></span>
                  </Link>
                </li>
              )}
              {!data.has_result && (
                <li>
                  <Link to="/wish_list">希望リスト</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>
      <main>
        <div className="container py-36 text-center">
          <h1 className="text-4xl font-bold">Cyclie</h1>
          <div className="mt-2 text-primary font-semibold">
            賃貸住み替えサービス
          </div>
          <div className="mt-2 text-primary font-semibold">
            「住み替えのことなら Cyclie(サイクリー)！」
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
              Cyclie なら空室物件だけでなく、
              <strong>引越しを検討してる人の部屋を含めて</strong>
              探すことができます！
              希望の物件が見つからなかった場合には、今の物件を手放す必要はありません。
            </p>
          </div>
        </Section>
        <Section>
          <img
            src="/undraw_traveling_yhxq.svg"
            width={240}
            className="aspect-square"
          />
          <div>
            <h3 className="text-2xl font-semibold">
              AIが好みにあった物件を提案！
            </h3>
            <p className="mt-4">
              簡単なアンケートに答えるだけで、あなたの好みを学習し、
              <strong>希望の雰囲気に近い物件をAIが提案します！</strong>
              もちろん、地域や予算、広さといった条件も組み合わせることができます。
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
            <h3 className="text-2xl font-semibold">面倒な手続きもおまかせ！</h3>
            <p className="mt-4">
              引っ越しには、引っ越し業者の手配や、水道やガス、電気などの契約変更などの面倒な手続きがつきもの。
              Cyclieなら、
              <strong>
                引っ越し先が決定した後の手続きをワンストップでお任せ
              </strong>
              することができます！
            </p>
          </div>
        </Section>
        <Section>
          <h3 className="text-3xl font-semibold">引っ越しまでの流れ</h3>
        </Section>
      </main>
    </div>
  );
}

export function Section({ children }: { children: ReactNode }) {
  return (
    <section className="py-8 even:bg-base-200">
      <div className="container flex flex-col sm:flex-row items-center gap-8">
        {children}
      </div>
    </section>
  );
}
