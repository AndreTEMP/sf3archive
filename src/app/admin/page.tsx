import Link from "next/link";
import MatchUploader from "./../components/matchUploader";

export default function AdminPage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        <MatchUploader />
      </div>
    </main>
  );
}
