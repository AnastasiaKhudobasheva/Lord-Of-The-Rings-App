import Link from "next/link";
import { volumes } from "../lib/data";

export default function Volumes() {
  return (
    <div>
      <h1>All Volumes</h1>

      <ul>
        {volumes.map((vol) => (
          <li key={vol.slug}>
            <Link href={`/volumes/${vol.slug}`}>{vol.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
