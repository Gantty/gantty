import { EventRepository } from './event_repository';
import { Event, UpdateEventData } from './types';

export class UpdateEventUsecase {
  constructor(private eventRepository: EventRepository) {}

  async execute(id: string, data: UpdateEventData): Promise<Event> {
    return await this.eventRepository.update(id, data);
  }
}
