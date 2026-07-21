import { useEffect, useState } from "react";
import "./Notifications.css";
import { useAuth } from "../../../context/AuthContext";
import { getUserNotifications } from "../../../services/notificationService";
import type { Notification } from "../../../types/Notification";
import NotificationCard from "./NotificationCard/NotificationCard";
import Loader from "../../../components/Loader/Loader";

const Notifications = () => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    if (!user) return;

    try {
      const data = await getUserNotifications(user.uid);
      setNotifications(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="notifications-page">
      <div className="page-header">
        <h1>Notifications</h1>
        <p>Stay updated with your latest activities.</p>
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          <h3>No Notifications</h3>
          <p>You don't have any notifications.</p>
        </div>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onRefresh={loadNotifications}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
