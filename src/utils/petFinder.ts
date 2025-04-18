interface Pet {
  petId: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
  color: string;
  healthStatus: string;
  adoptionStatus: string;
  addedAt: Date;
  images: string[];
}

interface AnswerData {
  answerId: string;
  pets: Pet[];
}

interface MergedPets {
  pets: {
    items: (Pet & { count: number })[];
  };
}

export function mergePets(data: AnswerData[]): MergedPets {
  const petMap = new Map<string, Pet & { count: number }>();

  data.forEach((entry) => {
    entry.pets.forEach((pet) => {
      if (petMap.has(pet.petId)) {
        petMap.get(pet.petId)!.count += 1;
      } else {
        petMap.set(pet.petId, { ...pet, count: 1 });
      }
    });
  });

  const sortedTopPets = Array.from(petMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 6); // only top 6

  return {
    pets: {
      items: sortedTopPets,
    },
  };
}
