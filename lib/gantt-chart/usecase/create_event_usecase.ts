import { EventRepository } from './event_repository';
import { Event, CreateEventData } from './types';

export class CreateEventUsecase {
  constructor(private eventRepository: EventRepository) {}

  async execute(data: CreateEventData): Promise<Event> {
    return await this.eventRepository.create(data);
  }
}
