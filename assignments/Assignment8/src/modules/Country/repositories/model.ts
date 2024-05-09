import mongoose from "mongoose";
import { ICountry } from "../entities/ICountry";

const countrySchema: mongoose.Schema<ICountry> = new mongoose.Schema<ICountry>(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    continent: { type: String, required: true },
    capital: { type: String, required: true },
    population: { type: Number, required: true },
    language: { type: String, required: true },
  },
  { timestamps: true }
);

const CountryModel: mongoose.Model<ICountry> = mongoose.model<ICountry>(
  "Country",
  countrySchema
);

export { CountryModel };
