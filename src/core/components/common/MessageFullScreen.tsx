export default function MessageFullScreen({ message }: { message: string }) {
  return (
    <section
      aria-label={`Displaying message: ${message}`}
      className="flex flex-col items-center justify-center h-[90vh]"
    >
      <h1 className="font-bold text-2xl"> {message} </h1>
    </section>
  );
}
