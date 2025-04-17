const Notification = require('../models/Notification');

const sendNotification = async (userId, message) => {
  try {
    const notif = new Notification({ userId, message });
    await notif.save();
  } catch (error) {
    console.error('Error sending notification:', error.message);
  }
};

module.exports = sendNotification;
