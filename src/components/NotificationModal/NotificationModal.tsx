import { useEffect, useState } from "react";

import "./NotificationModal.css";

import { useAuth } from "../../context/AuthContext";

import {
  getUserNotifications,
  markAsRead,
} from "../../services/notificationService";

import type { Notification } from "../../types/Notification";

interface Props {
  open: boolean;

  onClose: () => void;
}

const NotificationModal = ({ open, onClose }: Props) => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const loadNotifications = async () => {
    if (!user) return;

    try {
      const data = await getUserNotifications(user.uid);
      console.log(data);
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      loadNotifications();
    }
  }, [open, user]);

  const handleRead = async (id: string) => {
    try {
      await markAsRead(id);

      loadNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <div className="notification-overlay">
      <div className="notification-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <h2>Notifications</h2>

        {notifications.length === 0 ? (
          <div className="empty-notification">No notifications</div>
        ) : (
          <div className="modal-notification-list">
            {notifications.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className={`modal-notification-item 
${item.isRead ? "read" : "unread"}`}
              >
                <h4>{item.title}</h4>

                <p>{item.message}</p>

                <small>{new Date(item.createdAt).toLocaleString()}</small>

                {!item.isRead && (
                  <button onClick={() => handleRead(item.id)}>Mark Read</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
