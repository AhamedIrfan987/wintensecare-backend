package com.example.wintensecare.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.wintensecare.ui.dashboard.DashboardScreen
import com.example.wintensecare.ui.devices.DevicesScreen
import com.example.wintensecare.ui.login.LoginScreen
import com.example.wintensecare.ui.session.LoadingScreen
import com.example.wintensecare.ui.session.SessionState
import com.example.wintensecare.ui.session.SessionViewModel

@Composable
fun AppNavGraph(navController: NavHostController) {

    val sessionViewModel: SessionViewModel = viewModel()
    val sessionState by sessionViewModel.sessionState.collectAsState()

    when (sessionState) {

        SessionState.Loading -> {
            LoadingScreen() // ✅ splash / loader
        }

        SessionState.LoggedOut -> {
            NavHost(navController, startDestination = Routes.LOGIN) {
                composable(Routes.LOGIN) {
                    LoginScreen(
                        onLoginSuccess = {
                            navController.navigate(Routes.DEVICES) {
                                popUpTo(Routes.LOGIN) { inclusive = true }
                            }
                        }
                    )
                }
            }
        }

        SessionState.LoggedInNoDevice -> {
            NavHost(navController, startDestination = Routes.DEVICES) {
                composable(Routes.DEVICES) {
                    DevicesScreen { deviceId ->
                        sessionViewModel.setSelectedDevice(deviceId)
                    }
                }
            }
        }

        is SessionState.LoggedInWithDevice -> {
            NavHost(navController, startDestination = Routes.DASHBOARD) {
                composable(Routes.DASHBOARD) {
                    DashboardScreen(
                        deviceId = (sessionState as SessionState.LoggedInWithDevice).deviceId,
                        onChangeDevice = {
                            sessionViewModel.clearSelectedDevice()
                        },
                        onLogout = {
                            sessionViewModel.logout()
                        }
                    )
                }
            }
        }
    }
}
