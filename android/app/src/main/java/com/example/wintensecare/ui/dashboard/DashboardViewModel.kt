package com.example.wintensecare.ui.dashboard

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.wintensecare.data.api.ApiClient
import com.example.wintensecare.data.api.TelemetryApi
import com.example.wintensecare.data.api.TelemetryItem
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

sealed class DashboardState {
    object Loading : DashboardState()
    data class Success(
        val avgHr: Int,
        val maxHr: Int,
        val steps: Int,
        val battery: Int
    ) : DashboardState()
    data class Error(val message: String) : DashboardState()
}

class DashboardViewModel(application: Application) : AndroidViewModel(application) {

    private val telemetryApi =
        ApiClient.retrofit.create(TelemetryApi::class.java)

    private val _latest = MutableStateFlow<TelemetryItem?>(null)
    val latest: StateFlow<TelemetryItem?> = _latest

    fun load(deviceId: String) {
        viewModelScope.launch {
            val list = telemetryApi.getTelemetry(deviceId)
            _latest.value = list.firstOrNull() // latest entry
        }
    }
}
