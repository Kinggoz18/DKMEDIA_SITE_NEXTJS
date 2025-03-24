import EventService from '@/services/EventService';
import UpcomingEvent from '../UpcomingEvent';
import IEvent from '@/interfaces/IEvent';
import { EventPriority } from '@/enums/eventPriority';

export default async function UpcomingEventPage() {
  const eventService = new EventService();
  const allEvents = await eventService.getAllEvents();

  const upcomingEvents = getUpcomingEvents(allEvents);
  const upcomingHighlights = getHighlight(upcomingEvents)

  /**
   * Sorter function for sorting events by date. If it is less than return -1, if it is greater return 1 else return 0;
   * @param a 
   * @param b 
   */
  function sortFunction(a: IEvent, b: IEvent): number {
    if (a.date < b.date) return -1;
    else if (a.date > b.date) return 1;
    else return 0
  }

  /**
   * Check if an event is upcoming. If it is return true, else return false.
   * @param a 
   * @param b 
   */
  function isUpcoming(event: IEvent): boolean {
    return new Date(event.date).getTime() > new Date().getTime();
  }

  /**
   * Get highlights
   */
  function getHighlight(events: IEvent[]) {
    return events.filter(e => e.priority === EventPriority.Highlight).sort((a, b) => sortFunction(a, b))
  }

  /**
   * Get all upcoming events
   */
  function getUpcomingEvents(events: IEvent[]) {
    const upcoming: IEvent[] = [];
    events.forEach((element) => {
      if (isUpcoming(element)) {
        upcoming.push(element);
      }
    })
    return upcoming;
  }

  console.log({ allEvents, upcomingEvents, upcomingHighlights });

  return (
    <UpcomingEvent
      upcomingEvents={upcomingEvents}
      upcomingHighlights={upcomingHighlights}
    />
  );
}