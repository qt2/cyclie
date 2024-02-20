import { Form, Link } from "@remix-run/react";
import { ReactNode } from "react";
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
        </div>
        <Form action="/search" className="container py-8">
          <h2 className="text-2xl font-semibold">地域</h2>
          <div className="py-4 flex gap-2">
            <LabelBox name="regions" value="hongo">
              本郷
            </LabelBox>
            <LabelBox name="regions" value="komaba">
              駒場
            </LabelBox>
          </div>

          <h2 className="mt-4 text-2xl font-semibold">家賃</h2>
          <div className="py-4">
            <input
              type="range"
              name="rent"
              min={3}
              max={20}
              step={0.5}
              className="range"
            />
          </div>

          <h2 className="mt-4 text-2xl font-semibold">駅徒歩分</h2>
          <div className="py-4">
            <select name="distance" className="select">
              <option value="3">3分以内</option>
              <option value="3">5分以内</option>
            </select>
          </div>

          <h2 className="mt-4 text-2xl font-semibold">
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
          </div>

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
      />
      <label
        htmlFor={value}
        className="badge badge-lg px-4 py-4 peer-checked:badge-primary cursor-pointer"
      >
        {children}
      </label>
    </span>
  );
}
