import type { NextConfig } from "next";

import { PROJECT_ID, API_KEY, DATABASE_ID, PATIENT_COLLECTION_ID, DOCTOR_COLLECTION_ID, APPOINTMENT_COLLECTION_ID, ENDPOINT, BUCKET_ID } from "./lib/appwrite.config";

  const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    PROJECT_ID: PROJECT_ID,
    API_KEY: API_KEY,
    DATABASE_ID: DATABASE_ID,
    PATIENT_COLLECTION_ID: PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID: DOCTOR_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID: APPOINTMENT_COLLECTION_ID,
    ENDPOINT: ENDPOINT,
    BUCKET_ID: BUCKET_ID,
  }
};
// console.log("ENDPOINT:", process.env.NEXT_PUBLIC_ENDPOINT);
// console.log("PROJECT_ID:", process.env.PROJECT_ID);

export default nextConfig;
