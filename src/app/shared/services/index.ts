import { RecordService } from './record.service';
import { RecordResolver } from './record.resolver';

export const SHARED_SERVICES = [RecordService, RecordResolver];

export { RecordService, RecordResolver };
