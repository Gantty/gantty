// Repository factory for dependency injection

import { LocalStorageService } from '../external/local_storage_service';
import { EventRepositoryImpl } from '../repository/event_repository_impl';
import { GroupRepositoryImpl } from '../repository/group_repository_impl';
import { VersionRepositoryImpl } from '../repository/version_repository_impl';

// Singleton storage service
const storageService = new LocalStorageService();

// Helper functions for cross-repository dependencies
async function groupExistsChecker(groupId: string): Promise<boolean> {
  const group = await groupRepository.getById(groupId);
  return group !== null;
}

async function hasEventsInGroupChecker(groupId: string): Promise<boolean> {
  const events = await eventRepository.getByGroupId(groupId);
  return events.length > 0;
}

// Repository instances
export const eventRepository = new EventRepositoryImpl(
  storageService,
  groupExistsChecker
);

export const groupRepository = new GroupRepositoryImpl(
  storageService,
  hasEventsInGroupChecker
);

export const versionRepository = new VersionRepositoryImpl(storageService);

// Re-export storage service for use cases that need it
export { storageService };
