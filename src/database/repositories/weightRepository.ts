import { SQLiteDatabase } from "expo-sqlite"

export const getAllWeights = async (db: SQLiteDatabase, userId: number, limit?: number) => {
    const query = `
        SELECT * FROM weights WHERE user_id = ? ORDER BY date DESC ${limit !== undefined ? "LIMIT ?" : ""}
    `
    const result = await db.getAllAsync(
        query,
        limit !== undefined ? [userId, limit] : [userId]

    )

    return result
}

export const getWeight = async (db: SQLiteDatabase, userId: number, date: string) => {
    const element = await db.getFirstAsync<any>("SELECT * FROM weights WHERE user_id = ? AND date = ?", 
        userId, 
        date
    )
    return element
}

export const insertWeight = async (db: SQLiteDatabase, userId: number, date: string, weight: string) => {
    await db.runAsync(
        "INSERT INTO weights (user_id, date, measurement) VALUES (?, ?, ?)",
        userId,
        date,
        weight.replaceAll(",", ".")
        )
    }

export const updateWeight = async (db: SQLiteDatabase, userId: number, weight: string, date: string) => {
    await db.runAsync(
        "UPDATE weights SET measurement = ? WHERE user_id = ? AND date = ?",
        weight,
        userId,
        date
    )
}

export const deleteWeight = async (db: SQLiteDatabase, userId: number, weightId: string) => {
    await db.runAsync(
        "DELETE FROM weights WHERE id = ?",
        weightId
    )
    console.log("Deleted weight: "+weightId)
}