package com.jenius_contact_app;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;

public class MainActivity extends ReactActivity {
    private ReactInstanceManager mReactInstanceManager;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "jenius_contact_app";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onBackPressed() {
      if (mReactInstanceManager != null) {
          mReactInstanceManager.onBackPressed();
      } else {
          super.onBackPressed();
      }
    }
}
