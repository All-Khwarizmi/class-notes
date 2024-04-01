import Title from "@/components/common/Title";

export default function Footer() {
  return (
    <footer className="bg-gray-800 h-[10vh] flex flex-col justify-center text-gray-400 text-sm text-center p-4">
      <p>
        <Title size="sm" /> © {new Date().getFullYear()}
      </p>
      <p>Tous droits réservés.</p>
    </footer>
  );
}
