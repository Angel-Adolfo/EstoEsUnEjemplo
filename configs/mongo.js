'use strict'

import mongoose from "mongoose"

export const dbCnnect = async () => {
    try {
        mongoose.connection.on("error", () => {
            console.log("MongoDB | could not be connected to mongodb")
            mongoose.disconnect()
        })
        mongoose.connection.on('connecting', () => {
            console.log("MongoDB | connecting to mongodb")
        })
        mongoose.connection.on('connected', () => {
            console.log("MongoDB | connected to mongodb")
        })
        mongoose.connection.on('open', () => {
            console.log("MongoDB | connection opened")
        })
        mongoose.connection.on('reconnected', () => {
            console.log("MongoDB | reconnected to mongodb")
        })  
        mongoose.connection.on('disconnected', () => {
            console.log("MongoDB | disconnected from mongodb")
        })

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        })
    } catch (e) {
        console.log('database connection error: ' + e)
    }
}