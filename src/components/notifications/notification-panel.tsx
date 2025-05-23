import React, { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';
import { notificationService, type Notification } from './notification-service';

export const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((newNotifications) => {
      setNotifications(newNotifications);
      setUnreadCount(newNotifications.filter((n) => !n.read).length);
    });
    return unsubscribe;
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'alert':
        return <TrendingUp className="h-4 w-4 text-orange-400" />;
      case 'info':
        return <DollarSign className="h-4 w-4 text-blue-400" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return <Bell className="h-4 w-4 text-slate-400" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-red-500/50 bg-red-500/10';
      case 'alert':
        return 'border-orange-500/50 bg-orange-500/10';
      case 'info':
        return 'border-blue-500/50 bg-blue-500/10';
      case 'success':
        return 'border-green-500/50 bg-green-500/10';
      default:
        return 'border-slate-500/50 bg-slate-500/10';
    }
  };
  return (
    <div className="relative">
      {/* Bell Icon with Badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg glass-button hover:bg-white/10 transition-colors"
      >
        <Bell className="h-5 w-5 text-slate-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 rounded-lg border border-white/10 bg-[#1e293b] z-50">
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Notifications</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded hover:bg-white/10 transition-colors">
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-slate-400">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-white/5 ${getNotificationBgColor(notification.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm">{notification.title}</p>
                      <p className="text-slate-400 text-sm mt-1">{notification.message}</p>
                      <p className="text-xs text-slate-500 mt-2">{notification.timestamp.toLocaleTimeString()}</p>
                    </div>
                    <button
                      onClick={() => notificationService.removeNotification(notification.id)}
                      className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
                    >
                      <X className="h-3 w-3 text-slate-400" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
