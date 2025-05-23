export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string | null; // or Date, depending on how you plan to handle it
  userId?: string;
  image?: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface TokenData {
  token: string;
}

export interface GetProfileResponse {
  user: User;
}

export interface ApplicationInput {
  userId: string;
  petId: string;
  reason: string;
  hasPetExperience: string;
  homeType: string;
  hasOtherPets: string;
}
