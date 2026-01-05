package com.example.wintensecare

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.navigation.compose.rememberNavController
import com.example.wintensecare.data.api.ApiClient
import com.example.wintensecare.navigation.AppNavGraph

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        ApiClient.init(applicationContext)

        setContent {
            val navController = rememberNavController()
            AppNavGraph(navController)
        }
    }
}