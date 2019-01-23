
package com.androidinstalledapps;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;

import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.app.usage.UsageEvents;
import android.content.pm.PackageInfo;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.drawable.Drawable;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.io.File;

import javax.annotation.Nullable;

import com.helper.*;

public class RNAndroidInstalledAppsModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNAndroidInstalledAppsModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  private static UsageStatsManager getUsageStatsManager(ReactApplicationContext reactContext){
    UsageStatsManager usm = (UsageStatsManager) reactContext.getSystemService("usagestats");
    return usm;
  }

  @Override
  public String getName() {
    return "RNAndroidInstalledApps";
  }

  public static void printCurrentUsageStatus(ReactApplicationContext reactContext){
    printUsageStats(getUsageStatsList(reactContext));
  }

  @ReactMethod
  public void getApps(Promise promise) {
    try {
      PackageManager pm = this.reactContext.getPackageManager();
      List<PackageInfo> pList = pm.getInstalledPackages(0);
      WritableArray list = Arguments.createArray();

      // UsageStatsManager usm = getUsageStatsManager(this.reactContext);
      // Calendar calendar = Calendar.getInstance();
      // long endTime = calendar.getTimeInMillis();
      // calendar.add(Calendar.YEAR, -1);
      // long startTime = calendar.getTimeInMillis();
    
      // Log.d(TAG, "Range start:" + dateFormat.format(startTime) );
      // Log.d(TAG, "Range end:" + dateFormat.format(endTime));
    
      // List<UsageStats> usageStatsList = usm.queryUsageStats(UsageStatsManager.INTERVAL_DAILY,1729196,System.currentTimeMillis());
      // return usageStatsList;

      printCurrentUsageStatus(this.reactContext);
      UsageStatsManager manager = getUsageStatsManager(this.reactContext);
      List<UsageStats> stats = manager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY,1729196,System.currentTimeMillis());

      WritableArray list2 = Arguments.createArray();

      for (int i = 0; i < stats.size(); i++) {
        UsageStats usageStats = stats.get(i);
        WritableMap appInfo2 = Arguments.createMap();

        appInfo2.putString("packageName", usageStats.getPackageName());
        appInfo2.putDouble("firsTimeStamp", usageStats.getFirstTimeStamp());
        appInfo2.putDouble("getTotalTimeInForeground", usageStats.getTotalTimeInForeground());

        // Drawable icon = pm.getApplicationIcon(packageInfo.applicationInfo);
        // appInfo2.putString("icon", Utility.convert(icon));

        // String apkDir = packageInfo.applicationInfo.publicSourceDir;
        // appInfo2.putString("apkDir", apkDir);

        // File file = new File(apkDir);
        // double size = file.length();
        // appInfo2.putDouble("size", size);

        list2.pushMap(appInfo2);
      }

      // for (int i = 0; i < pList.size(); i++) {
      //   PackageInfo packageInfo = pList.get(i);
      //   WritableMap appInfo = Arguments.createMap();

      //   appInfo.putString("packageName", packageInfo.packageName);
      //   appInfo.putString("versionName", packageInfo.versionName);
      //   appInfo.putDouble("versionCode", packageInfo.versionCode);
      //   appInfo.putDouble("firstInstallTime", (packageInfo.firstInstallTime));
      //   appInfo.putDouble("lastUpdateTime", (packageInfo.lastUpdateTime));
      //   appInfo.putString("appName", ((String) packageInfo.applicationInfo.loadLabel(pm)).trim());

      //   Drawable icon = pm.getApplicationIcon(packageInfo.applicationInfo);
      //   appInfo.putString("icon", Utility.convert(icon));

      //   String apkDir = packageInfo.applicationInfo.publicSourceDir;
      //   appInfo.putString("apkDir", apkDir);

      //   File file = new File(apkDir);
      //   double size = file.length();
      //   appInfo.putDouble("size", size);

      //   list.pushMap(appInfo);
      // }
      promise.resolve(list2);
    } catch (Exception ex) {
      promise.reject(ex);
    }
  }

  @ReactMethod
  public void getNonSystemApps(Promise promise) {
    try {
      PackageManager pm = this.reactContext.getPackageManager();
      List<PackageInfo> pList = pm.getInstalledPackages(0);
      WritableArray list = Arguments.createArray();
      for (int i = 0; i < pList.size(); i++) {
        PackageInfo packageInfo = pList.get(i);
        WritableMap appInfo = Arguments.createMap();

        if ((packageInfo.applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM) == 0) {
          appInfo.putString("packageName", packageInfo.packageName);
          appInfo.putString("versionName", packageInfo.versionName);
          appInfo.putDouble("versionCode", packageInfo.versionCode);
          appInfo.putDouble("firstInstallTime", (packageInfo.firstInstallTime));
          appInfo.putDouble("lastUpdateTime", (packageInfo.lastUpdateTime));
          appInfo.putString("appName", ((String) packageInfo.applicationInfo.loadLabel(pm)).trim());

          Drawable icon = pm.getApplicationIcon(packageInfo.applicationInfo);
          appInfo.putString("icon", Utility.convert(icon));

          String apkDir = packageInfo.applicationInfo.publicSourceDir;
          appInfo.putString("apkDir", apkDir);

          File file = new File(apkDir);
          double size = file.length();
          appInfo.putDouble("size", size);

          list.pushMap(appInfo);
        }
      }
      promise.resolve(list);
    } catch (Exception ex) {
      promise.reject(ex);
    }

  }

  @ReactMethod
  public void getSystemApps(Promise promise) {
    try {
      PackageManager pm = this.reactContext.getPackageManager();
      List<PackageInfo> pList = pm.getInstalledPackages(0);
      WritableArray list = Arguments.createArray();
      for (int i = 0; i < pList.size(); i++) {
        PackageInfo packageInfo = pList.get(i);
        WritableMap appInfo = Arguments.createMap();

        if ((packageInfo.applicationInfo.flags & ApplicationInfo.FLAG_SYSTEM) != 0) {
          appInfo.putString("packageName", packageInfo.packageName);
          appInfo.putString("versionName", packageInfo.versionName);
          appInfo.putDouble("versionCode", packageInfo.versionCode);
          appInfo.putDouble("firstInstallTime", (packageInfo.firstInstallTime));
          appInfo.putDouble("lastUpdateTime", (packageInfo.lastUpdateTime));
          appInfo.putString("appName", ((String) packageInfo.applicationInfo.loadLabel(pm)).trim());

          Drawable icon = pm.getApplicationIcon(packageInfo.applicationInfo);
          appInfo.putString("icon", Utility.convert(icon));

          String apkDir = packageInfo.applicationInfo.publicSourceDir;
          appInfo.putString("apkDir", apkDir);

          File file = new File(apkDir);
          double size = file.length();
          appInfo.putDouble("size", size);

          list.pushMap(appInfo);
        }
      }
      promise.resolve(list);
    } catch (Exception ex) {
      promise.reject(ex);
    }

  }
  
  public static String printUsageStats(List<UsageStats> usageStatsList){
    String statsString = new String();
    statsString = statsString + "hello";
    for (UsageStats u : usageStatsList){
      // statsString = statsString + "Pkg: " + u.getPackageName() +  "\t" + "ForegroundTime: "
      //   + u.getTotalTimeInForeground() + "\n";
      statsString = statsString + "!";
    }
    return statsString;
  }

  public static List<UsageStats> getUsageStatsList(ReactApplicationContext reactContext){
    UsageStatsManager usm = getUsageStatsManager(reactContext);
  
    List<UsageStats> usageStatsList = usm.queryUsageStats(UsageStatsManager.INTERVAL_DAILY,1729196,System.currentTimeMillis());
    return usageStatsList;
  }

}



<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.androidinstalledapps" 
          xmlns:tools="http://schemas.android.com/tools">
    <uses-permission
        android:name="android.permission.PACKAGE_USAGE_STATS"
        tools:ignore="ProtectedPermissions" />
</manifest>
  