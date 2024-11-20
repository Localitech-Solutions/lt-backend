import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Part, PartSchema } from "./schemas/part.schema";
import { PartsController } from "./controllers/parts.controller";
import { PartsService } from "./services/parts.service";

@Module({
    imports: [MongooseModule.forFeature([{name: Part.name, schema: PartSchema}])],
    controllers: [PartsController],
    providers: [PartsService]
})
export class PartsModule {}