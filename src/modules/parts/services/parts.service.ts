import { Injectable } from "@nestjs/common";
import { Part } from "../schemas/part.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class PartsService {
    constructor(@InjectModel(Part.name) private partModel: Model<Part>) {}

    async getPartById(id: string): Promise<Part> {
        return this.partModel.findOne({id});
    }
}