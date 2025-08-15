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
export async function upsertDocument(
  collection: string,
  id: string,
  data: Record<string, unknown>
) {
  try {
    const client = await clientPromise;
    const db = client.db("HB");
    const docId = new ObjectId(id);
    //use a different field for query. as id wont be there for first insert
    const query = { _id: docId };
    const options = { upsert: true };
    const update = { $set: { ...data } };
    const result = await db
      .collection(collection)
      .updateOne(query, update, options);
    return { success: result.acknowledged, message: "Added successfully" };
  } catch (e) {
    console.log("error in upsertDocument", e);
    return { success: false, message: `${e}` };
  }
}
