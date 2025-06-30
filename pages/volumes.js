import Link from "next/link";
import { volumes } from "../lib/data";
import { useRouter } from "next/router";
//useRouter() lets us navigate programmatically instead of using <Link>

function getRandomSlug(array) {
  // const randomNum = Math.floor(Math.random() * array.length)
  // return array[randomNum]
  return array[Math.floor(Math.random() * array.length)].slug;
}
//picks a random item from any array

export default function Volumes() {
  const router = useRouter();

  function handleRandom() {
    const randomVol = getRandomSlug(volumes);
    router.push(`/volumes/${randomVol}`);
  }
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
      <button onClick={handleRandom}>Go to a Random Volume</button>
    </div>
  );
}
