import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PartDocument = HydratedDocument<Part>;

@Schema()
export class Part {
    @Prop({required: true, unique: true})
    id: string;
    
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    price: number;

    @Prop({required: true})
    brand: string;

    @Prop({required: true})
    model: string;

    @Prop({required: true})
    year: number;
}

export const PartSchema = SchemaFactory.createForClass(Part);