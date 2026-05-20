import { SelectNotification } from "../types/notification.types";
import { INotificationRepository, notificationRepository } from "./NotificationRepository";

class NotificationService {
  constructor(
    private notificationRespository: INotificationRepository
  ) {}

  async getUnreadCoount(userId: string): Promise<number> {
    return await this.notificationRespository.getUnreadCount(userId);
  }

  async getUserNotifications(userId: string): Promise<SelectNotification[]> {
    return this.notificationRespository.findByUserId(userId);
  }

  async clearNotifications(userId: string): Promise<void> {
    return await this.notificationRespository.delete(userId);
  }
}

export const notificationService = new NotificationService(notificationRepository)