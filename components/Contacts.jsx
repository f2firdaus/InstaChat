"use client";
import { useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [name, setName] = useState("");
const router =useRouter()
  const { data: session } = useSession();
  const currentUser = session?.user;
  const getContacts = async () => {
    try {
      const response = await fetch(
        search !== "" ? `/api/users/searchContact/${search}` : "/api/users"
      );
      const data = await response.json();
      setContacts(data.filter((contact) => contact._id !== currentUser._id));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (currentUser) getContacts();
    
  }, [currentUser, search]);
  const createChat = async () => {
    const res = await fetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({
        currentUserId: currentUser._id,
        members: selectedContacts.map((contact) => contact._id),
        isGroup,
        name,
      }),
    });
    const chat = await res.json();

    if (res.ok) {
      router.push(`/chats/${chat._id}`);
    }
  };
  const handleSelect = (contacts) => {
    if (selectedContacts.includes(contacts)) {
      setSelectedContacts((prev) => prev.filter((item) => item !== contacts));
    } else {
      setSelectedContacts((prevSelectedContacts) => [
        ...prevSelectedContacts,
        contacts,
      ]);
    }
  };
  const isGroup = selectedContacts.length > 1;
  return loading ? (
    <Loader />
  ) : (
    <div className="create-chat-container">
      <input
        type="text"
        className="input-search"
        placeholder="search contacts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="contact-bar">
        <div className="contact-list">
          <p className="text-body-bold">Select or Deselect</p>
          <div className="flex flex-col flex-1 gap-5 overflow-y-scroll custom-scrollbar">
            {contacts.map((user, index) => (
              <div
                key={index}
                className="contact"
                onClick={() => handleSelect(user)}
              >
                {selectedContacts.find((item) => item === user) ? (
                  <CheckCircle sx={{ color: "red" }} />
                ) : (
                  <RadioButtonUnchecked />
                )}

                <Image
                  src={user.profileImage || "/assets/person.jpg"}
                  alt="profile"
                  className="profilePhoto"
                />
                <p className="text-base-bold">{user.username}</p>
              </div>
            ))}
          </div>
        </div>

                  <div className="create-chat">
                  {isGroup && (
            <>
              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Group Chat Name</p>
                <input
                  placeholder="Enter group chat name..."
                  className="input-group-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-body-bold">Members</p>
                <div className="flex flex-wrap gap-3">
                  {selectedContacts.map((contact, index) => (
                    <p className="selected-contact" key={index}>
                      {contact.username}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}          

          <buttton className="btn" onClick={createChat}
              disabled={selectedContacts.length === 0}>{selectedContacts.length > 1 ?"START A NEW GROUP":'START A NEW CHAT'} </buttton>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
