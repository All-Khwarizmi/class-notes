"use client";
import Header from "@/components/Header";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
export default function Home() {
  const classes = useQuery(api.classes.getClasses);
  return (
    <>
      <Header />
      <div>
        <h1>Classes</h1>
        <ul>
          {classes?.map((c) => (
            <li key={c.id}>
              <h2>{c.name}</h2>
              <p>{c.description}</p>
              <img src={c.imageUrl} alt={c.name} />
              {/* <ul>
                {c.students.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
