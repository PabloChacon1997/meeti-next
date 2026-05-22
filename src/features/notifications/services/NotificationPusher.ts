import { pusher } from "@/src/lib/pusher";
import { SelectNotification } from "../types/notification.types";

export interface INotificationPusher {
  notify(notification: SelectNotification): Promise<void>
}

class NotificationPusher implements INotificationPusher {
  async notify(notification: SelectNotification): Promise<void> {
    await pusher.trigger(
      `notifications-channel-${notification.userId}`,
      'new-notification',
      notification,
    )
  }
}


export const notificationPusher = new NotificationPusher();