/*global chrome*/
import "bootstrap/dist/css/bootstrap.css";
import { addDoc, collection } from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { db } from "./firebase-config";
import "./header";
import FBExtHeader from "./header";
import LoadingSpinner from "./loading-spinner";
import "./style.css";
import TagInput from "./tags";

function IMorApp() {
  const [data, setData] = useState({
    url: "",
    title: "",
    tags: "",
    notes: "",
    created_at: "",
    response_code: 0,
  });
  const [userData, setUserData] = useState({
    user_id: "",
    user_email: "",
    google_user_id: "",
  });
  const [result, setResult] = useState({
    dataMsg: "",
    cssClasses: "d-none",
  });
  const [access, setAccess] = useState({
    authUser: false,
    token: "",
  });

  const dbCon = collection(db, "Bookmarks");

  /**
   * Authenticate user on app start up. check for the token, if token not found then login with google account.
   **/
  const authUser = () => {
    try {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (token) {
          setAccess({
            authUser: true,
            token: token,
          });
        }
      });
    } catch (e) {
      console.log("unexpected error: ", e);
      setResult({
        dataMsg: "error",
        cssClasses: "alert-danger p-2",
      });
    }
  };

  /**
   *  Get  active tab URL and title info and update the state
   */
  const getUrl = () => {
    chrome.runtime.sendMessage({ message: "sendMeURL" }, (response) => {
      if (response.webInfo) {
        var res = JSON.parse(response.webInfo);
        setData({
          url: res.url,
          title: res.title,
          response_code: 200,
        });
      } else {
        setData({ statusCode: 404 });
      }
    });
  };
  /**
   * Get user data
   *
   */
  const getUserData = () => {
    chrome.runtime.sendMessage(
      {
        message: "sendUserData",
      },
      (response) => {
        if (response.getUserData) {
          var resp = JSON.parse(response.getUserData);

          setUserData({
            // user_id: resp.value,
            google_user_id: resp.google_user_id,
            user_email: resp.email,
          });
        }
      }
    );
  };

  const save = () => {
    const tags = getTags();

    if (document.getElementById("tags").value) {
      tags.push(document.getElementById("tags").value);
    }

    const newData = {
      ...data,
      notes: document.getElementById("notes").value,
      ...userData,
      tags: tags.join(", "),
      created_at: moment().format("DD-MM-YYYY h:mm:ss"),
    };

    saveToFirestore(newData);
  };

  const getTags = () => {
    var tagsElements = document.getElementsByClassName("tagComponent__text");
    let tags = [];
    for (var i = 0; i < tagsElements.length; i++) {
      tags.push(tagsElements[i].textContent);
    }
    return tags;
  };

  const saveToFirestore = async (data) => {
    setResult({
      dataMsg: <LoadingSpinner />,
      cssClasses: "d-block text-center",
    });
    try {
      const save = await addDoc(dbCon, data);
      setResult({
        dataMsg: "Data added",
        cssClasses: "alert-success p-2",
      });
      console.log(save);
    } catch (error) {
      console.log("Error writing document: ", error);
      setResult({
        dataMsg: "Failed to add data.",
        cssClasses: "alert-success p-2",
      });
    }
  };
  useEffect(() => {
    authUser();
    if (access.authUser) {
      getUserData();
      getUrl();
    }
  }, [access]);
  return access.authUser === false ? (
    <div className="container d-flex justify-content-center align-items-center text-center h-100">
      {result.dataMsg === "error" ? (
        <span>Please check you connection</span>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  ) : (
    <div className="container main-container py-2 bg-color">
      <FBExtHeader />

      <div className="divider"></div>

      <div className="main-container">
        <div className="card border-0 bg-color">
          <div className="card-body">
            <div className="url mb-3">
              <h5 id="url-title"> {data.title}</h5>
            </div>

            <div className="mb-3">
              <textarea
                rows="4"
                placeholder="Add notes"
                id="notes"
                className="form-control shadow border-radius"
              ></textarea>
            </div>
            <div className="tags mb-3">
              <TagInput />
              <div className={result.cssClasses}>{result.dataMsg}</div>
            </div>

            <div className="footer-container">
              <div className="library d-inline">
                <span className="text-primary cursor-pointer">My Library</span>
              </div>

              <div className="float-end">
                <div className="bookmark d-inline ">
                  <button
                    className="btn btn-sm "
                    onClick={() => save()}
                    type="button"
                  >
                    Save to Library
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<IMorApp />, document.getElementById("app-root"));
