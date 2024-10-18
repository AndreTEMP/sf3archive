import Link from "next/link";

const mockURLs = [
  "https://utfs.io/f/PSagkp02FR5HjUfStALifw2FJuK7xRmXB4d6GhTWCEspnlQA",
  "https://utfs.io/f/PSagkp02FR5H7ZeFQjwLBP6sjecvnyFRKOXx2rmY0Uu4kHMw",
  "https://utfs.io/f/PSagkp02FR5HOhIaRgwVkBXu20MgwtAdma5KxEhWz97qiLbZ",
  "https://utfs.io/f/PSagkp02FR5HgBIZCGFcLrOJAheMdHztVElW0BXqnyuZ5svU",
  "https://utfs.io/f/PSagkp02FR5H37X10r2II7Pn9YhgiavEJZFG3RtCTrcsoxyu",
  "https://utfs.io/f/PSagkp02FR5HOBCoXnVkBXu20MgwtAdma5KxEhWz97qiLbZH",
];

const mockImages = mockURLs.map((url, index) => ({
  id: index + 1,
  url: url,
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
