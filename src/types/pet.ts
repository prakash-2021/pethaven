export interface Pets {
  pets: {
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
  }[];
  meta: { pageNumber: number; totalPets: number; skip: number };
}

export interface Pet {
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
  petId: string;
}

export interface Application {
  applicationId: string;
  userId: string;
  petId: string;
  reason: string;
  hasPetExperience: string;
  homeType: string;
  hasOtherPets: string;
  status: string;
  submittedAt: string; // ISO date string
  pet: Pet;
}
