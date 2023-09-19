import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Event } from '../../domain/schemas/event.schema';

@Injectable()
export class EventStoreService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  emit(aggregateType: string, eventType: string, payload: any): Promise<Event> {
    const event = new this.eventModel({
      aggregateType,
      eventType,
      payload,
    });
    return event.save();
  }
}
