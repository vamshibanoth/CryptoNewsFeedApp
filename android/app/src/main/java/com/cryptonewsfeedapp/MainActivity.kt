// package com.cryptonewsfeedapp

// import android.content.Intent
// import android.util.Log
// import com.facebook.react.ReactActivity
// import com.facebook.react.ReactActivityDelegate
// import com.facebook.react.defaults.DefaultReactActivityDelegate
// import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
// import io.branch.rnbranch.RNBranchModule

// class MainActivity : ReactActivity() {

//   override fun getMainComponentName(): String = "CryptoNewsFeedApp"

//   override fun onNewIntent(intent: Intent) {
//     super.onNewIntent(intent)
//     this.intent = intent
//     RNBranchModule.onNewIntent(intent)
//   }

//   override fun onStart() {
//     super.onStart()
//     try {
//       RNBranchModule.initSession(intent?.data, this)
//     } catch (e: Exception) {
//       Log.e("BranchInit", "Branch init failed", e)
//     }
//   }

//   override fun createReactActivityDelegate(): ReactActivityDelegate {
//     return DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
//   }
// }

package com.cryptonewsfeedapp

import android.content.Intent
import android.os.Bundle
import android.util.Log
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import io.branch.rnbranch.RNBranchModule

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "CryptoNewsFeedApp"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Initialize Branch for deep links
        RNBranchModule.initSession(intent?.data, this)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        this.intent = intent
        RNBranchModule.onNewIntent(intent)
    }

    override fun onStart() {
        super.onStart()
        // Also handle in onStart for other scenarios
        RNBranchModule.initSession(intent?.data, this)
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
    }
}