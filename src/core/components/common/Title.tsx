import Link from "next/link";

export default function Title({
  size,
  title = "La Classe",
}: {
  size?: string;
  title?: string;
}) {
  return (
    <Link
      role="ClassAI"
      href={"/"}
      className={`${
        size ? size : "text-2xl"
      }  font-bold bg-gradient-to-r underline from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient`}
    >
      {title}
    </Link>
  );
}
