"use client"
import { Cours } from "../../domain/entities/cours-schemas";
import EditorProviderWrapper from "../components/EditorProvider";
import EditorChild from "../components/EditorChild";

export default function CoursView({
  cours,
}: {
  cours: Cours;
  userId: string;
}) {
  return (
    <EditorProviderWrapper>
    <EditorChild />
    </EditorProviderWrapper>
  );
}
// https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1575936123452-b67c3203c357%3Fq%3D80%26w%3D1000%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%253D&imgrefurl=https%3A%2F%2Funsplash.com%2Ffr%2Fs%2Fphotos%2Fimage&docid=n9tHz9sAm2iZfM&tbnid=Ba9N09n83VlN2M&vet=12ahUKEwjk7O3OuamGAxUUcaQEHbwEC68QM3oECFUQAA..i&w=1000&h=667&hcb=2&ved=2ahUKEwjk7O3OuamGAxUUcaQEHbwEC68QM3oECFUQAA