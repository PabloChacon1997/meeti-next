import { INotificationRepository, notificationRepository } from "./NotificationRepository";

class NotificationService {
  constructor(
    private notificationRespository: INotificationRepository
  ) {}

  async getUnreadCoount(userId: string): Promise<number> {
    return await this.notificationRespository.getUnreadCount(userId);
  }
}

export const notificationService = new NotificationService(notificationRepository)