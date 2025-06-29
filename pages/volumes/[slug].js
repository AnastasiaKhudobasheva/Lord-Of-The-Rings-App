import Link from "next/link";
import { volumes } from "@/lib/data";
import { useRouter } from "next/router";
import Image from "next/image";

export default function VolumeData() {
  console.log("routing", useRouter());
  //useRouter() gives { query: { slug: "the-fellowship-of-the-ring" } }
  // find() uses that slug to look up the right volume object from lib/data.js
  //
  // const { query } = useRouter();
  // const { slug } = query;
  const { slug } = useRouter().query;
  // -> destructuring the object: equivalent to const slug = useRouter().query.slug;
  //
  //
  //
  //
  // IMPORTANT TO ADD: Ensures the page doesn’t try to run before it knows which slug to use
  // Wait until slug is loaded (during first render)
  // Otherwise shows an error
  if (!slug) return <div>Loading...</div>;

  const volume = volumes.find(({ slug: volSlug }) => volSlug === slug);
  console.log("test", volume);
  //Alternatively:
  //const volume = volumes.find(vol => vol.slug === slug);
  //
  //volume gives us an Object that corresponds to the slug w/title,descr,cover etc
  //
  //We loop through the volumes array to find the one whose slug matches the URL
  //find() method: returns just one element from the array that matches a condition

  const currentIndex = volumes.findIndex(
    ({ slug: volSlug }) => volSlug === slug
  );
  console.log("nav", currentIndex);
  //method that looks through an array and returns the index (position number)
  // of the first element that passes a test we define
  //so we have the position of the current volume in the array: eg 1
  const prev = volumes[currentIndex - 1];
  const next = volumes[currentIndex + 1];
  //prev/next is not a number, but the full object: eg volumes[0]

  return (
    <div>
      <Link href="/volumes">← All Volumes</Link>
      <h1>{volume.title}</h1>
      <p>{volume.description}</p>
      <ul>
        {volume.books.map((book) => (
          <li key={book.ordinal}>
            {book.ordinal}:{book.title}
          </li>
        ))}
      </ul>
      <Image
        src={volume.cover}
        alt={`${volume.title} cover`}
        width={140}
        height={230}
      />
      <div>
        {prev && (
          <Link href={`/volumes/${prev.slug}`}>← Previous: {prev.title}</Link>
        )}
        {next && (
          <Link href={`/volumes/${next.slug}`}>Next: {next.title} →</Link>
        )}
      </div>
    </div>
  );
}

// we use . notation to access title and description bc volume is an OBJECT
// we map over volume.books bs it's an ARRAY to access ordinal and title of each book

//If you're on the first volume, prev is undefined:
// {prev && …} becomes undefined, so nothing renders
//volumes[0].slug = the-fellowship-of-the-ring

// If you're on the last volume, next is undefined:
// {next && …} becomes undefined, so no "Next" link

// In the middle: both links show
