import { EventPriority } from "@/lib/enums/eventPriority";
import IOrganizer from "../IOrganizer";
import { RefObject } from "react";


export default interface EventContainerProps {
  _id?: string;
  title: string;
  date: string;
  image: string;
  priority: EventPriority;
  organizer: IOrganizer;
  ref: RefObject<HTMLDivElement | null>
}
