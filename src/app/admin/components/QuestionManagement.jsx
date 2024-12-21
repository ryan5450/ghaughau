'use client';

import React, { useState, useEffect } from 'react';

const QuestionManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [replyMessages, setReplyMessages] = useState({});
  const [loadingStates, setLoadingStates] = useState({});
  const [disabledReplies, setDisabledReplies] = useState({});
  const [sentRepliesStatus, setSentRepliesStatus] = useState({});

  useEffect(() => {
    // Fetching the contacts when the component mounts
    fetch('/api/contact')
      .then((res) => res.json())
      .then((data) => {
        setContacts(data);

        // Load saved replies from localStorage
        const savedReplies = JSON.parse(localStorage.getItem('replies')) || {};
        setReplyMessages(savedReplies);

        // Load sent replies status from localStorage
        const savedSentRepliesStatus = JSON.parse(localStorage.getItem('sentRepliesStatus')) || {};
        setSentRepliesStatus(savedSentRepliesStatus);
      })
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);

  const handleReplyChange = (contactId, message) => {
    setReplyMessages({ ...replyMessages, [contactId]: message });
  };

  const handleSendReply = async (contactId, userEmail) => {
    const replyMessage = replyMessages[contactId];

    if (!replyMessage || !replyMessage.trim()) {
      alert('Reply message cannot be empty.');
      return;
    }

    setLoadingStates({ ...loadingStates, [contactId]: 'loading' });

    try {
      const response = await fetch('/api/contact/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactId, replyMessage }),
      });

      if (response.ok) {
        setLoadingStates({ ...loadingStates, [contactId]: 'sent' });

        // Save the reply to localStorage for persistence
        const updatedReplies = { ...replyMessages, [contactId]: replyMessage };
        setReplyMessages(updatedReplies);
        localStorage.setItem('replies', JSON.stringify(updatedReplies));

        // Disable further replies for this contact and save the status in localStorage
        const updatedSentRepliesStatus = { ...sentRepliesStatus, [contactId]: true };
        setSentRepliesStatus(updatedSentRepliesStatus);
        localStorage.setItem('sentRepliesStatus', JSON.stringify(updatedSentRepliesStatus));

      } else {
        alert('Failed to send the reply.');
        setLoadingStates({ ...loadingStates, [contactId]: 'error' });
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('An error occurred while sending the reply.');
      setLoadingStates({ ...loadingStates, [contactId]: 'error' });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Question Management</h1>
      {contacts.map((contact) => (
        <div key={contact._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <p><strong>Name:</strong> {contact.userName}</p>
          <p><strong>Email:</strong> {contact.userEmail}</p>
          <p><strong>Message:</strong> {contact.userMessage}</p>

          {/* Displaying the admin reply (if exists) */}
          {replyMessages[contact._id] && (
            <div className="mt-4 p-2 bg-gray-200 rounded">
              <h4 className="font-semibold">Admin Reply:</h4>
              <p>{replyMessages[contact._id]}</p>
            </div>
          )}

          {/* Reply Textarea */}
          {!sentRepliesStatus[contact._id] && (
            <textarea
              className="w-full mt-2 p-2 border rounded"
              rows="3"
              placeholder="Type your reply..."
              value={replyMessages[contact._id] || ''}
              onChange={(e) => handleReplyChange(contact._id, e.target.value)}
            />
          )}

          {/* Send Reply Button */}
          <button
            onClick={() => handleSendReply(contact._id, contact.userEmail)}
            className={`mt-2 px-4 py-2 rounded text-white ${
              sentRepliesStatus[contact._id]
                ? 'bg-green-500'
                : loadingStates[contact._id] === 'loading'
                ? 'bg-blue-400'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={loadingStates[contact._id] === 'loading' || sentRepliesStatus[contact._id]}
          >
            {loadingStates[contact._id] === 'loading'
              ? 'Sending...'
              : sentRepliesStatus[contact._id]
              ? 'Reply Sent'
              : 'Send Reply'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default QuestionManagement;
