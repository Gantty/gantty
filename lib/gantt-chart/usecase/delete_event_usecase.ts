import { EventRepository } from './event_repository';

export class DeleteEventUsecase {
  constructor(private eventRepository: EventRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.eventRepository.delete(id);
  }
}
