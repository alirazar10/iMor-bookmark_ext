/*global chrome*/
/**
 * * On popup window load event Send the response and send window
 */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "sendMeURL") {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (currentTab) => {
        sendResponse({
          webInfo: JSON.stringify(currentTab[0]),
        });
      }
    );
    return true;
  } else if (request.message === "sendUserData") {
    chrome.identity.getProfileUserInfo(function (userInfo) {
      if (userInfo) {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
          if (token) {
            const getUserData = {
              email: userInfo.email,
              google_user_id: userInfo.id,
            };
            sendResponse({
              getUserData: JSON.stringify(getUserData),
            });
          } else {
            console.error("Failed to get auth token.");
          }
        });
      } else {
        console.error("Failed to get user info.");
      }
    });
    return true;
  }
});
