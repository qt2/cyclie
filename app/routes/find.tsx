import { Link, useFetcher } from "@remix-run/react";
import { ReactNode } from "react";
import { IoArrowBack } from "react-icons/io5";

export default function Find() {
  const fetcher = useFetcher();

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
        <fetcher.Form className="container py-8">
          <h2 className="text-2xl font-semibold">地域</h2>
          <div className="py-4 flex gap-2">
            <LabelBox name="regions" value="hongo">
              本郷
            </LabelBox>
            <LabelBox name="regions" value="komaba">
              駒場
            </LabelBox>
          </div>
        </fetcher.Form>
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
