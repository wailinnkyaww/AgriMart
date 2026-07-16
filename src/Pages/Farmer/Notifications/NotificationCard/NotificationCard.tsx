import "./NotificationCard.css";

import type { Notification } from "../../../../types/Notification";
import { markAsRead } from "../../../../services/notificationService";

interface Props {
  notification: Notification;
  onRefresh: () => void;
}

const NotificationCard = ({ notification, onRefresh }: Props) => {
  const handleRead = async () => {
    try {
      await markAsRead(notification.id);
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`notification-card ${notification.isRead ? "read" : "unread"}`}
    >
      <div className="notification-content">
        <h3>{notification.title}</h3>

        <p>{notification.message}</p>

        <small>{new Date(notification.createdAt).toLocaleString()}</small>
      </div>

      {!notification.isRead && (
        <button className="read-btn" onClick={handleRead}>
          Mark as Read
        </button>
      )}
    </div>
  );
};

export default NotificationCard;
