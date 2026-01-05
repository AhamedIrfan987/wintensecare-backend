package com.example.wintensecare.data.api

import retrofit2.http.Body
import retrofit2.http.POST

// -------- REQUEST MODELS --------
data class LoginRequest(
    val identifier: String,
    val password: String
)

// -------- RESPONSE MODELS --------
data class LoginResponse(
    val accessToken: String
)

// -------- API INTERFACE --------
interface AuthApi {

    @POST("auth/login")
    suspend fun login(
        @Body request: LoginRequest
    ): LoginResponse
}
