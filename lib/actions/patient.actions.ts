'use server'

import { ID, Query } from "node-appwrite"
import { BUCKET_ID, databases, ENDPOINT, PROJECT_ID, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils";
import { InputFile } from 'node-appwrite/file'
import process from "process";

export const createUser = async ({ name, email, phone }: CreateUserParams) => {
    try {
        console.log("Form data:", { name, email, phone });

        const newUser = await users.create(
            ID.unique(),
            email,
            phone,
            undefined,
            name
        )
        console.log({ newUser });

        return parseStringify(newUser);
    } catch (error) {
        if (error) {
            console.log(error);
            const documents = await users.list([
                Query.equal('email', [email])
            ])
            return documents?.users[0]
        }
        console.error("An error occurred while creating a new user:", error);
    }
}

export const getUser = async (userId : string ) => {
    try {
        const result = await users.get(userId);
        // console.log("User fetched successfully:", result);
        return parseStringify(result);

    } catch (error) {
        console.error("An error occurred while fetching the user:", error);
        return null;
    }
};


export const registerPatient = async ({ identificationDocument, ...patient }: RegisterUserParams) => {

    try {
        let file;
        if (identificationDocument) {
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('filename') as string
            )
            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        }
        const newPatient = await databases.createDocument(
            process.env.DATABASE_ID!,
            process.env.PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
                ...patient
            }
        )
        return parseStringify(newPatient);
    } catch (error) {
        console.log(error);
    }
}
  
  // GET PATIENT
  export const getPatient = async (userId: string) => {
    try {
      const patients = await databases.listDocuments(
        process.env.DATABASE_ID!,
        process.env.PATIENT_COLLECTION_ID!,
        [Query.equal("userId", [userId])]
      );
  
      return parseStringify(patients.documents[0]);
    } catch (error) {
      console.error(
        "An error occurred while retrieving the patient details:",
        error
      );
    }
}