import { Section } from "~/components/section/section";

type Hobby = { title: string; seed: string; height: number };

// Placeholder photos until real ones land in public/. Heights vary to give
// the masonry its staggered look.
const hobbies: Hobby[] = [
  { title: "Skiing", seed: "skiing", height: 800 },
  { title: "Gym", seed: "gym", height: 600 },
  { title: "MMA", seed: "mma", height: 700 },
  { title: "Camping", seed: "camping", height: 500 },
  { title: "Travelling", seed: "travelling", height: 700 },
  { title: "Coffee", seed: "coffee", height: 400 },
  { title: "Bar", seed: "bar", height: 500 },
];

// Deal each photo into the currently shortest column so the columns end up
// close in height. Cards then grow to close the last gap, so the bottoms line up.
function toColumns(items: Hobby[], count: number) {
  const columns = Array.from({ length: count }, () => ({
    height: 0,
    items: [] as Hobby[],
  }));
  for (const item of items) {
    const shortest = columns.reduce((a, b) => (b.height < a.height ? b : a));
    shortest.items.push(item);
    shortest.height += item.height;
  }
  return columns.map((column) => column.items);
}

function Masonry({ count, className }: { count: number; className: string }) {
  return (
    <div className={`gap-4 ${className}`}>
      {toColumns(hobbies, count).map((column, i) => (
        <ul key={i} className="flex flex-col gap-4">
          {column.map(({ title, seed, height }) => (
            <li
              key={title}
              style={{ aspectRatio: `600 / ${height}` }}
              className="glass group relative grow overflow-hidden rounded-2xl"
            >
              <img
                src={`https://picsum.photos/seed/${seed}/600/${height}`}
                alt={title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-10 pb-3 font-semibold text-white">
                {title}
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export function HobbiesSection() {
  return (
    <Section id="hobbies" index={4} title="Hobbies">
      <Masonry count={2} className="grid grid-cols-2 md:hidden" />
      <Masonry count={3} className="hidden md:grid md:grid-cols-3" />
    </Section>
  );
}
