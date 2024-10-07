import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { FaShareAlt, FaTimes } from "react-icons/fa";
import { MdOutlineCallReceived } from "react-icons/md";
import axios from "axios";
import { IoIosRemoveCircle } from "react-icons/io";

export default function Home({ user }) {
  const handleSignOut = () => {
    auth.signOut();
  };

  const videos = [
    { id: "9yWMdCKCxow", title: "Video 1" },
    { id: "qYaHoiUK0sc", title: "Video 2" },
    { id: "5oH9Nr3bKfw", title: "Video 3" },
    { id: "pjslXJZi4EQ", title: "Video 4" },
    { id: "-_5dLLUbXNc", title: "Video 5" },
    { id: "vTCZrgb2PWc", title: "Video 6" },
  ];

  const [sharedVideo, setSharedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Change mates to a state variable
  const [mates, setMates] = useState([]);

  useEffect(() => {
    const fetchMates = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/currentUser?userEmail=${user.email}`
        );
        console.log(res.data);
        setMates(res.data);
      } catch (error) {
        console.error("Error fetching mates frontend: ", error);
      }
    };

    fetchMates();
  }, [user.email]);

  const [filteredMates, setFilteredMates] = useState(mates);

  useEffect(() => {
    const results = mates.filter(
      (mate) =>
        mate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mate.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMates(results);
  }, [searchTerm, mates]); // Update effect to depend on mates

  const handleShareClick = (title) => {
    console.log("shared " + title);
    setSharedVideo(title);
    setSearchTerm("");
    setFilteredMates(mates);
  };

  const handleClosePopup = () => {
    setSharedVideo(null);
    setSearchTerm("");
    setFilteredMates(mates);
  };

  const [filteredResVideos, setFilteredResVideos] = useState([]);
  const [searchResVideo, setSearchResVideo] = useState("");
  const [resClicked, setResClicked] = useState(false);

  const [receivedVideos, setReceivedVideos] = useState([]);
  useEffect(() => {
    const results = receivedVideos.filter((resVi) =>
      resVi.videoTitle.toLowerCase().includes(searchResVideo.toLowerCase())
    );
    setFilteredResVideos(results);
  }, [searchResVideo]);

  const handleClosePopup2 = () => {
    setResClicked(false);
    setSearchResVideo("");
    setFilteredResVideos([]);
  };

  const [showMateForm, setShowNewMateForm] = useState(false);
  const [newMateEmail, setNewMateEmail] = useState("");
  const [newMateName, setNewMateName] = useState("");
  const [msgToReceiver, setMsgToReceiver] = useState("No MSSG");

  const addMate = async () => {
    if (newMateEmail.trim() && newMateName.trim()) {
      const newMate = { name: newMateName, email: newMateEmail };

      const updatedMates = [...mates, newMate];

      // Prepare the payload for the API
      const myMates = { userEmail: user.email, mates: updatedMates };

      try {
        // Make the API call to add the mate
        console.log(myMates);

        const res = await axios.post(
          "http://localhost:5000/addedMate",
          myMates
        );
        console.log(res.data);

        // Update the mates state with the new mate
        setMates(updatedMates);

        setNewMateEmail("");
        setNewMateName("");
        setShowNewMateForm(false); // Hide form after adding

        alert("Added " + newMateName);
      } catch (e) {
        console.log("Error in front near addMate function: " + e);
      }
    } else {
      alert("Fill out all fields");
    }
  };

  return (
    <div className="p-4">
      <div className="bg-red-200 rounded flex flex-col items-center p-3 sticky top-0 opacity-80 z-10">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {user.displayName || user.email}!
        </h1>
        <p>You are now logged in.</p>
      </div>

      <div className="Nav right-10 rounded p-2 md:right-32 fixed bottom-20 bg-green-200">
        <h1
          className="text-3xl cursor-pointer"
          onClick={async () => {
            setResClicked(true);
            try {
              const res = await axios.get(
                `http://localhost:5000/received?userEmail=${user.email}`
              );
              console.log(res.data);
              setReceivedVideos(res.data);
            } catch (error) {
              console.error("Error fetching received videos: ", error);
            }
          }}
        >
          <MdOutlineCallReceived />
        </h1>
      </div>

      {resClicked && (
        <div className="popUpDiv fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl">Received videos</h1>
              <button
                onClick={handleClosePopup2}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close popup"
              >
                <FaTimes />
              </button>
            </div>

            <input
              type="text"
              placeholder="Search Videos"
              value={searchResVideo}
              onChange={(e) => setSearchResVideo(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              aria-label="Search videos"
            />

            <div className="receivedVideoDiv overflow-y-auto flex-grow">
              {filteredResVideos.map((resVideo, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-2 rounded mb-2 cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <h3 className="font-semibold">
                    {resVideo.videoTitle} received from {resVideo.senderEmail} with msg "{resVideo.msgToReceiver}"
                  </h3>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={`https://www.youtube.com/embed/${resVideo.videoId}`}
                      title={resVideo.videoTitle}
                      // allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-72"
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="videos grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="video bg-white rounded-lg shadow-md p-4"
          >
            <h3 className="text-lg font-bold mb-2">{video.title}</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                // allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-72"
              ></iframe>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => handleShareClick(video.title)}
                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
                aria-label={`Share ${video.title}`}
              >
                <FaShareAlt className="mr-2" />
                Share
              </button>
            </div>

            {sharedVideo === video.title && (
              <div className="popUpDiv fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{video.title}</h2>
                    <button
                      onClick={handleClosePopup}
                      className="text-gray-500 hover:text-gray-700"
                      aria-label="Close popup"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Search mates"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    aria-label="Search mates"
                  />

                  {/* Add Mate */}
                  <div className="grid md:flex-col justify-center mb-2 ">
                    {!showMateForm && (
                      <button
                        className="bg-blue-500 text-white w-fit p-2 rounded-lg font-semibold"
                        onClick={() => {
                          setShowNewMateForm(true);
                        }}
                      >
                        Add Mate to share
                      </button>
                    )}

                    <h1>Click on email to send</h1>

                    {showMateForm && (
                      <div className="aAddMateForm">
                        <input
                          type="email"
                          placeholder="Enter e-mail"
                          value={newMateEmail}
                          onChange={(e) => setNewMateEmail(e.target.value)}
                          className="w-full p-2 mb-4 border border-gray-300 rounded"
                          aria-label="Enter e-mail"
                          required={true}
                        />
                        <input
                          type="text"
                          placeholder="Enter name"
                          value={newMateName}
                          onChange={(e) => setNewMateName(e.target.value)}
                          className="w-full p-2 mb-4 border border-gray-300 rounded"
                          aria-label="Enter name"
                          required={true}
                        />
                        {/* Actual mate adding button */}
                        <button
                          className="bg-blue-500 text-white w-fit p-2 rounded-lg font-semibold"
                          onClick={addMate} // Call the new function
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="matesDiv overflow-y-auto flex-grow">
                    {filteredMates.map((mate, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="overflow-auto my-2 bg-red-100 rounded-lg w-full h-fit p-3">
                          <div
                            className="bg-gray-100 p-2 rounded mb-2 cursor-pointer hover:bg-gray-200 transition-colors w-full"
                            onClick={async () => {
                              alert(`Sending ${video.title} to ${mate.name}`);
                              const data = {
                                senderEmail: user.email,
                                recipient: mate.name,
                                recipientEmail: mate.email,
                                videoId: video.id,
                                videoTitle: video.title,
                                msgToReceiver: msgToReceiver, 
                              };

                              await axios
                                .post("http://localhost:5000/shared", data)
                                .then((res) => {
                                  console.log(res.data);
                                  setMsgToReceiver("")
                                })
                                .catch((e) => {
                                  console.log("Error in front: " + e);
                                });
                            }}
                          >
                            <h3 className="font-semibold">{mate.name}</h3>
                            <p className="text-sm text-gray-600">
                              {mate.email}
                            </p>
                          </div>
                          <textarea
                            type="text" 
                            
                            placeholder="Enter message if any"
                            className="w-full p-2 rounded-lg h-full"
                            value={msgToReceiver}
                            onChange={(e)=>setMsgToReceiver(e.target.value)}
                            
                          />
                        </div>
                        <IoIosRemoveCircle
                          className="text-2xl hover:text-red-600 mr-3"
                          onClick={async () => {
                            console.log(index + " to delete");
                            try {
                              await axios.delete(
                                `http://localhost:5000/deleteMate?currentUser=${user.email}`,
                                {
                                  data: { emailToDelete: mate.email },
                                }
                              );
                              setMates((prevMates) =>
                                prevMates.filter((_, i) => i !== index)
                              );
                              alert(`Deleted ${mate.name}`);
                            } catch (error) {
                              console.error("Error deleting mate: ", error);
                              alert("Failed to delete mate.");
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSignOut}
        className="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}
