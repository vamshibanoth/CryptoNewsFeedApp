package com.cryptonewsfeedapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.ReactNativeApplicationEntryPoint
import io.branch.rnbranch.RNBranchModule

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost = object : DefaultReactNativeHost(this) {
    override fun getPackages(): List<ReactPackage> {
      return PackageList(this).packages
    }

    override fun getJSMainModuleName(): String = "index"
    override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
    override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
    override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
  }

override fun onCreate() {
  super.onCreate()

  ReactNativeApplicationEntryPoint.loadReactNative(this)

  // Enable logs early
  // RNBranchModule.enableLogging()

  // // Delay auto-init to avoid Context issues
  // applicationContext?.let {
  //   it.mainExecutor.execute {
  //     RNBranchModule.getAutoInstance(it)
  //   }
  // }
}

}
