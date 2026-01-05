package com.example.wintensecare.data.api

import retrofit2.http.GET
import retrofit2.http.Query


data class TelemetryItem(
    val id: String,
    val deviceId: String,
    val heartRate: Int,
    val steps: Int,
    val battery: Int,
    val createdAt: String
)


interface TelemetryApi {

    @GET("telemetry")
    suspend fun getTelemetry(
        @Query("deviceId") deviceId: String
    ): List<TelemetryItem>
}

