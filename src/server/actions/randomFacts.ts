import randomFact from "../data/random-facts.json";

function getRandomIndex(arrLength: number) {
  return Math.floor(Math.random() * arrLength);
}

type RandomFact = (typeof randomFact)[0];

export async function getRandomFact(count: number): Promise<RandomFact[]> {
  "use server";
  const facts: RandomFact[] = [];
  for (let i = 0; i < count; i++) {
    const index = getRandomIndex(randomFact.length);
    if (facts.find((fact) => fact.code === randomFact[index]!.code)) {
      i--;
      continue;
    }
    facts.push(randomFact[index]!);
  }
  return facts;
}
