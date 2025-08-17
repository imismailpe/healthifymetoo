import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function getDocumentById(collection: string, id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("HB");
    const docId = new ObjectId(id);
    const documents = await db
      .collection(collection)
      .find({ _id: docId })
      .toArray();

    return { success: true, data: documents };
  } catch (error) {
    return { success: false, data: [], message: error };
  }
}
export async function updateDocument(
  collection: string,
  id: string,
  data: Record<string, unknown>
) {
  try {
    const client = await clientPromise;
    const db = client.db("HB");
    const docId = new ObjectId(id);
    const result = await db.collection(collection).updateOne(
      {
        _id: docId,
      },
      {
        $set: data,
      }
    );
    return {
      success: result.acknowledged,
      data: result.modifiedCount,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
}
export async function upsertDocumentByUserId(
  collection: string,
  userId: string,
  data: Record<string, unknown>
) {
  try {
    const client = await clientPromise;
    const db = client.db("HB");
    const uId = new ObjectId(userId);

    const query = { userId: uId };
    const options = { upsert: true };
    const update = { $set: { ...data } };
    const result = await db
      .collection(collection)
      .updateOne(query, update, options);
    return { success: result.acknowledged, message: "Added successfully" };
  } catch (e) {
    console.log("error in upsertDocumentByUserId", e);
    return { success: false, message: `${e}` };
  }
}
export async function getDocumentByQueryId(
  collection: string,
  field: string,
  value: string
) {
  try {
    const client = await clientPromise;
    const db = client.db("HB");
    const queryIdObj = new ObjectId(value);
    const documents = await db
      .collection(collection)
      .find({ [field]: queryIdObj })
      .toArray();

    return { success: true, data: documents };
  } catch (error) {
    return { success: false, data: [], message: error };
  }
}
export async function upsertDocumentByUserIdDate(
  collection: string,
  userId: string,
  date: string,
  data: Record<string, unknown>
) {
  try {
    const client = await clientPromise;
    const db = client.db("HB");
    const uId = new ObjectId(userId);

    const query = { userId: uId, date };
    const options = { upsert: true };
    const update = { $set: { ...data } };
    const result = await db
      .collection(collection)
      .updateOne(query, update, options);
    return { success: result.acknowledged, message: "Added successfully" };
  } catch (e) {
    console.log("error in upsertDocumentByUserId", e);
    return { success: false, message: `${e}` };
  }
}
