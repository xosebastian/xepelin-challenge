import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({
    type: String,
    index: true,
    default: () => uuidv4(),
  })
  aggregateId: string;

  @Prop()
  aggregateType: string;

  @Prop()
  eventType: string;

  @Prop({
    type: Object,
  })
  payload: any;

  @Prop({
    type: Date,
    default: Date.now,
  })
  timestamp: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
