import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventStoreService } from './eventstore.service';
import { Event, EventSchema } from '@core/domain/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  providers: [EventStoreService],
  exports: [EventStoreService],
})
export class EventStoreModule {}
