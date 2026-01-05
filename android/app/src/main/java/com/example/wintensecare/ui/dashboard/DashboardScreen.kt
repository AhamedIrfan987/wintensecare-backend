package com.example.wintensecare.ui.dashboard

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun DashboardScreen(
    deviceId: String,
    onChangeDevice: () -> Unit,
    onLogout: () -> Unit,
    viewModel: DashboardViewModel = viewModel()
) {
    val latest by viewModel.latest.collectAsState()

    LaunchedEffect(deviceId) {
        viewModel.load(deviceId)
    }

    Column(Modifier.fillMaxSize().padding(16.dp)) {

        Text("Dashboard", style = MaterialTheme.typography.headlineMedium)

        Spacer(Modifier.height(16.dp))

        if (latest == null) {
            CircularProgressIndicator()
        } else {
            Text("Heart Rate: ${latest!!.heartRate}")
            Text("Steps: ${latest!!.steps}")
            Text("Battery: ${latest!!.battery}%")
            Text("Time: ${latest!!.createdAt}")
        }

        Spacer(Modifier.height(24.dp))

        Button(onClick = onChangeDevice) {
            Text("Change Device")
        }

        Spacer(Modifier.height(8.dp))

        Button(onClick = onLogout) {
            Text("Logout")
        }
    }
}


@Composable
private fun StatItem(title: String, value: String) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 6.dp)
    ) {
        Column(Modifier.padding(12.dp)) {
            Text(title, style = MaterialTheme.typography.labelLarge)
            Text(value, style = MaterialTheme.typography.headlineSmall)
        }
    }
}
