import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useSearchParams } from "@remix-run/react";
import { ReactNode, useState } from "react";
import { BsMagic } from "react-icons/bs";
import { IoArrowBack, IoSearch } from "react-icons/io5";

export default function Find() {
  return (
    <div className="min-h-dvh bg-base-200">
      <header className="py-8">
        <div className="container flex items-center">
          <Link to="/" className="btn btn-circle bg-base-100 text-xl">
            <IoArrowBack />
          </Link>
        </div>
      </header>
      <main className="py-8">
        <div className="container">
          <h1 className="text-4xl font-semibold">探す</h1>
          <p className="mt-2">
            検索する項目を選択してください。各項目ごとに重視度を設定できます。
          </p>
        </div>
        <Form
          action="/search"
          className="container py-8"
          onChange={(e) => console.log(e.currentTarget)}
        >
          <h2 className="text-2xl font-semibold">地域</h2>
          <div className="py-4 flex gap-2 items-center">
            <LabelBox name="regions" value="hongo">
              本郷
            </LabelBox>
            ※プロトタイプでは本郷のみ選択できます。
          </div>

          <QueryItem title="家賃の予算" slug="rent">
            <select name="rent" className="select">
              {[
                3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
              ].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>{" "}
            万円ほど
          </QueryItem>

          <QueryItem title="広さ" slug="area">
            <select name="area" className="select">
              {[10, 15, 20, 25, 30, 35, 40, 45].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>{" "}
            m<sup>2</sup>ほど
          </QueryItem>

          <QueryItem title="駅徒歩分" slug="distance">
            <select name="distance" className="select">
              {[3, 5, 7, 10, 15, 20, 30].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>{" "}
            分以内
          </QueryItem>

          <QueryItem title="築年数" slug="age">
            <select name="age" className="select">
              {[3, 5, 10, 15, 20, 30].map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>{" "}
            年以内
          </QueryItem>

          <QueryItem
            title={
              <>
                部屋の雰囲気
                <span className="ml-2 badge badge-sm badge-accent badge-outline">
                  <BsMagic />
                  AI
                </span>
              </>
            }
            slug="atmos"
          >
            <AtmosItem title="モダンなインテリア" slug="modern" />
          </QueryItem>

          {/* <h2 className="mt-4 text-2xl font-semibold">
            希望のイメージ
            <span className="ml-2 badge badge-sm badge-accent badge-outline">
              <BsMagic />
              AI
            </span>
          </h2>
          <div className="py-4">
            <textarea
              name="misc"
              className="textarea w-full"
              placeholder="例: モダンな内装"
            ></textarea>
          </div> */}

          <p className="mt-2">
            指定した条件にマッチする割合が高いものから順に結果が表示されます。（一部の条件に合わないものでも、他の条件が強くマッチしていれば、上位に表示されます。）
          </p>

          <div className="text-right">
            <button
              type="submit"
              className="mt-8 btn btn-primary btn-outline text-lg"
            >
              <IoSearch className="text-xl" /> この条件で探す！
            </button>
          </div>
        </Form>
      </main>
    </div>
  );
}

export function LabelBox({
  name,
  value,
  children,
}: {
  name: string;
  value: string;
  children: ReactNode;
}) {
  return (
    <span>
      <input
        type="checkbox"
        name={name}
        value={value}
        id={value}
        className="peer hidden"
        checked
      />
      <label
        htmlFor={value}
        className="badge badge-lg px-4 py-4 cursor-pointer"
      >
        {children}
      </label>
    </span>
  );
}

export function QueryItem({
  title,
  slug,
  children,
}: {
  title: string | ReactNode;
  slug: string;
  children?: ReactNode;
}) {
  const [searchParams] = useSearchParams();

  const Star = ({ v, checked }: { v: number; checked?: boolean }) => (
    <input
      type="radio"
      name={`p_${slug}`}
      value={v}
      defaultChecked={checked}
      className="mask mask-star bg-orange-500"
    />
  );

  const priority = parseInt(searchParams.get(`p_${slug}`) ?? "3");
  const [active, setActive] = useState<boolean>(searchParams.has(`p_${slug}`));

  return (
    <div>
      <div className="mt-6 flex items-center gap-2">
        <label className="cursor-pointer label gap-2">
          <input
            type="checkbox"
            className="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          <h2 className="text-2xl font-semibold">{title}</h2>
        </label>

        {active && (
          <>
            <span className="pl-4 text-xs text-orange-800">重視度</span>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((v) => (
                <Star key={v} v={v} checked={v == priority} />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-2">{active && children}</div>
    </div>
  );
}

export function AtmosItem({
  title,
  slug,
}: {
  title: string | ReactNode;
  slug: string;
}) {
  const Rating = ({
    v,
    checked,
    className,
  }: {
    v: number;
    checked?: boolean;
    className?: string;
  }) => (
    <input
      type="radio"
      name={`a_${slug}`}
      value={v}
      defaultChecked={checked}
      className={`mask bg-opacity-20 checked:bg-opacity-100 ${className}`}
    />
  );

  return (
    <div>
      <div className="py-4 flex items-center gap-2">
        <h3 className="text-lg font-semibold">{title}</h3>

        <span className="pl-4 text-xs text-orange-800">嫌い</span>
        <div className="rating rating-sm gap-1">
          <Rating v={1} className="bg-indigo-500 mask-diamond scale-125" />
          <Rating v={2} className="bg-indigo-500 mask-diamond" />
          <Rating v={3} className="bg-gray-500 rounded-full" checked />
          <Rating v={4} className="bg-pink-500 mask-heart" />
          <Rating v={5} className="bg-pink-500 mask-heart scale-125" />
        </div>
        <span className="pl-4 text-xs text-orange-800">好き</span>
      </div>
    </div>
  );
}
