import { Controller, Get, Param } from "@nestjs/common";
import { PartsService } from "../services/parts.service";
import { Part } from "../schemas/part.schema";

@Controller("parts")
export class PartsController {
    constructor(private partsService: PartsService) {}

    @Get(':id')
    async getPart(@Param('id') id: string): Promise<Part> {
        return await this.partsService.getPartById(id);
    }
}